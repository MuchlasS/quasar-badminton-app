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
  state.nameA1 = 'Team 1 Kiri'
  state.nameA2 = 'Team 1 Kanan'
  state.nameB1 = 'Team 2 Kanan'
  state.nameB2 = 'Team 2 Kiri'

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
  // CHANGE POSITION A
  const name = state.nameA1
  if (state.isBallA) {
    state.nameA1 = state.nameA2
    state.nameA2 = name
  }
  if (state.score1 % 2 === 0) {
    state.isServerA1 = false
    state.isServerA2 = true
    state.isServerB1 = false
    state.isServerB2 = false
  } else {
    state.isServerA1 = true
    state.isServerA2 = false
    state.isServerB1 = false
    state.isServerB2 = false
  }
  state.isBallA = true
}

export const setScore2 = state => {
  state.score2++
  // CHANGE POSITION B
  const name = state.nameB1
  if (!state.isBallA) {
    state.nameB1 = state.nameB2
    state.nameB2 = name
  }
  if (state.score2 % 2 === 0) {
    state.isServerB1 = true
    state.isServerB2 = false
    state.isServerA1 = false
    state.isServerA2 = false
  } else {
    state.isServerB1 = false
    state.isServerB2 = true
    state.isServerA1 = false
    state.isServerA2 = false
  }
  state.isBallA = false
}

export const setScoresHistory = state => {
  const scores = {
    // FLAG
    isServerA1: state.isServerA1,
    isServerA2: state.isServerA2,
    isServerB1: state.isServerB1,
    isServerB2: state.isServerB2,
    isBallA: state.isBallA,

    // PLAYERS
    nameA1: state.nameA1,
    nameA2: state.nameA2,
    nameB1: state.nameB1,
    nameB2: state.nameB2,

    // SCORES
    score1: state.score1,
    score2: state.score2,
    teamA: state.teamA,
    teamB: state.teamB
  }

  state.scoresHistory.push(scores)
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
