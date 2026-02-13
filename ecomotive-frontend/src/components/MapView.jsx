import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the Marker Icons
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// City coordinates dictionary
const cityCoordinates = {
  "BHO": [23.25, 77.41],  // Bhopal
  "MUM": [19.07, 72.87],  // Mumbai
  "DEL": [28.61, 77.20],  // Delhi
  "LON": [51.50, -0.12],  // London
  "HAM": [53.54, 9.99]    // Hamburg
};

// Component to handle map bounds updates
function MapBoundsUpdater({ routeData }) {
  const map = useMap();

  useEffect(() => {
    if (routeData?.path && routeData.path.length > 0) {
      const bounds = [];
      routeData.path.forEach(edge => {
        const start = cityCoordinates[edge.sourceNodeId];
        const end = cityCoordinates[edge.targetNodeId];
        if (start) bounds.push(start);
        if (end) bounds.push(end);
      });

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 });
      }
    }
  }, [routeData, map]);

  return null;
}

const MapView = ({ routeData }) => {
  const center = [23.25, 77.41]; // Center on Bhopal

  // Calculate polyline positions safely
  const polylinePositions = routeData?.path ? routeData.path.map(edge => {
      const start = cityCoordinates[edge.sourceNodeId];
      const end = cityCoordinates[edge.targetNodeId];
      
      if (start && end) return [start, end];
      return null;
  }).filter(pos => pos !== null).flat() : [];

  // Get route color based on priority
  const getRouteColor = () => {
    // Default blue, can be enhanced based on route type
    return '#667eea';
  };

  return (
    <MapContainer 
      center={center} 
      zoom={5} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        attribution='&copy; CARTO'
      />

      <MapBoundsUpdater routeData={routeData} />

      {/* Draw route polyline */}
      {polylinePositions.length > 0 && (
        <Polyline 
          positions={polylinePositions} 
          color={getRouteColor()} 
          weight={5}
          opacity={0.8}
          dashArray="10, 5"
        />
      )}

      {/* Draw Markers */}
      {Object.entries(cityCoordinates).map(([code, coords]) => (
        <Marker key={code} position={coords}>
          <Popup>
            <strong>{code}</strong>
            <br />
            {coords[0].toFixed(2)}, {coords[1].toFixed(2)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;