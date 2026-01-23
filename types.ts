export interface Campsite {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  tags: string[];
  description?: string;
  amenities?: string[];
  isNew?: boolean;
  isEco?: boolean;
  coordinates?: { top: string; left: string }; // For map mock
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface Booking {
  id: string;
  campsiteId: string;
  campsiteName: string;
  campsiteImage: string;
  campsiteLocation: string;
  dates: string;
  guests: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  bookedAt: string;
}
