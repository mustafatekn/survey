using System;
using System.Threading.Tasks;

namespace survey.data.Abstract
{
    public interface IUnitOfWork : IDisposable
    {
        ISurveyRepository Surveys { get; }
        ICategoryRepository Categories { get; }
        IChoiceRepository Choices { get; }
        IVoteRepository Votes { get; }
        IAuthRepository Users {get;}
        Task<int> SaveAsync();
    }
}