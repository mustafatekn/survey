using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using survey.data.Abstract;
using survey.entity;

namespace survey.data.Concrete
{
    public class EfCoreCategoryRepository : EfCoreGenericRepository<Category>,ICategoryRepository
    {
        public EfCoreCategoryRepository(SurveyContext context) : base(context)
        {

        }

        private SurveyContext SurveyContext
        {
            get { return context as SurveyContext; }
        }
        public async Task<bool> CategoryExists(string name)
        {
            if(await SurveyContext.Categories.AnyAsync(c => c.Name == name)){
                return true;
            }
            return false;
        }
    }
}