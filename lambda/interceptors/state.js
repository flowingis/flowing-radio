const Alexa = require('ask-sdk-core')

/*
const getState = async handlerInput => {
  const { attributesManager } = handlerInput
  const session = await attributesManager.getPersistentAttributes()
  if (session && session.state) {
    return session.state
  }

  return {}
}

const StateInterceptor = {
  Request: {
    async process (handlerInput) {
      const state = await getState(handlerInput)
      handlerInput.state = state
    }
  },
  Response: {
    async process (handlerInput) {
      const { attributesManager } = handlerInput
      const state = handlerInput.state || {}
      attributesManager.setPersistentAttributes({ state })

      // Store persistent attributes object
      await attributesManager.savePersistentAttributes()
      handlerInput.attributesManager.setSessionAttributes()
    }
  }
}

module.exports = StateInterceptor

*/

const VALID_REQUEST_TYPES = [
  'IntentRequest',
  'LaunchRequest'
]

const getState = async handlerInput => {
  const { attributesManager } = handlerInput
  const session = await attributesManager.getPersistentAttributes()
  if (session && session.state) {
    return session.state
  }

  return {}
}

const StateInterceptor = {
  Request: {
    async process (handlerInput) {
      if (!VALID_REQUEST_TYPES.includes(Alexa.getRequestType(handlerInput.requestEnvelope))) {
        return
      }

      const state = await getState(handlerInput)
      console.log('PRE', state)
      handlerInput.state = state
    }
  },
  Response: {
    async process (handlerInput) {
      if (!VALID_REQUEST_TYPES.includes(Alexa.getRequestType(handlerInput.requestEnvelope))) {
        return
      }

      const { attributesManager } = handlerInput
      const state = handlerInput.state || {}

      attributesManager.setPersistentAttributes({ state })

      await attributesManager.savePersistentAttributes()

      console.log('POST', state)
    }
  }
}

module.exports = StateInterceptor
