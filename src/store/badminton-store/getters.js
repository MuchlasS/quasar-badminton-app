/*
export function someGetter (state) {
}
*/
export const getScore1 = state => state.score1
export const getScore2 = state => state.score2
export const getTeam1 = state => state.teamA
export const getTeam2 = state => state.teamB

export const getNameA1 = state => state.nameA1
export const getNameA2 = state => state.nameA2
export const getNameB1 = state => state.nameB1
export const getNameB2 = state => state.nameB2

export const getIsSingle = state => state.isSingle

export const getTimer = state => state.timer

// FLAG
export const getIsServerA1 = state => state.isServerA1
export const getIsServerA2 = state => state.isServerA2
export const getIsServerB1 = state => state.isServerB1
export const getIsServerB2 = state => state.isServerB2
export const getIsUndo = state => state.isUndo
export const getIsStart = state => state.isStart
