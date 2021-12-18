using System.Collections.Generic;
using System.Threading.Tasks;
using survey.business.Abstract;
using survey.data.Abstract;
using survey.entity;

namespace survey.business.Concrete
{
    public class SurveyManager : ISurveyService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SurveyManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Survey> Create(Survey survey)
        {
            var createdSurvey = new Survey();
            if (survey != null)
            {
                createdSurvey = await _unitOfWork.Surveys.Create(survey);
                await _unitOfWork.SaveAsync();
            }
            return createdSurvey;
        }

        public async Task<Survey> Delete(Survey survey)
        {
            if (survey != null)
            {
                _unitOfWork.Surveys.Delete(survey);
                await _unitOfWork.SaveAsync();
            }
            return survey;
        }

        public async Task<List<Survey>> GetAll()
        {
            return await _unitOfWork.Surveys.GetAll();
        }

        public async Task<Survey> GetById(int id)
        {
            return await _unitOfWork.Surveys.GetById(id);
        }

        public async Task<List<Survey>> GetDiscoverSurveys()
        {
            return await _unitOfWork.Surveys.GetDiscoverSurveys();
        }

        public async Task<List<Survey>> GetDiscoverSurveysByCategory(int categoryId)
        {
            return await _unitOfWork.Surveys.GetDiscoverSurveysByCategory(categoryId);
        }

        public async Task<List<Survey>> GetSurveysWithAllData()
        {
            return await _unitOfWork.Surveys.GetSurveysWithAllData();
        }
    }
}