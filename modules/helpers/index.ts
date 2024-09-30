import { config } from "deno:dotenv";

export const initEnv = async () => {
  const env = await config();

  Object.entries(env).forEach(([key, value]) => Deno.env.set(key, value));
};

export const getVideoUrlFromLink = (
  links: Array<{ quality: string; link: string }>,
): string => {
  return (
    links.find((link) => link.quality.toLowerCase().includes("video"))?.link ??
    ""
  );
};
