import { Map, TileLayer, LatLng, marker, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { mapLayerConfig } from './map-layer-config';

export class MapMarker {
  private static map: Map;
  private static marker: Marker;
  private static initialLat = -34.5838;
  private static initialLong = -70.9892;

  static initialize() {
    this.map = new Map('mapid', {
      center: [this.initialLat, this.initialLong],
      zoom: 8,
    });
    const mapLayer = new TileLayer(mapLayerConfig.url, mapLayerConfig.options);
    this.map.addLayer(mapLayer);
    this.marker = marker([this.initialLat, this.initialLong]).addTo(this.map);
  }

  static moveTo(lat: number, long: number, popupMsg = '') {
    this.map.setView(new LatLng(lat, long), this.map.zoom);
    this.marker.setLatLng(new LatLng(lat, long));
    if (popupMsg !== '') this.marker.bindPopup(popupMsg).openPopup();
  }
}
