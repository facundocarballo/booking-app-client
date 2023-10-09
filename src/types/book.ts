import { Client } from "./Client";

export class Book {
    id: string;
    created_at: Date;
    date: Date;
    branch_id: string;
    client: Client;
    price: number;
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
    }
}