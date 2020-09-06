import { Component, OnInit } from '@angular/core';
import { TourService } from '../tour.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-tour-index',
  templateUrl: './tour-index.component.html',
  styleUrls: ['./tour-index.component.css']
})
export class TourIndexComponent implements OnInit {
  public tours = []
  constructor(private _tourService: TourService, private router: Router) { }
  public load = 1;
  p: number = 1;

  ngOnInit() {
    this._tourService.getTours().subscribe((data) => { this.tours = data, this.load = 0 })
  }
  onSelect(tour) {
    this.router.navigate(['/admin/tours', tour._id])
  }
}
