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
        Task<User> GetByEmail(string email);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}