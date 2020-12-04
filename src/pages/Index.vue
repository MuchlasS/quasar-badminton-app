<template>
  <q-page>
    <badminton-field />
    <score-board />
  </q-page>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PageIndex',
  created () {
    this.setDefault()
  },
  methods: {
    ...mapMutations('BadmintonStore', {
      setDefault: 'setScoresHistory'
    })
  },
  components: {
    BadmintonField: () => import('src/components/BadmintonField'),
    ScoreBoard: () => import('src/components/ScoreBoard')
  }
}
</script>
