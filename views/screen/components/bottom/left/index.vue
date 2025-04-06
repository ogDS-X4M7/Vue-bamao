<template>
  <div class="left">
    <tourlist />
    <sex />
    <age />
  </div>
</template>

<script setup lang="ts">
import tourlist from "./tourlist/index.vue";
import sex from "./sex/index.vue";
import age from "./age/index.vue";
</script>

<style scoped lang="scss">
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  //   background: #000;
}
</style>