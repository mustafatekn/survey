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
        Task<List<Survey>> GetAdministrationSurveysByCategory(int categoryId);
        Task<List<Survey>> GetAdministrationSurveys();
        Task<Survey> GetById(int id);
        Task<Survey> Delete(Survey survey);
    }
}