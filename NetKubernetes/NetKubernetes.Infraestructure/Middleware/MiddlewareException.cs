
using System.Net;

namespace NetKubernetes.Infraestructure.Middleware
{
    public class MiddlewareException : Exception
    {
        public MiddlewareException(HttpStatusCode statusCode, object? errores)
        {
            StatusCode = statusCode;
            Errores = errores;
        }

        public HttpStatusCode StatusCode { get; set; }

        public object? Errores { get; set; }
        
        
    }
}