using System.Collections.Generic;
using System.Threading.Tasks;

namespace survey.data.Abstract
{
    public interface IRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> Create(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}