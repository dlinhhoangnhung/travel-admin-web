import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/management/tours/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list-tours',
  templateUrl: './client-list-tours.component.html',
  styleUrls: ['./client-list-tours.component.css']
})
export class ClientListToursComponent implements OnInit {

  public tours = []
  constructor(private _tourService: TourService, private router: Router) { }
  public load = 1;
  p: number = 1;

  ngOnInit() {
    this._tourService.getTours().subscribe((data) => { this.tours = data, this.load = 0 })
  }
  onSelect(tour) {
    this.router.navigate(['/tours', tour._id])
  }

}
