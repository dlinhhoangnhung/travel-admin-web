import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserSerivce } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public user:User;
  public id;
  constructor(private _userService: UserSerivce, private route : ActivatedRoute) { }
  public load = 1;
  public delete = 0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this._userService.getUserbyId(this.id).subscribe((data) => { this.user = data, this.load = 0 })
  }
}
