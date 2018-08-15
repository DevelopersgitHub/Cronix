import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import TodoList from '../components/TodoList'
import User from '../components/User'
import UserProfile from '../components/UserProfile'
import UserPosts from '../components/UserPosts'
import EmptyUser from '../components/EmptyUser'

import UserSettings from '../components/UserSettings'
import UserSettingsNav from '../components/UserSettingsNav'
import UserProfileEdit from '../components/UserProfileEdit'
import UserProfilePreview from '../components/UserProfilePreview'
import UserEmailSubscription from '../components/UserEmailSubscription'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/settings',
      component: UserSettings,
      name: 'settings',
      children: [
        {
          path: 'emails',
          name: 'emaildescription',
          component: UserEmailSubscription
        },
        {
          path: 'profile',
          name: 'userProfile',
          components: {
            default: UserProfileEdit,
            helper: UserProfilePreview
          }
        }
      ]
    }
  ]




  /*{
    path: '/',
    components: {
      default: App,
      a: TodoList,
      b: UserProfile
    }
  }

  {
    path: '/home',
    name: 'Home',
    component: App
  },
  {
    path: '/home/todolist/:username?',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/home/user/:id?',
    name: 'user',
    component: User,
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path: 'posts',
        name: 'UserPosts',
        component: UserPosts
      },
      {
        path: '',
        name: 'EmptyUser',
        component: EmptyUser
      }
    ]
  }*/

})

