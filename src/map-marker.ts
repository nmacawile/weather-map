import { Map, TileLayer, LatLng, marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { mapLayerConfig } from './map-layer-config';

export class MapMarker {
  private map: Map;
  private initialLat = -34.5838;
  private initialLong = -70.9892;

  constructor() {
    this.map = new Map('mapid');
    const mapLayer = new TileLayer(mapLayerConfig.url, mapLayerConfig.options);
    this.map.addLayer(mapLayer);
    this.mark(this.initialLat, this.initialLong);
  }

  mark(lat: number, long: number, popupMsg = '') {
    this.map.setView(new LatLng(lat, long), 4);
    const pos = marker([lat, long]).addTo(this.map);
    if (popupMsg !== '') pos.bindPopup(popupMsg).openPopup();
  }
}
