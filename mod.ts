import { webhookCallback } from 'grammy';
import { serve } from 'deno:http';
import bot from './bot.ts';
import { initEnv } from './modules/helpers/index.ts';

initEnv();

const BOT_WEBHOOK = Deno.env.get('BOT_WEBHOOK') || '';

if (Deno.env.get('MODE') === 'production' && BOT_WEBHOOK) {
	console.log('Running on production mode');
	bot.api.setWebhook(BOT_WEBHOOK);

	serve(webhookCallback(bot, 'std/http'), {
		port: parseInt(Deno.env.get('PORT') || '') || 8000,
	});
} else {
	bot.start();
}
