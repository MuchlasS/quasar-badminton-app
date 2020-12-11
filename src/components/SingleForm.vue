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
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('setValue', value.toUpperCase())
      }
    }
  }
}
</script>

<style>

</style>
