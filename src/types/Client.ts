export class Client {
  name: string;
  id: string;
  description: string;

  constructor(client: Client) {
    this.name = client.name;
    this.id = client.id;
    this.description = client.description;
  }
}
