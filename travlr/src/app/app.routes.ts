import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';

// Client-side routes for the admin SPA
export const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },  // Default to trip list
  { path: 'trips', component: TripListing },
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip', component: EditTrip }
];
