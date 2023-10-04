import supabase from "@/src/supabase";

export class BusinessCategory { 
    // Attributes
    id: string;
    description: string;

    // Constructor
    constructor(id: string, description: string) {
        this.id = id;
        this.description = description;
    }

    static async GetAllBusinessCategories(): Promise<BusinessCategory[]> {
        let categories: BusinessCategory[] = [];
        try {
            const res = await supabase.from("BusinessCategory").select();
            const data = res.data;
            if (data === null) return [];
            for (const bc of data) {
                categories.push(new BusinessCategory(bc.id, bc.description));
            }
        }catch(err) {
            console.error("Error getting all business categories. ", err);
            return [];
        }
        return categories;
    }
}