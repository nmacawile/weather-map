import { Map, TileLayer, LatLng, marker, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { mapLayerConfig } from './map-layer-config';

export class MapMarker {
  private map: Map;
  private marker: Marker;
  private initialLat = -34.5838;
  private initialLong = -70.9892;

  constructor() {
    this.map = new Map('mapid', {
      center: [this.initialLat, this.initialLong],
      zoom: 4,
    });
    const mapLayer = new TileLayer(mapLayerConfig.url, mapLayerConfig.options);
    this.map.addLayer(mapLayer);
    this.marker = marker([this.initialLat, this.initialLong]).addTo(this.map);
  }

  moveTo(lat: number, long: number, popupMsg = '') {
    this.map.setView(new LatLng(lat, long), 4);
    this.marker.setLatLng(new LatLng(lat, long));
    if (popupMsg !== '') this.marker.bindPopup(popupMsg).openPopup();
  }
}
