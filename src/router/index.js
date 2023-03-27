import { createRouter, createWebHistory } from "vue-router";
import Profile from "../pages/profile.vue";
import Login from "../pages/login.vue";
import Signup from "../pages/signup.vue";
import Rental from "../pages/rental.vue"
import Main from "../pages/main.vue";
import Detail from "../pages/detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/metaCar/main",
      name: "main",
      component: Main,
    },
    {
      path: "/metaCar/detail/:carNum",
      name: "detail",
      component: Detail,
    },
    {
      path: "/metaCar/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/metaCar/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/metaCar/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: '/metaCar/rental',
      name: 'Rental',
      component: Rental
    }
  ],
});

export default router;

//  /
//  /todos
//  /todos/create
//  /todos/:id
