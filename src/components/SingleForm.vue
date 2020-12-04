<template>
  <div class="q-pa-md">
    <q-input :label="label" v-model="model" outlined />
  </div>
</template>

<script>
export default {
  name: 'SingleForm',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      model: ''
    }
  },
  watch: {
    value (val) {
      this.model = val
    },
    model (val) {
      this.$emit('setValue', val)
    }
  }
}
</script>

<style>

</style>
