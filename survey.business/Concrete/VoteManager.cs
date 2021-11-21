using System.Collections.Generic;
using System.Threading.Tasks;
using survey.business.Abstract;
using survey.data.Abstract;
using survey.entity;

namespace survey.business.Concrete
{
    public class VoteManager: IVoteService
    {
        private IUnitOfWork _unitOfWork;

        public VoteManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Vote> Create(Vote vote)
        {
            var createdVote = new Vote();
            createdVote = await _unitOfWork.Votes.Create(vote);
            await _unitOfWork.SaveAsync();
            return createdVote;
        }

        public async Task<List<Vote>> GetAll()
        {
            return await _unitOfWork.Votes.GetAll();
        }

        public async Task<Vote> GetById(int id)
        {
            return await _unitOfWork.Votes.GetById(id);
        }

        public async Task Vote(int choiceId, int surveyId)
        {
            await _unitOfWork.Votes.Vote(choiceId,surveyId);
        }
    }
}