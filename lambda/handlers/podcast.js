const Alexa = require('ask-sdk-core')
const podcasts = require('../lib/podcast')
const audioController = require('../controller/audio')

const ListenPodcastIntentHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListenPodcastIntent'
  },
  async handle (handlerInput) {
    const list = await podcasts.list()
    const episode = list[0]

    const text = `<speak>
        Ecco l'ultimo episodio di <lang xml:lang="en-US">Flowing Radio</lang>
      </speak>`

    handlerInput.state.currentPodcastIndex = 0

    return audioController.play(handlerInput, episode)
      .speak(text)
      .withShouldEndSession(true)
      .getResponse()
  }
}

module.exports = ListenPodcastIntentHandler
