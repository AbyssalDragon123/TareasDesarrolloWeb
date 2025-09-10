using Apis_Sarita.Modelo;
using Microsoft.AspNetCore.Mvc;

namespace Apis_Sarita.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : Controller
    {
        //api Tipo Get: api/productos/listar
        [HttpGet]
        [Route("listarProducto")]
        public IActionResult ObtenerProductos()
        {
            var productos = new List<string> { "Pan", "Leche", "Huevos", "arroz" };
           
            return Ok(productos);
        }


        //api tipo get muestra detalle de los productos

        [HttpGet]
        [Route("listarDetalle")]
        public IActionResult ObtenerProductosDetalle()
        {
            var productos = new List<Producto>
        {
            new Producto { Nombre = "Pan", Precio = 2.50M, Color = "Blanco", Stock = 120 },
            new Producto { Nombre = "Leche", Precio = 4.00M, Color = "Blanco", Stock = 85 },
            new Producto { Nombre = "Galletas", Precio = 3.75M, Color = "Marrón", Stock = 60 }
        };

            return Ok(productos);
        }



        [HttpPost]
        [Route("crear")]
        public IActionResult CrearProducto([FromBody] Producto nuevoProducto)
        {
            // Aquí solo devolvemos el producto para simular que se guardó
            return Ok(new
            {
                mensaje = "Producto creado correctamente",
                datos = nuevoProducto
            });
        }



    }
}
