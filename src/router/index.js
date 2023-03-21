import { createRouter, createWebHistory } from "vue-router";
import Profile from "../pages/profile.vue";
import Login from "../pages/login.vue";
import Signup from "../pages/signup.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
  ],
});

export default router;

//  /
//  /todos
//  /todos/create
//  /todos/:id
