

using System;
using System.Collections.Generic;
using System.Linq;
using BlazorApp.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;



namespace BlazorApp.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route(template: "[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries =
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(start: 1, count: 5).Select(selector: index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(value: index),
                    TemperatureC = rng.Next(minValue: -20, maxValue: 55),
                    Summary = Summaries[rng.Next(maxValue: Summaries.Length)]
                })
                .ToArray();
        }
    }
}