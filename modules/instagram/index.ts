import { Middleware } from "grammy";
import { initEnv } from "../helpers/index.ts";

await initEnv();

export class InstagramModule {
  constructor(private url: string) {}

  async getVideoUrl(): Promise<string> {
    const res = await fetch(
      `https://tiktod.eu.org/instagram/download?url=${this.url}`
    );

    const data = await res.json();
    return data.result[0].url;
  }

  static register: Middleware = async (ctx) => {
    try {
      const text = ctx.message?.text || "";

      const tm = new this(text);
      const url = await tm.getVideoUrl();

      await ctx.replyWithVideo(url);
    } catch (_) {
      ctx.reply("произошла ошибка при загрузке видео :(");
    }
  };
}
