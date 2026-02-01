using GymBae.Model;

namespace GymBae.Services
{
    public interface IPlanService
    {
        Task<Plan?> GetByUserIdAsync(int userId);
        Task<Plan?> CreateAsync(Plan plan);
        Task<Plan?> UpdateAsync(int userId, Plan plan);
        Task<bool> DeleteAsync(int userId);
    }
}
