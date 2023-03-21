<template>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Mark Otto, Jacob Thornton, 그리고 Bootstrap 기여자들">
        <meta name="generator" content="Hugo 0.104.2">
        <title>로그인 화면</title>
        <link rel="canonical" href="https://getbootstrap.kr/docs/5.2/examples/sign-in/">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">


    </head>

    <body class="text-center" style="margin: 0 auto;">

        <main class="form-signin w-100 m-auto">
            <form action="/login" method="post" name="member">
                <h1 class="h3 mb-3 fw-normal">로그인 해주세요.</h1>

                <div class="form-floating">
                    <input type="text" class="form-control" name="username" placeholder="id">
                    <label for="floatingInput">아이디</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" name="password" placeholder="Password">
                    <label for="floatingPassword">비밀번호</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> 아이디 저장
                    </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit" value="Sign in">로그인</button>
                <br>
                <br>
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            </form>
            <button class="w-100 btn btn-lg btn-primary" @click="signup">회원가입</button>
            <p class="mt-5 mb-3 text-muted">&copy; 20230309 ~ 20230314</p>

            <c:if test="${not empty error}">
                <p style="color: red">${error}</p>
            </c:if>
        </main>
    </body>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const signup = () => {
            router.push({
                name: 'Signup',

            });
        }

        return{
            signup,
        }
    }
    
}
</script>

<style>
@import "@/css/login.css";
</style>