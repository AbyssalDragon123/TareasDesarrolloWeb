using Apis_Sarita.Modelo;
using Microsoft.EntityFrameworkCore;

namespace Apis_Sarita.Data
{
    public class EmpresaContext : DbContext
    {
        public EmpresaContext(DbContextOptions<EmpresaContext> options) : base(options) { }

        public DbSet<Empleado> Empleados { get; set; }
    }
}