/*
export function someMutation (state) {
}
*/
export const setDefault = state => {
  state.score1 = 0
  state.score2 = 0
  state.teamA = 'Team 1'
  state.teamB = 'Team 2'
  state.scoresHistory = []
  state.nameA1 = ''
  state.nameA2 = ''
  state.nameB1 = ''
  state.nameB2 = ''

  // FLAG
  // SERVER A1 = TEAM 1 KIRI
  state.isServerA1 = false
  // SERVER A2 = TEAM 1 KANAN
  state.isServerA2 = true
  // SERVER B1 = TEAM 2 KANAN
  state.isServerB1 = false
  // SERVER B2 = TEAM 2 KIRI
  state.isServerB2 = false
  state.isBallA = true

  state.isUndo = false
  state.isRedo = false
  state.isStart = false
  state.timer = '00:00:000'
}

// SET DATA
export const setIsSingle = (state, value) => {
  state.isSingle = value
  if (value === true) {
    state.nameA1 = ''
    state.nameB2 = ''
  }
}

export const setTeamA = (state, value) => {
  state.teamA = value
}

export const setTeamB = (state, value) => {
  state.teamB = value
}

export const setNameA1 = (state, value) => {
  state.nameA1 = value
}

export const setNameA2 = (state, value) => {
  state.nameA2 = value
}

export const setNameB1 = (state, value) => {
  state.nameB1 = value
}

export const setNameB2 = (state, value) => {
  state.nameB2 = value
}

// SCORING
export const setScore1 = state => {
  state.score1++
}

export const setScore2 = state => {
  state.score2++
}

export const setScoreAEven = state => {
  state.isServerA1 = false
  state.isServerA2 = true
  state.isServerB1 = false
  state.isServerB2 = false
}

export const setScoreAOdd = state => {
  state.isServerA1 = true
  state.isServerA2 = false
  state.isServerB1 = false
  state.isServerB2 = false
}

export const setScoreBEven = state => {
  state.isServerA1 = false
  state.isServerA2 = false
  state.isServerB1 = true
  state.isServerB2 = false
}

export const setScoreBOdd = state => {
  state.isServerA1 = false
  state.isServerA2 = false
  state.isServerB1 = false
  state.isServerB2 = true
}

export const setIsBallA = (state, value) => {
  state.isBallA = value
}

export const setScoresHistory = state => {
  const {
    isServerA1,
    isServerA2,
    isServerB1,
    isServerB2,
    isBallA,
    nameA1,
    nameA2,
    nameB1,
    nameB2,
    score1,
    score2,
    teamA,
    teamB
  } = state
  const scores = {
    // FLAG
    isServerA1,
    isServerA2,
    isServerB1,
    isServerB2,
    isBallA,

    // PLAYERS
    nameA1,
    nameA2,
    nameB1,
    nameB2,

    // SCORES
    score1,
    score2,
    teamA,
    teamB
  }

  state.scoresHistory.push(scores)
}

export const shiftScoresHistory = state => state.scoresHistory.shift()

export const setPositionA = state => {
  const name = state.nameA1
  state.nameA1 = state.nameA2
  state.nameA2 = name
}

export const setPositionB = state => {
  const name = state.nameB1
  state.nameB1 = state.nameB2
  state.nameB2 = name
}

export const setPositionSingleA = state => {
  if (state.isServerA2 && state.nameA2 === '') {
    state.nameA2 = state.nameA1
    state.nameA1 = ''
    state.nameB1 = state.nameB2
    state.nameB2 = ''
  } else if (state.isServerA1 && state.nameA1 === '') {
    state.nameA1 = state.nameA2
    state.nameA2 = ''
    state.nameB2 = state.nameB1
    state.nameB1 = ''
  }
}

export const setPositionSingleB = state => {
  if (state.isServerB1 && state.nameB1 === '') {
    state.nameB1 = state.nameB2
    state.nameB2 = ''
    state.nameA2 = state.nameA1
    state.nameA1 = ''
  } else if (state.isServerB2 && state.nameB2 === '') {
    state.nameB2 = state.nameB1
    state.nameB1 = ''
    state.nameA1 = state.nameA2
    state.nameA2 = ''
  }
}

export const setUndo = state => {
  state.undoCounter++
  state.isUndo = true
  const lengthArray = state.scoresHistory.length - state.undoCounter

  if (lengthArray >= 0) {
    // FLAG
    state.isServerA1 = state.scoresHistory[lengthArray].isServerA1
    state.isServerA2 = state.scoresHistory[lengthArray].isServerA2
    state.isServerB1 = state.scoresHistory[lengthArray].isServerB1
    state.isServerB2 = state.scoresHistory[lengthArray].isServerB2
    state.isBallA = state.scoresHistory[lengthArray].isBallA

    // PLAYERS
    state.nameA1 = state.scoresHistory[lengthArray].nameA1
    state.nameA2 = state.scoresHistory[lengthArray].nameA2
    state.nameB1 = state.scoresHistory[lengthArray].nameB1
    state.nameB2 = state.scoresHistory[lengthArray].nameB2

    // SCORES
    state.score1 = state.scoresHistory[lengthArray].score1
    state.score2 = state.scoresHistory[lengthArray].score2
    state.teamA = state.scoresHistory[lengthArray].teamA
    state.teamB = state.scoresHistory[lengthArray].teamB
  }
}

export const resetUndo = state => {
  const lengthArray = state.scoresHistory.length - state.undoCounter

  if (state.isUndo && lengthArray >= 0) {
    state.scoresHistory = state.scoresHistory.slice(0, lengthArray + 1)
  }
  state.undoCounter = 1
  state.isUndo = false
}

export const setRedo = state => {
  const lengthArray = state.scoresHistory.length - state.undoCounter + 1
  console.log('LENGTH ARR: ', lengthArray, state.scoresHistory.length)

  if (lengthArray >= 0) {
    // FLAG
    state.isServerA1 = state.scoresHistory[lengthArray].isServerA1
    state.isServerA2 = state.scoresHistory[lengthArray].isServerA2
    state.isServerB1 = state.scoresHistory[lengthArray].isServerB1
    state.isServerB2 = state.scoresHistory[lengthArray].isServerB2
    state.isBallA = state.scoresHistory[lengthArray].isBallA

    // PLAYERS
    state.nameA1 = state.scoresHistory[lengthArray].nameA1
    state.nameA2 = state.scoresHistory[lengthArray].nameA2
    state.nameB1 = state.scoresHistory[lengthArray].nameB1
    state.nameB2 = state.scoresHistory[lengthArray].nameB2

    // SCORES
    state.score1 = state.scoresHistory[lengthArray].score1
    state.score2 = state.scoresHistory[lengthArray].score2
    state.teamA = state.scoresHistory[lengthArray].teamA
    state.teamB = state.scoresHistory[lengthArray].teamB
  }

  if (lengthArray === state.scoresHistory.length - 1) {
    state.isUndo = false
  }
  state.undoCounter--
}

// TIMER
export const setTimer = (state, value) => {
  state.timer = value
}

export const setIsStart = state => {
  state.isStart = !state.isStart
}

export const setFalseIsStart = state => {
  state.isStart = false
}

export const setIsFastStart = (state, value) => {
  console.log(value)
  state.isFastStart = value
}
