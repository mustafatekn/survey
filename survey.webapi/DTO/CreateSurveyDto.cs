using System;
using System.Collections.Generic;
using survey.entity;

namespace survey.webapi.DTO
{
    public class CreateSurveyDto
    {
        public CreateSurveyDto()
        {
            CreatedAt = DateTime.Now;
        }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string Question { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public String[] ChoiceNames {get; set;}
        public DateTime CreatedAt { get; set; }
    }
}