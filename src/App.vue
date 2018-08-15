<template>
  <div id="app">
    <!--<p>{{username}}</p>
    <button @click="goBack" class="btn danger"> << </button>
    <router-link to="/home/todolist">Click</router-link>-->
    <!-- <todo-list/>
     <button @click="goNext"> >> </button>
     <router-link :to="{name: 'user', params: {id:124}}">GO</router-link>
     <router-view/>
     <router-view name="a"/>
     <router-view name="b"/>-->
    <h1>View of user settings</h1>
    <router-view/>
  </div>
</template>

<script>
  /*import TodoList from './components/TodoList'*/
  export default {
    name: 'App',
    /*components: { TodoList },*/
    methods: {
      addTodo(title) {
        this.todos.push({
          title,
          done: false,
        });
      },
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/home')
      },
      goNext() {
        this.$router.push('home/');
        /*this.$router.replace('home/user/prog');
        this.$router.replace('home/user/mick');
        this.$router.replace('home/user/gen');*/
      }
    },
    computed: {
      username() {
        return this.$route.params.username
      }
    }
  }
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/animate.css/animate.min.css';

  html, body {
    margin: 0;
    padding: 0;
    background: whitesmoke url("./assets/background.jpg") repeat-x center top;
  }

  #app {
    position: relative;
    min-width: 960px;
    font-weight: 700;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 18px;
  }

  .router-link-active {
    background-color: aqua;
  }

  .us {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    grid-template-areas: "header header" "nav content" "nav helper";
  }

  h2 {
    grid-area: header;
  }

  .us__nav {
    grid-area: nav;
    border: 1px dotted;
    margin-right: .75rem;
    padding: .3rem;
  }

  .us__content {
    grid-area: content;
  }

  .us__content--helper {
    grid-area: helper;
  }

</style>
