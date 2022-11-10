import { Middleware } from 'grammy';
import { DOMParser } from 'deno:dom';
import { initEnv } from '../helpers/index.ts';

await initEnv();

export class TiktokModule {
	constructor(private url: string) {}

	async getVideoUrl(): Promise<string> {
		const html = await fetch(this.url).then((res) => res.text());
		const document = new DOMParser().parseFromString(html, 'text/html');
		const json = JSON.parse(
			document?.querySelector('script[id="SIGI_STATE"]')?.innerText || '{}'
		);

		return json.ItemModule[json.ItemList.video.keyword].video.downloadAddr;
	}

	static register: Middleware = async (ctx) => {
		try {
			const text = ctx.message?.text || '';

			const tm = new this(text);
			const url = await tm.getVideoUrl();

			ctx.replyWithVideo(url);
		} catch (_) {
			ctx.reply('произошла ошибка при загрузке видео :(');
		}
	};
}
