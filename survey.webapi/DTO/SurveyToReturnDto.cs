using System;
using System.Collections.Generic;
using survey.entity;

namespace survey.webapi.DTO
{
    public class SurveyToReturnDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Url { get; set; }
        public DateTime CreatedAt { get; set; }
        public Category Category { get; set; }
        public List<Choice> Choices { get; set; }
        public List<Vote> Votes { get; set; }
    }
}