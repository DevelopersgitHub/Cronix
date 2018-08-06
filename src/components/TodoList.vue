<template>
  <div>
    <div id="todo-list">
      <input type="text" class="todo-input"
             placeholder="what needs to be done?"
             v-model="newTodo"
             @keyup.enter="addTodo"/>
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
          <input type="checkbox" v-model="todo.completed"/>
          <div class="todo-item-left">
            <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label"
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
          <button class="btn btn-info" :class="{active: filter=='all'}"
                  @click="filter='all'">All
          </button>
          <button class="btn btn-info" :class="{active: filter=='active'}"
                  @click="filter='active'">Active
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
        <li class="list-group-item list-group-item-action" v-for="(project, index) in listProjects"
            @click="filterProject=project.name">
          <div  v-if="!project.editing">
            <img class="edit-item-project" src="../assets/edit.jpg" width="10px" height="10px"
                 @click="editProject(project)"/><a href="#">{{project.name}}</a>
            <span class="remove-item-project" @click="removeProject(index)">&times;</span>
          </div>
          <input v-else class="todo-item-edit" type="text"
                 v-model="project.name"
                 @blur="doneEditProject(project)"
                 @keyup.enter="doneEditProject(project)"
                 @keyup.esc="cancelEditProject(project)"
                 v-focus/>

        </li>
      </ul>
      <input class="nameProject" type="text" @keyup.enter="addProject(nameProject)" v-model="nameProject"/>
      <button type="button" class="btn btn-info" v-on:click="addProject(nameProject)"> Add project
      </button>
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
        idForProject: 6,
        beforeEditCache: '',
        beforeEditCacheProject: '',
        filter: 'all',
        filterProject: 'Home',
        nameProject: '',
        listProjects: [
          {
            'id': 1,
            'name': 'Home',
            'editing': false
          },
          {
            'id': 2,
            'name': 'Job',
            'editing': false
          },
          {
            'id': 3,
            'name': 'Study',
            'editing': false
          },
          {
            'id': 4,
            'name': 'Buy',
            'editing': false
          },
          {
            'id': 5,
            'name': 'Private',
            'editing': false
          },
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
        return this.todos.filter(todo => !todo.completed && todo.project === this.filterProject).length;
      },
      anyRemaining() {
        return this.remaining !== 0;
      },
      showClearCompletedButton() {
        return this.todos.filter(todo => todo.completed).length > 0;
      },
      todosFiltered() {
        switch (this.filter) {
          case 'all':
            return this.todos.filter(todo => todo.project === this.filterProject);
          case 'active':
            return this.todos.filter(todo => !todo.completed && todo.project === this.filterProject);
          case 'completed':
            return this.todos.filter(todo => todo.completed && todo.project === this.filterProject);
        }
      },
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
        if (this.newTodo.trim().length === 0) {
          return
        }
        this.todos.push({
          id: this.idForTodo,
          title: this.newTodo,
          project: this.filterProject,
          completed: false,
          editing: false
        });
        this.newTodo = '';
        this.idForTodo++;
      },
      addProject() {
        if (this.nameProject.trim().length == 0) {
          return
        }
        this.listProjects.push({
          id: this.idForProject,
          name: this.nameProject,
          editing: false
        });
        this.nameProject = '';
        this.idForProject++;
      },
      removeTodoProject(index) {
        this.listProjects.splice(index, 1);
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
      editProject(project) {
        this.beforeEditCacheProject = project.name;
        project.editing = true;
      },
      doneEditProject(project) {
        if (project.name.trim() == '') {
          project.name = this.beforeEditCacheProject;
        }
        project.editing = false;
      },
      cancelEditProject(project) {
        project.name = this.beforeEditCacheProject;
        project.editing = false;
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      removeProject(index) {
        this.listProjects.splice(index, 1);
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

  .nameProject {
    width: 60%;
    margin: 10px;
    border-radius: 5px;
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

  .remove-item-project {
    cursor: pointer;
    float: right;
    padding-bottom: 10px;

    &:hover {
      color: black;
    }
  }

  .edit-item-project {
    cursor: pointer;
    float: left;

    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    width: 250px;
    padding: 10px;
    border: 1px solid #a7c1c7;
    color: #177878;
    border-radius: 10px;
    margin-left: 12px;
  }

  .todo-item-edit {
    width: 250px;
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
