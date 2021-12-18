using System;
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
        private IAuthService _authService;
        public SurveysController(ISurveyService surveyService, IChoiceService choiceService, ICategoryService categoryService, IAuthService authService)
        {
            _surveyService = surveyService;
            _choiceService = choiceService;
            _categoryService = categoryService;
            _authService = authService;
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
        [Route("administration/category")]
        public async Task<IActionResult> GetAdministrationSurveysByCategory(int categoryId)
        {
            var surveys = await _surveyService.GetAdministrationSurveysByCategory(categoryId);
            if (surveys == null)
            {
                return NotFound(categoryId);
            }
            else
            {
                return StatusCode(200, surveys);
            }
        }

        [HttpGet]
        [Route("administration")]
        public async Task<IActionResult> GetAdministrationSurveys()
        {
            var surveys = await _surveyService.GetAdministrationSurveys();
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
        [Authorize]
        public async Task<IActionResult> CreateSurvey([FromBody] CreateSurveyDto createSurveyDto)
        {
            var category = new Category();
            var user = new User();
            if (createSurveyDto.CategoryId < 1 && createSurveyDto.Description == null && createSurveyDto.Question == null && createSurveyDto.ChoiceNames == null)
            {
                return BadRequest();
            }
            else
            {
                category = await _categoryService.GetById(createSurveyDto.CategoryId);
                user = await _authService.GetById(createSurveyDto.UserId);
                var survey = new Survey
                {
                    Category = category,
                    Question = createSurveyDto.Question,
                    CreatedAt = createSurveyDto.CreatedAt,
                    Description = createSurveyDto.Description,
                    ImageUrl = createSurveyDto.ImageUrl,
                    Url = CreateUrl(createSurveyDto.Question),
                    User = user
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
        [Authorize]
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

        private static string CreateUrl(string question)
        {
            string[] words = question.Split(' ');
            var url = "";
            for (int i = 0; i < words.Length; i++)
            {
                if(words[i]!=words[words.Length-1]){
                    url += words[i] +"-";
                }else{
                    url += words[i];
                }                
            }
            return url;
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