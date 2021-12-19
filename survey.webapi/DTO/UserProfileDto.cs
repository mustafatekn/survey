using System;
using System.Collections.Generic;
using survey.entity;

namespace survey.webapi.DTO
{
    public class UserProfileDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Survey> Surveys { get; set; }
    }
}