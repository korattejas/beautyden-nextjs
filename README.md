# BeautyDen – Beauty Services \& Hiring Portal

A modern, mobile‑first Next.js app for at‑home beauty services and a career portal for beauty professionals.

## Features

- Dynamic services listing with category filter and booking CTAs.
- Hiring portal with filters: search, city, experience level.
- API integration (Test and Production servers).
- AES decryption for production payloads using provided Key/IV.
- React Query caching, loading skeletons, and error states.
- Tailwind CSS with utility cn helper and polished UI components.
- Modular folder structure with typed services and hooks.

## Tech Stack

- Next.js 13+ (App Router), React 18+, TypeScript
- Tailwind CSS, Framer Motion
- Axios, @tanstack/react-query
- CryptoJS (AES-CBC decrypt), clsx + tailwind-merge

## Environments

Create .env.local in the project root:

NEXT_PUBLIC_API_BASE_URL=https://laravel.beautyden.in/api
NEXT_PUBLIC_USE_TEST_API=false
NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY_APP=dedfKvDI6tKtuyjF5Flw\$
NEXT_PUBLIC_ENCRYPT_DECRYPT_IV_APP=8XaZuHt90sthLzCy

To use the Test server (unencrypted):
NEXT_PUBLIC_USE_TEST_API=true

## Scripts

- dev: Start development server
- build: Build production
- start: Run production build

Run:
npm install
npm run dev

## Folder Structure

src/
api/
api.ts
authapi.ts
endpoints.ts
app/
(marketing)/
services/page.tsx
hiring/page.tsx
layout.tsx
components/
hiring/
HiringHero.tsx
HiringFilters.tsx
HiringCard.tsx
HiringList.tsx
loading/
HiringCardSkeleton.tsx
ServiceCardSkeleton.tsx
ServiceGridSkeleton.tsx
ServiceFilterSkeleton.tsx
services/
ServiceHero.tsx
ServiceFilter.tsx
ServiceCard.tsx
ServiceGrid.tsx
ui/
Button.tsx
Container.tsx
Skeleton.tsx
hooks/
useApi.ts
useDebounce.ts
services/
services.service.ts
categories.service.ts
hiring.service.ts
cities.service.ts
types/
hiring.ts
services.ts (optional, if you want strict types)
utils/
encryption.ts
lib/
utils.ts (cn helper)

## API Endpoints

- Services (Test): https://laravel.beautyden.in/api/Test/V1/services
- Services (Prod encrypted): https://laravel.beautyden.in/api/V1/services
- Hiring (Test): https://laravel.beautyden.in/api/Test/V1/hiring
- Hiring (Prod encrypted): https://laravel.beautyden.in/api/V1/hiring
- Cities (Test): https://laravel.beautyden.in/api/Test/V1/cities
- Cities (Prod encrypted): https://laravel.beautyden.in/api/V1/cities

Hiring filters are sent as query params:

- search=keyword
- city=CityName (e.g., Surat)
- experienceLevel=1|2|3

Example:
GET /V1/hiring?search=makeup\&city=Surat\&experienceLevel=2

## Key Files (copy/paste)

src/api/api.ts
import axios from 'axios';

const isTestEnv = process.env.NEXT_PUBLIC_USE_TEST_API === 'true';
const BASE_URL = isTestEnv
? 'https://laravel.beautyden.in/api/Test'
: 'https://laravel.beautyden.in/api';

const api = axios.create({
baseURL: BASE_URL,
headers: { 'Content-Type': 'application/json' },
timeout: 10000,
});

api.interceptors.response.use(
(res) => res,
(err) => Promise.reject(err)
);

export default api;

src/api/authapi.ts
import axios from 'axios';

const isTestEnv = process.env.NEXT_PUBLIC_USE_TEST_API === 'true';
const BASE_URL = isTestEnv
? 'https://laravel.beautyden.in/api/Test'
: 'https://laravel.beautyden.in/api';

const authApi = axios.create({
baseURL: BASE_URL,
headers: { 'Content-Type': 'application/json' },
timeout: 10000,
});

authApi.interceptors.request.use((config) => {
const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});

export default authApi;

src/api/endpoints.ts
export const endpoints = {
SERVICES: '/V1/services',
SERVICE_BY_ID: (id: string) => `/V1/services/${id}`,
CATEGORIES: '/V1/categories',
CATEGORY_BY_ID: (id: string) => `/V1/categories/${id}`,

HIRING: '/V1/hiring',
HIRING_APPLICATION: '/V1/hiring/apply',

CITIES: '/V1/cities',

LOGIN: '/auth/login',
REGISTER: '/auth/register',
LOGOUT: '/auth/logout',
PROFILE: '/auth/profile',
} as const;

