using GymBae.Model;

namespace GymBae.Services
{
    public interface IUserProfileServices
    {
        Task<UserProfile> GetProfileByUserIdAsync(int userId);
        Task<UserProfile> CreateProfileAsync(UserProfile profile);
        Task<List<UserProfile>> GetAllUserProfilesAsync();
        Task<UserProfile> UpdateProfileAsync(int userId, UserProfile profile);
        Task<bool> DeleteProfileAsync(int userId);
    }
}
