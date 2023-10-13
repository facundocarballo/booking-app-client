import supabase from "@/src/supabase";
import { ENTITIES } from "@/src/supabase/entities";
import { Book } from "../book";

export class Client {
  name: string;
  id: string;
  description: string;
  createdAt: Date;
  books?: Book[];

  constructor(client: any) {
    this.name = client.name;
    this.id = client.id;
    this.description = client.description;
    this.createdAt = new Date(client.created_at);
  }

  static async GetClientBookInfo(
    client: Client,
    branch_id: string,
    today: Date
  ): Promise<Client | undefined> {
    let books: Book[] = [];
    try {
      const res = await supabase
        .from(ENTITIES.book)
        .select("client_id, branch_id, date, Client(*)")
        .eq("client_id", client.id)
        .eq("branch_id", branch_id)
        .lt("date", today.toISOString());
      if (!res.data) return;
      for (const book of res.data) {
        console.log(book.date);
        books.push(new Book(book));
      }
      // Sort the books by date.
      const booksSorted = books.toSorted(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
      const newClient = new Client(client);
      newClient.books = booksSorted;
      return newClient;
    } catch (err) {
      console.error(
        `Error getting this client (${client.id} for this branch (${branch_id}))`,
        err
      );
      return;
    }
  }

  // Methods

  /// Get
  GetMyBooks(books: Book[]): Book[] {
    let booksClient: Book[] = [];
    for (const b of books) {
      if (b.client.id === this.id) {
        booksClient.push(b);
      }
    }
    return booksClient;
  }
}
