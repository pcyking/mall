<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <tab-footer></tab-footer>
  </div>
</template>

<script>
import TabFooter from "@/components/common/TabFooter";
export default {
  name: "App",
  components: {
    TabFooter
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
