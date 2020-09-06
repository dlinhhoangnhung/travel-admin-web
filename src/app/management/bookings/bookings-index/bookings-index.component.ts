import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings-index',
  templateUrl: './bookings-index.component.html',
  styleUrls: ['./bookings-index.component.css']
})
export class BookingsIndexComponent implements OnInit {
  public bookings = []
  public load = 1
  constructor(private _bookingService: BookingService, private router: Router) { }
  p: number = 1;
  ngOnInit() {
    this._bookingService.getBookings().subscribe((data) => { this.bookings = data, this.load = 0 })
  }
  onSelect(booking) {
    this.router.navigate(['/admin/bookings', booking._id])
  }
}
