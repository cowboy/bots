import {createSlackBot} from 'chatter';
import {RtmClient, WebClient, MemoryDataStore} from '@slack/client';
import mixinBotHelpers from '../lib/bot-helpers';

// Message handlers.
const lolHandler = text => {
  if (/lol/i.test(text)) {
    const newText = text.replace(/lol/ig, 'laugh out loud');
    return `More like "${newText}" amirite`;
  }
  return false;
};

export default function createBot(token) {

  const bot = createSlackBot({
    name: 'Bob',
    icon: 'https://dl.dropboxusercontent.com/u/294332/ckb/images/bob48x48.png',
    verbose: true,
    getSlack() {
      return {
        rtmClient: new RtmClient(token, {
          dataStore: new MemoryDataStore(),
          autoReconnect: true,
          logLevel: 'error',
        }),
        webClient: new WebClient(token),
      };
    },
    createMessageHandler(id) {
      return [
        lolHandler,
      ];
    },
  });

  mixinBotHelpers(bot);

  return bot;

}
