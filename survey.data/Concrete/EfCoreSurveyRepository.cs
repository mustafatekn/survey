using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using survey.data.Abstract;
using survey.entity;

namespace survey.data.Concrete
{
    public class EfCoreSurveyRepository : EfCoreGenericRepository<Survey>, ISurveyRepository
    {
        public EfCoreSurveyRepository(SurveyContext context) : base(context)
        {

        }
        private SurveyContext SurveyContext
        {
            get { return context as SurveyContext; }
        }

        public async Task<List<Survey>> GetDiscoverSurveys()
        {
            return await SurveyContext.Surveys.Where(s => s.User.Role == EnumRole.Admin).Include(s => s.Category).Include(s => s.Choices).ToListAsync();
        }

        public async Task<List<Survey>> GetDiscoverSurveysByCategory(int categoryId)
        {
            return await SurveyContext.Surveys.Where(i => i.Category.Id == categoryId && i.User.Role == EnumRole.Admin).Include(s => s.Category).Include(s => s.Choices).ToListAsync();
        }
        public async Task<List<Survey>> GetMemberSurveys()
        {
            return await SurveyContext.Surveys.Include(s => s.Votes).Include(s => s.Choices).Include(s => s.Category).Include(s => s.User).Where(s => s.User.Role == EnumRole.Member).ToListAsync();
        }
    }
}