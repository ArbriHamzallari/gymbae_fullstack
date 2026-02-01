using GymBae.Data;
using GymBae.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymBae.Services
{
    public class UserServices : IUserServices
    {
        private readonly AppDbContext _context;

        public UserServices(AppDbContext context)
        {
           _context = context;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> CreateUserAsync(User user)
        {
            if (user == null)
                return null;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;    
        }
        public async Task<User> UpdateUserAsync(int id, User user)
        {
            if (user == null)
                return null;

            var ExistingUser = await _context.Users.FindAsync(id);

            if (ExistingUser == null)
                return null;

            ExistingUser.Name = user.Name;
            ExistingUser.Email = user.Email;

            _context.Users.Update(ExistingUser);
            await _context.SaveChangesAsync();
            return ExistingUser;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var User = await _context.Users.FindAsync(id);
            if(User == null)
                return false;

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
