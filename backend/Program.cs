
using GymBae.Data;
using GymBae.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GymBae
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("DefaultConnection")
                    )
                );
            });

            builder.Services.AddScoped<IUserServices, UserServices>();
            builder.Services.AddScoped<IUserProfileServices, UserProfileServices>();
            builder.Services.AddScoped<IPlanService, PlanService>();
            builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(
                                builder.Configuration["Jwt:Key"]
                            )
                        )
                    };
                });

            builder.Services.AddAuthorization();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() 
                            ?? new[] { "http://localhost:5173", "http://localhost:5174" };
                        
                        policy
                            .WithOrigins(allowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "Enter: Bearer {your JWT token}"
                });

                options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
            {
            {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
                 },
                  Array.Empty<string>()
              }
             });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowReactApp");

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}