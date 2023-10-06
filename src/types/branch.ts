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
}