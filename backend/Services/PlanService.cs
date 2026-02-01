using GymBae.Data;
using GymBae.Model;
using Microsoft.EntityFrameworkCore;

namespace GymBae.Services
{
    public class PlanService : IPlanService
    {
        private readonly AppDbContext _context;

        public PlanService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Plan?> GetByUserIdAsync(int userId)
        {
            return await _context.Plans
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<Plan?> CreateAsync(Plan plan)
        {
            if (plan == null) return null;

            var exists = await _context.Plans.AnyAsync(p => p.UserId == plan.UserId);
            if (exists) return null;

            _context.Plans.Add(plan);
            await _context.SaveChangesAsync();
            return plan;
        }

        public async Task<Plan?> UpdateAsync(int userId, Plan plan)
        {
            if (plan == null) return null;

            var existing = await _context.Plans.FirstOrDefaultAsync(p => p.UserId == userId);
            if (existing == null) return null;

            existing.Name = plan.Name;
            existing.WorkoutSchedule = plan.WorkoutSchedule;
            existing.CalorieGoal = plan.CalorieGoal;
            existing.UpdatedAt = DateTime.UtcNow;

            _context.Plans.Update(existing);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            var plan = await _context.Plans.FirstOrDefaultAsync(p => p.UserId == userId);
            if (plan == null) return false;

            _context.Plans.Remove(plan);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
