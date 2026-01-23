import { Campsite, Destination, Amenity } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Yosemite Valley',
    location: 'California, USA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCFImhc2ZeCFd1iTwypp91B7NGzV-mtmwT_HDrmzD83jyvU1QWrCS7ksZ8NJvU_2nfA4rplFTowgGX6g3bnoXlxEtOsjWDusnAFA5h2X1NDI1oYXf7-B6PI0h9p42JzF-oG7kn7Kn9B4QFtU2MNC7JXZYPuDPJF7zbUI-IE_KvX_8FbEervIbMXL8tyIhL1N8MiB7EjblWuqfMDbNsh9klIZRSoqh5GkCEbXwfiQWhzE8worA4kjeL7-jnbrMiJLISDETuVRHQdmCK'
  },
  {
    id: '2',
    name: 'Blue Ridge',
    location: 'Virginia, USA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5X4JWkLoLmusze9XibK9z1l2wNxFMJgTbaeyjAB38cH6tHlIxJXyE0BSQGWJtlueIpwn11nvlewR9qwXXAqU9MxV-UoMdaX8z6zP7k4hnl_-3MlJLlnx-X588hlJRgca_AhCtk_9vKUpJc19GvF8CBNK4Wf4qOg_vhKjmqiozidzWzI3u8NkNbs63GcMJZupZ6dr4OL_fNJqQFBAXgcT9aTWE1maKMbtcuvw445XaBLe8441eQgyLPYCG7p_B5ti8Z9m79_Z_2N0'
  },
  {
    id: '3',
    name: 'Swiss Alps',
    location: 'Bernese Oberland, CH',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5_UKu6EpJYdrsBhRGSWypOHjOrJJOH2PP7Q7xjnopoEL47x6iuo350KjaefCkZHR4vEER0doZoiVVIdtPOsYCSegPm_Bi6A-jSwtYWATNtOkJpDpjt5Pc6Lx9OpLSTiaM_K9J-TjpQ1b_QNSs1XjsuZWdLkeJcZIFGQ23g49-YZk6-FN4ZUtJewEdS6yKu6u3-okqTZKiv5OURa0slHkTGVXbDGG-qnP2JSZGLqScP73sT1uWQBj_XF2fjAt3To0HGkmS4xWbd1kM'
  },
  {
    id: '4',
    name: 'Lake Louise',
    location: 'Banff, Canada',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkJLGMyJFzYZNwEJjQCzojYoI3v6az6MfT1ngMfk2Blz5cAxCzZFQu6uNhAaFfJFpxnMC0OmLfxvWd0GUr6fe2U_JvOpuyUx7EnbzB-kicLK7vwVD8t0NM5vuZ-6ij9HhyGjk0Kr5UPRTb71BDKbFLUg2eETZsTIT0q8dR3yutSS0PquPTwzJ139qR29dA-KFcUsDJtLJXN9lkXZZx4gf5aW1EUhw9f153O51pxXEmzjd9ibpG__wiHG_NvxoYl3tS42a8oLpuDsfr'
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxpKN_yJO418JFYYpQsflSbSfXugTwOaIcXy-ci18qwfxmDs_TidgwqngmHiuAHEYFNCC5luFVBQ8ODz3CdbwJGHQMZcf0wny8C0NSmEcT1gvJn8NdtGpvo3tugUxEBDbz1yCeDGOO0kBneE8iLKvAPGd3yzjLGqBZPfMj9qXmFUyx4t2lKo-tcrsxYDOEGMSiXzUo9cpA5adKXByE1Ua0AjIioXSlw5ghyvBH8vBTWd9vq2R4eO5TZmfTClopjU2zy-tj6PtQTupk',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjqa7hVJhIPTJjM0vi6dkp3bW4JEEvRfUQ9UqE9UwJY44NvmyCRDuOt0uRqa1wWIJlFI8JvBgHx24gwvq9t_qcgPlE1nWkll44THBz7fBZ5DX0ZLsOJcw0-QJaEVdTSfHBQ50Gq3f_D6RAL6ZJFn-sxJCJgmK3CeAPy6qpX9ORyT80Rqt2-Qi2xtxeBIkLEs6eYquaMOYRA6jXWrXHRuX7gAjNI45h9T4jwCyDaQ9eVSJ_j9IKBwpgQbJHSqYdcCKq56gvmW1X9ugS',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDISNq28xfc3ZWGlM1r6Pd5xnwIAnnulfWaWWaxfYzZg9lhV2CegYWjehvGCEi6xEfSo0N2_MtVNTdsGrjccb1_oFYgN277fcIrQ6yA-QhQxLBJQxA7eX2oetiLpThDjt9V7YpfxbW8W0N5cgapH-I3AtbMNqSFJQK_EI5BJVetPl5c5AwHaUPUwO_S2QLgBqZ-Fbk4glZPezrtM8DtK5vMfT0dWg498ZIm7ka4K2ob5lzux2yi_75yYjuA4mXHbSsq8bukPoGUBHgR',
    description: 'Primitive camping at its finest right on the water\'s edge. Launch your kayak from your site or hike the surrounding granite peaks. Pets are welcome!',
    amenities: ['Kayak Launch', 'Bear Box', 'Picnic Table', 'Pit Toilet']
  },
  {
    id: 's1',
    name: 'Emerald Bay Viewpoints',
    location: 'South Lake Tahoe, CA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt_zCRgoYO0CPzOx6IB_JM_01su9mqURjcY99L41gVT0VnP3YaXoYCniIhVlzcK1Plw4tFbTJqqj45Un7Yi9p0kwb6eb5brPDG6L0ZvvTZ4MFWBXvpc9YDkw0NbyTm9vBHn_CFNU7DeASDvstC-BVa3HIEsibhrHopklMkJF5UmI4-v7BAfsfXrp-_cJCQCe9lEPxP4XZZkFDSp9CVLhoL65h33dLHTlM7_QSHwBrrReQI3ydAAxe_McACwSJSZ5fr2Hg4qHLoj-mR',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuQXJGD7fdxvDqnqwmoGNuTH2r7AkWJvJpQRqwxbue66PS5v7xsIbSxFwnYQZlPMVew9q7C9c7fZYQ6RzQN0Ok0p4dsKxohSHkTRwLJGC9PbJOm-giLMcVmn3MaIYURzeNxEkGGkcbTuAzDfZ2HAA6sRs7bVa_-_LFY8ca2PLLcxgaS5MrBu8sjf95K1ZSNsnt0xG_J_Y_3SBcQDyCLWk_A26A1ta0X5o9iqhU9c5CfbhdOvjDaMz6ewFTNrKLc-A9kIBGlyBrND3',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7_9vp3gKuc2aamFAIkt2-pB1_wmoCw8LrN_gpwmOyjCcCh5nRbKkxOIzI1J7ZNEyyJda040_S8jHfaSKsBt0V7VwBvRm-t2Sktr8LNQoDbl4LQGLaelCoMS1xlSrFIeA4q0OqwqMfOkTQkRbPVMiCB_8sUOP0Bp46AEojsCrzX0tSo9u0z-h4C_Eabv-Vyr7en--8hgj9uMe34QTy5cLauIWiWuDr2ljryK23d6VofgXOipZmzIKg-6ZaJ03rQNBVXoz2Ab82IV25',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCFImhc2ZeCFd1iTwypp91B7NGzV-mtmwT_HDrmzD83jyvU1QWrCS7ksZ8NJvU_2nfA4rplFTowgGX6g3bnoXlxEtOsjWDusnAFA5h2X1NDI1oYXf7-B6PI0h9p42JzF-oG7kn7Kn9B4QFtU2MNC7JXZYPuDPJF7zbUI-IE_KvX_8FbEervIbMXL8tyIhL1N8MiB7EjblWuqfMDbNsh9klIZRSoqh5GkCEbXwfiQWhzE8worA4kjeL7-jnbrMiJLISDETuVRHQdmCK',
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
