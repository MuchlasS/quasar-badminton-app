<template>
  <div>
    <div class="row">
      <!-- TEAM A -->
      <div class="col-6">
        <div>
          <q-card
            @click="addScoreA"
            :class="
              `${isServerA1 ? 'bg-warning' : 'bg-positive'} my-card text-white`
            "
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ nameA1 }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div>
          <q-card
            @click="addScoreA"
            :class="
              `${isServerA2 ? 'bg-warning' : 'bg-positive'} my-card text-white`
            "
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ nameA2 }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- TEAM B -->
      <div class="col-6">
        <div>
          <q-card
            @click="addScoreB"
            :class="
              `${isServerB1 ? 'bg-warning' : 'bg-positive'} my-card text-white`
            "
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ nameB1 }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div>
          <q-card
            @click="addScoreB"
            :class="
              `${isServerB2 ? 'bg-warning' : 'bg-positive'} my-card text-white`
            "
            square
            flat
            bordered
          >
            <q-card-section class="absolute-center">
              <div class="text-h6">{{ nameB2 }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'BadmintonField',
  computed: {
    ...mapGetters('BadmintonStore', {
      // DATA
      nameA1: 'getNameA1',
      nameA2: 'getNameA2',
      nameB1: 'getNameB1',
      nameB2: 'getNameB2',
      score1: 'getScore1',
      score2: 'getScore2',
      // FLAG
      isServerA1: 'getIsServerA1',
      isServerA2: 'getIsServerA2',
      isServerB1: 'getIsServerB1',
      isServerB2: 'getIsServerB2'
    })
  },
  methods: {
    ...mapMutations('BadmintonStore', {
      setScoresHistory: 'setScoresHistory',
      resetUndo: 'resetUndo'
    }),
    ...mapActions('BadmintonStore', {
      setScore1: 'setScore1',
      setScore2: 'setScore2'
    }),
    addScoreA () {
      if (this.score1 === 0 && this.score2 === 0 && this.nameA2 === '') {
        this.$emit('config-on')
      } else {
        this.setScore1()
      }
    },
    addScoreB () {
      if (this.score1 === 0 && this.score2 === 0 && this.nameB1 === '') {
        this.$emit('config-on')
      } else {
        this.setScore2()
      }
    }
  }
}
</script>

<style scoped>
.my-card {
  min-height: 47vh;
  text-align: center;
  border: 4px solid #f4f5f7;
  cursor: pointer;
  min-width: 30vw;
}
</style>
