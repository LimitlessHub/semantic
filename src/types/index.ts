// ... (Country and City interfaces remain the same)

export interface Service {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  fullDescription: string;     // <-- ADD THIS LINE
  fullDescriptionAr: string;   // <-- ADD THIS LINE
  icon: string;
  basePrice: number;
  currency: string;
  estimatedDuration: string;
  estimatedDurationAr: string;
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  isEmergency: boolean;
  isActive: boolean;
  keywords: string[];
  availableCountries: string[];
}
