using System;
using survey.entity;

namespace survey.webapi.DTO
{
    public class UserToReturnDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public EnumRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}