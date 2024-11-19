import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { LatLngExpression } from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';

interface MapManagerProps {
  parkingLots: any[];
}

const MapManager: React.FC<MapManagerProps> = ({ parkingLots }) => {
  const [polygons, setPolygons] = useState<LatLngExpression[][]>([]);

  useEffect(() => {
    if (parkingLots && Array.isArray(parkingLots)) {
      const loadedPolygons = parkingLots.map(lot => {
        const geoJson = JSON.parse(lot.polygonGeoJson);
        return geoJson.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
      });
      setPolygons(loadedPolygons);
    }
  }, [parkingLots]);

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const newPolygon = layer.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
    setPolygons((prev) => [...prev, newPolygon]);
  };

  return (
    <div>
      <MapContainer 
        center={[44.010120, 20.917016]} 
        zoom={13} 
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: {
                allowIntersection: false,
                showArea: true,
              },
            }}
          />
          {polygons.map((polygon, idx) => (
            <Polygon key={idx} positions={polygon} />
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default MapManager;