export const products = [
  {
    id: "aura-soundlink",
    name: "Aura SoundLink Max",
    tagline: "Studio-Grade Active Noise Cancelling Headphones",
    description: "Experience sound in its purest form. The Aura SoundLink Max features hybrid active noise cancellation, custom-engineered 40mm dynamic drivers, and an ultra-premium memory foam design wrapped in breathable fabric. Enjoy up to 40 hours of lossless audio playback on a single charge.",
    price: 349.99,
    category: "audio",
    rating: 4.8,
    reviewCount: 142,
    images: [
      "/assets/soundlink_black.png",
      "/assets/soundlink_silver.png"
    ],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
      { name: "Lunar Silver", hex: "#d1d5db" }
    ],
    features: [
      "Hybrid Active Noise Cancellation (ANC)",
      "High-Fidelity Lossless Audio via Bluetooth 5.3",
      "Up to 40 Hours Battery Life with Quick Charge",
      "Ergonomic Memory Foam Earcups",
      "Dual Beamforming Microphones for Crystal Clear Calls"
    ],
    specs: {
      "Driver Size": "40 mm Dynamic",
      "Frequency Response": "10Hz - 40kHz",
      "Connectivity": "Bluetooth 5.3 / 3.5mm Aux",
      "Battery Life": "Up to 40 hours (ANC off) / 30 hours (ANC on)",
      "Charging Port": "USB-C (Fast Charge: 10 mins = 5 hours)"
    },
    stock: 12,
    featured: true
  },
  {
    id: "aura-watch-elite",
    name: "Aura Watch Elite",
    tagline: "Titanium Smartwatch with Always-On AMOLED",
    description: "The ultimate companion for the modern lifestyle. Crafted from aerospace-grade titanium with a scratch-resistant sapphire crystal face, the Aura Watch Elite combines timeless aesthetics with state-of-the-art health tracking, GPS metrics, and an always-on display that lasts up to 7 days.",
    price: 429.99,
    category: "wearables",
    rating: 4.9,
    reviewCount: 98,
    images: [
      "/assets/watch_titanium.png",
      "/assets/watch_stealth.png"
    ],
    colors: [
      { name: "Raw Titanium", hex: "#a1a1aa" },
      { name: "Stealth Black", hex: "#09090b" }
    ],
    features: [
      "Aerospace-Grade Titanium Casing",
      "Advanced Heart Rate & SpO2 Biometrics",
      "Built-in Precision Dual-Frequency GPS",
      "Always-On AMOLED Display",
      "Up to 7 Days Battery Life on a Single Charge"
    ],
    specs: {
      "Case Size": "45 mm",
      "Display": "1.43 inch AMOLED (466x466 px)",
      "Water Resistance": "5ATM (up to 50 meters)",
      "Sensors": "Optical HR, Accelerometer, Gyroscope, Barometer, SpO2",
      "Battery": "450 mAh (Up to 7 days normal use)"
    },
    stock: 8,
    featured: true
  },
  {
    id: "aura-desk-stand",
    name: "Aura MagSafe Desk Stand",
    tagline: "Solid Walnut Wood Dual-Device Charger",
    description: "Elevate your desk workspace. Hand-milled from premium North American walnut wood and weighted with a solid zinc base, this charger supports simultaneous MagSafe fast wireless charging for your phone and earbuds. Its minimal geometric silhouette brings natural warmth to any desk setup.",
    price: 119.99,
    category: "desk",
    rating: 4.7,
    reviewCount: 64,
    images: [
      "/assets/desk_stand_walnut.png",
      "/assets/desk_stand_oak.png"
    ],
    colors: [
      { name: "North American Walnut", hex: "#5c4033" },
      { name: "White Oak", hex: "#d2b48c" }
    ],
    features: [
      "15W Fast Wireless MagSafe Charger",
      "Dual Device Charging (Phone + AirPods)",
      "Precision Weighted Solid Metallic Base",
      "Genuine Sustainably Sourced Hardwood",
      "Anti-Slip Silicon Base Padding"
    ],
    specs: {
      "Material": "Solid Walnut / White Oak & Zinc Alloy",
      "Wireless Output": "15W (Phone) / 5W (Earbuds)",
      "Input": "USB-C (requires 20W+ power adapter)",
      "Dimensions": "140mm x 90mm x 120mm",
      "Weight": "620 grams"
    },
    stock: 25,
    featured: true
  },
  {
    id: "aura-prism-orb",
    name: "Aura Prism Orb",
    tagline: "Smart Ambient Light with Dynamic Gradients",
    description: "Paint your room in color. The Aura Prism Orb is an app-controlled smart light fixture that delivers smooth, customizable multi-color ambient lighting. With a frosted glass shade, sound-reactive music syncing, and built-in wake-up alarm light cycles, it creates the perfect atmosphere for work, sleep, or play.",
    price: 89.99,
    category: "lighting",
    rating: 4.6,
    reviewCount: 112,
    images: [
      "/assets/prism_orb_on.png",
      "/assets/prism_orb_off.png"
    ],
    colors: [
      { name: "Frosted Glow", hex: "#ffffff" },
      { name: "Basalt Grey", hex: "#4b5563" }
    ],
    features: [
      "16 Million Colors with Dynamic Gradients",
      "Mobile App & Smart Home Voice Integration",
      "Sound-Reactive Music Synced Patterns",
      "Circadian Sleep/Wake Alarm Sequences",
      "Touch-Sensitive Tap Control Base"
    ],
    specs: {
      "Brightness": "800 Lumens (60W equivalent)",
      "Color Temp": "2000K - 6500K (Tunable White) + RGB",
      "Connectivity": "Wi-Fi 2.4GHz / Bluetooth 5.0",
      "Dimensions": "150mm Diameter Sphere",
      "Power Source": "DC 12V adapter (included)"
    },
    stock: 18,
    featured: false
  },
  {
    id: "aura-studio-bar",
    name: "Aura Studio Bar",
    tagline: "Minimalist Wood-Grain Smart Soundbar",
    description: "Compact size, room-filling sound. The Aura Studio Bar features a quad-speaker array with dual passive radiators, wrapped in an elegant acoustic fabric and accented by real wood panels. Supports Dolby Atmos, HDMI eARC, and seamless wireless streaming via AirPlay and Spotify Connect.",
    price: 279.99,
    category: "audio",
    rating: 4.7,
    reviewCount: 53,
    images: [
      "/assets/studio_bar_walnut.png",
      "/assets/studio_bar_black.png"
    ],
    colors: [
      { name: "Walnut Trim", hex: "#7c2d12" },
      { name: "Piano Black", hex: "#0f172a" }
    ],
    features: [
      "Dolby Atmos Surround Audio Decoders",
      "HDMI eARC & Optical Inputs",
      "Quad Neodymium Drivers + Dual Subwoofers",
      "AirPlay 2, Chromecast, & Bluetooth Streaming",
      "Automatic Room Calibration Smart Audio"
    ],
    specs: {
      "Total Power": "120W RMS",
      "Audio Formats": "Dolby Atmos, Dolby Digital, DTS Digital Surround",
      "Inputs": "1 x HDMI eARC, 1 x Optical, 1 x Aux 3.5mm",
      "Wireless": "Wi-Fi & Bluetooth 5.2",
      "Dimensions": "650mm x 65mm x 95mm"
    },
    stock: 5,
    featured: false
  },
  {
    id: "aura-desk-mat",
    name: "Aura Merino Wool Desk Mat",
    tagline: "Ultra-Soft Minimalist Felt Desk Mat",
    description: "Add texture and comfort to your workspace. Crafted from 100% natural Merino wool felt, the Aura Desk Mat protects your desktop, reduces acoustic echo, and provides a smooth surface for your mouse and keyboard. Stitched edges prevent fraying, and a natural cork backing keeps the mat firmly in place.",
    price: 59.99,
    category: "desk",
    rating: 4.8,
    reviewCount: 154,
    images: [
      "/assets/desk_mat_grey.png",
      "/assets/desk_mat_charcoal.png"
    ],
    colors: [
      { name: "Slate Grey", hex: "#9ca3af" },
      { name: "Charcoal Black", hex: "#374151" }
    ],
    features: [
      "100% Sourced Natural Merino Wool Felt",
      "Non-Slip Natural Cork Padding Underlay",
      "Precision Stitched Anti-Fray Borders",
      "Soft Acoustic Dampening Cushioning",
      "Water-Resistant Coating Shield"
    ],
    specs: {
      "Material": "100% Merino Wool Felt & Cork",
      "Dimensions": "900mm x 400mm (Extra Large)",
      "Thickness": "4 mm",
      "Cleaning": "Spot clean with damp cloth",
      "Texture": "Premium soft textured feel"
    },
    stock: 30,
    featured: false
  }
];
