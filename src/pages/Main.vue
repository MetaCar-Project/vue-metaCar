<template>
  <div class="w-100">
    <!-- 검색창 -->
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px; float: left">
      <a href="/" class="d-flex c mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg class="bi pe-none me-2" width="40" height="32"></svg> <span class="fs-4">차종 선택</span>
      </a>
      <hr />
      <form v-on:submit.prevent="submitForm" @click="checkValue">
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
              <input v-model="keyword" type="text" name="keyword" style="width: 180px" placeholder="검색어를 입력하세요" />
              <button type="submit" class="btn btn-primary">검색</button>
            </div>
          </li>
        </ul>
        <input v-model="pageNum" type="hidden" name="pageNum" />
      </form>
      <hr />
    </div>

    <!-- CARD -->
    <div class="album py-3 bg-light align-items-center justify-content-center" style="width: 55%; float: left">
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
                    <div class="btn-group" v-if="car.reserveNow == 'x'">
                      <button class="btn btn-outline-secondary" @click="car.detail">상세정보</button>
                      <button type="button" class="btn btn-outline-primary" @click="car.rental">대여하기</button>
                    </div>
                    <div class="btn-group" v-if="car.reserveNow == 'o'">
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
      <CarReturnButtonvue/>
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
    <!-- 사이드바 -->

    <!-- 페이징 -->
    <div class="pull-right" style="clear: both; text-align: center">
      <ul style="text-align: center">
        <li v-if="curPage >= 2" style="display: inline-block; text-decoration-line: none" class="paginate_button prev">
          <a style="margin-left: 4px" class="btn btn-outline-primary" @click="curPage--">prev</a>
        </li>

        <li v-for="num in pageList" :key="num" style="display: inline-block" class="paginate_button">
          <a style="margin-left: 4px" class="btn btn-outline-primary" @click="curPage = num">{{ num }}</a>
        </li>

        <li v-if="curPage < total / 6" style="display: inline-block; text-decoration-line: none" class="paginate_button next">
          <a style="margin-left: 4px" class="btn btn-outline-primary" @click="curPage++">next</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Axios from "axios";

import { useRouter } from "vue-router";
import CarReturnButtonvue from "@/components/CarReturnButton.vue";
export default {
  components: {
		CarReturnButtonvue,
	},

  setup() {
    const router = useRouter();
    const error = ref("");
    const car_axios = ref([]); // Axios 객체 저장
    const page_axios = ref([]);

    //Function
    const submitForm = ref(); //검색 버튼 클릭
    const checkValue = ref(); //검색 조건
    const checkPage = ref(); //페이지 체크

    //Search
    const carSmall = ref(""); //경차
    const carMiddle = ref(""); //중형
    const carBig = ref(""); //대형
    const carSUV = ref(""); //SUV

    const zoneType = ref(0); // 소카존
    const keyword = ref(""); // 검색 키워드

    let timeout = null;
    const getUrl = ref(""); //요청 Get URL

    const amount = ref(6); //페이지양
    const pageNum = ref(-1);
    const total = ref(0);
    const curPage = ref(1); //현재 페이지
    const startPage = ref(0);
    const endPage = ref(0);
    const prev = ref(false);
    const next = ref(false);
    const pageList = ref([]);

    const id = sessionStorage.getItem("id");
    const checkid = () => {
      if (id == null) {
        console.log("아이디 없음");
      } else {
        console.log(id);
      }
    };
    checkid();
    checkid();

    const getPageInfo = async () => {
      Axios.get("http://localhost:8081/metaCar/page")
        .then((res) => {
          page_axios.value = res.data;
        })
        .then(() => {
          total.value = page_axios.value.total;
          startPage.value = page_axios.value.startPage;
          endPage.value = page_axios.value.endPage;
          prev.value = page_axios.value.prev;
          next.value = page_axios.value.next;
        })
        .then(() => {
          let cnt = 0;
          console.log(curPage.value);
          console.log(endPage.value);
          console.log(total.value);
        });
    };

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
              window.open("detail/" + car_axios.value[i].carNum, "차량상세정보", "width=500px,height=800px,location=no,status=no,scrollbars=yes");
            };
            car_axios.value[i].rental = function () {
              location.href = "/metaCar/rental/" + id + "/" + car_axios.value[i].carNum;
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
      getUrl.value += "keyword=" + keyword.value + "&";
      getUrl.value += "pageNum=" + curPage.value;
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
              window.open("'detail?carNum=" + car_axios.value[i].carNum + "'", "차량상세정보", "width=620px,height=800px,location=no,status=no,scrollbars=yes");
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
        getPageInfo();
        getCarList();
      });
    });

    return {
      getCarList,
      car_axios,
      submitForm,
      checkValue,
      carSmall,
      carMiddle,
      carBig,
      carSUV,
      keyword,
      zoneType,
      amount,
      pageNum,
      total,
      curPage,
      startPage,
      endPage,
      prev,
      next,
      pageList,
    };
  },
};
</script>

<style></style>
