using System;
using System.Collections.Generic;
using survey.entity;

namespace survey.webapi.DTO
{
    public class CreateUserDto
    {
        public CreateUserDto()
        {
            CreatedAt = DateTime.Now;
        }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}