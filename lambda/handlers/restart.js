const Alexa = require('ask-sdk-core')
const podcasts = require('../lib/podcast')
const audioController = require('../controller/audio')

const ListenPodcastIntentHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StartOverIntent'
  },
  async handle (handlerInput) {
    const list = await podcasts.list()

    const currentPodcastIndex = handlerInput.state.currentPodcastIndex || 0

    const episode = list[currentPodcastIndex]

    handlerInput.state.currentPodcastIndex = 0

    return audioController.play(handlerInput, episode)
      .withShouldEndSession(true)
      .getResponse()
  }
}

module.exports = ListenPodcastIntentHandler
