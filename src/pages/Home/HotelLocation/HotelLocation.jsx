import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HotelLocation = () => {
  const position = [23.6429, 90.4883];

  return (
    <div className="container mx-auto my-[100px]">
      <h2 className="text-[#FFAC41] text-center font-von text-[50px]">
        Find Us
      </h2>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "700px", marginTop: '50px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </div>
  );
};

export default HotelLocation;
