export default function () {
  return {
    // PLAYERS DATA
    nameA1: '',
    nameA2: '',
    nameB1: '',
    nameB2: '',
    teamA: 'Team 1',
    teamB: 'Team 2',
    timer: '00:00:000',

    // FLAG
    isServerA1: false,
    isServerA2: true,
    isServerB1: false,
    isServerB2: false,
    isBallA: true,
    isUndo: false,
    isRedo: false,
    isStart: false,
    isSingle: true,

    // SCORES DATA
    score1: 0,
    score2: 0,
    scoresHistory: [],

    // MISC
    undoCounter: 1
  }
}
