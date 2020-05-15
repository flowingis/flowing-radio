const Alexa = require('ask-sdk-core')
const podcasts = require('../lib/podcast')
const audioController = require('../controller/audio')
const moment = require('moment')

const noMediaHandling = handlerInput => {
  return handlerInput.responseBuilder
    .speak('Non ci sono altri podcast disponibili, ma puoi ascoltare quelli successivi')
    .getResponse()
}

const PreviousIntentHanlder = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PreviousIntent'
  },
  async handle (handlerInput) {
    const list = await podcasts.list()

    const currentPodcastIndex = handlerInput.state.currentPodcastIndex || 0
    const nextPodcastIndex = currentPodcastIndex + 1

    console.log('PREVIOUS INDEX', nextPodcastIndex)

    const episode = list[nextPodcastIndex]

    if (!episode) {
      return noMediaHandling(handlerInput)
    }

    const text = `<speak>
        Ecco l'episodio del <say-as interpret-as="date">${moment(episode.published_at).format('????MMDD')}</say-as>
      </speak>`

    handlerInput.state.currentPodcastIndex = nextPodcastIndex

    return audioController.play(handlerInput, episode)
      .speak(text)
      .withShouldEndSession(true)
      .getResponse()
  }
}

module.exports = PreviousIntentHanlder
