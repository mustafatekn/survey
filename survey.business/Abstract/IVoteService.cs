using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.business.Abstract
{
    public interface IVoteService
    {
        Task<Vote> Create(Vote vote);
        Task<List<Vote>> GetAll();
        Task<Vote> GetById(int id);
        Task Vote(int choiceId, int surveyId);
    }
}