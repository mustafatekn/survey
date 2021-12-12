using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.business.Abstract
{
    public interface ICategoryService
    {
        Task<Category> Create(Category category);
        Task<Category> Delete(Category category);
        Task<Category> GetById(int id);
        Task<List<Category>> GetAll();
        Task<bool> CategoryExists(string name);
    }
}