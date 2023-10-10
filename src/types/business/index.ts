import supabase from "@/src/supabase";
import { Storage } from "../storage";
import { ENTITIES } from "@/src/supabase/entities";
import { Branch } from "../branch";

export class Business {
  // Attributes
  id: string;
  photo_url?: string;
  created_at: Date;
  name: string;
  description?: string;
  category_id: string;
  owner: string;

  // Constructor
  constructor(business: Business) {
    this.id = business.id;
    this.created_at = new Date(business.created_at);
    this.name = business.name;
    this.description = business.description;
    this.category_id = business.category_id;
    this.owner = business.owner;
    this.photo_url = business.photo_url;
  }

  // Methods
  /// Update
  async UpdatePhotoUrl_Supabase(file: File): Promise<boolean> {
    return await Storage.Upload(
      "avatars",
      "Business",
      this.id,
      file,
      "profile",
      this.photo_url
    );
  }

  /// Create
  async CreateBranch(
    name: string,
    geogash: string,
    description: string
  ): Promise<boolean> {
    try {
      await supabase.from(ENTITIES.branch).insert({
        name,
        description,
        geogash,
        business_id: this.id,
      });
    } catch (err) {
      console.error(`Error creating the branch for ${this.name}. `, err);
      return false;
    }
    return true;
  }

  /// Get
  async GetBranches(): Promise<Branch[]> {
    let branches: Branch[] = [];
    try {
      const res = await supabase
        .from(ENTITIES.branch)
        .select("*, Business(owner)")
        .eq("business_id", this.id);
      if (res.data === null) return branches;
      for (const b of res.data) {
        branches.push(new Branch(b));
      }
    } catch (err) {
      console.error("Error getting the branches of this business. ", err);
      return branches;
    }
    return branches;
  }
}
