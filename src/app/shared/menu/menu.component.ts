import { Component } from '@angular/core';

interface MenuItem{
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    li{
      cursor: pointer;
    }

    li:hover{
      background-color: lightblue;
    }

    li.active:hover{
      background-color: blue;
    }
  `]
})
export class MenuComponent{

  menuList: MenuItem[] = [
    {
      ruta: 'mapas/fullScreen',
      nombre: 'Full Screen'
    },
    {
      ruta: 'mapas/zoomRange',
      nombre: 'Zoom Range'
    },
    {
      ruta: 'mapas/marcadores',
      nombre: 'Marcadores'
    },
    {
      ruta: 'mapas/propiedades',
      nombre: 'Propiedades'
    },
  ]

}
