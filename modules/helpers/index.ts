import { config } from 'deno:dotenv';
export const initEnv = async () => {
	const env = await config();

	Object.entries(env).forEach(([key, value]) => Deno.env.set(key, value));
};
