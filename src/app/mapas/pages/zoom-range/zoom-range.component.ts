import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container{
      width: 100vw;
      height: 100vh;
    }

    .row{
      background-color: white;
      border-radius: 10px;
      position: fixed;
      bottom: 50px;
      left: 20px;
      padding: 10px;
      z-index: 100;
      width: 400px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  zoomLevel: number = 16;
  center: [number, number] = [0.6496335746467895, 41.13691405620086];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      const zoom = this.mapa.getZoom();
      this.zoomLevel = zoom;
    });

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom()>18){
        this.mapa.setZoom(18);
      }
    });

    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const {lng, lat} = target.getCenter();

      this.center = [lng, lat];
    });
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }


  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomCambio( zoom: string ){
    this.mapa.zoomTo(Number(zoom));
  }

}
