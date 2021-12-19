using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using survey.data.Abstract;
using survey.entity;

namespace survey.data.Concrete
{
    public class EfCoreAuthRepository : EfCoreGenericRepository<User>, IAuthRepository
    {
        public EfCoreAuthRepository(SurveyContext context) : base(context)
        {

        }

        private SurveyContext SurveyContext
        {
            get { return context as SurveyContext; }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await SurveyContext.Users.AddAsync(user);
            await SurveyContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await SurveyContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await SurveyContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return null;
            }
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }
            return user;
        }

        public async Task<User> GetUserDetailsByUsername(string username)
        {
            var user = await SurveyContext.Users.Include(u => u.Surveys).ThenInclude(s => s.Choices).Include(u => u.Surveys).ThenInclude(s => s.Votes).FirstOrDefaultAsync(u => u.Username == username);
            return user;
        }

        public async Task<bool> UserExistsByUsername(string username)
        {
            if (await SurveyContext.Users.AnyAsync(u => u.Username == username))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> UserExistsByEmail(string email)
        {
            if (await SurveyContext.Users.AnyAsync(u => u.Email == email))
            {
                return true;
            }
            return false;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        private bool VerifyPasswordHash(string password, byte[] userPasswordHash, byte[] userPasswordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(userPasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userPasswordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}