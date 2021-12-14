using System;

namespace survey.entity
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public EnumRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public enum EnumRole
    {
        Member = 10,
        Admin = 20,
    }
}