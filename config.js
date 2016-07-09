'use strict';

require('dotenv').config();

module.exports = {
  isProduction: process.env.NODE_ENV === 'production',
  tokens: {
    bob: process.env.TOKEN_CKB_BOB,
  },
};
