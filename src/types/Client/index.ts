export class Client {
  name: string;
  id: string;
  description: string;

  constructor(client: any) {
    this.name = client.name;
    this.id = client.id;
    this.description = client.description;
  }
}
