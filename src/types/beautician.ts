export interface Beautician {
  id: string;
  name: string;
  mobileNumber?: string; // Optional since API doesn't provide it
  experience: number; // in years
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  area: string;
}