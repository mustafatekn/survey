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
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Vote([FromBody] CreateVoteDto createVoteDto)
        {
            if (createVoteDto.ChoiceId < 0 && createVoteDto.SurveyId < 0) return BadRequest();

            await _voteService.Vote(createVoteDto.ChoiceId, createVoteDto.SurveyId);
            return StatusCode(201);
        }
    }
}