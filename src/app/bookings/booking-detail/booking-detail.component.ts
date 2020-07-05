import { Component, OnInit } from "@angular/core";
import { Booking, BookingItem } from "../booking.model";
import { BookingService } from "../booking.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserSerivce } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";
import { TourService } from "src/app/tours/tour.service";
import { Tour } from "src/app/tours/tour.model";

@Component({
  selector: "app-booking-detail",
  templateUrl: "./booking-detail.component.html",
  styleUrls: ["./booking-detail.component.css"],
})
export class BookingDetailComponent implements OnInit {
  public booking: Booking;
  public id;
  public user: User;
  public bookingItems = [];
  constructor(
    private _bookingService: BookingService,
    private route: ActivatedRoute,
    private _userService: UserSerivce,
    private _tourService: TourService,
    private router: Router
  ) {}
  public load = 1;
  public delete = 0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this._bookingService.getBookingById(this.id).subscribe((data) => {
      (this.booking = data),
        (this.load = 0),
        this._userService.getUserbyId(this.booking.uid).subscribe((user:User) => {
          this.user = user;
        }),
        data.booking_items.forEach((bookingItem) => {
          this._tourService.getTourById(bookingItem.tour_id).subscribe((tour) => {
            this.bookingItems.push({
              type: bookingItem.type,
              quantity: bookingItem.quantity,
              tour: tour,
            });
          });
        });
    });
  }
  onSelectTour(bookingItem) {
    this.router.navigate(['/tours', bookingItem.tour._id])
  }
}
