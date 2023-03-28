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
                    <div>
                        <div>
                            <button type="button" class="btn btn-primary" @click="toggleModal(true)">예약을 취소 하시겠습니까?</button>

                            <div v-if="modal" class="modal-backdrop fade show" style="z-index: 1040;"></div>
                            <div v-if="modal" class="modal fade show" tabindex="-1" role="dialog"
                                style="display: block; z-index: 1041;">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">예약 취소</h5>
                                            <button type="button" class="close" @click="toggleModal(false)">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p>정말로 예약을 취소하시겠습니까?</p>
                                            <textarea v-model="cancelwhy"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                @click="toggleModal(false)">취소</button>
                                            <button type="button" class="btn btn-primary"
                                                @click="confirmCancelReservation">확인</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

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
                    
                    <tr v-for="list in cancellist"  :key="list.reserveNum">
                        
                        <td>
                            {{ list.reserveNum }}
                        </td>
                        <td>
                            {{ list.cancelWhy }}
                        </td>
                        <td>
                            {{ list.cancelDate }}
                        </td>

                    </tr>
                </tbody>

            </table>
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
        const token = sessionStorage.getItem("token");
        const paramid = route.params.id;
        const id = ref('');
        const rentaltime = ref('');
        const usetime = ref('');
        const returnadd = ref('');
        const carnum = ref('');
        const checkrental = ref('');
        const reservenum = ref('');
        const cancelwhy = ref('');
        const canceldate = ref('');
        const cancellist = ref([]);

        const modal = ref(false);



        const getRental = async () => {

            const res = await axios.get(`/cancel/${paramid}`,{headers: { Authorization: token }}).then((carcancel) => {
                console.log("start");
                id.value = carcancel.data.rentalGet.id;
                rentaltime.value = carcancel.data.rentalGet.reserveTime;
                usetime.value = carcancel.data.rentalGet.useTime;
                returnadd.value = carcancel.data.rentalGet.returnAdd;
                carnum.value = carcancel.data.rentalGet.carNum;
            })
        };
        getRental();


        const getCancel = async () => {

            const res = await axios.get(`/cancel/${paramid}`,{headers: { Authorization: token }}).then((carcancel) => {
                console.log("start");

                reservenum.value = carcancel.data.cancel[0].reserveNum;
                console.log(carcancel.data.rentalGet);
                console.log(carcancel.data.cancel);
                checkrental.value = carcancel.data.rentalGet;
                cancelwhy.value = carcancel.data.cancel[0].cancelWhy;
                canceldate.value = carcancel.data.cancel[0].cancelDate;
                cancellist.value = carcancel.data.cancel;
                console.log(cancellist.value);
                
            })
        };
        getCancel();

        const toggleModal = (value) => {
            
            if(checkrental.value !=null){
                modal.value = value;
            }else{
                alert("대여를 먼저 진행해주세요.");
            }
            
        };

        const confirmCancelReservation = async () => {
            const data = {
                id: paramid,
                cancelWhy: cancelwhy.value
            };
            try {
                await axios.post('/cancel', data,{headers: { Authorization: token }});
                alert('예약이 취소되었습니다.');

                toggleModal(false);
                location.reload();
            } catch (error) {
                // API 호출에 실패했을 때의 처리를 작성합니다.
                console.error(error);
            }
        };

        console.log(cancellist.value);

        return {
            getRental,
            getCancel,
            paramid,
            id,
            rentaltime,
            usetime,
            returnadd,
            carnum,
            reservenum,
            cancelwhy,
            canceldate,
            confirmCancelReservation,
            modal,
            toggleModal,
            cancellist,
        }
    }
}
</script>

<style></style>