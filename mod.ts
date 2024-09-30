import { initEnv } from "./modules/helpers/index.ts";
initEnv();
import { webhookCallback } from "grammy";
import { serve } from "deno:http";
import bot from "./bot.ts";

const BOT_WEBHOOK = Deno.env.get("BOT_WEBHOOK") || "";

if (Deno.env.get("MODE") === "production" && BOT_WEBHOOK) {
  console.log("Running on production mode");
  bot.api.setWebhook(BOT_WEBHOOK);

  serve(webhookCallback(bot, "std/http"), {
    port: parseInt(Deno.env.get("PORT") || "") || 8000,
  });
} else {
  bot.start();
}

Deno.serve((req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;
  console.log(pathname);

  switch (pathname) {
    case "/":
      return new Response("Hello");
    case "/checkin-office":
      console.log(req);
      return new Response("Welcome");
    default:
      return new Response("", { status: 404 });
  }
});
