using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.business.Abstract
{
    public interface ISurveyService
    {
        Task<Survey> Create(Survey survey);
        Task<List<Survey>> GetAll();
        Task<List<Survey>> GetSurveysWithAllData();
        Task<List<Survey>> GetSurveysByCategory(int categoryId);
        Task<Survey> GetById(int id);
        Task<Survey> Delete(Survey survey);
    }
}