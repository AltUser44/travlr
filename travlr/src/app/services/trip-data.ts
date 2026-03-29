import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

// Base URL for the Express REST API
const apiUrl = 'http://localhost:3000/api/trips';

@Injectable({
  providedIn: 'root',
})
export class TripData {
  constructor(private http: HttpClient) {}

  // Fetch all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(apiUrl);
  }

  // Fetch a single trip by its code
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${apiUrl}/${code}`);
  }

  // Create a new trip
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(apiUrl, trip);
  }

  // Update an existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${apiUrl}/${trip.code}`, trip);
  }

  // Delete a trip by its code
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${apiUrl}/${code}`);
  }
}
