using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using survey.business.Abstract;
using survey.entity;
using survey.webapi.DTO;

namespace survey.webapi.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[Controller]")]
    public class SurveysController : ControllerBase
    {
        private ISurveyService _surveyService;
        private IChoiceService _choiceService;
        private ICategoryService _categoryService;
        public SurveysController(ISurveyService surveyService, IChoiceService choiceService, ICategoryService categoryService)
        {
            _surveyService = surveyService;
            _choiceService = choiceService;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSurveys()
        {
            var surveys = await _surveyService.GetSurveysWithAllData();
            if (surveys == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(surveys);
            }

        }

        [HttpGet]
        [Route("category")]
        public async Task<IActionResult> GetSurveysByCategory(int categoryId)
        {
            var surveys = await _surveyService.GetSurveysByCategory(categoryId);
            if (surveys == null)
            {
                return NotFound();
            }
            else
            {
                return StatusCode(200, surveys);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateSurvey([FromBody] CreateSurveyDto createSurveyDto)
        {
            var category = new Category();

            if (createSurveyDto.CategoryId <= 0 && createSurveyDto.Description == null && createSurveyDto.Question == null && createSurveyDto.ChoiceNames == null && createSurveyDto.Url == null)
            {
                return BadRequest();
            }
            else
            {
                category = await _categoryService.GetById(createSurveyDto.CategoryId);

                var survey = new Survey
                {
                    Category = category,
                    Question = createSurveyDto.Question,
                    CreatedAt = createSurveyDto.CreatedAt,
                    Description = createSurveyDto.Description,
                    ImageUrl = createSurveyDto.ImageUrl,
                    Url = createSurveyDto.Url
                };
                var createdSurvey = await _surveyService.Create(survey);
                foreach (var choiceName in createSurveyDto.ChoiceNames)
                {
                    var choice = new Choice
                    {
                        Name = choiceName,
                        SurveyId = createdSurvey.Id
                    };
                    await _choiceService.Create(choice);
                };
                return StatusCode(201, SurveyToDto(survey));
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteSurvey(int surveyId)
        {
            var survey = await _surveyService.GetById(surveyId);
            if (survey == null)
            {
                return NotFound();
            }
            else
            {
                var deletedSurvey = await _surveyService.Delete(survey);
                return StatusCode(200, deletedSurvey);
            }
        }
        private static SurveyToReturnDto SurveyToDto(Survey survey)
        {
            return new SurveyToReturnDto
            {
                Id = survey.Id,
                Choices = survey.Choices,
                Votes = survey.Votes,
                Category = survey.Category,
                CreatedAt = survey.CreatedAt,
                Question = survey.Question,
                Url = survey.Url
            };
        }
    }
}