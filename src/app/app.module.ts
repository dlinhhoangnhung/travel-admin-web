import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
/* --------------------------------- service -------------------------------- */
import {TourService} from 'src/app/management/tours/tour.service';
import { BookingService } from './management/bookings/booking.service';
import { UserSerivce } from './management/users/user.service';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { ClientHeaderComponent } from './shared/layouts/client-header/client-header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponent,
    ClientHomeComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    ClientHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [TourService,BookingService,UserSerivce],
  bootstrap: [AppComponent]
})
export class AppModule { }
