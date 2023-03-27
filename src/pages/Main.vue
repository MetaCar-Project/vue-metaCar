<template>
  <div class="w-100">
    <!-- 검색창 -->
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px; float: left">
      <a href="/" class="d-flex c mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg class="bi pe-none me-2" width="40" height="32"></svg> <span class="fs-4">차종 선택</span>
      </a>
      <hr />
      <form v-on:submit.prevent="submitForm" @click="checkValue">
        <!-- <form id="searchForm" action="http://localhost:8082/metaCar/main" method="get"> -->
        <ul class="nav nav-pills flex-column mb-auto">
          <li>
            <div class="input-group mb-2">
              <div class="input-group-text" style="width: 20%">
                <input
                  v-model="carSmall"
                  class="form-check-input p-2 m-0 mt-0"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  id="carSmall"
                  name="carSmall"
                  value="경차"
                />
              </div>
              <div class="form-control text-black">경차</div>
            </div>
            <div class="input-group mb-2">
              <div class="input-group-text" style="width: 20%">
                <input
                  v-model="carMiddle"
                  class="form-check-input p-2 m-0 mt-0"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  id="carMiddle"
                  name="carMiddle"
                  value="중형"
                />
              </div>
              <div class="form-control text-black">중형</div>
            </div>
            <div class="input-group mb-2">
              <div class="input-group-text" style="width: 20%">
                <input
                  v-model="carBig"
                  class="form-check-input p-2 m-0 mb-0 d-flex justify-content-between"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  id="carBig"
                  name="carBig"
                  value="대형"
                />
              </div>
              <div class="form-control text-black">대형</div>
            </div>

            <div class="input-group mb-2">
              <div class="input-group-text" style="width: 20%">
                <input
                  v-model="carSUV"
                  class="form-check-input p-2 m-0 mt-0"
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  id="carSUV"
                  name="carSUV"
                  value="suv"
                />
              </div>
              <div class="form-control text-black">SUV</div>
            </div>
          </li>
          <li>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">장소</label>
              </div>
              <select v-model="zoneType" class="form-control text-black" id="zoneType" name="zoneType">
                <option selected value="0">쏘카존을 선택하세요</option>
                <option value="1">수서역</option>
                <option value="2">학동역</option>
                <option value="3">경찰병원역</option>
                <option value="4">가락시장역</option>
              </select>
            </div>
          </li>
          <li>
            <div class="input-group mb-3">
              <input v-model="keyword" type="text" name="keyword" style="width: 190px" placeholder="검색어를 입력하세요" />
            </div>
            <button type="submit" class="btn btn-primary">검색</button>
          </li>
        </ul>
        <!-- <input v-model="" type="hidden" name="amount" value="${pageMaker.cri.amount}" />
        <input v-model="" type="hidden" name="pageNum" value="${pageMaker.cri.pageNum}" /> -->
      </form>
      <hr />
    </div>
    <!-- CARD -->
    <div class="album py-3 bg-light align-items-center justify-content-center" style="width: 72%; float: left">
      <div class="container w-100">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(car, i) in car_axios" :key="i">
            <div class="card shadow-sm">
              <title>Placeholder</title>
              <img :src="car.imgSrc" style="width: 100%; height: 225px" />
              <div class="card-body">
                <p class="card-text h4">
                  {{ car.carModel }}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <div class="btn-group" v-if ="car.reserveNow == 'x'">
                      <button class="btn btn-outline-secondary" @click="car.detail">상세정보</button>
                      <button type="button" class="btn btn-outline-primary" @click="car.rental">대여하기</button>
                    </div>
                    <div class="btn-group" v-if ="car.reserveNow == 'o'">
                      <button class="btn btn-outline-secondary" @click="car.detail">상세정보</button>
                      <small class="text-muted">대여불가능</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CARD END-->

    <!-- 사이드바 -->
    <div class="d-flex flex-column flex-shrink-0 text-bg-dark" style="width: 280px; float: right">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <use xlink:href="metaCar/main"></use>
        <span class="fs-4" style="text-align: center">예약된 차 확인</span>
      </a>
      <hr />
      <div>
        <div v-if="rental_id == ''">나는 비로그인</div>
          <img src="@/assets/unx.jpg" style="width: 100%; height: 225px" />
        </div>
        <!--
        <div v-if="rental_id">나는 로그인</div>
          <img src="@/assets/unx.jpg" style="width: 100%; height: 225px" />
        </div>
        -->
      </div>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href=""></use>
            </svg>
            <span id="textbox">대여한 차량이 없습니다.</span>
            <!-- <input type="hidden" name="rental_id" value="" /> -->
          </a>
        </li>
      </ul>

    <!-- 사이드바 -->
    <div class="pull-right" style="clear: both; text-align: center">
      <ul style="text-align: center">
        <!-- <c:if test="${pageMaker.prev }"> -->
        <li style="display: inline-block; text-decoration-line: none" class="paginate_button previous">
          <a href="${pageMaker.startPage -1 }">Previous</a>
        </li>
        <!-- </c:if>
        <c:forEach var="num" begin="${pageMaker.startPage }" end="${pageMaker.endPage }"> -->
        <!-- <li style="display: inline-block;" class="paginate_button ${pageMaker.cri.pageNum == num ? "active":"" } "> -->
        <li style="display: inline-block" class="paginate_button">
          <a style="margin-left: 4px" class="btn btn-outline-primary" href="${num }">${num }</a>
        </li>
        <!-- </c:forEach>
        <c:if test="${pageMaker.next }"> -->
        <li style="display: inline-block; text-decoration-line: none" class="paginate_button next">
          <a href="${pageMaker.endPage +1 }">Next</a>
        </li>
        <!-- </c:if> -->
      </ul>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import Axios from "axios";

