using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using survey.entity;

namespace survey.data.Configurations
{
    public class SurveyConfiguration : IEntityTypeConfiguration<Survey>
    {
        public void Configure(EntityTypeBuilder<Survey> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.CreatedAt).IsRequired();
            builder.Property(s => s.Description).IsRequired();
            builder.Property(s => s.Question).IsRequired();
            builder.Property(s => s.Url).IsRequired();
        }
    }
}