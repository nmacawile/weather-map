import { Map, TileLayer, LatLng, marker, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { mapLayerConfig } from './map-layer-config';
import { createPopupFrom } from './create-popup-from';
import { SearchService } from './search-service';

export class MapMarker {
  private static map: Map;
  private static marker: Marker;
  private static initialLat = 51.5073;
  private static initialLong = -0.1277;

  static initialize() {
    this.map = new Map('mapid', {
      center: [this.initialLat, this.initialLong],
      zoom: 8,
    });
    const mapLayer = new TileLayer(mapLayerConfig.url, mapLayerConfig.options);

    this.map.addLayer(mapLayer);
    this.marker = marker([this.initialLat, this.initialLong]).addTo(this.map);

    MapMarker.locateUser();
  }

  static locateUser() {
    this.map.locate({ setView: true });
    this.map.on('locationfound', async e => {
      MapMarker.moveTo(e.latitude, e.longitude);
      const data = await SearchService.latLong(e.latitude, e.longitude);
      this.marker.bindPopup(createPopupFrom(data)).openPopup();
    });
  }

  static async moveTo(lat: number, long: number) {
    this.map.setView(new LatLng(lat, long), this.map.zoom);
    this.marker.setLatLng(new LatLng(lat, long));
    this.marker.bindPopup(`<i class="fas fa-spinner fa-spin"></i> Loading...`).openPopup();
  }

  static async moveToLocation(data: any) {
    MapMarker.moveTo(data.coord.lat, data.coord.lon);
    this.marker.bindPopup(createPopupFrom(data)).openPopup();
  }
}
