import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../tours/tour.model';
import { Observable } from 'rxjs';


@Injectable()
export class TourService {
  private _url: string = 'https://tour-api-service.herokuapp.com/api/tours';
  constructor(private http: HttpClient) {}
  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this._url);
  }
  getTourById(id): Observable<Tour>{
    return this.http.get<Tour>('https://tour-api-service.herokuapp.com/api/tours/'+id)
  }
  deleteTourById(id): Observable<Tour>{
    return this.http.delete<Tour>('https://tour-api-service.herokuapp.com/api/tours/'+id)
  }
  create(data){
    return this.http.post(this._url,data);
  }
}
