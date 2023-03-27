<template>
  <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
        <use xlink:href="#bootstrap" />
      </svg>
    </a>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li>
        <a href="#" class="logo">
          <img src="@/assets/Metacar.png" style="float: left; width: 300px; height: 150px; object-fit: cover;" />
        </a>
      </li>
    </ul>

    <div class="col-md-3 text-end">
      <router-link to="/metaCar/login">
        <button type="button" class="btn btn-outline-primary me-2" v-if="headerstate">Login</button>
        <button type="button" class="btn btn-outline-primary me-2" v-if="!headerstate" @click.prevent="logout()">LogOut</button>
      </router-link>

      <router-link to="/metaCar/signup">
        <button type="button" class="btn btn-primary" v-if="headerstate">Sign-up</button>
      </router-link>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const headerstate = ref(false);
    const token = sessionStorage.getItem("token");
    const check = () => {
      console.log(token);
      console.log(headerstate.value);
      if(token == null){
      headerstate.value = true;
      console.log(headerstate.value);
    }
    else{
      console.log(headerstate.value);
    }
    }
    check();

    const logout = () => {
      headerstate.value=true;
      sessionStorage.clear();
      location.reload();
    }
    return {
      logout,
      headerstate
    }
    }

  }
</script>

<style></style>