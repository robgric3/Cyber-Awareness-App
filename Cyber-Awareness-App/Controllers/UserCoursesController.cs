using Microsoft.AspNetCore.Mvc;
using Cyber_Awareness_App.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Cyber_Awareness_App.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserCoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
            
        public UserCoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<UserCourse>> PostUserCourse([FromBody] UserCourseData data)
        {
            // Check if a UserCourse record already exists
            var userCourse = await _context.UserCourses
                .FirstOrDefaultAsync(uc => uc.UserId == data.user_id && uc.CourseId == data.course_id);

            if (userCourse != null)
            {
                // If a record exists, update it
                userCourse.Status = data.status;
                userCourse.Score = data.score;
                userCourse.AttemptDate = data.attempt_date;
            }
            else
            {
                // If no record exists, create a new one
                userCourse = new UserCourse
                {
                    UserId = data.user_id,
                    CourseId = data.course_id,
                    Status = data.status,
                    Score = data.score,
                    AttemptDate = data.attempt_date
                };
                _context.UserCourses.Add(userCourse);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserCourse), new { id = userCourse.UserId }, userCourse);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<UserCourse>>> GetUserCourses(int userId)
        {
            return await _context.UserCourses
                .Where(uc => uc.UserId == userId)
                .Include(uc => uc.Course)
                .ToListAsync();
        }

        // This is an example of a GET method for a specific UserCourse
        // You might need to adjust this based on your actual implementation
        [HttpGet("{id}")]
        public async Task<ActionResult<UserCourse>> GetUserCourse(int id)
        {
            var userCourse = await _context.UserCourses.FindAsync(id);

            if (userCourse == null)
            {
                return NotFound();
            }

            return userCourse;
        }
    }
}
