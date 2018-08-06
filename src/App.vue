<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 15px;
}
.container{
  height: 100%;
}
.content{
  height: calc(100% - 49px - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
  background: #eee;
}
</style>
