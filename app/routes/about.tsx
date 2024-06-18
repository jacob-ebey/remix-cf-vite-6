import {
  unstable_defineAction as defineAction,
  unstable_defineLoader as defineLoader,
} from "@remix-run/cloudflare";
import { useFetcher, useLoaderData } from "@remix-run/react";

export const loader = defineLoader(async ({ context: { env }, request }) => {
  const homeCounter = env.COUNTER.get(env.COUNTER.idFromName("about"));
  const count = await homeCounter
    .fetch("https://counter/")
    .then((r) => r.text());

  return {
    count,
    message: "About, loader!",
  };
});

export const action = defineAction(
  async ({ context: { env } }): Promise<string> => {
    const homeCounter = env.COUNTER.get(env.COUNTER.idFromName("about"));
    return await homeCounter
      .fetch("https://counter/increment")
      .then((r) => r.text());
  }
);

export default function About() {
  const { count, message } = useLoaderData<typeof loader>();
  const countFetcher = useFetcher<typeof action>({
    key: "about-count",
  });

  return (
    <div>
      <h1>{message}!</h1>
      <countFetcher.Form method="POST">
        <p>Count: {countFetcher.data || count}</p>
        <button type="submit" disabled={countFetcher.state !== "idle"}>
          Increment
        </button>
      </countFetcher.Form>
    </div>
  );
}
