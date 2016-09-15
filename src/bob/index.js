import {createSlackBot} from 'chatter';
import {RtmClient, WebClient, MemoryDataStore} from '@slack/client';
import mixinBotHelpers from '../lib/bot-helpers';

// Message handlers.
const lolHandler = (text, {user}) => {
  if (/OLO|LOL/.test(text) && user.name === 'falcon') {
    const fingers = ':middle_finger:'.repeat(3);
    return `${fingers} WHO'S LAUGHING OUT LOUD NOW, BITCH ${fingers}`;
  }
  const lolRe = /(l+)\s*([o0]+)\s*(l+)/gi;
  if (lolRe.test(text)) {
    const words = ['laugh', 'out', 'loud'];
    const newText = text.replace(lolRe, (_, ...args) => words.reduce((arr, s, i) =>
      [...arr, ...Array.from({length: args[i].length}, () => s)], []).join(' '));
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
