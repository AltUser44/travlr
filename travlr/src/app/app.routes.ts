import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

// Client-side routes for the admin SPA
export const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },  // Default to trip list
  { path: 'login', component: Login },
  { path: 'trips', component: TripListing },
  { path: 'add-trip', component: AddTrip, canActivate: [authGuard] },
  { path: 'edit-trip', component: EditTrip, canActivate: [authGuard] }
];
