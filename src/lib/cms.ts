
import { Country, Service, City } from '@/types';
import { countries, services, cities } from '@/data/mockData';

// Simplified API functions using the consolidated data
export async function getCountries(): Promise<Country[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return countries;
}

export async function getServices(): Promise<Service[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return services;
}

export async function getCities(): Promise<City[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return cities;
}
