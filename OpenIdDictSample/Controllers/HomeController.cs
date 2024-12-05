using Microsoft.AspNetCore.Mvc;

namespace OpenIdDictSample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok("Home controller");
        }
    }
}
