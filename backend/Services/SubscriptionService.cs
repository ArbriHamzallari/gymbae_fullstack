using GymBae.Data;
using GymBae.Model;
using GymBae.Model.DTOs;
using GymBae.Model.Enums;
using Microsoft.EntityFrameworkCore;

namespace GymBae.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly AppDbContext _context;

        public SubscriptionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Subscription?> GetByUserIdAsync(int userId)
        {
            return await _context.Subscriptions
                .FirstOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<Subscription?> CreateAsync(int userId, CreateSubscriptionRequest request)
        {
            var exists = await _context.Subscriptions.AnyAsync(s => s.UserId == userId);
            if (exists) return null;

            var sub = new Subscription
            {
                UserId = userId,
                Tier = request.Tier,
                Status = SubscriptionStatus.Active,
                StartDate = DateTime.UtcNow
            };

            _context.Subscriptions.Add(sub);
            await _context.SaveChangesAsync();
            return sub;
        }

        public async Task<Subscription?> UpdateAsync(int userId, UpdateSubscriptionRequest request)
        {
            var existing = await _context.Subscriptions.FirstOrDefaultAsync(s => s.UserId == userId);
            if (existing == null) return null;

            existing.Tier = request.Tier;
            existing.Status = request.Status;
            existing.UpdatedAt = DateTime.UtcNow;

            _context.Subscriptions.Update(existing);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            var sub = await _context.Subscriptions.FirstOrDefaultAsync(s => s.UserId == userId);
            if (sub == null) return false;

            _context.Subscriptions.Remove(sub);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
