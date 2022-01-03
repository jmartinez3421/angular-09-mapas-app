import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fullScreen',
        component: FullScreenComponent
      },
      {
        path: 'marcadores',
        component: MarcadoresComponent
      },
      {
        path: 'propiedades',
        component: PropiedadesComponent
      },
      {
        path: 'zoomRange',
        component: ZoomRangeComponent
      },
      {
        path: '**',
        redirectTo: 'fullScreen'
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MapasRoutingModule { }
