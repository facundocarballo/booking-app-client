import {
  convertStringToTime,
  getTimeString,
  incrementTime,
} from "../handlers/dates";
import supabase from "../supabase";
import { ENTITIES } from "../supabase/entities";
import { Book } from "./book";
import { Product } from "./product";

export interface SearchBranchQuery {
  category_id: string;
  Branch: Branch[];
}

export class Branch {
  id: string;
  created_at: Date;
  business_id: string;
  name: string;
  geogash: string;
  latitude: string;
  longitude: string;
  open: Date;
  close: Date;
  time_book: Date;
  description?: string;

  constructor(branch: Branch) {
    this.id = branch.id;
    this.created_at = branch.created_at;
    this.business_id = branch.business_id;
    this.name = branch.name;
    this.geogash = branch.geogash;
    this.latitude = branch.latitude;
    this.longitude = branch.longitude;
    this.open = convertStringToTime(branch.open);
    this.close = convertStringToTime(branch.close);
    this.time_book = convertStringToTime(branch.time_book);
    this.description = branch.description;
  }

  // Methods

  /// Create
  async CreateProduct(
    name: string,
    description: string,
    price: number,
    photo_url: string
  ): Promise<boolean> {
    try {
      await supabase.from(ENTITIES.product).insert({
        name,
        description,
        price,
        photo_url,
        branch_id: this.id,
      });
    } catch (err) {
      console.error(`Error creating the product for ${this.name}. `, err);
      return false;
    }
    return true;
  }

  /// Get
  async GetProducts(): Promise<Product[]> {
    let products: Product[] = [];
    try {
      const res = await supabase
        .from(ENTITIES.product)
        .select()
        .eq("branch_id", this.id);
      if (res.data === null) return products;
      for (const p of res.data) {
        products.push(new Product(p));
      }
    } catch (err) {
      console.error("Error getting the products of this branch. ", err);
      return products;
    }
    return products;
  }

  async GetBusyBooks(date: Date): Promise<Book[]> {
    let books: Book[] = [];
    try {
      const res = await supabase
        .from(ENTITIES.book)
        .select()
        .eq("branch_id", this.id)
        .eq("date", date);
      if (res.data === null) return books;
      for (const book of res.data) {
        books.push(new Book(book));
      }
    } catch (err) {
      console.error("Error getting the books of this branch. ", err);
      return books;
    }
    return books;
  }

  async GetAvailableBooks(date: Date): Promise<string[]> {
    let books: string[] = [];
    const busyBooks = await this.GetBusyBooks(date);
    let now = this.open;
    while (now.getTime() <= this.close.getTime()) {
      if (!busyBooks.find((b) => b.date.getTime() === now.getTime())) {
        books.push(getTimeString(now));
      }
      now = incrementTime(now, this.time_book);
    }

    return books;
  }
}
