<template>
  <q-dialog ref="dialog" persistent @hide="onDialogHide">
    <q-card class="my-card">
      <q-card-section
        v-if="title !== null"
        class="text-center title-text-dark-blue font-22"
      >
        {{ title }}
      </q-card-section>
      <q-separator />
      <!-- ICON -->
      <q-card-section v-if="iconPath !== ''">
        <q-icon :name="`img:${iconPath}`" />
      </q-card-section>
      <!-- TEXT -->
      <q-card-section
        v-if="iconName !== '' && iconName === 'check_circle'"
        class="success-icon row flex flex-center"
      >
        <q-icon size="60px" :name="`${iconName}`" :class="`${iconClass}`" />
      </q-card-section>
      <q-card-section
        v-if="iconName !== '' && iconName === 'cancel'"
        class="reject-icon row flex flex-center"
      >
        <q-icon size="60px" :name="`${iconName}`" :class="`${iconClass}`" />
      </q-card-section>
      <q-card-section class="text-center">
        {{ message }}
      </q-card-section>
      <q-card-section
        v-for="(item, idx) in scoresHistory"
        :key="idx"
        class="text-center row"
      >
        <div class="col">
          <div>
            {{ item.teamA }}
            <q-chip
              v-if="item.isBallA"
              dense
              color="secondary"
            />
          </div>
          <div class="text-weight-bold">{{ item.score1 }}</div>
        </div>
        <div class="col">vs</div>
        <div class="col">
          <div>
            {{ item.teamB }}
            <q-chip
              v-if="!item.isBallA"
              dense
              color="secondary"
            />
          </div>
          <div class="text-weight-bold">{{ item.score2 }}</div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          name="alertBtn"
          class="btn-80"
          unelevated
          no-caps
          :label="label"
          color="primary"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'CustomAlert',
  props: {
    title: String,
    scoresHistory: Array,
    message: String,
    iconPath: { type: String, default: '' },
    iconName: { type: String, default: '' },
    iconClass: { type: String, default: '' },
    label: {
      type: String,
      default: 'OK'
    }
  },
  computed: {
    datas () {
      const res = this.message.split(',')
      return res.filter(item => item !== '')
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
<style scoped>
  .font-22 {
    font-size: 22px;
    font-weight: bold;
  }
  .my-card {
    min-width: 480px;
  }
  .success-icon {
    color: #1ec759;
  }
  .reject-icon {
    margin-bottom: 8px;
    color: #eb5757;
  }
</style>
