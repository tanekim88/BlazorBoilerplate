using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SetupLibrary.Infrastructure.Services.CodeGeneratorServices.CodeGeneratorService.Models
{
    public class CodeGenArg<TData>
    {
        public TData Data { get; set; }

        public CodeGenLocalContext LocalContext { get; set; }
    }
}
