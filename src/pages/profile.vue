<template>
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">내 정보</h1>
    </div>


    <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">

            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">내 정보</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">
                            {{ username }}
                        </h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>ID : {{ paramid }}</li>

                            <li id="phoneNum"> 핸드폰 번호 : {{ phonenum }}
                            </li>
                        </ul>

                        <button type="button" class="btn btn-primary" @click="toggleModal(true)">
                            수정하기
                        </button>

                        <div v-if="modal" class="modal-backdrop fade show" style="z-index: 1040;"></div>
                            <div v-if="modal" class="modal fade show" tabindex="-1" role="dialog"
                                style="display: block; z-index: 1041;">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">수정 하기</h5>
                                            <button type="button" class="close" @click="toggleModal(false)">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p>수정하실 새 전화번호를 입력해주세요.</p>
                                            <textarea v-model="phonenum"></textarea>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                @click="toggleModal(false)">취소</button>
                                            <button type="button" class="btn btn-primary"
                                                @click="modifyuser">확인</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>

        </div>

        <h2 class="display-6 text-center mb-4">예약 조회</h2>

        <div class="table-responsive">
            <table class="table text-center">
                <thead>
                    <tr>

                        <th style="width: 22%;">주소</th>
                        <th style="width: 22%;">차 번호</th>
                        <th style="width: 22%;">차종</th>
                        <th style="width: 22%;">사용 시간</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>


                        <td>
                            {{ address }}
                        </td>
                        <td>
                            {{ carnum }}
                        </td>
                        <td>
                            {{ carmodel }}
                        </td>
                        <td>
                            {{ usetime }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <input type='button' class="btn btn-primary" value='예약취소목록' style="float: right;" @click="moveCancel" />
    </main>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref } from "vue";
import axios from 'axios';

export default {

    setup() {
        const router = useRouter();
        const route = useRoute();
        const paramid = route.params.id;
        const username = ref('');
        const address = ref('');
        const carnum = ref('');
        const carmodel = ref('');
        const usetime = ref('');
        const phonenum = ref('');
        const token = sessionStorage.getItem("token");
        const modal = ref(false);

        sessionStorage.setItem("token", token);

        const moveCancel = function () {
            router.push({
                name: "Cancel",
                params: { "id": paramid }
            })
        }
        console.log("token : " + token);
        const profile = async () => {

            const res = await axios.get(`/profile/${paramid}`,
                { headers: { Authorization: token } }
            ).then((profile) => {
                if (profile.data.rentalCar == null) {
                    username.value = profile.data.name;
                    phonenum.value = profile.data.phone;
                }
                else if (profile.data.rentalCar != null) {
                    username.value = profile.data.name
                    address.value = profile.data.rentalCar.haveCar.zoneCar.address;
                    usetime.value = profile.data.rentalCar.useTime;
                    phonenum.value = profile.data.phone;
                    console.log(phonenum.value + '12312312312312');
                    carnum.value = profile.data.rentalCar.haveCar.carNum;
                    carmodel.value = profile.data.rentalCar.haveCar.carModel;
                    console.log(phonenum.value + '12312312312312');
                }

            })
                .catch((result) => {
                    console.log(result);
                })
        };

        profile();

        const toggleModal = (value) => {
            modal.value = value;
            console.log(toggleModal);
        };

        const modifyuser = async () => {
            const data = {
                id : paramid,
                phone : phonenum.value
            };
            try {
                await axios.post(`/profile/${paramid}`, data, { headers: { Authorization: token } });
                alert('수정되었습니다.');

                toggleModal(false);
                location.reload();
            } catch (error) {
                // API 호출에 실패했을 때의 처리를 작성합니다.
                console.error(error);
            }
        };

        return {
            moveCancel,
            username,
            address,
            usetime,
            phonenum,
            carnum,
            carmodel,
            paramid,
            toggleModal,
            modal,
            modifyuser


        }
    }
}
</script>

<style>
@import "@/css/profile.css";
</style>