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

export interface TOrderProduct {
  _id?: string;        
  productId?: string;   
  name: string;
  image: string;
  quantity: number;
  price: number;
  description: string;
}


export type TOrders = {
  _id: string;
  name: string;
  email: string;
  userImage: string;
  address: string;
  phoneNumber: string;
  total: number;
  products: TOrderProduct[];
  createdAt: string;
};


