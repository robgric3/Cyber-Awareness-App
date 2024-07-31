using Cyber_Awareness_App.Models.EntityModels;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<UserCourse> UserCourses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Course>().ToTable("courses");
        modelBuilder.Entity<Question>().ToTable("questions");
        modelBuilder.Entity<Option>().ToTable("options");
        modelBuilder.Entity<UserCourse>().ToTable("usercourses");

    }
}
