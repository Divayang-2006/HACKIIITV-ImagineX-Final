
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'vegetable' | 'grain' | 'fruit';
  unit: string;
  farmName: string;
  inStock: boolean;
  organic: boolean;
  quantity: number; // Added missing property
  farmerId?: string; // Added missing property
}

export interface SoilData {
  id: string;
  farmerId: string;
  farmName: string;
  soilType: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  organicMatter: number;
  location: string;
  date: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Carrots",
    description: "Sweet and crunchy carrots freshly harvested from our organic farm.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "vegetable",
    unit: "bunch",
    farmName: "Green Valley Farm",
    inStock: true,
    organic: true,
    quantity: 10,
    farmerId: "farmer-123"
  },
  {
    id: "2",
    name: "Red Bell Peppers",
    description: "Vibrant, juicy red bell peppers perfect for salads or roasting.",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "vegetable",
    unit: "each",
    farmName: "Sunshine Acres",
    inStock: true,
    organic: false,
    quantity: 15,
    farmerId: "farmer-456"
  },
  {
    id: "3",
    name: "Quinoa",
    description: "Nutrient-rich quinoa, a versatile grain for any meal.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "grain",
    unit: "500g",
    farmName: "Hill Heritage Grains",
    inStock: true,
    organic: true,
    quantity: 8,
    farmerId: "farmer-789"
  },
  {
    id: "4",
    name: "Broccoli",
    description: "Farm-fresh broccoli florets, rich in vitamins and minerals.",
    price: 2.25,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "vegetable",
    unit: "head",
    farmName: "Green Valley Farm",
    inStock: true,
    organic: true,
    quantity: 12,
    farmerId: "farmer-123"
  },
  {
    id: "5",
    name: "Brown Rice",
    description: "Wholesome brown rice grown using sustainable farming practices.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "grain",
    unit: "1kg",
    farmName: "River Valley Farms",
    inStock: true,
    organic: false,
    quantity: 20,
    farmerId: "farmer-321"
  },
  {
    id: "6",
    name: "Organic Spinach",
    description: "Tender organic spinach leaves, freshly harvested.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "vegetable",
    unit: "bunch",
    farmName: "Sunshine Acres",
    inStock: true,
    organic: true,
    quantity: 7,
    farmerId: "farmer-456"
  },
  {
    id: "7",
    name: "Fresh Tomatoes",
    description: "Juicy, ripe tomatoes, perfect for salads and cooking.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "vegetable",
    unit: "500g",
    farmName: "Meadow Brook Farm",
    inStock: true,
    organic: false,
    quantity: 18,
    farmerId: "farmer-654"
  },
  {
    id: "8",
    name: "Organic Oats",
    description: "Premium rolled oats grown with care for your healthy breakfast.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1614961233913-a5113a4b34dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "grain",
    unit: "750g",
    farmName: "Hill Heritage Grains",
    inStock: true,
    organic: true,
    quantity: 14,
    farmerId: "farmer-789"
  },
  {
    id: "9",
    name: "Fresh Cucumbers",
    description: "Crisp, hydrating cucumbers straight from our fields.",
    price: 1.75,
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "vegetable",
    unit: "each",
    farmName: "Green Valley Farm",
    inStock: true,
    organic: false,
    quantity: 25,
    farmerId: "farmer-123"
  },
  {
    id: "10",
    name: "Organic Apples",
    description: "Sweet and crisp apples, perfect for snacking.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fruit",
    unit: "kg",
    farmName: "Orchard Hills",
    inStock: true,
    organic: true,
    quantity: 15,
    farmerId: "farmer-987"
  },
  {
    id: "11",
    name: "Fresh Strawberries",
    description: "Sweet, juicy strawberries, freshly picked at peak ripeness.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1543528176-61b239494933?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fruit",
    unit: "punnet",
    farmName: "Berry Good Farm",
    inStock: true,
    organic: false,
    quantity: 10,
    farmerId: "farmer-876"
  },
  {
    id: "12",
    name: "Organic Blueberries",
    description: "Plump, sweet blueberries grown organically for maximum flavor.",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "fruit",
    unit: "punnet",
    farmName: "Berry Good Farm",
    inStock: true,
    organic: true,
    quantity: 8,
    farmerId: "farmer-876"
  }
];
