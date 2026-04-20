/**
 * CAR DATA STRUCTURE
 * 
 * To add a 3D model showcase for any car:
 * 1. Place your .glb/.gltf 3D model file in /public/models/ folder
 * 2. Add these fields to the car object:
 *    - model3D: "/models/yourmodel.glb" (path to 3D model)
 *    - specifications: [ { label: "Engine", value: "Your value" }, ... ]
 *    - rating: 4.8 (optional, defaults to 4.8)
 * 
 * Example:
 * {
 *   id: 10,
 *   name: "Car Name",
 *   model: "Model Name",
 *   model3D: "/models/carname.glb",  // ADD THIS for 3D showcase
 *   specifications: [...],            // ADD THIS for specs display
 *   rating: 4.9,                      // OPTIONAL
 *   ... other fields ...
 * }
 * 
 * Access the 3D showcase at: /car-3d/{id}
 */

// Ensure each car object includes a 'brand' property for filtering
const carsData = [
  {
    id: 1,
    name: "BMW M8",
    brand: "BMW",
    model: "M8 Competition",
    pricePerDay: 500,
    pricePerWeek: 3000,
    pricePerMonth: 12000,
    image: "https://ac-schnitzer-cdn.de/media/image/12/0d/1f/M8_Cabrio_Aufmacher_3500x1400.jpg",
    previewImage: "https://ac-schnitzer-cdn.de/media/image/12/0d/1f/M8_Cabrio_Aufmacher_3500x1400.jpg",
    images: [
      "https://i.ytimg.com/vi/yHe057Htoos/maxresdefault.jpg",
      "https://ac-schnitzer-cdn.de/media/image/12/0d/1f/M8_Cabrio_Aufmacher_3500x1400.jpg",
      "https://www.bmwusa.com/content/dam/bmw/marketUS/common/vehicles/2024/my25/m-models/m8-gran-coupe/overview/mobile/BMW-MY25-8Series-M8-GranCoupe-Overview-Makeityours-01-Mobile.jpg",
      "https://www.bmw.co.za/content/dam/bmw/common/all-models/m-series/m8-coupe/2022/onepager/bmw-m8-coupe-onepager-sp-desktop.jpg",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      
    ],
    description: "Experience the pinnacle of German engineering with the BMW M8 Competition. This high-performance coupe delivers unmatched power and luxury.",
    features: ["V8 Engine", "All-Wheel Drive", "Carbon Fiber Interior", "Adaptive Suspension"]
  },
  {
    id: 2,
    name: "Ferrari 488",
    brand: "Ferrari",
    model: "488 Spider",
    pricePerDay: 800,
    pricePerWeek: 4800,
    pricePerMonth: 19200,
    image: "https://wallpapers.com/images/hd/sports-car-ferrari-red-aesthetic-p5z8rqi6637lswui.jpg",
    previewImage: "https://wallpapers.com/images/hd/sports-car-ferrari-red-aesthetic-p5z8rqi6637lswui.jpg",
    images: [
      "https://wallpapers.com/images/hd/sports-car-ferrari-red-aesthetic-p5z8rqi6637lswui.jpg",
      "https://images.unsplash.com/photo-1572817519569-3e7f5f7a0b0c?w=800&q=80",
      "https://images.unsplash.com/photo-1572817519569-3e7f5f7a0b0c?w=800&q=80",
      "https://images.unsplash.com/photo-1572817519569-3e7f5f7a0b0c?w=800&q=80"
    ],
    description: "Unleash Italian performance with the Ferrari 488 Spider. A convertible supercar that combines breathtaking speed with open-top exhilaration.",
    features: ["V8 Turbo Engine", "Retractable Hardtop", "Carbon Ceramic Brakes", "Race-Inspired Aerodynamics"]
  },
  {
    id: 3,
    name: "Lamborghini Huracan Evo",
    brand: "Lamborghini",
    model: "Huracan Evo",
    pricePerDay: 900,
    pricePerWeek: 5400,
    pricePerMonth: 21600,
    image: "https://www.thesupercarblog.com/wp-content/uploads/2023/03/lamborghini-revuelto-foto-2023.jpg",
    previewImage: "https://www.thesupercarblog.com/wp-content/uploads/2023/03/lamborghini-revuelto-foto-2023.jpg",
    images: [
      "https://www.thesupercarblog.com/wp-content/uploads/2023/03/lamborghini-revuelto-foto-2023.jpg",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&q=80",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&q=80",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&q=80"
    ],
    description: "Bold Italian power meets cutting-edge technology in the Lamborghini Huracan Evo. A masterpiece of design and performance.",
    features: ["V10 Engine", "All-Wheel Drive", "Carbon Fiber Monocoque", "Lamborghini Dinamica Veicolo Integrata"]
  },
  {
    id: 4,
    name: "McLaren 720S",
    brand: "McLaren",
    model: "720S",
    pricePerDay: 1000,
    pricePerWeek: 6000,
    pricePerMonth: 24000,
    image: "https://media.wired.com/photos/666cbf0af5515d48d3df57fe/191:100/w_1280,c_limit/McLaren_Artura_Spider-Monaco-238.JPG",
    previewImage: "https://media.wired.com/photos/666cbf0af5515d48d3df57fe/191:100/w_1280,c_limit/McLaren_Artura_Spider-Monaco-238.JPG",
    images: [
      "https://media.wired.com/photos/666cbf0af5515d48d3df57fe/191:100/w_1280,c_limit/McLaren_Artura_Spider-Monaco-238.JPG",
      "https://images.unsplash.com/photo-1544829099-b9a0c07f8dda?w=800&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07f8dda?w=800&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07f8dda?w=800&q=80"
    ],
    description: "Cutting-edge British speed redefined. The McLaren 720S offers supercar performance with everyday usability.",
    features: ["V8 Twin-Turbo Engine", "Carbon Fiber Chassis", "Dihedral Doors", "Airbrake System"]
  },
  {
    id: 7,
    name: "Range Rover Velar",
    brand: "Range Rover",
    model: "Velar",
    pricePerDay: 550,
    pricePerWeek: 3300,
    pricePerMonth: 13200,
    image: "https://fi-exhaust.es/wp-content/uploads/2023/04/Range-Rover-Velar-2023-Wild.jpg",
    previewImage: "https://fi-exhaust.es/wp-content/uploads/2023/04/Range-Rover-Velar-2023-Wild.jpg",
    images: [
      "https://fi-exhaust.es/wp-content/uploads/2023/04/Range-Rover-Velar-2023-Wild.jpg",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    ],
    description: "Elegance meets off-road prowess in the Range Rover Velar. A luxury SUV that adapts to any terrain with style.",
    features: ["V6 Engine", "All-Terrain Progress Control", "Panoramic Sunroof", "Premium Leather Interior"]
  },
  {
    id: 8,
    name: "Rolls-Royce Dawn",
    brand: "Rolls-Royce",
    model: "Dawn",
    pricePerDay: 1500,
    pricePerWeek: 9000,
    pricePerMonth: 36000,
    image: "https://www.topgear.com/sites/default/files/cars-car/image/2023/07/LIPMAN_JL93884_0.jpg?w=1280&h=720",
    previewImage: "https://www.topgear.com/sites/default/files/cars-car/image/2023/07/LIPMAN_JL93884_0.jpg?w=1280&h=720",
    images: [
      "https://www.topgear.com/sites/default/files/cars-car/image/2023/07/LIPMAN_JL93884_0.jpg?w=1280&h=720",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
    ],
    description: "Timeless British grandeur embodied in the Rolls-Royce Dawn. The ultimate in luxury and refinement.",
    features: ["V12 Engine", "Convertible Top", "Starlight Headliner", "Bespoke Interior Options"]
  },
  {
    id: 5,
    name: "Mercedes-Benz G-Wagon",
    brand: "Mercedes-Benz",
    model: "G-Class (G63 AMG)",
    pricePerDay: 100,
    pricePerWeek: 3600,
    pricePerMonth: 14400,
    image: "https://www.mercedes-amg.com/media/images/7fd409d711a1f70473c2658034d201b989610946-1920x1080.jpg?auto=format&fit=max&q=75&w=1330",
    previewImage: "https://images.unsplash.com/photo-1759505738499-8c9b26c1b7e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1759505738499-8c9b26c1b7e7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1648413653877-ade5eefd2f1b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      
    ],
    description: "Experience unparalleled luxury and capability with the iconic Mercedes-Benz G-Wagon. This legendary SUV combines timeless design, commanding presence, and off-road prowess with cutting-edge technology and premium comfort.",
    features: [
      "4.0L V8 Twin-Turbo Engine",
      "4x4 Intelligent Drive System",
      "Adaptive Air Suspension",
      "Panoramic Sunroof",
      "Burmester Sound System",
      "Premium Leather Interior",
      "Heated Seats & Steering Wheel",
      "Advanced Driver Assistance"
    ],
    model3D: "/models/gwagon.glb",
    specifications: [
      { label: "Engine", value: "4.0L V8 Twin-Turbo" },
      { label: "Power", value: "585 HP" },
      { label: "Torque", value: "627 lb-ft" },
      { label: "Transmission", value: "9-Speed Automatic" },
      { label: "0-60 mph", value: "4.5 seconds" },
      { label: "Top Speed", value: "130 mph" },
      { label: "Seating", value: "5 Passengers" },
      { label: "Wheels", value: "21-inch Sport Alloys" },
      { label: "Fuel Type", value: "Premium" },
      { label: "Year", value: "2024" }
    ],
    rating: 4.9
  },
  {
    id: 6,
    name: "BMW M4",
    brand: "BMW",
    model: "M4 Competition",
    pricePerDay: 85,
    pricePerWeek: 3000,
    pricePerMonth: 12000,
    image: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80",
    previewImage: "https://images.unsplash.com/photo-1728060838342-cb9744a27d1b?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1724391114112-c83ad59f1d5f?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1724391114185-1e85caef78b3?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    description: "The ultimate driving machine. The BMW M4 Competition delivers an intoxicating blend of performance, precision, and luxury. With its iconic kidney grille, aggressive styling, and superb handling dynamics, this is pure automotive artistry.",
    model3D: "/models/bmwM4.glb",
    features: [
      "3.0L Twin-Turbo Straight-Six",
      "503 HP at 6,250 rpm",
      "Magic Blue Metallic Paint",
      "M Sport Suspension",
      "Carbon Fiber Accents",
      "Premium Leather Sport Seats",
      "Harman Kardon Sound System",
      "Head-Up Display"
    ],
    specifications: [
      { label: "Engine", value: "3.0L Twin-Turbo" },
      { label: "Power", value: "503 HP" },
      { label: "Torque", value: "479 lb-ft" },
      { label: "Transmission", value: "8-Speed Automatic" },
      { label: "0-60 mph", value: "3.9 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Seating", value: "5 Passengers" },
      { label: "Wheels", value: "20-inch M Forged" },
      { label: "Fuel Type", value: "Premium" },
      { label: "Year", value: "2024" }
    ],
    rating: 4.8,
    model3D: "/models/bmwM4.glb"
  }
];

export default carsData;