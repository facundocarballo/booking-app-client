import { Client } from "./Client";
import { Product } from "./Product";

export class Book {
  id: string;
  created_at: Date;
  date: Date;
  branch_id: string;
  client: Client;
  price: number;
  product_id: string;
  description?: string;

  // Constructor
  constructor(book: any) {
    this.id = book.id;
    this.created_at = new Date(book.created_at);
    this.date = new Date(book.date);
    this.branch_id = book.branch_id;
    this.client = new Client(book.Client);
    this.price = book.price;
    this.description = book.description;
    this.product_id = book.product_id;
  }

  static GetAllSpend(books: Book[]): number {
    let res = 0;
    for (const b of books) {
      res += b.price;
    }
    return res;
  }

  static GetProductsOccurrence(books: Book[], products: Product[]): number[] {
    let productsOcurrences: number[] = [];
    for (const _ of products) {
      productsOcurrences.push(0);
    }
    for (const book of books) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === book.product_id) {
          productsOcurrences[i]++;
          break;
        }
      }
    }
    return productsOcurrences;
  }
}
