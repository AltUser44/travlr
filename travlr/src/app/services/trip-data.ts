import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthenticationService } from './authentication';

// Base URL for the Express REST API
const apiUrl = 'http://localhost:3000/api/trips';

@Injectable({
  providedIn: 'root',
})
export class TripData {
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  /** Build Authorization headers when a token exists */
  private authHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

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
    return this.http.post<Trip>(apiUrl, trip, { headers: this.authHeaders() });
  }

  // Update an existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${apiUrl}/${trip.code}`, trip, { headers: this.authHeaders() });
  }

  // Delete a trip by its code
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${apiUrl}/${code}`, { headers: this.authHeaders() });
  }
}
