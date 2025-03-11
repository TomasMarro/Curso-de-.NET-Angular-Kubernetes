using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace NetKubernetes.Infraestructure.Middleware
{
    public class ManagerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ManagerMiddleware> _logger;

        public ManagerMiddleware(RequestDelegate next, ILogger<ManagerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }


        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);

                _logger.LogInformation("ManagerMiddleware executing..");
            }
            catch (Exception ex)
            {
                await ManagerExceptionAsync(context, ex, _logger);
                throw;
            }
        }

        private async Task ManagerExceptionAsync(HttpContext context, Exception ex, ILogger<ManagerMiddleware> logger)
        {
            object? errors = null;

            switch (ex)
            {
                case MiddlewareException me:
                    logger.LogError(ex, "MiddlewareException");
                    errors = me.Errores;
                    context.Response.StatusCode = (int)me.StatusCode;
                    break;
                case Exception e:
                    logger.LogError(ex, "Error de Servidor");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error de Servidor" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;

            }

            context.Response.ContentType = "application/json";

            string resultados = string.Empty;
            if (errors != null)
            {
                resultados = JsonSerializer.Serialize(new { errors });
            }

            await context.Response.WriteAsync(resultados);

        }
    }
}