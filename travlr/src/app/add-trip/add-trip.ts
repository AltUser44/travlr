import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

// Form for creating a new trip via POST
@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})
export class AddTrip implements OnInit {
  tripForm!: FormGroup;
  submitted = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private tripDataService: TripData,
    private router: Router
  ) {}

  ngOnInit(): void {
    // All fields are required to match the backend schema
    this.tripForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Shorthand for accessing form controls in the template
  get f() { return this.tripForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.tripForm.invalid) { return; }

    this.tripDataService.addTrip(this.tripForm.value as Trip).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (err) => {
        this.message = 'Error adding trip: ' + err.message;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/trips']);
  }
}
