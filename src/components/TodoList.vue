<template>
  <div id="todo-list">
    <input  type="text" class="todo-input"
           placeholder="what needs to be done?"
           v-model="newTodo"
           @keyup.enter="addTodo"/>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
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
</template>

<script>
  export default {
    name: "todo-list",
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        beforeEditCache: '',
        filter: 'all',
        todos: [
          {
            'id': 1,
            'title': 'Visit Cronix',
            'completed': false,
            'editing': false
          },
          {
            'id': 2,
            'title': 'Write TodoList',
            'completed': false,
            'editing': false
          },
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
      showClearCompletedButton() {
        return this.todos.filter(todo => todo.completed).length > 0;
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
      }
    }
  }
</script>

<style lang="scss">

  @import url("https://cdnjs.cloudFlare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  #todo-list {
    float:right;
    width: 50%;
    height: 80%;
    margin: 60px 100px;
    padding: 15px 15px;
    background-color:	white;
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

  input[type="checkbox"] {
    background: url(../assets/check.png) no-repeat;
    cursor: pointer;
  }
  .todo-item {
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
