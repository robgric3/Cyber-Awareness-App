using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Cyber_Awareness_App.Models.EntityModels
{
    public class Question
    {
        [Key]
        [Column("question_id")]
        public int QuestionId { get; set; }

        [Column("course_id")]
        public int CourseId { get; set; }

        [Column("question_text")]
        public string QuestionText { get; set; }

        public virtual ICollection<Option> Options { get; set; }
    }


}
