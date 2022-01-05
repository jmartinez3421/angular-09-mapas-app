import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: mapboxgl.Marker;
}

interface MarkerSmall{
  color: string;
  center: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .map-container{
      width: 100vw;
      height: 100vh;
    }

    .list-group{
      position: fixed;
      top:20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor: pointer;
    }

    li:hover{
      font-weight: bolder !important;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('map') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;

  center: [number, number] = [0.6496335746467895, 41.13691405620086];

  marcadores: MarkerColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 16
    });

    this.leerMarcadores();

  //   new mapboxgl.Marker()
  //     .setLngLat(this.center)
  //     .addTo(this.mapa);
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
        .setLngLat(this.center)
        .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: newMarker
    });

    this.guardarMarcadores();
  }

  irMarcador( marker: mapboxgl.Marker ){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMarcadores(){
    let marcadoresJson: MarkerSmall[] = [];
    this.marcadores.forEach( marker => {
      const lngLat: mapboxgl.LngLat = marker.marker.getLngLat();
      marcadoresJson.push({
        color: marker.color,
        center: [lngLat.lng, lngLat.lat]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(marcadoresJson));
  }

  leerMarcadores(){
    const marcadoresLocalStorage: string|null = localStorage.getItem('marcadores');

    if(marcadoresLocalStorage !== null){
      const marcadores: MarkerSmall[] = JSON.parse(marcadoresLocalStorage);

      marcadores.forEach( (marker: MarkerSmall) => {

        const newMarker = new mapboxgl.Marker({
          draggable: true,
          color: marker.color
        })
            .setLngLat(marker.center)
            .addTo(this.mapa);
    
        this.marcadores.push({
          color: marker.color,
          marker: newMarker
        });

        newMarker.on('dragend', () => this.guardarMarcadores());

      } )
    }
  }

  borrarMarcador( index: number ){
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1);
    this.guardarMarcadores();
  }


}
