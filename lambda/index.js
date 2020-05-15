const Alexa = require('ask-sdk-core')

const Adapter = require('ask-sdk-s3-persistence-adapter')

const ExitHandler = require('./handlers/exit')
const PauseHandler = require('./handlers/pause')
const ResumeHandler = require('./handlers/resume')
const HelpIntentHandler = require('./handlers/help')
const ListenPodcastIntentHandler = require('./handlers/podcast')
const LaunchRequestHandler = require('./handlers/launch')
const NextIntentHanlder = require('./handlers/next')
const PreviousIntentHandler = require('./handlers/previous')
const RestartIntentHandler = require('./handlers/restart')
const AudioPlayerHandler = require('./handlers/audioPlayer')

const StateInterceptor = require('./interceptors/state')

const config = require('./config.json')

const S3BUCKET_NAME = process.env.S3BUCKET_NAME

const S3Adapter = new Adapter.S3PersistenceAdapter({
  bucketName: S3BUCKET_NAME
})

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`)
    const speakOutput = 'Scusa, c\'è stato un errore, riprova più tardi'

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

const IntentReflectorHandler = {

  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
  },

  handle (handlerInput) {
    const intentName = handlerInput.requestEnvelope.request.intent.name

    const speechText = `${intentName}`

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }

}

const LogRequestInterceptor = {
  process (handlerInput) {
    // Log Request
    console.log('==== REQUEST ======')
    console.log(JSON.stringify(handlerInput.requestEnvelope, null, 2))
  }
}

const SessionEndedRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle (handlerInput) {
    const reason = handlerInput.requestEnvelope.request.reason
    console.log('==== SESSION ENDED WITH REASON ======')
    console.log(reason)
    return handlerInput.responseBuilder.getResponse()
  }
}

const builder = Alexa.SkillBuilders.custom().addRequestHandlers(
  PreviousIntentHandler,
  NextIntentHanlder,
  RestartIntentHandler,
  ListenPodcastIntentHandler,
  LaunchRequestHandler,
  HelpIntentHandler,
  ExitHandler,
  PauseHandler,
  ResumeHandler,
  AudioPlayerHandler,
  SessionEndedRequestHandler
)
  .addRequestInterceptors(
    StateInterceptor.Request
  )
  .addResponseInterceptors(
    StateInterceptor.Response
  )
  .addErrorHandlers(
    ErrorHandler
  )

if (config.debug) {
  builder
    .addRequestHandlers(
      IntentReflectorHandler
    )
    .addRequestInterceptors(
      LogRequestInterceptor
    )
}

exports.handler = builder
  .withPersistenceAdapter(S3Adapter)
  .lambda()
