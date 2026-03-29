import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

// Form for updating an existing trip via PUT
@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  tripForm!: FormGroup;
  submitted = false;
  message = '';
  originalCode = '';  // Preserved so the PUT route stays correct

  constructor(
    private fb: FormBuilder,
    private tripDataService: TripData,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read the trip selected by the user from localStorage
    const stored = localStorage.getItem('editTrip');
    const trip: Trip = stored ? JSON.parse(stored) : {} as Trip;
    this.originalCode = trip.code || '';

    // Format date to yyyy-MM-dd for the date input
    const startDate = trip.start
      ? new Date(trip.start).toISOString().substring(0, 10)
      : '';

    this.tripForm = this.fb.group({
      code: [trip.code || '', Validators.required],
      name: [trip.name || '', Validators.required],
      length: [trip.length || '', Validators.required],
      start: [startDate, Validators.required],
      resort: [trip.resort || '', Validators.required],
      perPerson: [trip.perPerson || '', Validators.required],
      image: [trip.image || '', Validators.required],
      description: [trip.description || '', Validators.required]
    });
  }

  // Shorthand for accessing form controls in the template
  get f() { return this.tripForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.tripForm.invalid) { return; }

    // Always use the original code as the URL param, not the (readonly) field value
    const updated: Trip = { ...this.tripForm.value, code: this.originalCode };
    this.tripDataService.updateTrip(updated).subscribe({
      next: () => {
        localStorage.removeItem('editTrip');
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        this.message = 'Error updating trip: ' + err.message;
      }
    });
  }

  cancel(): void {
    localStorage.removeItem('editTrip');
    this.router.navigate(['/trips']);
  }
}
