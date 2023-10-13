import { getDaysBetweenTwoDates } from "@/src/handlers/dates";
import { Client } from ".";
import { Product } from "../Product";
import { Book } from "../book";

export class ClientTable {
  name: string;
  description: string;
  lastBook: Date;
  totalSpend: number;
  booksFrequency: number;
  productsBooks: number[];
  createdAt: Date;

  constructor(clientTable: ClientTable) {
    this.name = clientTable.name;
    this.description = clientTable.description;
    this.lastBook = clientTable.lastBook;
    this.totalSpend = clientTable.totalSpend;
    this.booksFrequency = clientTable.booksFrequency;
    this.productsBooks = clientTable.productsBooks;
    this.createdAt = clientTable.createdAt;
  }

  static async GetClientsTable(
    clients: Client[],
    products: Product[],
    books: Book[]
  ): Promise<ClientTable[]> {
    let clientTable: ClientTable[] = [];
    for (let i = 0; i < clients.length; i++) {
      const c = clients[i];
      const booksClient = c.GetMyBooks(books);
      const totalSpend = Book.GetAllSpend(booksClient);
      const productsBooks = Book.GetProductsOccurrence(booksClient, products);
      if (booksClient.length > 0) {
        const booksFrequency =
          getDaysBetweenTwoDates(c.createdAt, new Date(Date.now())) /
          booksClient.length;
        console.log(booksFrequency.toFixed(2));
        clientTable.push(
          new ClientTable({
            name: c.name,
            description: c.description,
            lastBook: booksClient[booksClient.length - 1].date,
            totalSpend: totalSpend,
            booksFrequency,
            productsBooks: productsBooks,
            createdAt: c.createdAt,
          })
        );
      }
    }
    return clientTable;
  }
}
