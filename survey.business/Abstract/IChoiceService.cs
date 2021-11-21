using System.Collections.Generic;
using System.Threading.Tasks;
using survey.entity;

namespace survey.business.Abstract
{
    public interface IChoiceService
    {
         Task<Choice> Create(Choice choice);
         Task<List<Choice>> GetAll();
         Task<Choice> GetById(int id);
    }
}