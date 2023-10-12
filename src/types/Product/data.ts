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

  static CreateDataChartProducts(
    books: Book[],
    products: Product[]
  ): DataProduct[] {
    if (books.length === 0) return [];
    const booksSorted = books.toSorted((a, b) =>
      b.client.id.localeCompare(a.client.id)
    );
    let charts: any[] = [];
    let product_id: string = booksSorted[0].product_id;
    let value: number = 0;
    let amount = 0;

    for (const book of booksSorted) {
      if (product_id === book.product_id) {
        value++;
        amount += book.price;
      } else {
        const product = products.find((p) => p.id === product_id);
        if (!product) {
          console.error("Product don't finded. :(");
          return charts;
        }
        charts.push({
          product,
          value,
          amount,
        });
        product_id = book.product_id;
        value = 1;
        amount = book.price;
      }
    }

    const product = products.find((p) => p.id === product_id);
    if (!product) {
      console.error("Product don't finded. :(");
      return charts;
    }
    charts.push({
      product,
      value,
      amount,
    });

    return charts;
  }
}
