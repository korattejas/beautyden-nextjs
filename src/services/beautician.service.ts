import { Beautician } from '@/types/beautician';
import axios from 'axios';

// Define the API response structure
interface TeamMemberApiResponse {
  code: number;
  status: boolean;
  message: string;
  data: TeamMember[];
}

interface TeamMember {
  id: number;
  name: string;
  role: string | null;
  experience_years: number | null;
  bio: string | null;
  address: string;
  photo: string | null;
  is_popular: number;
  specialties: string[];
  certifications: string[];
}

// Transform API data to Beautician format
export const transformTeamMemberToBeautician = (member: TeamMember): Beautician => {
  // Generate approximate coordinates for Ahmedabad addresses
  // In a real app, you'd use a geocoding service
  const coordinates = getAddressCoordinates(member.address);
  
  return {
    id: member.id.toString(),
    name: member.name,
    mobileNumber: '', // Mobile numbers are not provided in the API
    experience: member.experience_years || 0,
    address: member.address,
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    city: 'Ahmedabad', // All team members appear to be in Ahmedabad
    area: getAreaFromAddress(member.address),
  };
};

// Simple coordinate mapping for known Ahmedabad areas
const getAddressCoordinates = (address: string): { lat: number, lng: number } => {
  const lowerAddress = address.toLowerCase();
  
  // Known areas in Ahmedabad with approximate coordinates
  if (lowerAddress.includes('nikol')) {
    return { lat: 23.0100, lng: 72.5667 };
  } else if (lowerAddress.includes('ranip')) {
    return { lat: 23.0333, lng: 72.5833 };
  } else if (lowerAddress.includes('vastrapur')) {
    return { lat: 23.0418, lng: 72.5312 };
  } else if (lowerAddress.includes('navrangpura') || lowerAddress.includes('navrangpura')) {
    return { lat: 23.0266, lng: 72.5270 };
  } else if (lowerAddress.includes('ellisbridge')) {
    return { lat: 23.0297, lng: 72.5279 };
  } else if (lowerAddress.includes('cg road') || lowerAddress.includes('c.g. road')) {
    return { lat: 23.0270, lng: 72.5238 };
  } else if (lowerAddress.includes('sola')) {
    return { lat: 23.0320, lng: 72.5184 };
  } else if (lowerAddress.includes('bodakdev')) {
    return { lat: 23.0218, lng: 72.5487 };
  } else if (lowerAddress.includes('gurukul')) {
    return { lat: 23.0178, lng: 72.5287 };
  } else if (lowerAddress.includes('thaltej')) {
    return { lat: 23.0083, lng: 72.5240 };
  } else if (lowerAddress.includes('vastral')) {
    return { lat: 23.0200, lng: 72.5833 };
  } else if (lowerAddress.includes('ahmedabad')) {
    return { lat: 23.0225, lng: 72.5714 }; // Center of Ahmedabad
  } else {
    // Default to Ahmedabad center if location not recognized
    return { lat: 23.0225, lng: 72.5714 };
  }
};

const getAreaFromAddress = (address: string): string => {
  const lowerAddress = address.toLowerCase();
  
  if (lowerAddress.includes('nikol')) return 'Nikol';
  if (lowerAddress.includes('ranip')) return 'Ranip';
  if (lowerAddress.includes('vastrapur')) return 'Vastrapur';
  if (lowerAddress.includes('navrangpura')) return 'Navrangpura';
  if (lowerAddress.includes('ellisbridge')) return 'Ellisbridge';
  if (lowerAddress.includes('cg road') || lowerAddress.includes('c.g. road')) return 'C.G. Road';
  if (lowerAddress.includes('sola')) return 'Sola';
  if (lowerAddress.includes('bodakdev')) return 'Bodakdev';
  if (lowerAddress.includes('gurukul')) return 'Gurukul';
  if (lowerAddress.includes('thaltej')) return 'Thaltej';
  if (lowerAddress.includes('vastral')) return 'Vastral';
  
  return 'Ahmedabad'; // Default to city name if area not recognized
};

