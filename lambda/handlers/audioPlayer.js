const Alexa = require('ask-sdk-core')

const AudioPlayerHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope).startsWith('AudioPlayer.')
  },
  handle (handlerInput) {
    console.log('AUDIO PLAYER:', Alexa.getRequestType(handlerInput.requestEnvelope))
    return handlerInput.responseBuilder.getResponse()
  }
}

module.exports = AudioPlayerHandler
