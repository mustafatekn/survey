using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using survey.data.Abstract;
using survey.entity;

namespace survey.data.Concrete
{
    public class EfCoreSurveyRepository:EfCoreGenericRepository<Survey>, ISurveyRepository
    {
        public EfCoreSurveyRepository(SurveyContext context): base(context)
        {
            
        }
        private SurveyContext SurveyContext
        {
            get {return context as SurveyContext; }
        }

        public async Task<List<Survey>> GetSurveysByCategory(int categoryId)
        {
            return await SurveyContext.Surveys.Where(i => i.CategoryId == categoryId).ToListAsync();
        }

        public async Task<List<Survey>> GetSurveysWithAllData()
        {
            return await SurveyContext.Surveys.Include(s => s.Votes).Include(s => s.Choices).Include(s => s.Category).ToListAsync();
        }
    }
}