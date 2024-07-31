using Cyber_Awareness_App.Models.EntityModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cyber_Awareness_App.Controllers
{
    [ApiController] 
    [Route("[controller]")]
    public class QuizzesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public QuizzesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{courseId}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuizQuestions(int courseId)
        {
            var questions = await _context.Questions
                .Where(q => q.CourseId == courseId)
                .Include(q => q.Options)
                .ToListAsync();
            return questions;
        }
    }
}
