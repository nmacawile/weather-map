import { Map, TileLayer, LatLng, marker, Marker, LatLngBounds, Browser } from 'leaflet';
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
    const bounds = new LatLngBounds(new LatLng(-180, -180), new LatLng(180, 180));
    this.map = new Map('mapid', {
      center: [this.initialLat, this.initialLong],
      zoom: 8,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });
    const mapLayer = new TileLayer(mapLayerConfig.url, mapLayerConfig.options);

    if (Browser.mobile) {
       this.map.removeControl(this.map.zoomControl);
    }

    this.map.addLayer(mapLayer);
    this.marker = marker([this.initialLat, this.initialLong], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', e => {
      MapMarker.getWeatherData(e.target._latlng.lat, e.target._latlng.lng);
    });

    MapMarker.locateUser();
  }

  static locateUser() {
    this.map.locate({ setView: true, maxZoom: 10 });
    this.map.on('locationfound', e => {      
      MapMarker.moveTo(e.latitude, e.longitude);
      MapMarker.getWeatherData(e.latitude, e.longitude);
    });
    this.map.on('locationerror', () => {
      MapMarker.getWeatherData(this.initialLat, this.initialLong);
    });
  }

  static async getWeatherData(lat, long) {    
    this.marker.bindPopup(`<i class="fas fa-spinner fa-spin"></i> Loading...`).openPopup();
    const data = await SearchService.latLong(lat, long);
    this.marker.bindPopup(createPopupFrom(data)).openPopup();
  }

  static async moveTo(lat: number, long: number) {
    this.map.setView(new LatLng(lat, long), this.map.zoom);
    this.marker.setLatLng(new LatLng(lat, long));
  }

  static async moveToLocation(data: any) {
    MapMarker.moveTo(data.coord.lat, data.coord.lon);
    this.marker.bindPopup(createPopupFrom(data)).openPopup();
  }
}
