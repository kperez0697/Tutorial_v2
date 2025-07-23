function DescargarArchivo(bytesBase64, mimeType, fileName) {
    var fileUrl = "data:" + mimeType + ";base64," + bytesBase64;
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
            var link = window.document.createElement("a");
            link.href = window.URL.createObjectURL(blob, { type: mimeType });
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}

window._leafletMap = null;
window._leafletMarker = null;

window.inicializarMapa = (id, lat, lon) => {
    const map = L.map(id).setView([lat, lon], 10);
    window._leafletMap = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Crear marcador inicial
    window._leafletMarker = L.marker([lat, lon]).addTo(map);
    window._leafletMarker.bindPopup("Ubicación inicial").openPopup();
};

window.actualizarMarcador = (lat, lon, popupTexto) => {
    if (window._leafletMap && window._leafletMarker) {
        window._leafletMarker.setLatLng([lat, lon]);
        window._leafletMap.setView([lat, lon], 20);
        if (popupTexto) {
            window._leafletMarker.bindPopup(popupTexto).openPopup();
        }
    }
};

window.agregarMarcadorDesdeInput = (lat, lon, popupTexto) => {
    if (!window._leafletMap) return;

    const nuevoMarcador = L.marker([lat, lon]).addTo(window._leafletMap);
    if (popupTexto) {
        nuevoMarcador.bindPopup(popupTexto).openPopup();
    }
};

window.trazarRutaConOSRM = (lat1, lon1, lat2, lon2) => {
    if (!window._leafletMap) return;

    // Remover ruta anterior
    if (window._leafletRoutingControl) {
        window._leafletMap.removeControl(window._leafletRoutingControl);
    }

    window._leafletRoutingControl = L.Routing.control({
        waypoints: [
            L.latLng(lat1, lon1),
            L.latLng(lat2, lon2)
        ],
        router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        lineOptions: {
            styles: [{ color: 'blue', weight: 5 }]
        },
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        show: false
    }).addTo(window._leafletMap);
};