export default function () {
  return {
    // PLAYERS DATA
    nameA1: 'Team 1 Kiri',
    nameA2: 'Team 1 Kanan',
    nameB1: 'Team 2 Kanan',
    nameB2: 'Team 2 Kiri',
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
    /*
    scoresHistory: [
      {
        isServerA1: true,
        isServerA2: false,
        isServerA3: false,
        isServerA4: false,
        score1: 1,
        score2: 0
      }
    ]
    */

    // MISC
    undoCounter: 1
  }
}
