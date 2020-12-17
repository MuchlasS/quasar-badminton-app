<template>
  <q-dialog v-model="stepDialog" class="q-pa-md" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Config</div>
        <q-space />
        <q-btn
          @click="$emit('closeDialog')"
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          contracted
          header-nav
        >
          <q-step
            :name="1"
            title="Pilih Mode Pertandingan"
            :done="step > 1"
          >
            <div class="q-gutter-sm q-pa-md text-center">
              <div class="text-subtitle2">Match Type</div>
              <q-radio v-model="isSingle" :val="true" label="Single" />
              <q-radio v-model="isSingle" :val="false" label="Ganda" />
            </div>
          </q-step>

          <q-step
            :name="2"
            title="Masukkan Nama Team"
            caption="Optional"
            class="text-center"
            :done="step > 2"
          >
            <div class="text-subtitle2">Team Name</div>
            <single-form
              :value="valueTeamA"
              :label="labelTeamA"
              @setValue="setTeamAValue"
            />
            <single-form
              :value="valueTeamB"
              :label="labelTeamB"
              @setValue="setTeamBValue"
            />
          </q-step>

          <q-step
            :name="3"
            title="Masukkan Nama Player A"
            class="text-center"
            :done="step > 3"
          >
            <div class="text-subtitle2">{{ valueTeamA }}</div>
            <single-form
              v-if="!isSingle"
              :value="valuePlayerA1"
              :label="labelPlayerA1"
              @setValue="setPlayerA1Value"
            />
            <single-form
              :value="valuePlayerA2"
              :label="labelPlayerA2"
              @setValue="setPlayerA2Value"
            />
          </q-step>

          <q-step :name="4" title="Masukkan Nama Player B" class="text-center">
            <div class="text-subtitle2">{{ valueTeamB }}</div>
            <single-form
              v-if="!isSingle"
              :value="valuePlayerB2"
              :label="labelPlayerB2"
              @setValue="setPlayerB2Value"
            />
            <single-form
              :value="valuePlayerB1"
              :label="labelPlayerB1"
              @setValue="setPlayerB1Value"
            />
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row justify-center">
              <q-btn
                @click="handleClick"
                color="primary"
                :label="step === 4 ? 'Finish' : 'Continue'"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'StepperConfig',
  props: {
    stepDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      step: 1,
      labelTeamA: 'Team A',
      labelPlayerA1: 'Player A Kiri',
      labelPlayerA2: 'Player A Kanan',
      labelTeamB: 'Team B',
      labelPlayerB1: 'Player B Kanan',
      labelPlayerB2: 'Player B Kiri'
    }
  },
  components: {
    SingleForm: () => import('./SingleForm')
  },
  computed: {
    ...mapGetters('BadmintonStore', {
      valueTeamA: 'getTeam1',
      valueTeamB: 'getTeam2',
      valuePlayerA1: 'getNameA1',
      valuePlayerA2: 'getNameA2',
      valuePlayerB1: 'getNameB1',
      valuePlayerB2: 'getNameB2',
      valueIsSingle: 'getIsSingle'
    }),
    isSingle: {
      get () {
        return this.valueIsSingle
      },
      set (value) {
        this.setIsSingle(value)
      }
    }
  },
  methods: {
    ...mapMutations('BadmintonStore', {
      setTeamA: 'setTeamA',
      setTeamB: 'setTeamB',
      setNameA1: 'setNameA1',
      setNameA2: 'setNameA2',
      setNameB1: 'setNameB1',
      setNameB2: 'setNameB2',
      setIsSingle: 'setIsSingle',
      setScoresHistory: 'setScoresHistory'
    }),
    setTeamAValue (val) {
      this.setTeamA(val)
    },
    setTeamBValue (val) {
      this.setTeamB(val)
    },
    setPlayerA1Value (val) {
      this.setNameA1(val)
    },
    setPlayerA2Value (val) {
      this.setNameA2(val)
    },
    setPlayerB1Value (val) {
      this.setNameB1(val)
    },
    setPlayerB2Value (val) {
      this.setNameB2(val)
    },
    handleClick () {
      if (this.step < 4) {
        this.$refs.stepper.next()
      } else {
        this.$emit('closeDialog')
        this.setScoresHistory()
        this.step = 1
      }
    }
  }
}
</script>
