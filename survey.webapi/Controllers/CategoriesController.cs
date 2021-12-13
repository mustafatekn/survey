using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using survey.business.Abstract;
using survey.entity;
using survey.webapi.DTO;

namespace survey.webapi.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[Controller]")]
    public class CategoriesController : ControllerBase
    {
        private ICategoryService _categoryService;
        private IAuthService _authService;
        public CategoriesController(ICategoryService categoryService, IAuthService authService)
        {
            _categoryService = categoryService;
            _authService = authService;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetAll();
            if (categories == null)
            {
                return NotFound();
            }
            else
            {
                return StatusCode(201, categories);
            }

        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
        {
            var currentUser = await _authService.GetById(createCategoryDto.CurrentUserId);
            if (currentUser.Role != EnumRole.Admin || currentUser.Role != EnumRole.Editor)
            {
                return Unauthorized();
            }
            else
            {
                if (string.IsNullOrEmpty(createCategoryDto.Name))
                {
                    return BadRequest();
                }
                else
                {
                    var category = new Category
                    {
                        Name = createCategoryDto.Name
                    };
                    var createdCategory = await _categoryService.Create(category);
                    return StatusCode(201, createdCategory);
                }
            }
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteCategory([FromBody] DeleteCategoryDto deleteCategoryDto)
        {
            var currentUser = await _authService.GetById(deleteCategoryDto.CurrentUserId);
            if (currentUser.Role != EnumRole.Admin || currentUser.Role != EnumRole.Editor)
            {
                return Unauthorized();
            }
            else
            {
                if (deleteCategoryDto.Id <= 0)
                {
                    return BadRequest();
                }
                else
                {
                    var category = await _categoryService.GetById(deleteCategoryDto.Id);
                    var deletedCategory = await _categoryService.Delete(category);
                    return StatusCode(200, deletedCategory);
                }
            }
        }
    }
}