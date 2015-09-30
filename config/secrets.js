module.exports = {
  db: process.env.MONGODB || 'mongodb://localhost/twitatron',

  cryptos: {
    algorithm: 'aes256',
    key: process.env.CRYPTO_KEY || 'paula'
  },

  sessionSecret: process.env.SESSION_SECRET || 'sessionpaula',

  twitter: {
    consumerKey: process.env.TWITTER_KEY || '9ZsrThZR9RJgiNgPvkKH2ftn5',
    consumerSecret: process.env.TWITTER_SECRET  || 'Fcf5ROsvOamYCPcsE9stgroWzEVddmNIpCIdWEurvX0LTscION',
    callbackURL: process.env.TWITTER_CALLBACK || 'http://localhost:3000/auth/twitter/callback',
    passReqToCallback: true
  }
};