import { useRouter } from 'vue-router';
import CarReturnButtonvue from '@/components/CarReturnButton.vue';
export default {
  setup() {
    const router = useRouter();
    const error = ref("");
    const car_axios = ref([]);

    const submitForm = ref();
    const checkValue = ref();

    const carSmall = ref("");
    const carMiddle = ref("");
    const carBig = ref("");
    const carSUV = ref("");
	const id = sessionStorage.getItem("id");
	const checkid = () =>{
	if(id == null){
		console.log("아이디 없음");
	}
	else{
		console.log(id);
	}
	}
	checkid();
checkid();
    const zoneType = ref(0);
    const keyword = ref("");

    let timeout = null;
    const getUrl = ref("");

    const getCarList = async () => {
      error.value = "";
      Axios.get("http://localhost:8081/metaCar/main")
        .then((res) => {
          car_axios.value = res.data;
        })
        .then(() => {
          for (let i = 0; i < car_axios.value.length; i++) {
            car_axios.value[i].imgSrc = require("@/assets/" + car_axios.value[i].carModel + ".jpg");
            car_axios.value[i].detail = function () {
              // Axios.get(`http://localhost:8081/metaCar/detail/${car_axios.value[i].carNum}`)
              window.open(
                'detail/'+ car_axios.value[i].carNum,
                '차량상세정보',
                'width=500px,height=800px,location=no,status=no,scrollbars=yes'
              );
            };
            car_axios.value[i].rental = function () {
              location.href = "/metaCar/rental/" +id + "/" +  car_axios.value[i].carNum;
            };
          }
        });
    };

    checkValue.value = () => {
      getUrl.value = "http://localhost:8081/metaCar/main?";
      if (carSmall.value === true) getUrl.value += "carSmall=경차&";
      if (carMiddle.value === true) getUrl.value += "carMiddle=중형&";
      if (carBig.value === true) getUrl.value += "carBig=대형&";
      if (carSUV.value === true) getUrl.value += "carSUV=suv&";
      getUrl.value += "zoneType=" + zoneType.value + "&";
      getUrl.value += "keyword=" + keyword.value;
    };

    submitForm.value = async () => {
      alert(getUrl.value);

      Axios.get([getUrl.value])
        .then((res) => {
          car_axios.value = res.data;
        })
        .then(() => {
          for (let i = 0; i < car_axios.value.length; i++) {
            car_axios.value[i].imgSrc = require("@/assets/" + car_axios.value[i].carModel + ".jpg");
            car_axios.value[i].detail = function () {
              window.open(
                "'detail?carNum=" + car_axios.value[i].carNum + "'",
                "차량상세정보",
                "width=620px,height=800px,location=no,status=no,scrollbars=yes"
              );
            };
            car_axios.value[i].rental = function () {
              location.href = "/metaCar/rental/carNum=" + car_axios.value[i].carNum;
			  console.log("click");
            };
            console.log(car_axios.value[i].imgSrc);
            console.log(car_axios.value[i].detail);
            console.log("'detail?carNum=" + car_axios.value[i].carNum + "','차량상세정보','width=620px,height=800px,location=no,status=no,scrollbars=yes'");
          }
        })
        .catch((error) => {
          this.res = "Error: " + error.res.status;
        });
      this.carSmall = "";
      this.carMiddle = "";
      this.carBig = "";
      this.carSUV = "";
      this.zoneType = 0;
      this.keyword = "";
    };
    onMounted(() => {
      timeout = setTimeout(() => {
        getCarList();
      },);
    });
    // getCarList();






    return { getCarList, car_axios, submitForm, checkValue, carSmall, carMiddle, carBig, carSUV, keyword, zoneType,};
  },
};
</script>

<style>
</style>
