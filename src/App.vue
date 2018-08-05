<template>
  <div id="app">
    <todo-list/>
    <router-view/>
  </div>
</template>

<script>
  import TodoList from './components/TodoList'
  export default {
    name: 'App',
    components: { TodoList },
    methods: {
      addTodo(title) {
        this.todos.push({
          title,
          done: false,
        });
      },
    },
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
