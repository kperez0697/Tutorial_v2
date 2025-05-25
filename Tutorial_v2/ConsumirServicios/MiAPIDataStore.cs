using Entidades;
using Newtonsoft.Json;
using System.Text;

namespace Tutorial_v2.ConsumirServicios
{
    public class MiAPIDataStore
    {
        private readonly HttpClient _http;
        //private readonly IConfiguration configuration;
        public MiAPIDataStore(string token)
        {
            _http = new HttpClient();
            //_http.BaseAddress = new Uri("https://miapi.cloud/");
            _http.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }
        public async Task<TipoCambioResponse> Consultar_TipoCambio()
        {
            try
            {
                string json = "";
                EnvioEntidad Item = new EnvioEntidad();
                Item.anio = 2025;
                Item.mes = 5;
                var serializedItem = JsonConvert.SerializeObject(Item);
                var response = await _http.PostAsync($"https://miapi.cloud/v1/tipodecambio", new StringContent(serializedItem, Encoding.UTF8, "application/json"));
                if (response.IsSuccessStatusCode == true)
                {
                    json = response.Content.ReadAsStringAsync().Result.ToString();
                }
                return JsonConvert.DeserializeObject<TipoCambioResponse>(json);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }
        
        class EnvioEntidad
        {
            public int anio { get; set; }
            public int mes { get; set; }

        }
    }
}
