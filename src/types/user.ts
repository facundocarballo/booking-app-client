import { User as SupabaseUser } from "@supabase/supabase-js";
import supabase from "../supabase";
import { checkNull } from "../handlers/auxs";
import { Business } from "./business";
import { Storage } from "./storage";

class User {
    // Attributes
    id: string;
    photo_url?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    telegram?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    spotify?: string;

    // Constructor
    constructor(user: SupabaseUser) {
        this.id = user.id;
        this.email = user.email;
    }

    static async CreateUserWithData(user: SupabaseUser): Promise<User> {
        const u = new User(user);
        await u.GetData();
        return u;
    }

    // Public Methods
    /// Get Data from Supabase
    async GetData(): Promise<boolean> {
        try {
            const res = await supabase.from("User").select().eq("id", this.id);
            if (res.data === null) {
                console.error("Error getting data for user from Supabase. res.data = null");
                return false;
            }
            const data = res.data[0];
            this.first_name = data.first_name;
            this.last_name = data.last_name;
            this.phone_number = data.phone_number;
            this.photo_url = data.photo_url;
            this.telegram = data.telegram;
            this.instagram = data.instagram;
            this.facebook = data.facebook;
            this.twitter = data.twitter;
            this.linkedin = data.linkedin;
            this.spotify = data.spotify;
        } catch(err) {
            console.error("Error getting data for user from Supabase. ", err);
            return false;
        }
        return true;
    }

    async GetBusiness(): Promise<Business[]> {
        let business: Business[] = []
        try {
            const res = await supabase.from("Business").select().eq("owner", this.id);
            if (res.data === null) return business;
            for (const b of res.data) {
                business.push(new Business(b))
            }
        } catch (err) {
            console.error("Error getting the business of this user. ", err);
            return business;
        }
        return business;
    }

    async CreateBusiness(name: string, description: string, category_id: string): Promise<boolean> {
        try {
            const res = await supabase.from("Business").insert({
                name,
                description,
                category_id,
                owner: this.id
            });
        } catch (err) {
            console.error("Error getting the business of this user. ", err);
            return false;
        }
        return true;
    }

    /// Update
    async UpdateAll(
        first_name: string|null,
        last_name: string|null,
        phone_number: string|null,
    ):Promise<boolean> {
        try {
            const res = await supabase.from("User").update({
                first_name,
                last_name,
                phone_number,
            }).eq('id', this.id).select();

            this.first_name = checkNull(first_name);
            this.last_name = checkNull(last_name);
            this.phone_number = checkNull(phone_number);
        } catch(err) {
            console.error("Error updating the first name of the user to supabase. ", err);
            return false;
        }
        return true;
    }
    //// Updates functions    
    async UpdateFirstName_Supabase(first_name: string):Promise<boolean> {
        try {
            await supabase.from("User").update({first_name}).eq('id', this.id);
            this.first_name = first_name;
        } catch(err) {
            console.error("Error updating the first name of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdateLastName_Supabase(last_name: string):Promise<boolean> {
        try {
            await supabase.from("User").update({last_name}).eq('id', this.id);
            this.last_name = last_name;
        } catch(err) {
            console.error("Error updating the last name of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdatePhoneNumber_Supabase(phone_number: string):Promise<boolean> {
        try {
            await supabase.from("User").update({phone_number}).eq('id', this.id);
            this.phone_number = phone_number;
        } catch(err) {
            console.error("Error updating the phone number of the user to supabase. ", err);
            return false;
        }
        return true;
    }
    
    async UpdatePhotoUrl_Supabase(file: File):Promise<boolean> {
        return await Storage.Upload(
            "avatars",
            "User",
            this.id,
            file,
            "profile",
            this.photo_url,
        );
    }

    ///// Social Media links
    async UpdateTelegram_Supabase(telegram: string):Promise<boolean> {
        try {
            await supabase.from("User").update({telegram}).eq('id', this.id);
            this.telegram = telegram;
        } catch(err) {
            console.error("Error updating the telegram account of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdateInstagram_Supabase(instagram: string):Promise<boolean> {
        try {
            await supabase.from("User").update({instagram}).eq('id', this.id);
            this.telegram = instagram;
        } catch(err) {
            console.error("Error updating the instagram account of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdateFacebook_Supabase(facebook: string):Promise<boolean> {
        try {
            await supabase.from("User").update({facebook}).eq('id', this.id);
            this.facebook = facebook;
        } catch(err) {
            console.error("Error updating the facebook account of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdateTwitter_Supabase(twitter: string):Promise<boolean> {
        try {
            await supabase.from("User").update({twitter}).eq('id', this.id);
            this.twitter = twitter;
        } catch(err) {
            console.error("Error updating the twitter account of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdateLinkedin_Supabase(linkedin: string):Promise<boolean> {
        try {
            await supabase.from("User").update({linkedin}).eq('id', this.id);
            this.linkedin = linkedin;
        } catch(err) {
            console.error("Error updating the linkedin account of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    async UpdateSpotify_Supabase(spotify: string):Promise<boolean> {
        try {
            await supabase.from("User").update({spotify}).eq('id', this.id);
            this.spotify = spotify;
        } catch(err) {
            console.error("Error updating the spotify account of the user to supabase. ", err);
            return false;
        }
        return true;
    }

    // Private Methods
}


export default User;