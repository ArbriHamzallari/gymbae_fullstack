using GymBae.Model;
using GymBae.Model.DTOs;
using GymBae.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GymBae.Controllers
{
    [ApiController]
    [Route("api/plan")]
    [Authorize]
    public class PlanController : ControllerBase
    {
        private readonly IPlanService _planService;

        public PlanController(IPlanService planService)
        {
            _planService = planService;
        }

        /// <summary>GET: api/plan/me</summary>
        [HttpGet("me")]
        public async Task<IActionResult> GetMyPlan()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var plan = await _planService.GetByUserIdAsync(userId.Value);
            if (plan == null) return NotFound("Plan not found");

            return Ok(plan);
        }

        /// <summary>POST: api/plan</summary>
        [HttpPost]
        public async Task<IActionResult> CreatePlan([FromBody] CreatePlanRequest request)
        {
            if (request == null) return BadRequest();

            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var plan = new Plan
            {
                UserId = userId.Value,
                Name = request.Name,
                WorkoutSchedule = request.WorkoutSchedule,
                CalorieGoal = request.CalorieGoal
            };

            var created = await _planService.CreateAsync(plan);
            if (created == null) return BadRequest("Plan already exists for this user");

            return Ok(created);
        }

        /// <summary>PUT: api/plan/me</summary>
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMyPlan([FromBody] UpdatePlanRequest request)
        {
            if (request == null) return BadRequest();

            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var plan = new Plan
            {
                Name = request.Name,
                WorkoutSchedule = request.WorkoutSchedule,
                CalorieGoal = request.CalorieGoal
            };

            var updated = await _planService.UpdateAsync(userId.Value, plan);
            if (updated == null) return NotFound("Plan not found");

            return Ok(updated);
        }

        /// <summary>DELETE: api/plan/me</summary>
        [HttpDelete("me")]
        public async Task<IActionResult> DeleteMyPlan()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized();

            var deleted = await _planService.DeleteAsync(userId.Value);
            if (!deleted) return NotFound("Plan not found");

            return Ok(new { message = "Plan deleted successfully" });
        }

        private int? GetUserIdFromToken()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(claim)) return null;
            return int.TryParse(claim, out var id) ? id : null;
        }
    }
}
