using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.data.Abstract
{
    public interface IVoteRepository:IRepository<Vote>
    {
        Task<List<Vote>> GetVotesBySurveyId(int surveyId);
    }
}