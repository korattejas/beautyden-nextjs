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
        map.flyTo(center, zoom, {
            duration: 1.5
        });
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
    const [selectedBeautician, setSelectedBeautician] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Haversine Formula for distance
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

    // Geocode Address
    const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
        try {
            // Append city if not present to improve accuracy for local addresses
            const query = address.toLowerCase().includes("ahmedabad") ? address : `${address}, Ahmedabad`;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&countrycodes=in&limit=1`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            }
        } catch (error) {
            console.error(`Error geocoding address "${address}":`, error);
        }
        return null;
    };

    // Fetch Beauticians from API
    useEffect(() => {
        const fetchBeauticians = async () => {
            setIsLoadingData(true);
            try {
                const response = await fetch('https://laravelappversionone.beautyden.in/api/Test/V1/teamMember');
                const result = await response.json();

                if (result.status && result.data) {
                    const apiBeauticians: ApiTeamMember[] = result.data;
                    const loadedBeauticians: Beautician[] = [];

                    // Process sequentially to avoid rate limiting
                    for (const member of apiBeauticians) {
                        if (!member.address) continue;

                        // Add delay to respect Nominatim rate limits (1 req/sec)
                        await new Promise(resolve => setTimeout(resolve, 1100));

                        const coords = await geocodeAddress(member.address);

                        // Fallback coordinates (center of Ahmedabad) with slight random offset if geocoding fails
                        // This ensures they appear on map even if address is vague
                        const lat = coords ? coords.lat : 23.0225 + (Math.random() - 0.5) * 0.05;
                        const lng = coords ? coords.lng : 72.5714 + (Math.random() - 0.5) * 0.05;

                        loadedBeauticians.push({
                            id: member.id,
                            name: member.name,
                            mobile: "Contact for details", // Not in API
                            experience: member.experience_years ? `${member.experience_years} Years` : "Experienced",
                            address: member.address,
                            lat: lat,
                            lng: lng,

                            role: member.role,
                            bio: member.bio,
                            photo: member.photo,
                            is_popular: member.is_popular,
                            specialties: member.specialties
                        });

                        // Update state progressively so markers appear one by one
                        setBeauticians([...loadedBeauticians]);
                        setSortedBeauticians([...loadedBeauticians]);
                    }
                }
            } catch (error) {
                console.error("Error fetching beauticians:", error);
            } finally {
                setIsLoadingData(false);
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
        setMapCenter([beautician.lat, beautician.lng]);
        setMapZoom(15);
        setSelectedBeautician(beautician.id);

        if (userLocation) {
            fetchRoute(userLocation, [beautician.lat, beautician.lng]);
        }
    };

    return (
<div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] overflow-hidden bg-gray-50">
            {/* Sidebar List */}
<div className="w-full lg:w-[400px] xl:w-[450px] flex flex-col border-r border-gray-200 bg-white shadow-xl z-20 order-2 lg:order-1 overflow-hidden">
                {/* Search Header */}
                <div className="p-4 bg-white border-b border-gray-100 z-10" ref={wrapperRef}>
                    <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Find a Beautician</h2>
                    <form onSubmit={(e) => handleSearch(e)} className="flex gap-2">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiMagnifyingGlass className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search location (e.g., Nikol, Maninagar)"
                                className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                            />
                    
                      
                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
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

                            </div>
                              <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {isSearching ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Search"
                            )}
                        </button>
                    </form>

                    {userLocation && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                            <HiMapPin className="w-4 h-4" />
                            <span>Showing results near your location</span>
                        </div>
                    )}
                </div>

                {/* Results List */}
                <div
  ref={listRef}
  className="flex-1 overflow-y-auto p-2 space-y-2"
>

                    {/* Loading State for List */}
                    {isLoadingData && (
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-2" />
                            <p className="text-gray-500 text-xs">Loading beauticians...</p>
                        </div>
                    )}

                    {/* Show listings as they load */}
                    {!isLoadingData && sortedBeauticians.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <HiMagnifyingGlass className="w-4 h-4 text-gray-400" />
                            </div>
                            <h3 className="text-xs font-semibold text-gray-900">No results found</h3>
                            <p className="text-gray-500 text-xs mt-1">Try searching for a location</p>
                        </div>
                    )}

                    {sortedBeauticians.map((beautician) => (
                        <div
                            key={beautician.id}
                            id={`beautician-${beautician.id}`}
                            onClick={() => handleBeauticianClick(beautician)}
                            className={`group relative p-2 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-sm ${selectedBeautician === beautician.id
                                ? "border-primary bg-white shadow ring-1 ring-primary/20"
                                : "border-gray-100 bg-white hover:border-primary/30"
                                }`}
                        >
                            <div className="flex gap-2">
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center shrink-0 border border-white shadow-sm overflow-hidden">
                                    {beautician.photo ? (
                                        <img src={beautician.photo} alt={beautician.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-sm font-bold text-pink-500">
                                            {beautician.name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 truncate group-hover:text-primary transition-colors text-xs">
                                                {beautician.name}
                                            </h3>
                                        </div>
                                        {beautician.distance !== undefined && (
                                            <span className="text-[0.6rem] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                                {beautician.distance} km
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-1 space-y-0.5">
                                        <div className="flex items-center gap-1 text-[0.6rem] text-gray-600">
                                            <HiUser className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                                            <span>{beautician.role || "Beautician"} • {beautician.experience}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[0.6rem] text-gray-600">
                                            <HiMapPin className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                                            <span className="truncate">{beautician.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!isLoadingData && sortedBeauticians.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <HiMagnifyingGlass className="w-4 h-4 text-gray-400" />
                            </div>
                            <h3 className="text-xs font-semibold text-gray-900">No results</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative order-1 lg:order-2 min-h-[180px] sm:min-h-[250px] lg:min-h-[350px] flex-shrink-0">
                <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    style={{ height: "100%", width: "100%", minHeight: "180px", minWidth: "100%" }}
                    className="z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
                        <Marker position={userLocation} icon={UserIcon}>
                            <Popup className="custom-popup">
                                <div className="p-2 text-center">
                                    <div className="font-bold text-blue-600 text-base">You are here</div>
                                    <div className="text-xs text-gray-500 mt-1">Search Location</div>
                                </div>
                            </Popup>
                        </Marker>
                    )}

                    {/* Beautician Markers */}
                    {sortedBeauticians.map((beautician) => (
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
    );
}
