<template>
  <q-page>
    <badminton-field @config-on="configOn = true" />
    <score-board :config-on="configOn" @config-off="configOn = false" />
  </q-page>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PageIndex',
  data () {
    return {
      configOn: false
    }
  },
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
