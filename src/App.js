import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import useGeoLocation from "./Hooks/useGeolocation";
import L from "leaflet";

import suppliers from "./shop.json";

export default function App() {
  const location = useGeoLocation();
  const center = [14.60159990565482, 120.96359223269259];

  const MarkerIcon = new L.Icon({
    iconUrl: require("./resources/images/marker.png"),
    iconSize: [45, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  const ShopIcon = new L.Icon({
    iconUrl: require("./resources/images/shop-image.png"),
    iconSize: [45, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  return (
    <div className="main-container">
      <div className="sidebar">
        <h1 className="sidebar-hello">Hello</h1>
      </div>
      <MapContainer center={center} zoom={13} className="main-map">
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=15ykwyoJWegspCVKPZIM"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {location.loaded && !location.error && (
          <Marker
            icon={MarkerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        )}

        {suppliers.map((shop, id) => {
          return (
            <Marker position={[shop.lat, shop.lng]} icon={ShopIcon} key={id}>
              <Popup>
                <b>{shop.shopName}</b>
                <b>{shop.shopAddress}</b>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
