import NotifmeSdk from 'notifme-sdk'

const notifmeSdk = new NotifmeSdk({useNotificationCatcher:}) // empty config = all providers are set to console.log
notifmeSdk
  .send({sms: {from: '+15000000000', to: '+15000000001', text: 'Hello, how are you?'}})
  .then(console.log)