// Fetch beauticians from the API
export const fetchBeauticiansFromApi = async (): Promise<Beautician[]> => {
  try {
    const response = await axios.get<TeamMemberApiResponse>('https://laravelappversionone.beautyden.in/api/Test/V1/teamMember');
    
    if (response.data.status && response.data.data) {
      // Filter for beauticians only (those with 'Beautician' role or related roles)
      const beauticians = response.data.data
        .filter(member => 
          member.role && 
          (member.role.toLowerCase().includes('beautician') || 
           member.role.toLowerCase().includes('artist') ||
           member.role.toLowerCase().includes('nail') ||
           member.role.toLowerCase().includes('mehndi'))
        )
        .map(transformTeamMemberToBeautician);
      
      return beauticians;
    } else {
      console.error('API Error:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching beauticians:', error);
    return [];
  }
};

// Function to calculate distance between two points using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Function to find nearby beauticians based on a given location
export const findNearbyBeauticians = (beauticians: Beautician[], locationName: string, radiusKm: number = 20): (Beautician & { distance: number })[] => {
  // First, find the coordinates for the location name (we'll use Nikol as an example)
  let locationLat = 23.0100; // Default to Nikol
  let locationLon = 72.5667; // Default to Nikol
  
  // In a real implementation, you would use geocoding API to get coordinates
  // For now, we'll use hardcoded coordinates for known locations
  if (locationName.toLowerCase().includes('nikol')) {
    locationLat = 23.0100;
    locationLon = 72.5667;
  } else if (locationName.toLowerCase().includes('ellisbridge')) {
    locationLat = 23.0297;
    locationLon = 72.5279;
  } else if (locationName.toLowerCase().includes('cg road') || locationName.toLowerCase().includes('c.g. road')) {
    locationLat = 23.0270;
    locationLon = 72.5238;
  } else if (locationName.toLowerCase().includes('navrangpura')) {
    locationLat = 23.0266;
    locationLon = 72.5270;
  } else if (locationName.toLowerCase().includes('vastrapur')) {
    locationLat = 23.0418;
    locationLon = 72.5312;
  } else if (locationName.toLowerCase().includes('sola')) {
    locationLat = 23.0320;
    locationLon = 72.5184;
  }

  // Filter beauticians based on distance
  return beauticians.filter(beautician => {
    const distance = calculateDistance(
      locationLat,
      locationLon,
      beautician.latitude,
      beautician.longitude
    );
    return distance <= radiusKm;
  }).map(beautician => {
    const distance = calculateDistance(
      locationLat,
      locationLon,
      beautician.latitude,
      beautician.longitude
    );
    return {
      ...beautician,
      distance // Add distance property for display
    };
  });
};

// Function to get all beauticians with distances from a given location
export const getAllBeauticiansWithDistances = (beauticians: Beautician[], locationName: string): (Beautician & { distance: number })[] => {
  let locationLat = 23.0100; // Default to Nikol
  let locationLon = 72.5667; // Default to Nikol
  
  // In a real implementation, you would use geocoding API to get coordinates
  // For now, we'll use hardcoded coordinates for known locations
  if (locationName.toLowerCase().includes('nikol')) {
    locationLat = 23.0100;
    locationLon = 72.5667;
  } else if (locationName.toLowerCase().includes('ellisbridge')) {
    locationLat = 23.0297;
    locationLon = 72.5279;
  } else if (locationName.toLowerCase().includes('cg road') || locationName.toLowerCase().includes('c.g. road')) {
    locationLat = 23.0270;
    locationLon = 72.5238;
  } else if (locationName.toLowerCase().includes('navrangpura')) {
    locationLat = 23.0266;
    locationLon = 72.5270;
  } else if (locationName.toLowerCase().includes('vastrapur')) {
    locationLat = 23.0418;
    locationLon = 72.5312;
  } else if (locationName.toLowerCase().includes('sola')) {
    locationLat = 23.0320;
    locationLon = 72.5184;
  }

  return beauticians.map(beautician => {
    const distance = calculateDistance(
      locationLat,
      locationLon,
      beautician.latitude,
      beautician.longitude
    );
    return {
      ...beautician,
      distance
    };
  });
};