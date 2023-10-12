import {
  areEqualsByHoursAndMinuts,
  convertStringToTime,
  getDateAtTime,
  getTimeString,
  incrementTime,
} from "../handlers/dates";
import supabase from "../supabase";
import { ENTITIES } from "../supabase/entities";
import { Client } from "./Client";
import { Book } from "./book";
import { Product } from "./Product";

export interface SearchBranchQuery {
  category_id: string;
  Branch: Branch[];
}

export class Branch {
  id: string;
  created_at: Date;
  business_id: string;
  owner_id?: string;
  name: string;
  geogash: string;
  latitude: string;
  longitude: string;
  open: Date;
  close: Date;
  time_book: Date;
  description?: string;

  constructor(branch: any) {
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
    this.owner_id = branch.Business.owner;
  }

  // Methods

  /// Create
  async CreateProduct(
    name: string,
    description: string,
    price: number,
    photo_url: string
  ): Promise<Product | undefined> {
    try {
      const res = await supabase
        .from(ENTITIES.product)
        .insert({
          name,
          description,
          price,
          photo_url,
          branch_id: this.id,
        })
        .select();
      if (!res.data) return;
      return new Product(res.data[0]);
    } catch (err) {
      console.error(`Error creating the product for ${this.name}. `, err);
      return;
    }
  }

  async CreateBook(
    time: string,
    day: Date,
    client_id: string,
    product_id: string,
    price: number,
    description: string
  ): Promise<boolean> {
    try {
      await supabase.from(ENTITIES.book).insert({
        date: getDateAtTime(day, time).toISOString(),
        branch_id: this.id,
        client_id,
        product_id,
        price,
        description,
      });
    } catch (err) {
      console.error(
        `Error creating a book at ${time} for this branch: ${this.name}. `,
        err
      );
      return false;
    }
    return true;
  }

  async CreateClient(
    name: string,
    description: string
  ): Promise<Client | undefined> {
    try {
      const res = await supabase
        .from(ENTITIES.client)
        .insert({
          name,
          description,
          branch_id: this.id,
        })
        .select();
      if (!res.data) return;
      return new Client(res.data[0]);
    } catch (err) {
      console.error(
        `Error creating a client for this branch: ${this.name}. `,
        err
      );
      return undefined;
    }
  }

  /// Delete
  async DeleteBook(book: Book): Promise<boolean> {
    try {
      await supabase.from(ENTITIES.book).delete().eq("id", book.id);
    } catch (err) {
      console.error(
        `Error deleting this book (${book.id}) for this branch (${this}). `,
        err
      );
      return false;
    }
    return true;
  }

  /// Edit
  async EditProduct(
    productId: string,
    newName: string,
    newDescription: string,
    newPrice: string
  ): Promise<boolean> {
    try {
      await supabase
        .from(ENTITIES.product)
        .update({
          name: newName,
          description: newDescription,
          price: newPrice,
        })
        .eq("id", productId);

      return true;
    } catch (err) {
      console.error(`Error editing the product ${productId}. `, err);
      return false;
    }
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
      products = products.toSorted((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error("Error getting the products of this branch. ", err);
      return products;
    }
    return products;
  }

  async GetBusyBooks(minDate: Date, maxDate: Date): Promise<Book[]> {
    let books: Book[] = [];
    try {
      const res = await supabase
        .from(ENTITIES.book)
        .select("*, Client(*)")
        .eq("branch_id", this.id)
        .gt("date", minDate.toISOString())
        .lt("date", maxDate.toISOString());
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

  async GetAvailableBooks(busyBooks: Book[]): Promise<string[]> {
    let books: string[] = [];
    let now = this.open;
    while (now.getTime() <= this.close.getTime()) {
      if (!busyBooks.find((b) => areEqualsByHoursAndMinuts(b.date, now))) {
        books.push(getTimeString(now));
      }
      now = incrementTime(now, this.time_book);
    }

    return books;
  }

  async GetClients(): Promise<Client[]> {
    let clients: Client[] = [];
    try {
      let res = await supabase
        .from(ENTITIES.client)
        .select()
        .eq("branch_id", this.id);
      if (res.data === null) return clients;
      for (const c of res.data) {
        clients.push(new Client(c));
      }
      clients = clients.toSorted((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      console.error(`Error getting the clients of ${this.name}. `, err);
      return clients;
    }
    return clients;
  }

  static async GetBranch(id: string): Promise<Branch | undefined> {
    try {
      const res = await supabase
        .from(ENTITIES.branch)
        .select("*, Business(*)")
        .eq("id", id);
      if (res.data === null) return;
      return new Branch(res.data[0]);
    } catch (err) {
      console.error(`Error getting this branch ${id}. `, err);
      return;
    }
  }
}
