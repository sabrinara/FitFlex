export type TProduct = {
  _id: string;
  name: string;
  image: string;
  category: string[];  
  price: number;
  quantity: number;
  description: string;
  createdAt: string; 
};


export type TOrderProduct = {
  productId: string;   
  name: string;
  image: string;
  description: string;
  quantity: number;
  price: number;
};


export type TOrders = {
  _id: string;
  name: string;
  email: string;
  userImage: string;
  address: string;
  phoneNumber: string;
  products: TOrderProduct[];  
  createdAt: string;
}
