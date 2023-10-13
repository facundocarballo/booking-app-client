import { Client } from ".";
import { Product } from "../Product";
import { Book } from "../book";

export class ClientTable {
  name: string;
  description: string;
  lastBook: Date;
  totalSpend: number;
  productsBooks: number[];
  createdAt: Date;

  constructor(clientTable: ClientTable) {
    this.name = clientTable.name;
    this.description = clientTable.description;
    this.lastBook = clientTable.lastBook;
    this.totalSpend = clientTable.totalSpend;
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
      if (booksClient.length > 0)
        clientTable.push(
          new ClientTable({
            name: c.name,
            description: c.description,
            lastBook: booksClient[booksClient.length - 1].date,
            totalSpend: totalSpend,
            productsBooks: productsBooks,
            createdAt: c.createdAt,
          })
        );
    }
    return clientTable;
  }
}
