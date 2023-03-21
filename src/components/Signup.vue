<template>
    <link
	href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
	rel="stylesheet" id="bootstrap-css">
    <body>
        <div class="container" id="wrap">
            <div class="row">
                <div class="col-md-7 col-md-offset-3">
                    <form action="/metaCar/addaccount" method="post" accept-charset="utf-8" class="form" role="form"
                        id="addForm">
                        <legend>회원 가입</legend>


                        <input type="text" name="name" value="" class="form-control input-lg" placeholder="이름" />
                        <div id="namenull" hidden="hidden" style="color : red">이름을 입력해주세요.</div>
                        <br>

                        <input type="text" name="id" value="" class="form-control input-lg" placeholder="아이디" />

                        <button class="btn btn-lg btn-primary btn-block signup-btn" type="button"
                            id="checkbutton">확인</button>
                        <div id="canpost" hidden="hidden" data-validation='false'></div>
                        <div id="valid" hidden="hidden" style="color : red">이미 존재하는 아이디입니다.</div>
                        <div id="valid2" hidden="hidden" style="color : red">아이디를 입력해주세요</div>
                        <div id="valid3" hidden="hidden" style="color : green">가입 가능한 아이디입니다</div>
                        <br>
                        <br>
                        <input type="password" name="password" value="" class="form-control input-lg" placeholder="비밀번호"
                            data-pw="cant" />
                        <div>특수문자 / 문자 / 숫자 포함 형태의 8~15자리</div>
                        <div id="canpassword" hidden="hidden" style="color : green">사용가능한 비밀번호입니다.</div>
                        <div id="cantpassword" hidden="hidden" style="color : red">비밀번호 형식이다릅니다.</div>
                        <br>
                        <input type="password" name="confirm_password" value="" class="form-control input-lg"
                            placeholder="비밀번호 확인" onkeyup="passConfirm()" />
                        <div id="passok" hidden="hidden" style="color : red">비밀번호가 다릅니다.</div>
                        <br>

                        <span id="confirmMsg"></span>

                        <br>
                        <input type="text" id="name" name="phone" value="" class="form-control input-lg"
                            placeholder="전화번호(xxx-xxxx-xxxx)" />

                        <div id="phonenull" hidden="hidden" style="color : red">전화번호를 입력해주세요.</div>
                        <div id="phoneok" hidden="hidden" style="color : red">전화번호를 올바르게 입력해주세요</div>
                        <input type="text" id="regnum" name="regNum" value="" class="form-control input-lg"
                            placeholder="주민등록번호" />

                        <div id="regnull" hidden="hidden" style="color : red">주민등록번호를 입력해주세요.</div>
                        <br /> <span class="help-block">내 계정 만들기를 클릭하면 약관에 동의하고 쿠키
                            사용을 포함한 데이터 사용 정책을 읽었음을 의미합니다.</span>
                        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                        <button id="add" class="btn btn-lg btn-primary btn-block signup-btn" type="submit">계정 생성</button>
                    </form>
                </div>
            </div>
        </div>
        
    </body>
</template>

<script>
export default {

}
</script>

<style>
@import "@/css/signup.css";
</style>