<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
