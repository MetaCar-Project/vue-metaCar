<template>
  

    <main class="form-signin w-100 m-auto">
      <div class="row">
        
        <form action="/signup" method="post" name="member">
          <legend>회원 가입</legend>


          <input type="text" name="name"  class="form-control" placeholder="이름" v-model="name"/>
          <div id="namenull" style="color : red" v-if="nameNull">이름을 입력해주세요.</div>

          <br>

          <input type="text" name="id"  class="form-control" placeholder="아이디" v-model="id"/>
          <br>
          <button class="btn btn-md btn-primary btn-block signup-btn" type="button" id="checkbutton" @click="checkId()">확인</button>
          <div id="canpost" hidden="hidden" data-validation='false'></div>
          <div id="valid" hidden="hidden" style="color : red">이미 존재하는 아이디입니다.</div>
          <div id="valid2" hidden="hidden" style="color : red">아이디를 입력해주세요</div>
          <div id="valid3" hidden="hidden" style="color : green">가입 가능한 아이디입니다</div>
          <br>
          <br>
          <input type="password" name="password"  class="form-control" placeholder="비밀번호" data-pw="cant" v-model="password"/>
          <div>특수문자 / 문자 / 숫자 포함 형태의 8~15자리</div>
          <div id="canpassword" v-if="passwordNull" style="color : green">비밀번호를 입력해주세요.</div>
          <div id="cantpassword" hidden="hidden" style="color : red">비밀번호 형식이다릅니다.</div>
          <br>
          <input type="password" name="confirm_password" class="form-control" placeholder="비밀번호 확인"
            v-model="password2" />
          <div id="passok" hidden="hidden" style="color : red">비밀번호가 다릅니다.</div>
          <br>
          <button class="btn btn-md btn-primary btn-block signup-btn" type="button" id="checkbutton" @click="checkPwd()">확인</button>
          <br>

          <span id="confirmMsg"></span>

          <br>
          <input type="text" id="name" name="phone"  class="form-control" placeholder="전화번호(xxx-xxxx-xxxx)" v-model="phone"/>

          <div id="phonenull" hidden="hidden" style="color : red">전화번호를 입력해주세요.</div>
          <div id="phoneok" hidden="hidden" style="color : red">전화번호를 올바르게 입력해주세요</div>
          <input type="text" id="regnum" name="regNum"  class="form-control" placeholder="주민등록번호" v-model="regnum"/>

          <div id="regnull" hidden="hidden" style="color : red">주민등록번호를 입력해주세요.</div>
          <br /> <span class="help-block">내 계정 만들기를 클릭하면 약관에 동의하고 쿠키
            사용을 포함한 데이터 사용 정책을 읽었음을 의미합니다.</span>
          <br>
          <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
          <button id="add" class="btn btn-lg btn-primary btn-block signup-btn" @click.prevent="signin()">계정 생성</button>
        </form>
      </div>

    </main>

  
</template>

<script>
import axios from 'axios';
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default {
  setup(){
    const router = useRouter();
    const name = ref('');
    const id = ref('');
    const password = ref('');
    const password2 = ref('');
    const phone = ref('');
    const regnum = ref('');
    let passok = false;
    let idok=false;
    const checkPwd = () => {
      if(password.value == password2.value && password.value!=''){
        alert("비밀번호가 일치합니다.");
        passok=true;
        return;
      }
      else{
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
    }
    const signin = () => {
      if(name.value=='' || id.value=='' || phone.value=='' || regnum.value==''){
        alert("모든 항목을 적어주세요");
        return;
      }
      if(passok == false){
        alert("비밀번호 확인 버튼을 눌러주세요");
        return;
      }
      if(idok == false){
        alert("아이디 중복확인을 해주세요");
        return;
      }
      const signup = async () =>{
          const res = await axios
            .post('/signup',{
                              id : id.value,
                              name : name.value,
                              password : password.value,
                              phone : phone.value,
                              regNum : regnum.value
                            })
            .then((result)=>{
              console.log("success");
              if(result.status==201){
                alert("회원가입이 완료되었습니다.");
                router.push("main");
              }
              
              if(result.data == 'success'){
                idok=true;
                alert("사용가능한 아이디입니다.");
              }
          }).catch((result) =>{
            console.log(result);
          })
        }
        signup();
    }

    const checkId = () =>{
      const checkidid = async () =>{
          const res = await axios
            .post('/checkid',{
                              id : id.value
                            })
            .then((result)=>{
              console.log("success");
              console.log(result.data);
              if(result.data == 'success'){
                alert("사용이 불가능한 아이디입니다.");
                return;
              }
              if(result.data=='fail'){
                alert("사용 가능한 아이디입니다.");
                idok=true;
                return;
              }
          }).catch((result) =>{
            console.log(result);
          })
        }
        checkidid();
    }
    
    
    
    return{
      name,
      id,
      password,
      password2,
      phone,
      regnum,
      checkPwd,
      signin,
      checkId
      
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

;
</style>