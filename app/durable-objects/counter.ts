export class Counter implements DurableObject {
  constructor(private state: DurableObjectState) {}

  async fetch(request: Request) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/": {
        const count = await this.state.storage.get<number>("count");
        return new Response(typeof count === "number" ? String(count) : "0");
      }
      case "/increment": {
        let count: number;
        await this.state.blockConcurrencyWhile(async () => {
          count = ((await this.state.storage.get<number>("count")) ?? 0) + 1;
          this.state.storage.put("count", count);
        });
        return new Response(String(count));
      }
      case "/decrement": {
        let count: number;
        await this.state.blockConcurrencyWhile(async () => {
          count = ((await this.state.storage.get<number>("count")) ?? 0) - 1;
          this.state.storage.put("count", count);
        });
        return new Response(String(count));
      }
    }
  }
}
