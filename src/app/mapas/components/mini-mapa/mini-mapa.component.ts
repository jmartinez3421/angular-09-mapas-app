import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`
    div{
      width: 100%;
      height: 150px;
      margin: 0;
    }
  `]
})
export class MiniMapaComponent implements AfterViewInit {

  @ViewChild('map') divMapa!: ElementRef;
  @Input() lngLat: [number, number] = [0,0];

  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 16,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)  
      .addTo(mapa);
  }

}
