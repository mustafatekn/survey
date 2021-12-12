using System.Threading.Tasks;
using survey.entity;

namespace survey.data.Abstract
{
    public interface ICategoryRepository:IRepository<Category>
    {
         Task<bool> CategoryExists(string name);
    }
}