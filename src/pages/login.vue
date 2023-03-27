<template>
    <body class="text-center" style="margin: 0 auto;">

        <main class="form-signin w-100 m-auto">
            <form action="/login" method="post" name="member">
                <h1 class="h3 mb-3 fw-normal">로그인 해주세요.</h1>

                <div class="form-floating">
                    <input type="text" class="form-control" name="id" placeholder="id" v-model="id">
                    <label for="floatingInput">아이디</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" name="password" placeholder="Password" v-model="password">
                    <label for="floatingPassword">비밀번호</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> 아이디 저장
                    </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit" value="Sign in" @click.prevent="login()">로그인</button>
                <br>
                <br>
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            </form>
            <button class="w-100 btn btn-lg btn-primary" @click.prevent="signup()">회원가입</button>
            <p class="mt-5 mb-3 text-muted">&copy; 20230309 ~ 20230314</p>

            <c:if test="${not empty error}">
                <p style="color: red">${error}</p>
            </c:if>
        </main>
    </body>
</template>

<script>
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import axios from 'axios';
export default {
    setup(){
      const router = useRouter();
      const token = ref('');
      const id = ref('');
      const password = ref('');
      const login = () =>{
        console.log(id.value);
        console.log(password.value);
        const login2 = async () =>{
          const res = await axios
            .post('/login',{
                              id : id.value,
                              password : password.value
                            })
            .then((result)=>{
              console.log("success");
              console.log(result.headers.token);
              sessionStorage.setItem("token",result.headers.token);
              sessionStorage.setItem("id",id.value);
              alert('로그인 성공');
              router.push({ name : 'main', params : {id : id.value}});
              if(result.headers.token==null){
                alert("로그인 실패");
              }
              token.value=result.headers.token;
          }).catch((result) =>{
            console.log(result);
          })
        }
        login2();

        
      }

      const signup = () => {
          router.push("Signup");
        }
      return{
        id,
        password,
        login,
        signup
      }
    }

}
</script>

<style>
@charset "UTF-8";

html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>