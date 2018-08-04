<template>
  <div id="app">
    <todo-list/>
    <projects/>
    <menu/>
    <router-view/>
  </div>
</template>

<script>
  import TodoList from './components/TodoList'
  import Projects from './components/Projects'
  import Menu from './components/Menu'
  export default {
    name: 'App',
    components: { TodoList, Projects, Menu }
  }
</script>

<style>
  html,body{
    margin:0;
    padding:0;
    background: whitesmoke url("./assets/background.jpg") repeat-x center top;
  }
  #app {
    min-width:960px;
    font-weight:700;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 18px;

  }
</style>
