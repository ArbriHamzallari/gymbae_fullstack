using GymBae.Model;
using GymBae.Model.DTOs;
using GymBae.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GymBae.Controllers
{
    [ApiController]
    [Route("api/profile")]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileServices _profileServices;

        public UserProfileController(IUserProfileServices profileServices)
        {
            _profileServices = profileServices;
        }

        // CREATE PROFILE (Onboarding)
        // POST: api/profile/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateProfile(CreateUserProfileRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            var profile = new UserProfile
            {
                UserId = userId.Value,
                FullName = request.FullName,
                Goal = request.Goal,
                ExperienceLevel = request.ExperienceLevel,
                Age = request.Age,
                Gender = request.Gender,
                HeightCm = request.HeightCm,
                WeightKg = request.WeightKg,
                CompletedOnboarding = true
            };

            var created = await _profileServices.CreateProfileAsync(profile);
            if (created == null)
                return BadRequest("Profile already exists");

            return Ok(created);
        }

        // GET MY PROFILE
        // GET: api/profile/me
        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            var profile = await _profileServices.GetProfileByUserIdAsync(userId.Value);
            if (profile == null)
                return NotFound("Profile not found");

            return Ok(profile);
        }

        // UPDATE MY PROFILE
        // PUT: api/profile/update
        [HttpPut("update")]
        public async Task<IActionResult> UpdateMyProfile(UpdateUserProfileRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            var updatedProfile = new UserProfile
            {
                FullName = request.FullName,
                Goal = request.Goal,
                ExperienceLevel = request.ExperienceLevel,
                Age = request.Age,
                Gender = request.Gender,
                HeightCm = request.HeightCm,
                WeightKg = request.WeightKg,
                CompletedOnboarding = request.CompletedOnboarding
            };

            var updated = await _profileServices.UpdateProfileAsync(userId.Value, updatedProfile);
            if (updated == null)
                return NotFound("Profile not found");

            return Ok(updated);
        }

        // DELETE MY PROFILE
        // DELETE: api/profile/delete
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteMyProfile()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized();

            var deleted = await _profileServices.DeleteProfileAsync(userId.Value);
            if (!deleted)
                return NotFound("Profile not found");

            return Ok(new { message = "Profile deleted successfully" });
        }

        // 🔐 Helper
        private int? GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return null;

            return int.TryParse(userIdClaim, out var userId) ? userId : null;
        }
    }
}
