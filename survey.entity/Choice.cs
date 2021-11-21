namespace survey.entity
{
    public class Choice
    {
        public int Id { get; set; }
        public int SurveyId {get; set;}
        public string Name { get; set; }
    }
}