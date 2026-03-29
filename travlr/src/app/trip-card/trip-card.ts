import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

// Reusable card that displays one trip with edit and delete actions
@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input() trip!: Trip;
  @Input() isLoggedIn = false;
  @Output() tripDelete = new EventEmitter<string>();

  constructor(private router: Router) {}

  // Store the trip in localStorage so the edit form can read it
  editTrip(trip: Trip): void {
    localStorage.setItem('editTrip', JSON.stringify(trip));
    this.router.navigate(['edit-trip']);
  }

  // Confirm before emitting the delete event to the parent
  deleteTrip(code: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripDelete.emit(code);
    }
  }
}
