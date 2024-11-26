import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { LatLngExpression } from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import { ParkingService } from '../services/ParkingLotService';
import { CreateParkingLotDto } from '../dto/CreatParkingLotDto';

interface MapManagerProps {
  parkingLots: any[];
}

const MapManager: React.FC<MapManagerProps> = ({ parkingLots }) => {
  const [polygons, setPolygons] = useState<{id:number, coordinates:LatLngExpression[]}[]>([]);

  useEffect(() => {
    if (parkingLots && Array.isArray(parkingLots)) {
        const loadedPolygons = parkingLots.map(lot => {
        const geoJson = JSON.parse(lot.polygonGeoJson);
        var coordinates = geoJson.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
        return { id: lot.id, coordinates }
      });
      setPolygons(loadedPolygons);
    }
  }, [parkingLots]);

  const handleCreated = async (e: any) => {
    const layer = e.layer;
    const newPolygon = layer.getLatLngs()[0].map((latlng: any) => [latlng.lat, latlng.lng]);
    const newBasePolygon = layer.getLatLngs()[0].map((latlng: any) => [latlng.lng, latlng.lat]);

    const dto: CreateParkingLotDto = { coordinates: newBasePolygon }
    var response = await ParkingService.addParking(dto)
    if(response.isSuccessful){
      const newPolygonWithId = {
        id: response.data.id,
        coordinates: newPolygon,
      };
      setPolygons((prev) => [...prev, newPolygonWithId]);
    }else{
      console.log("Error adding parking")
    }
  };

  const handleDeleted = async (e: any) => {
    const deletedLayers = e.layers.getLayers();
    const polygonIds: number[] = [];

    deletedLayers.forEach(async (layer: any) => {
      if (layer.options.id) 
        polygonIds.push(layer.options.id); 
    });

    try {
      const response = await ParkingService.deleteParkingLot(polygonIds);
      if (response.isSuccessful) {
        setPolygons((prevPolygons) =>
          prevPolygons.filter((polygon) => !polygonIds.includes(polygon.id))
        );
      } else {
        console.log("Error deleting polygon with ID: ", polygonIds);
      }
    } catch (error) {
      console.log("Error deleting polygon: ", error);
    }
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
            onDeleted={handleDeleted}
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
            <Polygon 
              key={idx} 
              positions={polygon.coordinates}
              eventHandlers={{
                add: (e) => {
                  e.target.options.id = polygon.id;
                },
              }}
              />
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default MapManager;