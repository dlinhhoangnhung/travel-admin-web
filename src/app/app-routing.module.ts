import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TourIndexComponent } from "./tours/tour-index/tour-index.component";
import { TourDetailComponent } from "./tours/tour-detail/tour-detail.component";
import { HomeComponent } from "./dashboard/home/home.component";

import { BookingsIndexComponent } from "./bookings/bookings-index/bookings-index.component";
import { UserIndexComponent } from "./users/user-index/user-index.component";
import { BookingDetailComponent } from "./bookings/booking-detail/booking-detail.component";
import { UserDetailComponent } from './users/user-detail/user-detail.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "tours", component: TourIndexComponent },
  { path: "tours/:id", component: TourDetailComponent },
  { path: "bookings", component: BookingsIndexComponent },
  { path: "bookings/:id", component: BookingDetailComponent },
  { path: "users", component: UserIndexComponent },
  { path: "users/:id", component: UserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [
  TourDetailComponent,
  TourIndexComponent,
  HomeComponent,
  BookingsIndexComponent,
  UserIndexComponent,
  BookingDetailComponent,
  
  UserDetailComponent  
];
