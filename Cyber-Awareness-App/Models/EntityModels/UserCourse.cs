using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cyber_Awareness_App.Models.EntityModels
{
    public class UserCourse
    {
        [Key]
        [Column("user_course_id")]
        public int UserCourseId { get; set; }

        [Column("user_id")]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Column("course_id")]
        [ForeignKey("Course")]
        public int CourseId { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("score")]
        public int Score { get; set; }

        [Column("attempt_date")]
        public DateTime AttemptDate { get; set; }

        public User User { get; set; }
        public Course Course { get; set; }
    }
}
