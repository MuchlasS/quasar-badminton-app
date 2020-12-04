<template>
  <div class="absolute-center">
    <q-card class="score-card q-px-xl">
      <!-- LOGO & TYPOGRAPHY -->
      <q-card-section class="flex flex-center">
        <div class="row">
          <img src="~assets/img/logo.svg" class="q-px-sm col" />
          <div class="text-h5 font-bold text-secondary q-py-md col">
            TetaScore
          </div>
        </div>
      </q-card-section>

      <!-- SCORE & TEAM NAME -->
      <q-card-section class="flex flex-center">
        <div class="row">
          <!-- TEAM 1 -->
          <div class="col text-center">
            <div class="text-h6 text-regular q-mb-md">{{ team1 }}</div>
            <div class="text-h2 text-bold">{{ score1 }}</div>
          </div>

          <!-- TYPOGRAPYH VS -->
          <div class="col text-center q-mx-lg q-pa-lg">
            <timer />
            <q-chip color="secondary" text-color="white" size="xl" label="vs" />
            <q-btn
              class="q-mt-sm"
              :color="`${isStart ? 'warning' : 'positive'}`"
              :label="`${isStart ? 'Pause' : 'Start'} Timer`"
              @click="stopWatchButton"
            />
            <q-btn
              class="q-mt-sm"
              label="Reset Timer"
              color="negative"
              @click="resetStopwatch"
            />
          </div>
          <!-- TEAM 2 -->
          <div class="col text-center">
            <div class="text-h6 text-regular q-mb-md">{{ team2 }}</div>
            <div class="text-h2 text-bold">{{ score2 }}</div>
          </div>
        </div>
      </q-card-section>

      <!-- BUTTON CONFIG -->
      <q-card-section class="flex flex-center">
        <div class="row">
          <div class="col">
            <q-btn flat @click="undo" :disable="disableUndo">
              <div>
                <img src="~assets/img/undo.svg" class="q-mb-sm" />
                <div class="text-caption text-secondary">
                  Undo
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col">
            <q-btn flat @click="redo" :disable="!isUndo">
              <div>
                <img src="~assets/img/redo.svg" class="q-mb-sm" />
                <div class="text-caption text-secondary">
                  Redo
                </div>
              </div>
            </q-btn>
          </div>

          <div class="col">
            <q-btn flat @click="config">
              <div>
                <img src="~assets/img/config.svg" class="q-mb-sm" />
                <div class="text-caption text-secondary">
                  Config
                </div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- <stepper-config :step-dialog="isStepDialog" @closeDialog="isStepDialog = false" /> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'ScoreBoard',
  data () {
    return {
      isStepDialog: false
    }
  },
  components: {
    Timer: () => import('./Timer')
    // StepperConfig: () => import('./StepperConfig')
  },
  computed: {
    ...mapGetters('BadmintonStore', {
      score1: 'getScore1',
      score2: 'getScore2',
      team1: 'getTeam1',
      team2: 'getTeam2',
      isUndo: 'getIsUndo',
      isStart: 'getIsStart'
    }),
    disableUndo () {
      return this.score1 === 0 && this.score2 === 0
    }
  },
  methods: {
    ...mapMutations('BadmintonStore', {
      setUndo: 'setUndo',
      setRedo: 'setRedo'
    }),
    ...mapActions('BadmintonStore', {
      setTimer: 'setTimer',
      resetTimer: 'resetTimer'
    }),
    undo () {
      this.setUndo()
    },
    redo () {
      if (this.isUndo) {
        this.setRedo()
      }
    },
    config () {
      this.isStepDialog = true
    },
    stopWatchButton () {
      this.setTimer()
    },
    resetStopwatch () {
      this.resetTimer()
    }
  }
}
</script>

<style>
</style>
