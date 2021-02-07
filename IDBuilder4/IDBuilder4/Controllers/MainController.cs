using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace IDBuilder4.Controllers
{
    public class MainController : Controller
    {
        public MainController()
        {
        }

        public IActionResult Home()
        {
            return View();
        }
    }
}
