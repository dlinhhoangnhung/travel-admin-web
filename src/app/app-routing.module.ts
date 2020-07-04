import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourIndexComponent } from './tours/tour-index/tour-index.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';


const routes: Routes = [
  { path: 'tours', component: TourIndexComponent },
  { path: 'tours/:id', component: TourDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [TourDetailComponent, TourIndexComponent]