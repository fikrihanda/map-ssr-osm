declare module '@nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
    public: {
      apiBase: string
      mapKey: string
      token: string
    }
  }
}

declare module 'leaflet' {
  export class MarkersCanvas extends Layer {
    addTo(map:Map|LayerGroup):this;
    addMarker(marker:Marker):void;
    addMarkers(markers:Array<Marker>):void;
    getBounds():LatLngBounds;
    redraw():void;
    clear():void;
    removeMarker(marker:Marker):void;
  }
  function markersCanvas(): MarkersCanvas;
}

export {}