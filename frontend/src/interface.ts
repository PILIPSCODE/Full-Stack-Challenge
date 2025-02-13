export interface CustomerDetails {
  customer_id: number;
  customer_name: string;
  level: string;
  favorite_menu: string;
  total_transaction: number;
  products: ProductDetails[];
}

export interface ProductDetails {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}
