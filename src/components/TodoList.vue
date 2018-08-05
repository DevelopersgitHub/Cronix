<template>
  <div>
    <div id="todo-list">
      <input type="text" class="todo-input"
             placeholder="what needs to be done?"
             v-model="newTodo"
             @keyup.enter="addTodo"/>

      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

        <div v-for="(todo, index) in [...compList, todosFiltered]" :key="todo.id" class="todo-item">

          <input type="checkbox" v-model="todo.completed"/>


          <div class="todo-item-left">
            <div v-if="!todo.editing" @dblclick="editTodo(todo)"
                 class="todo-item-label"
                 :class="{ completed : todo.completed }">{{todo.title}}
            </div>


            <input v-else class="todo-item-edit" type="text"
                   v-model="todo.title"
                   @blur="doneEdit(todo)"
                   @keyup.enter="doneEdit(todo)"
                   @keyup.esc="cancelEdit(todo)"
                   v-focus/>
          </div>

          <div class="remove-item" @click="removeTodo(index)">
            &times;
          </div>
        </div>
      </transition-group>

      <div class="extra-container">
        <div>
          <label><input type="checkbox" :checked="!anyRemaining"
                        @change="checkAllTodos"/> Check All</label>
        </div>
        <div>{{remaining}} items left</div>
      </div>

      <div class="extra-container">
        <div>
          <button class="btn btn-info" :class="{active: filter == 'all'}"
                  @click="filter='all'">All
          </button>
          <button class="btn btn-info" :class="{active: filter=='active'}"
                  @click="filter = 'active'">Active
          </button>
          <button class="btn btn-info" :class="{active: filter == 'completed'}"
                  @click="filter='completed'">Completed
          </button>
        </div>

        <div>
          <transition name="fade">
            <button class="btn btn-info" v-if="showClearCompletedButton"
                    @click="clearCompleted">Clear Completed
            </button>
          </transition>
        </div>
      </div>
    </div>


    <div class="projects">
      <h3 class="borderProject"> Projects </h3>

      <ul class="borderProject, list-group list-group-flush" style="list-style-type: none">

        <li class="list-group-item list-group-item-action" v-for="(project, index) in listProjects" @click="filterProject=project.name">
          <a href="#">{{project.name}} </a>
        </li>
      </ul>

      <input type="text" @keyup.enter="addProject(nameProject)" v-model="nameProject"/>
      <button type="button" class="btn btn-info, projectsButton" v-on:click="addProject(nameProject)"> Add project
      </button>
      <!--
      <button type="button" @keyup.enter="doneEditProject(nameProject)" class="btn btn-info, projectsButton">Edit
        project
      </button>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button class="btn btn-secondary" :class="{active: filterProject == 'Home'}"
                @click="filterProject='Home'">Home
        </button>
        <button class="btn btn-secondary" :class="{active: filterProject=='Job'}"
                @click="filterProject = 'Job'">Job
        </button>
        <button class="btn btn-secondary" :class="{active: filterProject == 'Buy'}"
                @click="filterProject='Buy'">Buy
        </button>
        <button class="btn btn-secondary" :class="{active: filterProject == 'Private'}"
                @click="filterProject='Private'">Private
        </button>
      </div>-->

      <!--<ul>
        <li class="list-group-item list-group-item-action" @click="filterProject='Home'">
          <a href="#" v-on:click="showProject">Home</a><span class="badge badge-primary badge-pill">0</span>
        </li>
        <li class="list-group-item list-group-item-action" @click="filterProject='Job'">
          <a href="#">Job</a><span class="badge badge-primary badge-pill">0</span>
        </li>
        <li class="list-group-item list-group-item-action" @click="filterProject='Buy'">
          <a href="#" v-on:click="showProject">Buy</a><span class="badge badge-primary badge-pill">0</span>
        </li>
        <li class="list-group-item list-group-item-action" @click="filterProject='Private'">
          <a href="#" v-on:click="showProject">Private</a><span class="badge badge-primary badge-pill">0</span>
        </li>
      </ul>-->
    </div>

  </div>
</template>

