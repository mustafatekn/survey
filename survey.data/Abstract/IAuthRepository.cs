using System.Threading.Tasks;
using survey.entity;

namespace survey.data.Abstract
{
    public interface IAuthRepository : IRepository<User>
    {
        Task<User> CreateUser(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
        Task<User> GetByEmail(string email);
    }
}