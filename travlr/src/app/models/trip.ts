// Mirrors the MongoDB trip schema from the Express backend
export interface Trip {
  _id?: string;       // MongoDB document ID 
  code: string;       // Unique trip identifier
  name: string;
  length: string;     // e.g. "7 nights"
  start: Date;
  resort: string;
  perPerson: string;  // Price as string to match DB format
  image: string;      // URL to the trip image
  description: string;
}
