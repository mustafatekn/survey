using System;
using System.Collections.Generic;

namespace survey.entity
{
    public class Survey
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Question { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public Category Category { get; set; }
        public User User {get; set;}
        public List<Choice> Choices { get; set; }
        public List<Vote> Votes { get; set; }
    }
}