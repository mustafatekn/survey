using System.Collections.Generic;
using System.Threading.Tasks;
using survey.business.Abstract;
using survey.data.Abstract;
using survey.entity;

namespace survey.business.Concrete
{
    public class ChoiceManager : IChoiceService
    {
        private IUnitOfWork _unitOfWork;

        public ChoiceManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Choice> Create(Choice choice)
        {
            var createdChoice = new Choice();
            createdChoice = await _unitOfWork.Choices.Create(choice);
            await _unitOfWork.SaveAsync();
            return createdChoice;
        }

        public async Task<List<Choice>> GetAll()
        {
            return await _unitOfWork.Choices.GetAll();
        }

        public async Task<Choice> GetById(int id)
        {
            var choice = await _unitOfWork.Choices.GetById(id);
            return choice;
        }
    }
}