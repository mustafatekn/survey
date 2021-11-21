using System.Collections.Generic;
using System.Threading.Tasks;
using survey.business.Abstract;
using survey.data.Abstract;
using survey.entity;

namespace survey.business.Concrete
{
    public class CategoryManager : ICategoryService
    {
        private IUnitOfWork _unitOfWork;

        public CategoryManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Category> Create(Category category)
        {
            var createdCategory = await _unitOfWork.Categories.Create(category);
            await _unitOfWork.SaveAsync();
            return (category);
        }

        public async Task<Category> Delete(Category category)
        {
            if (category != null)
            {
                _unitOfWork.Categories.Delete(category);
                await _unitOfWork.SaveAsync();
            }
            return category;
        }

        public async Task<List<Category>> GetAll()
        {
            return await _unitOfWork.Categories.GetAll();
        }

        public async Task<Category> GetById(int id)
        {
            return await _unitOfWork.Categories.GetById(id);
        }
    }
}