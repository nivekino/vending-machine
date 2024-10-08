export interface Product {
  id: string;
  name: string;
  preparation_time: number;
  thumbnail: string;
  [key: string]: string | number | boolean;
}
