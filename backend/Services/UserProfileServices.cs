using GymBae.Data;
using GymBae.Model;
using Microsoft.EntityFrameworkCore;

namespace GymBae.Services
{
    public class UserProfileServices : IUserProfileServices
    {
        private readonly AppDbContext _context;

        public UserProfileServices(AppDbContext context)
        {
            _context = context;
        }
        public async Task<UserProfile> CreateProfileAsync(UserProfile profile)
        {
            if (profile == null)
                return null;

            var exists = await _context.UserProfiles
                .AnyAsync(p => p.UserId == profile.UserId);

            if (exists)
                return null;

            _context.UserProfiles.Add(profile);
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<bool> DeleteProfileAsync(int userId)
        {
            var profile = await _context.UserProfiles
               .FirstOrDefaultAsync(p => p.UserId == userId);

            if (profile == null)
                return false;

            _context.UserProfiles.Remove(profile);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserProfile> GetProfileByUserIdAsync(int userId)
        {
            return await _context.UserProfiles
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<UserProfile> UpdateProfileAsync(int userId, UserProfile profile)
        {
            if (profile == null)
                return null;

            var existingProfile = await _context.UserProfiles
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (existingProfile == null)
                return null;

            existingProfile.FullName = profile.FullName;
            existingProfile.Goal = profile.Goal;
            existingProfile.ExperienceLevel = profile.ExperienceLevel;
            existingProfile.Gender = profile.Gender;
            existingProfile.Age = profile.Age;
            existingProfile.HeightCm = profile.HeightCm;
            existingProfile.WeightKg = profile.WeightKg;
            existingProfile.CompletedOnboarding = profile.CompletedOnboarding;
            existingProfile.UpdatedAt = DateTime.UtcNow;

            _context.UserProfiles.Update(existingProfile);
            await _context.SaveChangesAsync();
            return existingProfile;
        }

        public async Task<List<UserProfile>> GetAllUserProfilesAsync()
        {
            return await _context.UserProfiles.ToListAsync();
        }
    }
}
