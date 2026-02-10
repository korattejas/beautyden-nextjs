"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { HiMagnifyingGlass, HiMapPin, HiPhone, HiUser, HiStar } from "react-icons/hi2";
import L from "leaflet";

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- Types ---

interface Beautician {
    id: number;
    name: string;
    mobile: string;
    experience: string;
    address: string;
    lat: number;
    lng: number;
    role: string | null;
    bio: string | null;
    photo: string | null;
    is_popular: number;
    specialties: string[];
}

interface ApiTeamMember {
    id: number;
    name: string;
    role: string | null;
    experience_years: number | null;
    bio: string | null;
    address: string | null;
    photo: string | null;
    is_popular: number;
    specialties: string[];
    certifications: string[];
}

// --- Custom Icons ---

const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: "custom-marker",
        html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 10px; 
        height: 10px; 
        background-color: white; 
        border-radius: 50%;
      "></div>
    </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });
};

const UserIcon = createCustomIcon("#3b82f6"); // Blue for User
const BeauticianIcon = createCustomIcon("#ec4899"); // Pink for Beautician

// --- Helper Components ---

function MapController({ center, zoom, selectedId }: { center: [number, number], zoom: number, selectedId: number | null }) {
    const map = useMap();

    useEffect(() => {
        // Validate that center coordinates are valid numbers
        if (Array.isArray(center) && center.length === 2) {
            const [lat, lng] = center;
            // More comprehensive validation
            if (typeof lat === 'number' && typeof lng === 'number' && 
                !isNaN(lat) && !isNaN(lng) && 
                isFinite(lat) && isFinite(lng) &&
                lat >= -90 && lat <= 90 && // Valid latitude range
                lng >= -180 && lng <= 180) { // Valid longitude range
                try {
                    map.flyTo(center, zoom, {
                        duration: 1.5
                    });
                } catch (error) {
                    console.error('Error flying to coordinates:', center, error);
                }
            } else {
                console.warn('Invalid map center coordinates:', center);
                // Fallback to default Ahmedabad coordinates
                map.setView([23.0225, 72.5714], 13);
            }
        } else {
            console.warn('Invalid center format:', center);
            // Fallback to default Ahmedabad coordinates
            map.setView([23.0225, 72.5714], 13);
        }
    }, [center, zoom, map]);

    return null;
}

// --- Main Component ---

