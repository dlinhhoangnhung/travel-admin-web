import { Component, OnInit } from "@angular/core";
import { Booking } from "../booking.model";
import { BookingService } from "../booking.service";
import { ActivatedRoute } from "@angular/router";
import { UserSerivce } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";

@Component({
  selector: "app-booking-detail",
  templateUrl: "./booking-detail.component.html",
  styleUrls: ["./booking-detail.component.css"],
})
export class BookingDetailComponent implements OnInit {
  public booking: Booking;
  public id;
  public user: User;
  constructor(
    private _bookingService: BookingService,
    private route: ActivatedRoute,
    private _userService: UserSerivce
  ) {}
  public load = 1;
  public delete = 0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this._bookingService.getBookingById(this.id).subscribe((data) => {
      (this.booking = data),
        (this.load = 0),
        this._userService.getUserbyId(this.booking.uid).subscribe((user) => {
          this.user = user;
        });
    });
  }
}
