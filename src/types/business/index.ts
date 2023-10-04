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
    constructor(some: any) {
        this.id = "";
        this.created_at = new Date(Date.now());
        this.name = "";
        this.category_id = "";
        this.owner = "";
    }

    // Methods
}