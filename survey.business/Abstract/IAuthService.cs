using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.business.Abstract
{
    public interface IAuthService
    {
        Task<User> Create(User user, string password);
        Task<User> Delete(User user);
        Task<List<User>> GetAll();
        Task<User> GetById(int id);
        Task<User> GetUserDetailsByUsername(string username);
        Task<User> GetByEmail(string email);
        Task<User> Login(string username, string password);
        Task<bool> UserExistsByUsername(string username);
        Task<bool> UserExistsByEmail(string email);
    }
}