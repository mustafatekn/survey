using Microsoft.EntityFrameworkCore;
using survey.data.Configurations;
using survey.entity;

namespace survey.data.Concrete
{
    public class SurveyContext:DbContext
    {
        public SurveyContext(DbContextOptions options):base(options)
        {
            
        }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Choice> Choices { get; set; }
        public DbSet<User> Users {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ChoiceConfiguration());
            modelBuilder.ApplyConfiguration(new SurveyConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new VoteConfiguration());     
        }

    }
}