<template>
    <div class="container py-3">
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                <img src="@/assets/Metacar.png" alt=""
                    style="float: left; width: 100px; height: 100px; object-fit: cover;" />
                <span class="fs-4">예약취소</span>
            </a>
        </div>
        <h4 class="display-6 text-center mb-4">삭제 가능한 예약 목록</h4>
        <table class="table text-center">
            <thead>
                <tr>
                    <th style="width: 20%;">아이디</th>
                    <th style="width: 20%;">대여신청시간</th>
                    <th style="width: 20%;">사용시간</th>
                    <th style="width: 20%;">반납주소</th>
                    <th style="width: 20%;">차번호</th>
                </tr>
            </thead>


            <tbody>

                <tr>

                </tr>

                <tr>
                    <td>
                        {{ id }}
                    </td>
                    <td>
                        {{ rentaltime }}
                    </td>
                    <td>
                        {{ usetime }}
                    </td>
                    <td>
                        {{ returnadd }}
                    </td>
                    <td>
                        {{ carnum }}
                    </td>

                </tr>

            </tbody>

        </table>

    </div>
    <main style="width: 100%; height: 100%;">
        <div style="width: 1000px; height: 800%; margin: 0 auto;">
            <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div class="col">
                    <div class="card mb-4 rounded-3 shadow-sm">

                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <div>
                                <h5 class="my-0 fw-normal">예약을 취소 하시겠습니까?</h5>
                            </div>
                        </button>
                        <!-- <button type="button" class="btn btn-primary" onclick="cancelRes()">
          <div>
            <h5 class="my-0 fw-normal">예약을 취소 하시겠습니까?</h5>
          </div>
          </button> -->

                    </div>
                </div>

            </div>

            <h4 class="display-6 text-center mb-4">예약 취소 목록</h4>
            <table class="table text-center">
                <thead>
                    <tr>
                        <th style="width: 34%;">예약번호</th>
                        <th style="width: 22%;">취소이유</th>
                        <th style="width: 22%;">취소 날짜</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>

                        <td>
                            1
                        </td>
                        <td>
                            2
                        </td>
                        <td>
                            3
                        </td>

                    </tr>
                </tbody>

            </table>
        </div>
        <!-- Button trigger modal -->

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label>취소사유 <input id="cancelwhy" type="text" value="" /></label>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary" id="modify">취소하기</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
    setup() {
        const route = useRoute();
        const reservenum = ref('');
        const id = route.params.id;
        const rentaltime = ref('');
        const usetime = ref('');
        const returnadd = ref('');
        const sczonenum = ref('');
        const carnum = ref('');
        const reservenow = ref('');
        const havecar = ref('');

        const getCancel = async () => {

            const res = await axios.get(`/cancel/${id}`).then((carcancel) => {
                console.log("start");
                
                reservenum.value = carcancel.data.rentalGet.reserveNum;
                console.log(reservenum.value);
                rentaltime.value = carcancel.data.rentalGet.reserveTime;
                usetime.value = carcancel.data.rentalGet.useTime;
                returnadd.value = carcancel.data.rentalGet.returnAdd;
                sczonenum.value = carcancel.data.rentalGet.carNum;
                carnum.value = carcancel.data.rentalGet.carNum;
                reservenow.value = carcancel.data.rentalGet.reservenow;
                havecar.value = carcancel.data.rentalGet.haveCar;
            })
            
        
        
    };
        getCancel();

        return {
            reservenum,
            id,
            rentaltime,
            usetime,
            returnadd,
            sczonenum,
            carnum,
            reservenow,
            havecar,
            getCancel,
        }
    }


}
</script>

<style></style>