<script>
  export default {
    name: "todo-list",
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        idForProject: 5,
        beforeEditCache: '',
        filter: 'all',
        filterProject: 'Home',
        nameProject: '',
        listProjects: [
          {
            id: 1,
            name: 'Home'
          },
          {
            id: 2,
            name: 'Job'
          },
          {
            id: 3,
            name: 'Buy'
          },
          {
            id: 4,
            name: 'Private'
          }
        ],
        todos: [
          {
            'id': 1,
            'title': 'Visit Cronix',
            'project': 'Job',
            'completed': false,
            'editing': false
          },
          {
            'id': 2,
            'title': 'Write TodoList',
            'project': 'Private',
            'completed': false,
            'editing': false
          }
        ]
      }
    },
    computed: {
      remaining() {
        return this.todos.filter(todo => !todo.completed).length;
      },
      anyRemaining() {
        return this.remaining != 0;
      },
      showClearCompletedButton() {
        return this.todos.filter(todo => todo.completed).length > 0;
      },
      todosFiltered() {
        if (this.filter == 'all') {
          return this.todos;
        } else if (this.filter == 'active') {
          return this.todos.filter(todo => !todo.completed);
        } else if (this.filter == 'completed') {
          return this.todos.filter(todo => todo.completed);
        }
        return this.todos;
      },
      compList() {
        if (this.filterProject == '') {
          return '';
        } else if (this.filterProject == 'Home') {
          return this.todos.filter(todo => todo.project === 'Home');
        } else if (this.filterProject == 'Job') {
          return this.todos.filter(todo => todo.project === 'Job');
        } else if (this.filterProject == 'Buy') {
          return this.todos.filter(todo => todo.project === 'Buy');
        } else if (this.filterProject == 'Private') {
          return this.todos.filter(todo => todo.project === 'Private');
        }
        return this.todos;
      },
      filterProperty(project) {
          if(project.name === '') {
            return '';
          } else if(project.name === 'Home') {
            return 'Home';
          } else if(project.name === 'Buy') {
            return 'Buy';
          } else if(project.name === 'Job') {
            return 'Job';
          } else if(project.name === 'Private') {
            return 'Private'
          }
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus();
        }
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim().length == 0) {
          return
        }
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          completed: false
        });
        this.newTodo = '';
        this.idForTodo++;
      },
      editTodo(todo) {
        this.beforeEditCache = todo.title;
        todo.editing = true;
      },
      doneEdit(todo) {
        if (todo.title.trim() == '') {
          todo.title = this.beforeEditCache;
        }
        todo.editing = false;
      },
      cancelEdit(todo) {
        todo.title = this.beforeEditCache;
        todo.editing = false;
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      checkAllTodos() {
        this.todos.forEach((todo) => todo.completed = event.target.checked);
      },
      clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
      },
      showProject() {
        return this.todos.filter(todo => {
          return todo.project === 'private'
        });
      },
      addProject(nameProject) {
        if (this.nameProject.trim().length == 0) {
          return
        }
        this.listProjects.push({
          id: this.idForProject,
          name: this.nameProject
        });
        this.nameProject = '';
        this.idForProject++;
      },
      removeTodoProject(index) {
        this.listProjects.splice(index, 1);
      }
    }
  }
</script>

<style lang="scss">

  @import url("https://cdnjs.cloudFlare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .btn-group {
    margin-bottom: 10px;
  }

  .projects {
    position: absolute;
    float: left;
    width: 25%;
    margin: 60px 44px;
    padding: 10px 10px;
    border: 1px solid white;
    border-radius: 5px;
  }

  .projectsButton {
    margin-top: 5px;
  }

  #todo-list {
    float: right;
    width: 65%;
    margin: 60px 35px;
    padding: 15px 15px;
    border: 1px solid white;
    border-radius: 5px;
  }

  .borderProject {
    font-size: 20px;
    border-bottom: 1px solid white;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .todo-input {
    width: 95%;
    padding: 12px 18px;
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    width: 50%;
    margin: 0 auto;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;

    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid #a7c1c7;
    color: #177878;
    border-radius: 10px;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e58;
    margin-left: 12px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      outline: none;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
