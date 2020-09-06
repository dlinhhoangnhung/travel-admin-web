import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TourIndexComponent } from "./management/tours/tour-index/tour-index.component";
import { TourDetailComponent } from "./management/tours/tour-detail/tour-detail.component";
import { HomeComponent } from "./management/dashboard/home/home.component";

import { BookingsIndexComponent } from "./management/bookings/bookings-index/bookings-index.component";
import { UserIndexComponent } from "./management/users/user-index/user-index.component";
import { BookingDetailComponent } from "./management/bookings/booking-detail/booking-detail.component";
import { UserDetailComponent } from "./management/users/user-detail/user-detail.component";
import { ClientHomeComponent } from "./client/client-home/client-home.component";
import { ClientLayoutComponent } from "./shared/layouts/client-layout/client-layout.component";
import { AdminLayoutComponent } from "./shared/layouts/admin-layout/admin-layout.component";
import { ClientListToursComponent } from "./client/tours/client-list-tours/client-list-tours.component";
import { ClientNewsListComponent } from "./client/news/client-news-list/client-news-list.component";
import { ClientDetailTourComponent } from "./client/tours/client-detail-tour/client-detail-tour.component";
import { TourCreateComponent } from "./management/tours/tour-create/tour-create.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "tours", component: TourIndexComponent },
      { path: "tours/:id", component: TourDetailComponent },
      { path: "tours/create", component: TourCreateComponent },
      { path: "bookings", component: BookingsIndexComponent },
      { path: "bookings/:id", component: BookingDetailComponent },
      { path: "users", component: UserIndexComponent },
      { path: "users/:id", component: UserDetailComponent },
    ],
  },
  {
    path: "",
    component: ClientLayoutComponent,
    children: [
      { path: "", component: ClientHomeComponent },
      { path: "tours", component: ClientListToursComponent },
      { path: "tours/:id", component: ClientDetailTourComponent },
      { path: "news", component: ClientNewsListComponent },
    ],
  },
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
  UserDetailComponent,
  ClientListToursComponent,
  ClientNewsListComponent,
  ClientDetailTourComponent,
  TourCreateComponent,
];
