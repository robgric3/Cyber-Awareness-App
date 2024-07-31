using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Cyber_Awareness_App.Models.EntityModels
{
    public class Course
    {
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }

        [Column("course_name")]
        public string CourseName { get; set; }

        [Column("video_url")]
        public string VideoUrl { get; set; }

        [Column("summary")]
        public string Summary { get; set; }
    }

}
