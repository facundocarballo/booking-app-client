import { Product } from ".";
import { Book } from "../book";

export class DataProduct {
    product: Product;
    value: number;
    amount: number;
  
    constructor(product: Product, value: number, amount: number) {
      this.product = product;
      this.value = value;
      this.amount = amount;
    }
  
    static CreateDataChartClients(books: Book[]): DataProduct[] {
      if (books.length === 0) return [];
      const booksSorted = books.toSorted((a, b) =>
        b.client.id.localeCompare(a.client.id)
      );
      let charts: any[] = [];
      let product: Product;//booksSorted[0].product_id;
      let value: number = 0;
      let amount = 0;

    //   for (const book of booksSorted) {
    //     if (client.id === book.client.id) {
    //       value++;
    //       amount += book.price;
    //     } else {
    //       charts.push({
    //         client,
    //         value,
    //         amount,
    //       });
    //       client = book.client;
    //       value = 1;
    //       amount = 0;
    //     }
    //   }
  
    //   charts.push({
    //     client,
    //     value,
    //     amount,
    //   });
  
      return charts;
    }
  }