namespace survey.entity
{
    public class Vote
    {
        public int Id { get; set; }
        public int SurveyId { get; set; }
        public int ChoiceId { get; set; }
    }
}