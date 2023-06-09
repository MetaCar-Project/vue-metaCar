import { createRouter, createWebHistory } from "vue-router";
import Profile from "@/pages/Profile.vue";
import Login from "@/pages/Login.vue";
import Signup from "@/pages/Signup.vue";
import Rental from "@/pages/Rental.vue";
import Main from "@/pages/Main.vue";
import Detail from "@/pages/Detail.vue";
import Cancel from "@/pages/Cancel.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/metaCar/main",
    },
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
      path: "/metaCar/profile/:id",
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
      path: "/metaCar/rental/:id/:carNum",
      name: "Rental",
      component: Rental,
    },
    {
      path: "/metaCar/cancel/:id",
      name: "Cancel",
      component: Cancel,
    },
  ],
});

export default router;

//  /
//  /todos
//  /todos/create
//  /todos/:id