src/utils/encryption.ts
import CryptoJS from 'crypto-js';

const KEY = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_KEY_APP || '';
const DEFAULT_IV = process.env.NEXT_PUBLIC_ENCRYPT_DECRYPT_IV_APP || '';

export const decryptData = (payload: string): any => {
const parts = payload.split(':');
if (parts.length !== 2) throw new Error('Invalid encrypted payload');

const cipher = parts;
const ivB64 = parts;[^1]

const key = CryptoJS.enc.Utf8.parse(KEY);
const iv = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(ivB64)) || DEFAULT_IV);

const decrypted = CryptoJS.AES.decrypt(cipher, key, {
iv,
mode: CryptoJS.mode.CBC,
padding: CryptoJS.pad.Pkcs7,
});

const text = decrypted.toString(CryptoJS.enc.Utf8);
if (!text) throw new Error('Malformed UTF-8 data');
try {
return JSON.parse(text);
} catch {
return text;
}
};

src/types/hiring.ts
export interface Hiring {
id: string;
title: string;
description: string;
city: string;
min_experience: string;
max_experience: string | null;
salary_range: string;
experience_level: string;
hiring_type: string;
gender_preference: string;
required_skills: string[];
is_popular: string;
experience_level_text: string;
hiring_type_text: string;
gender_preference_text: string;
}
export interface HiringResponse {
code: number;
status: boolean;
message: string;
data: Hiring[];
}
export interface HiringFilters {
search?: string;
city?: string;
experienceLevel?: string;
}
export interface City {
id: string;
name: string;
state: string;
area: string;
slug: string | null;
icon: string | null;
launch_quarter: string | null;
is_popular: string;
}
export interface CitiesResponse {
code: number;
status: boolean;
message: string;
data: City[];
}

src/services/hiring.service.ts
import api from '@/api/api';
import { endpoints } from '@/api/endpoints';
import { decryptData } from '@/utils/encryption';
import { HiringResponse, HiringFilters } from '@/types/hiring';

const qs = (filters: HiringFilters) => {
const p = new URLSearchParams();
if (filters.search) p.append('search', filters.search);
if (filters.city) p.append('city', filters.city);
if (filters.experienceLevel) p.append('experienceLevel', filters.experienceLevel);
return p.toString();
};

export const getHiring = async (filters: HiringFilters = {}): Promise<HiringResponse> => {
const query = qs(filters);
const url = query ? `${endpoints.HIRING}?${query}` : endpoints.HIRING;
const res = await api.get(url);
if (typeof res.data === 'string' \&\& res.data.includes(':')) {
return decryptData(res.data);
}
return res.data;
};

src/services/cities.service.ts
import api from '@/api/api';
import { endpoints } from '@/api/endpoints';
import { decryptData } from '@/utils/encryption';
import { CitiesResponse } from '@/types/hiring';

export const getCities = async (): Promise<CitiesResponse> => {
const res = await api.get(endpoints.CITIES);
if (typeof res.data === 'string' \&\& res.data.includes(':')) {
return decryptData(res.data);
}
return res.data;
};

src/hooks/useApi.ts
import { useQuery } from '@tanstack/react-query';
import { getHiring } from '@/services/hiring.service';
import { getCities } from '@/services/cities.service';
import { HiringFilters } from '@/types/hiring';

export const useHiring = (filters: HiringFilters = {}) => {
return useQuery({
queryKey: ['hiring', filters],
queryFn: () => getHiring(filters),
staleTime: 5 _ 60 _ 1000,
cacheTime: 10 _ 60 _ 1000,
});
};

export const useCities = () => {
return useQuery({
queryKey: ['cities'],
queryFn: getCities,
staleTime: 30 _ 60 _ 1000,
cacheTime: 60 _ 60 _ 1000,
});
};

src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';
export function useDebounce<T>(value: T, delay: number): T {
const [debounced, setDebounced] = useState<T>(value);
useEffect(() => {
const id = setTimeout(() => setDebounced(value), delay);
return () => clearTimeout(id);
}, [value, delay]);
return debounced;
}

src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

## ESLint and TypeScript

To allow any if needed:

- ESLint flat config: add rules: { "@typescript-eslint/no-explicit-any": "off" }
- tsconfig.json: set "noImplicitAny": false (or keep strict and prefer proper types)

## Contributing

Issues and PRs are welcome. Please follow conventional commits and include clear descriptions.

## License

## MIT

If a downloadable file is needed as an actual artifact, share a preferred delivery method (e.g., upload, gist link request), and a downloadable README.md will be provided accordingly.

<div style="text-align: center">⁂</div>

[^1]: https://laravel.beautyden.in/api/Test/V1/cities
