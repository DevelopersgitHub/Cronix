<template>
  <div id="app">
    <todo-list/>
    <projects/>
    <menu/>
    <router-view/>
  </div>
</template>

<script>
  import Menu from './components/Menu'
  import TodoList from './components/TodoList'
  import Projects from './components/Projects'
  export default {
    name: 'App',
    components: { Menu, Projects, TodoList }
  }
</script>

<style>
  html,body{
    margin:0;
    padding:0;
    background: whitesmoke url("./assets/background.jpg") repeat-x center top;
  }
  #app {
    position: relative;
    min-width:960px;
    font-weight:700;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 18px;

  }
</style>