export default function BeauticianLocator() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [mapCenter, setMapCenter] = useState<[number, number]>([23.0225, 72.5714]); // Ahmedabad default
    const [mapZoom, setMapZoom] = useState(11);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [routePath, setRoutePath] = useState<[number, number][]>([]);

    const [beauticians, setBeauticians] = useState<Beautician[]>([]);
    const [sortedBeauticians, setSortedBeauticians] = useState<
        (Beautician & { distance?: number })[]
    >([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0); // Track loading progress
    const [selectedBeautician, setSelectedBeautician] = useState<number | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Set map as loaded after initial render to ensure proper rendering
    useEffect(() => {
        const timer = setTimeout(() => {
            setMapLoaded(true);
        }, 300); // Increased delay to ensure DOM is ready
        return () => clearTimeout(timer);
    }, []);

    // Background geocoding to improve accuracy after initial display
    const processGeocodingInBackground = async (currentBeauticians: Beautician[], apiMembers: ApiTeamMember[]) => {
        // Process geocoding with delays to avoid rate limiting
        for (let i = 0; i < apiMembers.length; i++) {
            const member = apiMembers[i];
            if (!member.address) continue;
            
            // Add small delay to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 300));
            
            try {
                const coords = await geocodeAddress(member.address);
                if (coords) {
                    // Update the beautician with accurate coordinates
                    const updatedBeauticians = currentBeauticians.map(b => 
                        b.id === member.id 
                            ? { ...b, lat: coords.lat, lng: coords.lng }
                            : b
                    );
                    setBeauticians(updatedBeauticians);
                    setSortedBeauticians(updatedBeauticians);
                }
            } catch (error) {
                console.error(`Error geocoding ${member.name}:`, error);
                // Continue with next item instead of breaking
            }
        }
    };
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return parseFloat(d.toFixed(1));
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    // Geocode Address with error handling
    const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
        try {
            // Append city if not present to improve accuracy for local addresses
            const query = address.toLowerCase().includes("ahmedabad") ? address : `${address}, Ahmedabad`;
            
            // Add timeout and better error handling
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&countrycodes=in&limit=1`,
                {
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'BeautyDen-App/1.0' // Add user agent to avoid blocking
                    }
                }
            );
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            }
        } catch (error) {
            // Handle both network errors and abort errors
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn(`Geocoding timeout for address: "${address}"`);
            } else {
                console.error(`Error geocoding address "${address}":`, error);
            }
        }
        return null;
    };

    // Fetch Beauticians from API
    useEffect(() => {
        const fetchBeauticians = async () => {
            setIsLoadingData(true);
            setLoadingProgress(0);
            try {
                const response = await fetch('https://laravelappversionone.beautyden.in/api/Test/V1/teamMember');
                const result = await response.json();

                if (result.status && result.data) {
                    const apiBeauticians: ApiTeamMember[] = result.data;
                    
                    // Show all beauticians instantly without processing delays
                    const loadedBeauticians: Beautician[] = apiBeauticians
                        .filter(member => member.address) // Filter out members without addresses
                        .map((member, index) => {
                            // Update progress
                            setLoadingProgress(Math.round(((index + 1) / apiBeauticians.length) * 100));
                            
                            // Use default coordinates for immediate display
                            const lat = 23.0225 + (Math.random() - 0.5) * 0.05;
                            const lng = 72.5714 + (Math.random() - 0.5) * 0.05;
                            
                            return {
                                id: member.id,
                                name: member.name,
                                mobile: "Contact for details",
                                experience: member.experience_years ? `${member.experience_years} Years` : "Experienced",
                                address: member.address || "", // Ensure address is string
                                lat: lat,
                                lng: lng,
                                role: member.role,
                                bio: member.bio,
                                photo: member.photo,
                                is_popular: member.is_popular,
                                specialties: member.specialties
                            };
                        });

                    // Set all beauticians at once for instant display
                    setBeauticians(loadedBeauticians);
                    setSortedBeauticians(loadedBeauticians);
                    
                    // Now process geocoding in background for better accuracy
                    processGeocodingInBackground(loadedBeauticians, apiBeauticians);
                }
            } catch (error) {
                console.error("Error fetching beauticians:", error);
            } finally {
                setIsLoadingData(false);
                setLoadingProgress(100);
            }
        };

        fetchBeauticians();
    }, []);

    // Click outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // Fetch Suggestions Debounced
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length > 2) {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                            searchQuery
                        )}&countrycodes=in&limit=5&addressdetails=1`
                    );
                    const data = await response.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchRoute = async (start: [number, number], end: [number, number]) => {
        try {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
            );
            const data = await response.json();

            if (data.code === "Ok" && data.routes && data.routes.length > 0) {
                const coordinates = data.routes[0].geometry.coordinates;
                // OSRM returns [lon, lat], Leaflet needs [lat, lon]
                const path: [number, number][] = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
                setRoutePath(path);
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    };

    const handleSearch = async (e: React.FormEvent, overrideQuery?: string) => {
        e.preventDefault();
        const query = overrideQuery || searchQuery;
        if (!query.trim()) return;

        setIsSearching(true);
        setShowSuggestions(false);
        setRoutePath([]); // Clear previous route
        setSelectedBeautician(null);

        try {
            // Use Nominatim API for geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&countrycodes=in&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const newLat = parseFloat(lat);
                const newLng = parseFloat(lon);
                const newCenter: [number, number] = [newLat, newLng];

                setMapCenter(newCenter);
                setMapZoom(13); // Zoom out slightly to see more context
                setUserLocation(newCenter);

                // Calculate distances and sort
                const withDistances = beauticians.map((b) => ({
                    ...b,
                    distance: calculateDistance(newLat, newLng, b.lat, b.lng),
                })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

                setSortedBeauticians(withDistances);
            } else {
                alert("Location not found. Please try a different area.");
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("Something went wrong while searching.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleSuggestionClick = (suggestion: any) => {
        setSearchQuery(suggestion.display_name);
        handleSearch({ preventDefault: () => { } } as React.FormEvent, suggestion.display_name);
    };

    const handleBeauticianClick = (beautician: Beautician) => {
        // Validate coordinates before setting map center
        const isValidLat = typeof beautician.lat === 'number' && 
                          !isNaN(beautician.lat) && 
                          isFinite(beautician.lat) && 
                          beautician.lat >= -90 && 
                          beautician.lat <= 90;
        
        const isValidLng = typeof beautician.lng === 'number' && 
                          !isNaN(beautician.lng) && 
                          isFinite(beautician.lng) && 
                          beautician.lng >= -180 && 
                          beautician.lng <= 180;
        
        if (isValidLat && isValidLng) {
            setMapCenter([beautician.lat, beautician.lng]);
            setMapZoom(15);
        } else {
            console.warn('Invalid beautician coordinates:', beautician);
            // Use default Ahmedabad coordinates as fallback
            setMapCenter([23.0225, 72.5714]);
            setMapZoom(13);
        }
        
        setSelectedBeautician(beautician.id);

        // Only fetch route if both coordinates are valid
        if (userLocation && isValidLat && isValidLng) {
            fetchRoute(userLocation, [beautician.lat, beautician.lng]);
        }
    };

    return (
        <div className="flex flex-col bg-gray-50 h-[calc(100vh-0px)] overflow-hidden">
            {/* Search Header - Always on top on mobile, moves to side on larger screens */}
            <div className="p-3 sm:p-4 bg-white border-b border-gray-100 z-10 sticky top-0" ref={wrapperRef}>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">Find a Beautician</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <div className="flex group">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiMagnifyingGlass className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search location (e.g., Nikol, Maninagar)"
                                className="block w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm sm:text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                            />
                        </div>
                        <button
                            type="button"
                            disabled={isSearching}
                            onClick={(e) => handleSearch(e)}
                            className="ml-2 bg-primary text-white px-4 sm:px-6 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed h-10 sm:h-12 self-center min-w-[80px]"
                        >
                            {isSearching ? (
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                            ) : (
                                <span className="text-xs sm:text-sm">Search</span>
                            )}
                        </button>
                    </div>
                </div>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none flex items-start gap-3 transition-colors"
                                >
                                    <HiMapPin className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                                    <span className="text-sm text-gray-700 line-clamp-2">{suggestion.display_name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                {userLocation && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                        <HiMapPin className="w-4 h-4" />
                        <span>Showing results near your location</span>
                    </div>
                )}
            </div>

            {/* Main Content Area - Side-by-side layout for all screens */}
            <div className="flex-1 flex flex-col sm:flex-row overflow-hidden mobile-side-by-side">
                {/* Results List - Fixed height with scrolling on mobile, full height on desktop */}
                <div 
                    ref={listRef} 
                    className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] flex flex-col border-t sm:border-t-0 sm:border-r border-gray-200 bg-white order-2 sm:order-1 flex-shrink-0 listing-container pt-3"
                    style={{ height: '100%' }} 
                >
                    <div className="p-3 sm:p-4 flex-1 overflow-y-auto max-h-[200px] sm:max-h-none">
                        {/* Loading State for List */}
                        {isLoadingData && sortedBeauticians.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                                <p className="text-gray-500 mb-2">Loading beauticians...</p>
                                <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                                        style={{ width: `${loadingProgress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{loadingProgress}%</p>
                            </div>
                        )}

                        {sortedBeauticians.map((beautician) => (
                            <div
                                key={beautician.id}
                                id={`beautician-${beautician.id}`}
                                onClick={() => handleBeauticianClick(beautician)}
                                className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg mb-2 sm:mb-3 ${selectedBeautician === beautician.id
                                    ? "border-primary bg-white shadow-md ring-1 ring-primary/20"
                                    : "border-gray-100 bg-white hover:border-primary/30"
                                    }`}
                            >
                                <div className="flex gap-3 sm:gap-4">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shrink-0 border border-white shadow-sm overflow-hidden">
                                        {beautician.photo ? (
                                            <img src={beautician.photo} alt={beautician.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-lg sm:text-xl font-bold text-pink-500">
                                                {beautician.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900 truncate group-hover:text-primary transition-colors text-sm sm:text-base">
                                                    {beautician.name}
                                                </h3>
                                            </div>
                                            {beautician.distance !== undefined && (
                                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap">
                                                    {beautician.distance} km
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-2 space-y-1 sm:space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                <HiUser className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                                                <span>{beautician.role || "Beautician"} • {beautician.experience}</span>
                                            </div>
                                            {/* <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                <HiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                                                <span>{beautician.mobile}</span>
                                            </div> */}
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                <HiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                                                <span className="truncate">{beautician.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!isLoadingData && sortedBeauticians.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <HiMagnifyingGlass className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">No results found</h3>
                                <p className="text-gray-500">Try searching for a different location in Ahmedabad.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Map Area - Full height on all screens */}
                <div 
                    className="flex-1 relative order-1 sm:order-2 min-h-[200px] sm:min-h-0" 
                    style={{ height: '100%' }} 
                    id="map-container"
                >
                    {mapLoaded ? (
                        <MapContainer
                            center={mapCenter}
                            zoom={mapZoom}
                            style={{ height: "100%", width: "100%" }}
                            className="z-0"
                            zoomControl={true}
                            scrollWheelZoom={true}
                            ref={(map) => {
                                if (map) {
                                    // Ensure map is properly initialized
                                    setTimeout(() => {
                                        map.invalidateSize();
                                    }, 100);
                                }
                            }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                maxZoom={19}
                            />
                            <MapController center={mapCenter} zoom={mapZoom} selectedId={selectedBeautician} />
                        
                            {/* Route Polyline */}
                            {routePath.length > 0 && (
                                <Polyline
                                    positions={routePath}
                                    color="#3b82f6"
                                    weight={4}
                                    opacity={0.7}
                                    dashArray="10, 10"
                                />
                            )}
                        
                            {/* User Location Marker */}
                            {userLocation && (
                                <Marker position={[userLocation[0], userLocation[1]]} icon={UserIcon}>
                                    <Popup className="custom-popup">
                                        <div className="p-2 text-center">
                                            <div className="font-bold text-blue-600 text-base">You are here</div>
                                            <div className="text-xs text-gray-500 mt-1">Search Location</div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}
                        
                            {/* Beautician Markers */}
                            {sortedBeauticians
                                .filter(beautician => {
                                    const isValidLat = typeof beautician.lat === 'number' && 
                                                     !isNaN(beautician.lat) && 
                                                     isFinite(beautician.lat) && 
                                                     beautician.lat >= -90 && 
                                                     beautician.lat <= 90;
                                                        
                                    const isValidLng = typeof beautician.lng === 'number' && 
                                                     !isNaN(beautician.lng) && 
                                                     isFinite(beautician.lng) && 
                                                     beautician.lng >= -180 && 
                                                     beautician.lng <= 180;
                                                        
                                    return isValidLat && isValidLng;
                                })
                                .map((beautician) => (
                                    <Marker
                                        key={beautician.id}
                                        position={[beautician.lat, beautician.lng]}
                                        icon={BeauticianIcon}
                                        eventHandlers={{
                                            click: () => {
                                                handleBeauticianClick(beautician);
                                                const el = document.getElementById(`beautician-${beautician.id}`);
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            },
                                        }}
                                    >
                                        <Popup className="custom-popup">
                                            <div className="p-2 min-w-[200px]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold overflow-hidden">
                                                        {beautician.photo ? (
                                                            <img src={beautician.photo} alt={beautician.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            beautician.name.charAt(0)
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{beautician.name}</h3>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                                    <HiMapPin className="w-3 h-3" /> {beautician.address}
                                                </p>
                                                {/* <p className="text-xs text-gray-600 flex items-center gap-1">
                                                    <HiPhone className="w-3 h-3" /> {beautician.mobile}
                                                </p> */}
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                        </MapContainer>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                                <p className="text-gray-500 font-medium">Loading Map...</p>
                            </div>
                        </div>
                    )}

                    {/* Map Overlay Loading State */}
                    {isSearching && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[1000] flex items-center justify-center">
                            <div className="bg-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
                                <HiMagnifyingGlass className="w-6 h-6 text-primary" />
                                <span className="font-bold text-gray-900">Locating...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}