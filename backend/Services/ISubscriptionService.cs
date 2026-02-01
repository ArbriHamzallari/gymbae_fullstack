using GymBae.Model;
using GymBae.Model.DTOs;

namespace GymBae.Services
{
    public interface ISubscriptionService
    {
        Task<Subscription?> GetByUserIdAsync(int userId);
        Task<Subscription?> CreateAsync(int userId, CreateSubscriptionRequest request);
        Task<Subscription?> UpdateAsync(int userId, UpdateSubscriptionRequest request);
        Task<bool> DeleteAsync(int userId);
    }
}
