using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using survey.business.Abstract;
using survey.entity;
using survey.webapi.DTO;

namespace survey.webapi.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[Controller]")]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;
        private IConfiguration _configuration;
        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
        {
            if (userRegisterDto.Username.Trim() == "")
            {
                ModelState.AddModelError("Username", "Username can not be empty");
            }

            if (userRegisterDto.Email.Trim() == "")
            {
                ModelState.AddModelError("Email", "Email can not be empty");
            }

            if (userRegisterDto.Password.Trim() == "")
            {
                ModelState.AddModelError("Password", "Password can not be empty");
            }

            if (userRegisterDto.ConfirmPassword.Trim() == "")
            {
                ModelState.AddModelError("ConfirmPassword", "ConfirmPassword can not be empty");
            }

            if (userRegisterDto.Password != userRegisterDto.ConfirmPassword)
            {
                ModelState.AddModelError("Password", "Passwords must match");
            }

            if (!IsEmail(userRegisterDto.Email))
            {
                ModelState.AddModelError("Email", "Email must be in email format");
            }

            if (await _authService.UserExistsByEmail(userRegisterDto.Email))
            {
                ModelState.AddModelError("Email", "Email has already used by another user");
            }

            if (await _authService.UserExistsByUsername(userRegisterDto.Username))
            {
                ModelState.AddModelError("Username", "Username has already used by another user");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newUser = new User
            {
                Username = userRegisterDto.Username,
                Email = userRegisterDto.Email,
                Role = EnumRole.Member
            };
            var createdUser = await _authService.Create(newUser, userRegisterDto.Password);
            return StatusCode(201, newUser);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (userLoginDto.Username.Trim() == "")
            {
                ModelState.AddModelError("Username", "Username can not be empty");
            }

            if (userLoginDto.Password == "")
            {
                ModelState.AddModelError("Password", "Password can not be empty");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.Login(userLoginDto.Username, userLoginDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim("roleFromToken",user.Role.ToString())
                }),
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(UserToDto(user, tokenString));
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto deleteUserDto)
        {
            var currentUser = await _authService.GetById(deleteUserDto.CurrentUserId);
            if (currentUser.Role != EnumRole.Admin)
            {
                return Unauthorized();
            }
            else
            {
                var user = await _authService.GetById(deleteUserDto.Id);

                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    var deletedUser = await _authService.Delete(user);
                    return StatusCode(200, deletedUser.Email);
                }
            }
        }

        private bool IsEmail(string email)
        {
            try
            {
                MailAddress m = new MailAddress(email);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        private static UserToReturnDto UserToDto(User user, string token)
        {
            return new UserToReturnDto
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                Username = user.Username,
                Token = token,
                Role = user.Role
            };
        }

    }
}