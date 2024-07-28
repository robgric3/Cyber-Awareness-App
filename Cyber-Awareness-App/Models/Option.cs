using Cyber_Awareness_App.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


public class Option
{
    [Key]
    [Column("option_id")]
    public int OptionId { get; set; }

    [Column("question_id")]
    public int QuestionId { get; set; }

    [Column("option_text")]
    public string OptionText { get; set; }

    [Column("is_correct")]
    public bool IsCorrect { get; set; }

    [JsonIgnore]
    public virtual Question Question { get; set; }
}
