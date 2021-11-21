using System.Collections.Generic;
using System.Threading.Tasks;
using survey.data.Abstract;
using survey.entity;

namespace survey.data.Concrete
{
    public class EfCoreChoiceRepository: EfCoreGenericRepository<Choice>, IChoiceRepository
    {
        public EfCoreChoiceRepository(SurveyContext context) : base(context)
        {

        }

        private SurveyContext SurveyContext
        {
            get { return context as SurveyContext; }
        }
    }
}