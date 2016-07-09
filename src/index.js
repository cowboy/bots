import config from '../config';

import createBot from './bob';
if (config.tokens.bob) {
  const bot = createBot(config.tokens.bob);
  bot.login();
}
