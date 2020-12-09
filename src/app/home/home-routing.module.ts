import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsComponent } from '../maps/maps.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:[
      {
        path:"maps",
        component: MapsComponent
      },
      {
        path: 'cameras',
        loadChildren: () => import('../cameras/cameras.module').then( m => m.CamerasPageModule)
      },
      {
        path: 'goo-maps',
        loadChildren: () => import('../goo-maps/goo-maps.module').then( m => m.GooMapsPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: '',
        redirectTo: '/home/cameras',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/cameras',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
