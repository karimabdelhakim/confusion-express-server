module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://localhost:27017/conFusion',
    'mongoLab' : 'mongodb://username:pass@ds139715.mlab.com:39715/confusionwebapp',
    'mongoEmul' : 'mongodb://192.168.1.5:27017/conFusion',
    'facebook': {
        clientID: '1757698561154750',
        clientSecret: 'db93d73d5da3eceb02744c0bc0d51b6e',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}


//use mongoUrl for same db but on computer
//use mongoLab for same db but on mlab.com
//use mongoEmul for same db but for the emulator when using ionic
