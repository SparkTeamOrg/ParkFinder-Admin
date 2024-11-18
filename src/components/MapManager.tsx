import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, useMapEvents } from 'react-leaflet';
import L, { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

interface MapManagerProps {
  parkingLots: any[];
}

const MapManager: React.FC<MapManagerProps> = ({ parkingLots }) => {
  const [polygons, setPolygons] = useState<LatLngExpression[][]>([]);
  const [currentPolygon, setCurrentPolygon] = useState<LatLngExpression[]>([]);

  const bounds: LatLngBoundsExpression = [
    [44.604, 20.282], // Southwest coordinates of Serbia
    [45.267, 20.799]  // Northeast coordinates of Serbia
  ];

  useEffect(() => {
    if (parkingLots && Array.isArray(parkingLots)) {
      const loadedPolygons = parkingLots.map(lot => {
        const geoJson = JSON.parse(lot.polygonGeoJson);
        return geoJson.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
      });
      setPolygons(loadedPolygons);
    }
  }, [parkingLots]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (L.latLngBounds(bounds).contains(e.latlng)) {
          setCurrentPolygon((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
        }
      },
      contextmenu() {
        if (currentPolygon.length > 2) {
          setPolygons((prev) => [...prev, currentPolygon]);
          setCurrentPolygon([]);
        }
      }
    });
    return null;
  };

  return (
    <MapContainer 
      center={[44.017055, 20.907343]} 
      zoom={13} 
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {polygons.map((polygon, idx) => (
        <Polygon key={idx} positions={polygon} />
      ))}
      {currentPolygon.length > 1 && (
        <Polyline positions={currentPolygon} />
      )}
      <MapEvents />
    </MapContainer>
  );
}

export default MapManager;