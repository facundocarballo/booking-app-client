import supabase from "../supabase";
import { ENTITIES } from "../supabase/entities";
import { Product } from "./product";

export interface SearchBranchQuery {
  category_id: string,
  Branch: Branch[]
}

export class Branch {
  id: string;
  created_at: Date;
  business_id: string;
  name: string;
  geogash: string;
  description?: string;

  constructor(branch: Branch) {
    this.id = branch.id;
    this.created_at = branch.created_at;
    this.business_id = branch.business_id;
    this.name = branch.name;
    this.geogash = branch.geogash;
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
}
