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
    }
}