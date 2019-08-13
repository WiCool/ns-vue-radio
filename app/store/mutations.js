import { i18n } from '../langs/i18n.js'
import { SET_FOREGROUND as action_SET_FOREGROUND, SET_LAST_MESSAGE_ID as action_SET_LAST_MESSAGE_ID, SET_CURRENT_TAB as action_SET_CURRENT_TAB } from './constants'

export const SET_PLAYER = (state, player) => {
  state.player = player
}

export const PLAY_URL = (state, url) => {
  const playerOptions = {
    audioFile: url,
    loop: false,
    errorCallback: err => {
      console.log(err)
      alert({
        title: i18n.t('error'),
        message: i18n.t('thereWasAProblemPlayingTheStream'),
        okButtonText: i18n.t('understood')
      })
    }
  }

  state.playPromise = state.player.playFromUrl(playerOptions)
}

export const PAUSE = state => {
  state.player.pause()
}

export const SET_PLAY_PROMISE = (state, promise) => {
  state.playPromise = promise
}

export const SET_PLAYER_SCREEN = (state, playerScreen) => {
  state.playerScreen = playerScreen
}

export const SET_CURRENT_TAB = (state, newTab) => {
  state.currentTab = state.sections[newTab]
}

export const SET_FOREGROUND = (state, value) => {
  state.foreground = value
}

export const SET_LAST_MESSAGE_ID = (state, value) => {
  state.lastMessageId = value
}

export const FIREBASE_INIT = (state, store) => {
  state.firebase
    .init({
      // If the app is in the foreground, onMessageReceivedCallback will be
      // called when either notification type is received.
      onMessageReceivedCallback: function (message) {
        const tabName = getTabName(message)
        if (message.foreground) {
          alert({
            title: message.title,
            message: message.body,
            okButtonText: 'OK'
          }).then(() => {
            store.commit(action_SET_FOREGROUND, true)
            changeTab(tabName)
          })
        } else {
          store.commit(action_SET_FOREGROUND, false)
          if (message.data['google.message_id'] !== store.getters.getLastMessageId) {
            changeTab(tabName)
            store.commit(action_SET_LAST_MESSAGE_ID, message.data['google.message_id'])
          }
        }
      }
    })
    .then(
      () => {
        state.firebase.subscribeToTopic('general').then(() => console.log('Subscribed to topic general'))
        state.firebase.subscribeToTopic('live').then(() => console.log('Subscribed to topic live'))
        state.firebase.subscribeToTopic('schedule').then(() => console.log('Subscribed to topic schedule'))
        state.firebase.subscribeToTopic('writeus').then(() => console.log('Subscribed to topic writeus'))
        state.firebase.subscribeToTopic('podcasts').then(() => console.log('Subscribed to topic podcasts'))
        state.firebase.subscribeToTopic('social').then(() => console.log('Subscribed to topic social'))
      },
      error => {
        console.log('firebase.init error: ' + error)
      }
    )

  function getTabName (message) {
    let topic
    if (message.from !== undefined) {
      topic = message.from.slice(8)
    } else {
      topic = 'default'
    }
    const tabName = message.data.topic || topic
    return tabName
  }

  function changeTab (tabName) {
    switch (tabName) {
    case 'schedule':
      store.commit(action_SET_CURRENT_TAB, 1)
      break
    case 'writeus':
      store.commit(action_SET_CURRENT_TAB, 2)
      break
    case 'podcasts':
      store.commit(action_SET_CURRENT_TAB, 3)
      break
    case 'social':
      store.commit(action_SET_CURRENT_TAB, 4)
      break
    default:
      store.commit(action_SET_CURRENT_TAB, 0)
      break
    }
  }
}

export const SET_CONNECTION = (state, connection) => {
  state.connection = connection
}

export const SET_LANGUAGE = (state, language) => {
  state.language = language
}

export const SUCCESS_LANGUAGE_FETCH = (state, language) => {
  state.loadedLanguages.push(language)
}
