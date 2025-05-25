using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class TipoCambioResponse
    {
        public bool Success { get; set; }
        public List<TipoCambio> Data { get; set; }
    }
}
