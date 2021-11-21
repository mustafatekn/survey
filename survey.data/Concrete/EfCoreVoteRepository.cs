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

        public async Task Vote(int choiceId, int surveyId)
        {
            var isVoteValid = await SurveyContext.Surveys.Where(s => s.Id == surveyId && s.Choices.Any(c => c.Id == choiceId)).FirstOrDefaultAsync();

            if (isVoteValid != null)
            {
                var vote = new Vote
                {
                    ChoiceId = choiceId,
                    SurveyId = surveyId
                };
                await SurveyContext.Votes.AddAsync(vote);
                await SurveyContext.SaveChangesAsync();
            }
        }
    }
}