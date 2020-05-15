const get = require('lodash.get')

const CANCEL_INTENTS = [
  'AMAZON.NoIntent',
  'AMAZON.CancelIntent',
  'AMAZON.StopIntent'
]

const canHandle = handlerInput => {
  if (get(handlerInput, 'requestEnvelope.request.type') !== 'IntentRequest') {
    return false
  }

  const intent = get(handlerInput, 'requestEnvelope.request.intent.name')
  return CANCEL_INTENTS.includes(intent)
}

const handle = async handlerInput => {
  return handlerInput.responseBuilder
    .speak('Ciao, alla prossima!')
    .addAudioPlayerStopDirective()
    .withShouldEndSession(true)
    .getResponse()
}

const handler = {
  canHandle,
  handle
}

module.exports = handler
