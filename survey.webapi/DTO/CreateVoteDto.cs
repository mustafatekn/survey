namespace survey.webapi.DTO
{
    public class CreateVoteDto
    {
        public int SurveyId { get; set; }
        public int ChoiceId { get; set; }
        public int UserId { get; set; }
    }
}