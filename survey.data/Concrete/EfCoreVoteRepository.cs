using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using survey.data.Abstract;
using survey.entity;

namespace survey.data.Concrete
{
    public class EfCoreVoteRepository : EfCoreGenericRepository<Vote>, IVoteRepository
    {
        public EfCoreVoteRepository(SurveyContext context) : base(context)
        {

        }

        private SurveyContext SurveyContext
        {
            get { return context as SurveyContext; }
        }

        public async Task<List<Vote>> GetVotesBySurveyId(int surveyId)
        {
            return await SurveyContext.Votes.Where(i => i.SurveyId == surveyId).ToListAsync();
        }
    }
}