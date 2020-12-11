<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar class="my-toolbar bg-grey-9">
        <q-toolbar-title class="text-center">
          <img class="my-img" cover src="~assets/img/logo.svg" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped>
  .my-toolbar {
    min-height: 6vh;
  }
  .my-img {
    width: 260px;
    max-height: 4vh;
    padding-top: 1vh;
  }
</style>
