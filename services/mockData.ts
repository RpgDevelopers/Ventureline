import { Campsite, Destination, Amenity } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Yosemite Valley',
    location: 'California, USA',
    image: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: '2',
    name: 'Blue Ridge',
    location: 'Virginia, USA',
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249f20b6?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: '3',
    name: 'Swiss Alps',
    location: 'Bernese Oberland, CH',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=2070'
  },
  {
    id: '4',
    name: 'Lake Louise',
    location: 'Banff, Canada',
    image: 'https://images.unsplash.com/photo-1536637706725-c96e9916d664?auto=format&fit=crop&q=80&w=2070'
  }
];

export const INITIAL_CAMPSITES: Campsite[] = [
  {
    id: 'p1',
    name: 'Wildflower Meadow Stays',
    location: 'Glacier National Park, MT',
    rating: 4.9,
    reviews: 120,
    price: 125,
    tags: ['WiFi', 'Fresh Water', 'Power'],
    isEco: true,
    image: 'https://images.unsplash.com/photo-1496545672479-7ac37b9698a7?auto=format&fit=crop&q=80&w=2070',
    description: 'Nestled in a vibrant meadow of wildflowers with a backdrop of snow-capped peaks, this eco-friendly stay offers the perfect blend of nature and comfort. Enjoy solar-powered amenities and fresh mountain spring water.',
    amenities: ['Solar Power', 'Spring Water', 'Composting Toilet', 'Fire Pit', 'Hiking Trails']
  },
  {
    id: 'p2',
    name: 'The Pine Cone A-Frame',
    location: 'Catskill Mountains, NY',
    rating: 5.0,
    reviews: 42,
    price: 210,
    tags: ['Firepit', 'Kitchen', 'Heater'],
    isNew: true,
    image: 'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&q=80&w=2070',
    description: 'A modern A-frame cabin tucked away in the Catskills. Features a full chef\'s kitchen, wood-burning stove, and floor-to-ceiling windows for stargazing from the comfort of your bed.',
    amenities: ['Full Kitchen', 'Wood Stove', 'Hot Water', 'WiFi', 'Deck']
  },
  {
    id: 'p3',
    name: 'Lakeside Wilds',
    location: 'Desolation Wilderness, CA',
    rating: 4.7,
    reviews: 215,
    price: 45,
    tags: ['Kayaks', 'Trails', 'Pets'],
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=2070',
    description: 'Primitive camping at its finest right on the water\'s edge. Launch your kayak from your site or hike the surrounding granite peaks. Pets are welcome!',
    amenities: ['Kayak Launch', 'Bear Box', 'Picnic Table', 'Pit Toilet']
  },
  {
    id: 's1',
    name: 'Emerald Bay Viewpoints',
    location: 'South Lake Tahoe, CA',
    image: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&q=80&w=2070',
    rating: 4.9,
    reviews: 128,
    price: 75,
    tags: ['Near Lake', 'Electric Hookup', 'RV/Tent'],
    coordinates: { top: '35%', left: '45%' },
    description: 'Commanding views of Emerald Bay. This site offers electric hookups and spacious pads suitable for RVs or large tents. A short hike to Vikingsholm.',
    amenities: ['Electric Hookup', 'Dump Station', 'Showers', 'Amphitheater']
  },
  {
    id: 's2',
    name: 'Pine Grove Retreat',
    location: 'Tahoe City, CA',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2070',
    rating: 4.7,
    reviews: 84,
    price: 42,
    tags: ['Pet Friendly', 'Showers'],
    coordinates: { top: '55%', left: '30%' },
    description: 'A quiet, forested retreat away from the crowds. Simple amenities and a peaceful atmosphere make this perfect for relaxation.',
    amenities: ['Hot Showers', 'Flush Toilets', 'Group Sites', 'Pet Walk']
  },
  {
    id: 's3',
    name: 'Whispering Pines Cabin',
    location: 'Kings Beach, CA',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=2070',
    rating: 4.9,
    reviews: 42,
    price: 185,
    tags: ['Wi-Fi', 'Fire Pit'],
    coordinates: { top: '20%', left: '65%' },
    description: 'Luxury cabin living near the beach. Includes high-speed WiFi for remote work and a private fire pit for evening smores.',
    amenities: ['High-speed WiFi', 'Private Fire Pit', 'Queen Bed', 'Coffee Maker']
  },
  {
    id: 'y1',
    name: 'Half Dome Village',
    location: 'Yosemite Valley, CA',
    image: 'https://images.unsplash.com/photo-1549821703-d227d8ce08e3?auto=format&fit=crop&q=80&w=2070',
    rating: 4.8,
    reviews: 320,
    price: 150,
    tags: ['Canvas Tents', 'Heated', 'Dining'],
    description: 'Iconic canvas tent cabins right in the heart of the valley beneath Half Dome. A historic and communal atmosphere.',
    amenities: ['Heated Tents', 'Pizza Deck', 'Grocery Store', 'Shuttle Stop']
  }
];

export const AMENITIES: Amenity[] = [
  { icon: 'pets', title: 'Pet Friendly', description: 'Bring your furry companions along for the hike.' },
  { icon: 'eco', title: 'Eco-Conscious', description: 'Sustainable practices and minimal trace sites.' },
  { icon: 'wifi', title: 'Remote Ready', description: 'High-speed satellite internet for nomads.' },
  { icon: 'local_fire_department', title: 'Campfire Sites', description: 'Designated pits and ready-to-use firewood.' },
];