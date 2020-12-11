<template>
  <div class="absolute-center my-card">
    <q-card class="q-px-xl q-py-md">
      <!-- LOGO & TYPOGRAPHY -->
      <q-card-section class="flex flex-center">
        <img src="~assets/img/tetascore.svg" class="q-pr-md my-img col" contain />
      </q-card-section>

      <!-- SCORE & TEAM NAME -->
      <q-card-section >
        <div class="row items-center justify-center q-pt-lg q-pb-xl">
          <!-- TEAM 1 -->
          <div class="col-md-4 col-sm-12 text-center">
            <q-card class="q-pa-md bg-deep-purple-9">
            <div class="text-h6 text-regular text-white">{{ team1 }}</div>
            <div class="text-h2 text-bold q-mt-md text-white">{{ score1 }}</div>
            </q-card>
          </div>

          <!-- TYPOGRAPYH VS -->
          <div class="col-md-4 col-sm-12 text-center q-pa-lg">
            <div class="text-h4 text-grey-9 gt-xs">VS</div>
            <div class="text-h6 text-grey-9 lt-sm">VS</div>
          </div>
          <!-- TEAM 2 -->
          <div class="col-md-4 col-sm-12 text-center">
            <q-card class="q-pa-md bg-grey-9">
            <div class="text-h6 text-regular text-white">{{ team2 }}</div>
            <div class="text-h2 text-bold q-mt-md text-white">{{ score2 }}</div>
            </q-card>
          </div>
        </div>

        <div class="flex flex-center">
          <timer />
        </div>
        <div class="row justify-center q-pt-lg">
          <q-btn class="my-btn q-mr-xs" color="grey-9" :outline="isStart" unelevated @click="stopWatchButton">
            <q-icon class="q-mr-sm" :name="`${isStart ? 'pause' : 'play_arrow'}`"
              :color="`${isStart ? 'grey-9' : 'white'}`" />
            <div :class="`${isStart ? 'text-grey-9' : 'text-white'}`">{{isStart ? 'Pause' : 'Start'}}</div>
          </q-btn>
          <q-btn class="my-btn q-ml-xs" unelevated @click="resetStopwatch">
            <q-icon class="q-mr-sm" name="replay" color="grey-9" />
            <div class="text-grey-9">Reset</div>
          </q-btn>
        </div>
      </q-card-section>

      <!-- BUTTON CONFIG -->
      <q-card-section class="flex flex-center">
        <div class="row">
          <div class="col">
            <q-btn flat @click="undo" :disable="disableUndo">
              <div>
                <q-icon name="undo" :color="disableUndo ? 'deep-purple-4' : 'deep-purple-9'" class="q-mb-sm"/>
                <div class="text-caption text-deep-purple-9">Undo</div>
              </div>
            </q-btn>
          </div>
          <div class="col">
            <q-btn flat @click="redo" :disable="!isUndo">
              <div>
              <q-icon name="redo" :color="disableUndo ? 'deep-purple-4' : 'deep-purple-9'" class="q-mb-sm"/>
              <div class="text-caption text-deep-purple-9">Redo</div>
              </div>
            </q-btn>
          </div>
          <div class="col">
            <q-btn flat @click="config">
              <div>
              <q-icon name="settings" color="deep-purple-9" class="q-mb-sm"/>
              <div class="text-caption text-deep-purple-9">Config</div>
              </div>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <stepper-config :step-dialog="isStepDialog" @closeDialog="close" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'ScoreBoard',
  props: {
    configOn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isStepDialog: false
    }
  },
  components: {
    Timer: () => import('./Timer'),
    StepperConfig: () => import('./StepperConfig')
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
    },
    close () {
      this.isStepDialog = false
      this.$emit('config-off')
    }
  },
  watch: {
    configOn () {
      this.isStepDialog = this.configOn
    }
  }
}
</script>

<style scoped>
  .my-card {
    min-width: 70vh;
  }

  .my-img {
    max-width: 150px;
    height: 30px;
  }

  .my-btn {
    width: 120px;
  }
</style>
