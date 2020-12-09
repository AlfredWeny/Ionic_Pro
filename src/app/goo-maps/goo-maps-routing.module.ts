import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooMapsPage } from './goo-maps.page';

const routes: Routes = [
  {
    path: '',
    component: GooMapsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooMapsPageRoutingModule {}
