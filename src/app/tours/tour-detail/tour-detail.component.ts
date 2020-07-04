import { Component, OnInit } from '@angular/core';
import { TourService } from '../tour.service';
import { Tour } from '../tour.model';
import {ActivatedRoute} from '@angular/router' 
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  public tour:Tour;
  public id;
  constructor(private _tourService: TourService, private route : ActivatedRoute) { }
  public load = 1;
  public delete = 0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this._tourService.getTourById(this.id).subscribe((data) => { this.tour = data, this.load = 0 })
  }
  onDelete(){
    this._tourService.deleteTourById(this.id).subscribe(() => {  this.delete = 0 })
  }
}
