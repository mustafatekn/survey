using System.Threading.Tasks;
using survey.data.Abstract;

namespace survey.data.Concrete
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly SurveyContext _context;
        public UnitOfWork(SurveyContext context)
        {
            _context = context;
        }

        private EfCoreSurveyRepository _surveyRepository;
        private EfCoreCategoryRepository _categoryRepository;
        private EfCoreVoteRepository _voteRepository;
        private EfCoreChoiceRepository _choiceRepository;
        private EfCoreAuthRepository _authRepository;

        public ISurveyRepository Surveys => 
            _surveyRepository = _surveyRepository ?? new EfCoreSurveyRepository(_context);

        public ICategoryRepository Categories => 
            _categoryRepository = _categoryRepository ?? new EfCoreCategoryRepository(_context);             

        public IVoteRepository Votes => 
            _voteRepository = _voteRepository ?? new EfCoreVoteRepository(_context);

        public IChoiceRepository Choices => 
            _choiceRepository = _choiceRepository ?? new EfCoreChoiceRepository(_context);
        public IAuthRepository Users => 
            _authRepository = _authRepository ?? new EfCoreAuthRepository(_context);

        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}