using Apis_Sarita.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Configurar CORS
var corsPolicy = "_myCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Permite Angular
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Agregar DbContext
builder.Services.AddDbContext<EmpresaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Agregar controladores
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API Empresa", Version = "v1" });
});

var app = builder.Build();

// Configurar middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Empresa v1");
    });
}

app.UseHttpsRedirection();

// 🔹 Usar CORS antes de autorización
app.UseCors(corsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
