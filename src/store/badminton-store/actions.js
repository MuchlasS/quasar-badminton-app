/*
export function someAction (context) {
}
*/
import { alertDialog } from 'src/utils.js'
// SCORING
export const setWinner = ({ getters, dispatch }) => {
  const { getScore1, getScore2, getTeam1, getTeam2 } = getters
  const title = 'Pemenang set'

  if (getScore1 === 21 && getScore2 < 20) {
    alertDialog({
      title,
      message: `Selamat ${getTeam1} pemenangnya`,
      onYes () {
        dispatch('setScore')
      }
    })
  } else if (getScore1 < 20 && getScore2 === 21) {
    alertDialog({
      title,
      message: `Selamat ${getTeam2} pemenangnya`,
      onYes () {
        dispatch('setScore')
      }
    })
  }
}

export const setScore = ({ commit, dispatch }) => {
  // SAVE SCORE LAMA KE DB
  commit('setDefault')
  dispatch('reset')
}

export const setScore1 = ({ dispatch, commit }) => {
  commit('setScore1')
  dispatch('setWinner')
}

export const setScore2 = ({ dispatch, commit }) => {
  commit('setScore2')
  dispatch('setWinner')
}

// TIMER
let startTime
let elapsedTime = 0
let timerInterval
let pausedTimes

export const setTimer = ({ commit, getters, dispatch }) => {
  commit('setTimer')
  commit('setIsStart')
  const { getIsStart } = getters
  if (getIsStart) {
    dispatch('start')
  } else {
    dispatch('pause')
  }
}

export const resetTimer = ({ dispatch, commit }) => {
  commit('setFalseIsStart')
  dispatch('reset')
}

export const timeToString = ({ commit }, { elapsedTime }) => {
  let tempTime = elapsedTime
  const ms = tempTime % 1000
  tempTime = Math.floor(tempTime / 1000)

  const ss = tempTime % 60
  tempTime = Math.floor(tempTime / 60)

  const mm = tempTime % 60

  const formattedMM = mm.toString().padStart(2, '0')
  const formattedSS = ss.toString().padStart(2, '0')
  const formattedMS = ms.toString().padStart(2, '0')

  const timeFormat = `${formattedMM}:${formattedSS}:${formattedMS}`
  pausedTimes = timeFormat
  commit('setTimer', timeFormat)
}

export const start = ({ dispatch }) => {
  startTime = Date.now() - elapsedTime
  timerInterval = setInterval(function printTime () {
    elapsedTime = Date.now() - startTime
    dispatch('timeToString', { elapsedTime })
  }, 10)
}

export const pause = ({ commit }) => {
  clearInterval(timerInterval)
  commit('setTimer', pausedTimes)
}

export const reset = ({ commit }) => {
  clearInterval(timerInterval)
  pausedTimes = '00:00:000'
  elapsedTime = 0
  commit('setTimer', pausedTimes)
}
