import supabase from "@/src/supabase";
import { BASE_URL_AVATARS } from "@/src/supabase/urls";

export class Business {
    // Attributes
    id: string;
    photo_url?: string;
    created_at: Date;
    name: string;
    description?: string
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
        this.photo_url = BASE_URL_AVATARS + this.id;
    }

    // Methods

    async UpdatePhotoUrl_Supabase(file: File):Promise<boolean> {
        try {
            await supabase.storage
            .from("avatars")
            .upload(`${this.id}`, file);
        } catch(err) {
            console.error("Error updating the photo url of the user to supabase. ", err);
            return false;
        }
        return true;
    }
}