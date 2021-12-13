using System;
using System.Collections.Generic;
using survey.entity;

namespace survey.webapi.DTO
{
    public class UserRegisterDto
    {
        public UserRegisterDto()
        {
            CreatedAt = DateTime.Now;
        }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public EnumRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}