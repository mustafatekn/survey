using System.Threading.Tasks;
using survey.entity;

namespace survey.data.Abstract
{
    public interface IVoteRepository:IRepository<Vote>
    {
         Task Vote(int choiceId, int surveyId);
    }
}