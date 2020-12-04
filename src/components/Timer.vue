<template>
  <div>
    <div class="text-subtitle2">{{ timer }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Timer',
  computed: {
    ...mapGetters('BadmintonStore', {
      timer: 'getTimer'
    })
  }
}
</script>

<style></style>
