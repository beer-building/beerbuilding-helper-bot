import { Bot } from "grammy";
import { TiktokModule } from "./modules/tiktok/index.ts";
import { InstagramModule } from "./modules/instagram/index.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN");

const bot = new Bot(BOT_TOKEN);

bot.command("start", (ctx) => {
  ctx.reply("Yo, what's up?");
});

bot.catch((err) => {
  console.error(err.error);
});

// REGISTER MODULES

bot.hears(/^(https:\/\/(\w+\.)?tiktok.com\/)/, TiktokModule.register);
bot.hears(/^(https:\/\/(\w+\.)?instagram.com\/)/, InstagramModule.register);

export default bot;
