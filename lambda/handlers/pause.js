const get = require('lodash.get')
const audioController = require('../controller/audio')

const ACCEPTED_INTENTS = [
  'AMAZON.PauseIntent'
]

const canHandle = handlerInput => {
  if (!handlerInput.requestEnvelope.request.type === 'IntentRequest') {
    return false
  }

  const intent = get(handlerInput, 'requestEnvelope.request.intent.name')
  return ACCEPTED_INTENTS.includes(intent)
}

const noMediaHandling = handlerInput => {
  return handlerInput.responseBuilder
    .speak('Nessun podcast in riproduzione')
    .getResponse()
}

const handle = async handlerInput => {
  if (!audioController.isPlaying(handlerInput)) {
    return noMediaHandling(handlerInput)
  }

  return handlerInput.responseBuilder
    .addAudioPlayerStopDirective()
    .withShouldEndSession(true)
    .getResponse()
}

module.exports = {
  canHandle,
  handle
}
