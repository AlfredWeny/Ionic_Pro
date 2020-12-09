import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { MapsComponent } from './maps/maps.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'contact/:id:',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'contact-details',
    loadChildren: () => import('./contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
