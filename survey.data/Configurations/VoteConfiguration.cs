using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using survey.entity;

namespace survey.data.Configurations
{
    public class VoteConfiguration : IEntityTypeConfiguration<Vote>
    {
        public void Configure(EntityTypeBuilder<Vote> builder)
        {
            builder.HasKey(v => v.Id);
            builder.Property(v => v.SurveyId).IsRequired();
            builder.Property(v => v.ChoiceId).IsRequired();
        }
    }
}