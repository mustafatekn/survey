using System.Threading.Tasks;
using survey.entity;

namespace survey.data.Abstract
{
    public interface IAuthRepository : IRepository<User>
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
        Task<User> GetByEmail(string email);
    }
}