const Alexa = require('ask-sdk-core')
const get = require('lodash.get')
const podcasts = require('../lib/podcast')
const audioController = require('../controller/audio')

const noMediaHandling = handlerInput => {
  return handlerInput.responseBuilder
    .speak('Nessun podcast in riproduzione')
    .getResponse()
}

const canHandle = handlerInput => {
  return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
  Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent'
}

const handle = async handlerInput => {
  const list = await podcasts.list()
  const episode = list[0]
  const { token } = get(handlerInput, 'requestEnvelope.context.AudioPlayer')

  if (!token) {
    return noMediaHandling(handlerInput)
  }

  return audioController.resume(handlerInput, episode)
    .withShouldEndSession(true)
    .getResponse()
}

const handler = {
  canHandle,
  handle
}

module.exports = handler
