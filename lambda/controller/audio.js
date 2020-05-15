
const audioMetadata = require('./audioMetadata')
const get = require('lodash.get')
const { title } = require('../config.json')

const isPlaying = handlerInput => {
  const status = get(handlerInput, 'requestEnvelope.context.AudioPlayer.playerActivity')
  return status === 'PLAYING'
}

const play = (handlerInput, episode) => {
  return handlerInput
    .responseBuilder.withStandardCard(
      title,
      episode.title,
      episode.image_url,
      episode.image_original_url)
    .addAudioPlayerPlayDirective(
      'REPLACE_ALL',
      episode.playback_url,
      episode.episode_id,
      0,
      undefined,
      audioMetadata(title, episode)
    )
}

const resume = (handlerInput, episode) => {
  const { token, offsetInMilliseconds } = get(handlerInput, 'requestEnvelope.context.AudioPlayer')

  return handlerInput.responseBuilder
    .withStandardCard(
      title,
      episode.title,
      episode.image_url,
      episode.image_original_url)
    .addAudioPlayerPlayDirective(
      'REPLACE_ALL',
      episode.playback_url,
      token,
      offsetInMilliseconds,
      undefined,
      audioMetadata(title, episode)
    )
}

module.exports = {
  isPlaying,
  play,
  resume
}
