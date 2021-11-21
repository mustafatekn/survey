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
        [Authorize]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
        {
            if (createUserDto.Email.Trim() == "")
            {
                ModelState.AddModelError("Email", "Email can not be empty");
            }
            if (createUserDto.Password.Trim() == "")
            {
                ModelState.AddModelError("Password", "Password can not be empty");
            }
            if (createUserDto.ConfirmPassword.Trim() == "")
            {
                ModelState.AddModelError("ConfirmPassword", "ConfirmPassword can not be empty");
            }
            if (createUserDto.Password != createUserDto.ConfirmPassword)
            {
                ModelState.AddModelError("Password", "Passwords must match");
            }
            if (!IsEmail(createUserDto.Email))
            {
                ModelState.AddModelError("Email", "Email must be in email format");
            }
            if (await _authService.UserExists(createUserDto.Email))
            {
                ModelState.AddModelError("Email", "Email has already used by another user");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newUser = new User
            {
                Email = createUserDto.Email
            };
            var createdUser = await _authService.Create(newUser, createUserDto.Password);
            return StatusCode(201, createdUser.Email);
        }

        [HttpGet]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (userLoginDto.Email.Trim() == "")
            {
                ModelState.AddModelError("Email", "Email can not be empty");
            }

            if (userLoginDto.Password == "")
            {
                ModelState.AddModelError("Password", "Password can not be empty");
            }

            if (!IsEmail(userLoginDto.Email))
            {
                ModelState.AddModelError("Email", "Email must be in email format");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.Login(userLoginDto.Email, userLoginDto.Password);
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
                    new Claim(ClaimTypes.Name, user.Email)
                }),
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(tokenString);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto deleteUserDto)
        {
            var user = await _authService.GetByEmail(deleteUserDto.Email);

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
    }
}