using Apis_Sarita.Data;
using Apis_Sarita.Modelo;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Apis_Sarita.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadosController : ControllerBase
    {
        private readonly EmpresaContext _context;

        public EmpleadosController(EmpresaContext context)
        {
            _context = context;
        }

        // GET: api/Empleados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetEmpleados()
        {
            return await _context.Empleados.AsNoTracking().ToListAsync();
        }

        // GET: api/Empleados/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Empleado>> GetEmpleado(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null) return NotFound();
            return empleado;
        }

        // POST: api/Empleados
        [HttpPost]
        public async Task<ActionResult<Empleado>> CrearEmpleado([FromBody] Empleado empleado)
        {
            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();

            // Devuelve 201 con la ruta del recurso creado
            return CreatedAtAction(nameof(GetEmpleado), new { id = empleado.Id }, empleado);
        }

        // PUT: api/Empleados/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> ActualizarEmpleado(int id, [FromBody] Empleado empleado)
        {
            if (id != empleado.Id) return BadRequest("El ID de la ruta no coincide con el del cuerpo.");

            var existe = await _context.Empleados.AnyAsync(e => e.Id == id);
            if (!existe) return NotFound();

            _context.Entry(empleado).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/Empleados/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> EliminarEmpleado(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null) return NotFound();

            _context.Empleados.Remove(empleado);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
