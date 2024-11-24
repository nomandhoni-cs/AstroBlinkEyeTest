import type { APIRoute } from "astro";

export const get: APIRoute = () => {
  return new Response(JSON.stringify({ message: "Hello, World!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
