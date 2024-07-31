namespace Cyber_Awareness_App.Models.DTOs
{
    public class UserCourseData
    {
        public int user_id { get; set; }
        public int course_id { get; set; }
        public string status { get; set; }
        public int score { get; set; }
        public DateTime attempt_date { get; set; }
    }

}
