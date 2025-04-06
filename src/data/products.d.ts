export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'vegetable' | 'grain' | 'fruit';
  unit: string;
  quantity: number;
  farmer: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
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
