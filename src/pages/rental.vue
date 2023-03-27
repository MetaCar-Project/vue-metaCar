<template>
  <!-- <div class="container"> -->
    <main>
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="/resources/img/${car.carModel}.jpg" alt="${car.carModel }" width="800" height="400">
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
              <input type="text" class="form-control" id="address" placeholder="ex)경찰병원, 가락시장" required="required">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>



            <div class="col-md-5">
              <label for="country" class="form-label">이용시간</label>
              <select class="form-select" id="country" required>
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
              				<h6 class="my-0" id="totalPrice"></h6>
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
			
          <button id="submitButton" class="w-100 btn btn-primary btn-lg" type="submit">예약하기</button>
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
      const carNum = "321루7449";
      const scZoneNum = ref('');
      const carKind = ref('');
      const carMaking = ref('');
      const carModel = ref('');
      const carGas = ref('');
      const carEff = ref('');
      const howmuch = ref('');
      const id = ref('');
      const name= ref('');

      const getCar = async () =>{
        const res = await axios.get(`/rental/${carNum}`,{
          headers : {Authorization : "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJwMjEzNTY2IiwiZXhwIjoxNjgxMzQ3MTMwfQ.uC6xZxrxrrLBjloDwJ4cs3CPe5d3G2sy8WZWuhCoLIc"}
        }).then((result)=>{
          console.log(result);
          carKind.value = result.data.car.carKind;
          carMaking.value = result.data.car.carMaking;
          carModel.value = result.data.car.carModel;
          carGas.value = result.data.car.carGas;
          carEff.value = result.data.car.carEff;
          howmuch.value = result.data.car.distanceDto.howmuch;
          id.value = result.data.user.id;
          name.value = result.data.user.name;
        }).catch((result) => {
          console.log(result.response.status);
          alert("비정상적인 접근");
          router.push("Main");
        }) 
      }

      getCar();


      return {
        carNum,
        scZoneNum,
        carKind,
        carMaking,
        carModel,
        carGas,
        carEff,
        howmuch,
        id,
        name
      }
    }
}
</script>

<style>

</style>