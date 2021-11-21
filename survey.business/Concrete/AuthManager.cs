using System.Collections.Generic;
using System.Threading.Tasks;
using survey.business.Abstract;
using survey.data.Abstract;
using survey.entity;

namespace survey.business.Concrete
{
    public class AuthManager : IAuthService
    {
        private IUnitOfWork _unitOfWork;

        public AuthManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<User> Create(User user, string password)
        {
            var createdUser = new User();
            createdUser = await _unitOfWork.Users.CreateUser(user, password);
            await _unitOfWork.SaveAsync();
            return createdUser;
        }

        public async Task<User> Delete(User user)
        {
            if (user != null)
            {
                _unitOfWork.Users.Delete(user);
                await _unitOfWork.SaveAsync();
                return user;
            }else{
                return null;
            }
        }

        public async Task<List<User>> GetAll()
        {
            return await _unitOfWork.Users.GetAll();
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await _unitOfWork.Users.GetByEmail(email);
            return user;
        }

        public async Task<User> GetById(int id)
        {
            return await _unitOfWork.Users.GetById(id);
        }

        public async Task<User> Login(string email, string password)
        {
            var user = await _unitOfWork.Users.Login(email, password);
            return user;
        }

        public async Task<bool> UserExists(string email)
        {
            return await _unitOfWork.Users.UserExists(email);
        }
    }
}