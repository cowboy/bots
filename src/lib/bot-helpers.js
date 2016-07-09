// =====================
// Misc SlackBot helpers
// =====================

const bot = {};

export default function mixinBotHelpers(target) {
  for (const prop in bot) {
    target[prop] = bot[prop].bind(target);
  }
}

// Convenience methods from rtmClient.dataStore:
const dataStoreMethods = [
  'getUserById',
  'getUserByName',
  'getTeamById',
  'getChannelGroupOrDMById',
  'getChannelOrGroupByName',
];

dataStoreMethods.forEach(name => {
  bot[name] = function(id) {
    return this.slack.rtmClient.dataStore[name](id);
  };
});

// Get user name sans leading sigil, eg: cowboy
bot.getName = function(name) {
  return this.parseMessage(name || '').replace(/^@/, '');
};

// Get user object.
bot.getUser = function(name) {
  if (typeof name === 'object') {
    return name;
  }
  return this.getUserByName(this.getName(name));
};

// Get real name and fallback to user name.
bot.getRealName = function(name) {
  const user = this.getUser(name);
  return user.real_name || user.name;
};

// Get formatted slackname, eg: <@U025GMQTB>
bot.formatUser = function(name) {
  return `<@${this.getUser(name).id}>`;
};

// Get formatted slackname, eg: <@U025GMQTB>
bot.formatId = function(id) {
  return `<@${id}>`;
};
