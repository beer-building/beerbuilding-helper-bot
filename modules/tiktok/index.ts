import { Middleware } from "grammy";
import { getVideoUrlFromLink, initEnv } from "../helpers/index.ts";

await initEnv();

const RAPID_API_KEY = Deno.env.get("RAPID_API_KEY");

export class TiktokModule {
  constructor(private url: string) {}

  async getVideoUrl(): Promise<string> {
    const res = await fetch(
      `https://social-media-video-downloader.p.rapidapi.com/smvd/get/tiktok?url=${this.url}`,
      {
        headers: {
          "x-rapidapi-host": "social-media-video-downloader.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY ?? "",
        },
      },
    );

    const { links } = await res.json();

    return getVideoUrlFromLink(links);
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
