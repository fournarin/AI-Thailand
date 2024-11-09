function searchLocation() {
    const searchInput = document.getElementById('searchInput').value;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 }, // ตำแหน่งเริ่มต้น (ปรับได้)
        zoom: 13,
    });
    directionsRenderer.setMap(map);

    // Geocode ที่อยู่เพื่อหาพิกัด
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
        if (status === 'OK') {
            const destination = results[0].geometry.location;
            const request = {
                origin: { query: 'my location' }, // ใช้ตำแหน่งปัจจุบัน
                destination,
                travelMode: 'DRIVING' // เปลี่ยนได้ เช่น WALKING, BICYCLING
            };
            directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                } else {
                    alert('ไม่พบเส้นทาง');
                }
            });
        } else {
            alert('ไม่พบสถานที่');
        }
    });
}