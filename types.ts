export interface Campsite {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  tags: string[];
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