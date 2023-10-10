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
import { Product } from "./product";

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

  async CreateBook(
    time: string,
    day: Date,
    client_id: string,
    price: number,
    description: string
  ): Promise<boolean> {
    try {
      await supabase.from(ENTITIES.book).insert({
        date: getDateAtTime(day, time).toISOString(),
        branch_id: this.id,
        client_id,
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

  async CreateClient(name: string, description: string): Promise<Client> {
    const c = {
      id: "",
      name: "",
      description: "",
    };
    try {
      const res = await supabase
        .from(ENTITIES.client)
        .insert({
          name,
          description,
          branch_id: this.id,
        })
        .select();
      console.log("Res: ", res);
    } catch (err) {
      console.error(
        `Error creating a client for this branch: ${this.name}. `,
        err
      );
      return c;
    }
    return c;
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
    const minDate = new Date(date);
    minDate.setHours(0);
    const maxDate = new Date(date);
    maxDate.setHours(23);
    maxDate.setMinutes(59);
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
