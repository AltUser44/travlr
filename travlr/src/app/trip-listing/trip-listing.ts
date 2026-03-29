import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { AuthenticationService } from '../services/authentication';

// Displays the full list of trips fetched from the API
@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard, RouterLink],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private tripDataService: TripData,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  // Load all trips from the API
  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;
      },
      error: (err) => {
        this.message = 'Error retrieving trips: ' + err.message;
      }
    });
  }

  addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Triggered when a trip card emits a delete event
  onTripDelete(code: string): void {
    this.tripDataService.deleteTrip(code).subscribe({
      next: () => this.getTrips(),
      error: (err) => {
        this.message = 'Error deleting trip: ' + err.message;
      }
    });
  }
}
