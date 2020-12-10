/*
export function someAction (context) {
}
*/
import { alertDialog, showNotification } from 'src/utils.js'
// SCORING
export const setWinner = ({ getters, dispatch, commit }) => {
  const { getScore1, getScore2, getTeam1, getTeam2, getScoresHistory } = getters
  const title = 'Pemenang set'

  if (
    (getScore1 === 21 && getScore2 < 20) ||
    (getScore1 >= 20 && getScore2 >= 20 && getScore1 === getScore2 + 2) ||
    (getScore2 === 29 && getScore1 === 30)
  ) {
    commit('shiftScoresHistory')
    alertDialog({
      title,
      message: `Selamat ${getTeam1} pemenangnya`,
      scoresHistory: getScoresHistory,
      onYes () {
        dispatch('setScore')
      }
    })
  } else if (
    (getScore1 < 20 && getScore2 === 21) ||
    (getScore1 >= 20 && getScore2 >= 20 && getScore2 === getScore1 + 2) ||
    (getScore1 === 29 && getScore2 === 30)
  ) {
    commit('shiftScoresHistory')
    alertDialog({
      title,
      message: `Selamat ${getTeam2} pemenangnya`,
      scoresHistory: getScoresHistory,
      onYes () {
        dispatch('setScore')
      }
    })
  } else if (getScore1 >= 20 && getScore2 >= 20 && getScore1 === getScore2) {
    showNotification({
      message: 'Deuce'
    })
  } else if (
    getScore1 === 20 ||
    getScore2 === 20 ||
    (getScore1 >= 20 &&
      getScore2 >= 20 &&
      (getScore1 === getScore2 + 1 || getScore2 === getScore1 + 1))
  ) {
    showNotification({
      message: 'Match Point!'
    })
  }
}

export const setScore = ({ commit, dispatch }) => {
  // SAVE SCORE LAMA KE DB
  commit('setDefault')
  dispatch('reset')
}

export const setScore1 = ({ dispatch, commit, getters }) => {
  commit('setScore1')
  const { getScore1, getIsSingle } = getters
  if (!getIsSingle) dispatch('setPositionDouble')

  commit('setIsBallA', true)

  if (getScore1 % 2 === 0) {
    commit('setScoreAEven')
  } else {
    commit('setScoreAOdd')
  }

  if (getIsSingle) dispatch('setPositionSingle')

  commit('resetUndo')
  commit('setScoresHistory')
  dispatch('setWinner')
}

export const setScore2 = ({ dispatch, commit, getters }) => {
  commit('setScore2')
  const { getScore2, getIsSingle } = getters
  if (!getIsSingle) dispatch('setPositionDouble')

  commit('setIsBallA', false)

  if (getScore2 % 2 === 0) {
    commit('setScoreBEven')
  } else {
    commit('setScoreBOdd')
  }

  if (getIsSingle) dispatch('setPositionSingle')

  commit('resetUndo')
  commit('setScoresHistory')
  dispatch('setWinner')
}

export const setPositionSingle = (
  { commit, getters }
) => {
  const { getIsBallA } = getters
  if (getIsBallA) {
    commit('setPositionSingleA')
  } else {
    commit('setPositionSingleB')
  }
}

export const setPositionDouble = ({ getters, commit }) => {
  const { getIsBallA } = getters
  if (getIsBallA) {
    commit('setPositionA')
  } else {
    commit('setPositionB')
  }
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
