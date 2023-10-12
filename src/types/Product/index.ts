export class Product {
    id: string;
    created_at: Date;
    branch_id: string;
    name: string;
    price: number;
    description?: string;

    constructor(product: Product) {
        this.id = product.id;
        this.created_at = product.created_at;
        this.branch_id = product.branch_id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
    }
}