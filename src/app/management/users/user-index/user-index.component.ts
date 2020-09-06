import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/management/tours/tour.service';
import { Router } from '@angular/router';
import { UserSerivce } from '../user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  public load = 1;
  p: number = 1;
  public users = [];
  constructor(private _userService: UserSerivce, private router: Router) { }

  ngOnInit() {
    this._userService.getUsers().subscribe((data) => { this.users = data,this.load = 0 })
  }
  onSelect(user) {
    this.router.navigate(['/admin/users', user._id])
  }
}
