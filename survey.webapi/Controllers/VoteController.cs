using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using survey.business.Abstract;
using survey.entity;
using survey.webapi.DTO;

namespace survey.webapi.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    [Produces("application/json")]
    public class VoteController : ControllerBase
    {
        private IVoteService _voteService;
        private IChoiceService _choiceService;
        private ISurveyService _surveyService;
        public VoteController(IVoteService voteService, IChoiceService choiceService, ISurveyService surveyService)
        {
            _voteService = voteService;
            _choiceService = choiceService;
            _surveyService = surveyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetVotes()
        {
            var votes = await _voteService.GetAll();
            return StatusCode(200, votes);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Vote([FromBody] CreateVoteDto createVoteDto)
        {
            if (createVoteDto.ChoiceId < 0 && createVoteDto.SurveyId < 0 && createVoteDto.UserId < 0) return BadRequest();
            var survey = _surveyService.GetById(createVoteDto.SurveyId);
            var choice = _choiceService.GetById(createVoteDto.ChoiceId);
            if (survey == null || choice == null) return NotFound();
        
            var vote = new Vote
            {
                ChoiceId = createVoteDto.ChoiceId,
                SurveyId = createVoteDto.SurveyId,
                UserId = createVoteDto.UserId
            };

            var createdVote = await _voteService.Create(vote);
            return StatusCode(201, createdVote);
        }
    }
}