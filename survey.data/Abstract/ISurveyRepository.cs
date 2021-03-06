using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.data.Abstract
{
    public interface ISurveyRepository : IRepository<Survey>
    {
        Task<List<Survey>> GetMemberSurveys();
        Task<List<Survey>> GetDiscoverSurveysByCategory(int categoryId);
        Task<List<Survey>> GetDiscoverSurveys();
    }
}