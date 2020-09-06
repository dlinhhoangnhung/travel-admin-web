import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../tours/tour.model';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';


@Injectable()
export class BookingService {
  private _url: string = 'https://tour-api-service.herokuapp.com/api/booking';
  constructor(private http: HttpClient) {}
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this._url);
  }
  getBookingById(id): Observable<Booking>{
    return this.http.get<Booking>('https://tour-api-service.herokuapp.com/api/booking/'+id)
  }
  }

