import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useRef } from "react";
import { useDelegatedAnchors } from "remix-utils/use-delegated-anchors";

export function Layout({ children }: { children: React.ReactNode }) {
  const bodyRef = useRef<HTMLBodyElement>();
  useDelegatedAnchors(bodyRef);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body ref={bodyRef}>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
