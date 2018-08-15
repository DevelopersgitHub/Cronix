<template>
  <div id="user">
    {{$route.params.id}}
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "User",
    /* watch: {
       '$route'(to, from) {
          console.log(this.$route, 'route is change')
       }
     }*/
    /*beforeRouteUpdate(to, from, next) {
      console.log(to)
      next()
    }*/
  }
</script>

<style scoped>

</style>
