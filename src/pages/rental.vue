<template>
  <!-- <div class="container"> -->
    <main>
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" :src="src" alt="carModel" width="800" height="400">
      <h2>대여 신청</h2>
      <p class="lead">{{carNum}}</p>
    </div>

    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">차량정보</span>
          <span class="badge bg-primary rounded-pill"></span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">모델명</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">{{carModel}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">제조사</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">{{carMaking}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">연료</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">{{carGas}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">연비</h6>
              <small></small>
            </div>
            <span class="text-success">{{carEff}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>시간당 가격</span>
            <strong id="money">{{howmuch}}만원</strong>
          </li>
        </ul>
		<!-- 
        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code">
            <button type="submit" class="btn btn-secondary">Redeem</button>
          </div>
        </form>
         -->
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">신청 정보</h4>
        <form class="needs-validation" novalidate >
          <div class="row g-3">
          
            <div class="col-sm-6">
              <label for="firstName" class="form-label">ID</label>
              <!--  
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
               -->
              	<ul class="list-group mb-3">
          			<li class="list-group-item d-flex justify-content-between lh-sm">
            			<div>
              				<h6 class="my-0">{{id}}</h6>
              				<small class="text-muted"></small>
            			</div>
            		</li>
            	</ul>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
			
			<!-- 
            <div class="col-sm-6">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
			 -->

            <div class="col-12">
              <label for="username" class="form-label">이름</label>
              <div class="input-group has-validation">
                <ul class="list-group mb-3">
          			<li class="list-group-item d-flex justify-content-between lh-sm">
            			<div>
              				<h6 class="my-0">{{name}}</h6>
              				<small class="text-muted"></small>
            			</div>
            		</li>
            	</ul>
              <div class="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>


            <div class="col-12">
              <label for="email" class="form-label">반납주소</label>
              <input type="text" class="form-control" id="address" placeholder="ex)경찰병원, 가락시장" required="required" v-model="returnAdd">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>



            <div class="col-md-5">
              <label for="country" class="form-label">이용시간</label>
              <select class="form-select" id="country" v-model="time" @change="checkTime()">
                <option value="">시간을 선택하세요</option>
                <option value="1">1시간</option>
                <option value="2">2시간</option>
                <option value="3">3시간</option>
                <option value="4">4시간</option>
              </select>
            </div>
			
		   
          <hr class="my-4">
			
			<div class="col-sm-6">
              <label for="firstName" class="form-label">예상결제금액</label>
              <!--  
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
               -->
              	<ul class="list-group mb-3">
          			<li class="list-group-item d-flex justify-content-between lh-sm">
            			<div>
              				<h6 class="my-0" id="totalPrice" >{{ total }} 만원</h6>
              				<small class="text-muted"></small>
            			</div>
            		</li>
            	</ul>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
		
			<div>
				
			</div>
          
          <button id="submitButton" class="w-100 btn btn-primary btn-lg" @click.prevent="reserve()">예약하기</button>
        </div>
        </form>
    </div>
    </div>
  </main>
<!-- </div> -->
<form id="rentalForm" action="/metaCar/rental" method="post">
    	<input name="id" type="hidden"/>
    	<input name="useTime" type="hidden"/>
    	<input name="returnAdd" type="hidden"/>
    	<input name="carNum" type="hidden"/>
    	<input name="sczoneNum" type="hidden"/>
    	 <input type="hidden" name="${_csrf.parameterName}"
    value="${_csrf.token}" />
</form>
</template>

<script>
import axios from "axios";
import { useRoute,useRouter } from "vue-router";
import { ref } from "vue";
export default {
    setup(){
      //const token = route.headers.Authorization;
      const route = useRoute();
      const router = useRouter();
      const carNum = route.params.carNum;
      const sczoneNum = ref('');
      const carKind = ref('');
      const carMaking = ref('');
      const carModel = ref('');
      const carGas = ref('');
      const carEff = ref('');
      const howmuch = ref('');
      const id = route.params.id;
      const name= ref('');
      const time= ref('');
      const returnAdd = ref('');
      const token = sessionStorage.getItem("token");
      const total = ref('');
      const checkTime = () =>{
        total.value = time.value*howmuch.value;
      } 
      const src = ref('');
      
      //예약
      const reserve = () => {
        console.log(time.value);
        console.log(returnAdd.value);
        if(time.value=="" || returnAdd.value==""){
          alert("반납장소와 이용시간을 선택해주세요");
          return;
        }
        const rental = async () =>{
          const res = await axios
            .post('/rental',{
                              id : id,
                              useTime : time.value,
                              returnAdd : returnAdd.value,
                              sczoneNum : sczoneNum.value,
                              carNum : carNum
                            },{headers : {Authorization : token}})
            .then((result)=>{
              console.log("success");
              console.log(result);
              if(result.status==201){
                alert("예약이 완료되었습니다.");
                router.push({
                  name : "main"
                });
              }
          }).catch((result) =>{
            console.log(result);
          })
        }
        rental();

        
      }
      //처음들어왔을때
      const getCar = async () =>{
        const res = await axios.get(`/rental/${carNum}`,{
          headers : {Authorization : token}
        }).then((result)=>{
          console.log(result);
          carKind.value = result.data.car.carKind;
          carMaking.value = result.data.car.carMaking;
          carModel.value = result.data.car.carModel;
          carGas.value = result.data.car.carGas;
          carEff.value = result.data.car.carEff;
          howmuch.value = result.data.car.distanceDto.howmuch;
          name.value = result.data.user.name;
          sczoneNum.value = result.data.car.sczoneNum;
          src.value = require("@/assets/" + carModel.value + ".jpg");
          // console.log(src.value);
        }).catch((result) => {
          console.log(result);
          alert("비정상적인 접근");
          
        }) 
      }
      getCar();
      console.log('------------------');
      console.log(src.value);
      



      return {
        carNum,
        sczoneNum,
        carKind,
        carMaking,
        carModel,
        carGas,
        carEff,
        howmuch,
        id,
        name,
        returnAdd,
        time,
        reserve,
        total,
        checkTime,
        src
      }
    }
}
</script>

<style>

</style>