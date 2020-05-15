const Alexa = require('ask-sdk-core')

const VALID_INTENTS = [
  'AMAZON.HelpIntent',
  'AMAZON.FallbackIntent'
]

const HelpIntentHandler = {
  canHandle (handlerInput) {
    if (Alexa.getRequestType(handlerInput.requestEnvelope) !== 'IntentRequest') {
      return false
    }

    return VALID_INTENTS.includes(Alexa.getIntentName(handlerInput.requestEnvelope))
  },
  handle (handlerInput) {
    const speakOutput = 'Ciao, puoi chiedermi di ascoltare una puntata del podcast'

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

module.exports = HelpIntentHandler
