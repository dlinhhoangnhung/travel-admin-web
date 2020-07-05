import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/tours/tour.service';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/bookings/booking.service';
import { UserSerivce } from 'src/app/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _tourService: TourService,private _bookingService: BookingService,private _userService:UserSerivce, private router: Router) { }
  public tourCount;
  public bookingCount;
  public userCount;
  ngOnInit() {
    this._tourService.getTours().subscribe((data) => { this.tourCount = data.length })
    this._bookingService.getBookings().subscribe((data) => { this.bookingCount = data.length })
    this._userService.getUsers().subscribe((data) => { this.userCount = data.length })
  }

}
