<template>
    <div>
      <div class="text-h5 text-grey-9">{{ timer }}</div>
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

<style scoped>
  .my-card {
    width: 120px;
  }
</style>
