import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/management/tours/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from 'src/app/management/tours/tour.service';

@Component({
  selector: 'app-client-detail-tour',
  templateUrl: './client-detail-tour.component.html',
  styleUrls: ['./client-detail-tour.component.css']
})
export class ClientDetailTourComponent implements OnInit {

  public tour:Tour;
  public id;
  constructor(private _tourService: TourService, private route : ActivatedRoute, private router : Router) { }
  public load = 1;
  public delete = 0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this._tourService.getTourById(this.id).subscribe((data) => { this.tour = data, this.load = 0 })
  }
 
}
