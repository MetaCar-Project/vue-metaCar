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

                            <li id="phoneNum"> 핸드폰 번호 : {{ phonnum }}
                            </li>
                        </ul>

                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            수정하기
                        </button>

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
        const phonnum = ref('');
        const token = sessionStorage.getItem("token");
        const moveCancel = function () {
            router.push({
                name: "Cancel",
                params: { "id": paramid }
            })
        }
        console.log("token : " + token);
        const profile = async () => {

            const res = await axios.get(`/profile/${paramid}`,
                {headers: { Authorization: token }}
                    ).then((profile) => {
                    if(profile.data.rentalCar==null){
                        username.value = profile.data.name;
                        phonnum.value = profile.data.phone;
                    }
                    else if(profile.data.rentalCar!=null){
                        username.value = profile.data.name
                        address.value = profile.data.rentalCar.haveCar.zoneCar.address;
                        usetime.value = profile.data.rentalCar.useTime;
                        phonnum.value = profile.data.phone;
                        console.log(phonnum.value + '12312312312312');
                        carnum.value = profile.data.rentalCar.haveCar.carNum;
                        carmodel.value = profile.data.rentalCar.haveCar.carModel;
                        console.log(phonnum.value + '12312312312312');
                    }
                    
                })
                .catch((result) => {
                    console.log(result);
                })
        };

        profile();

        return {
            moveCancel,
            username,
            address,
            usetime,
            phonnum,
            carnum,
            carmodel,
            paramid


        }
    }
}
</script>

<style>
@import "@/css/profile.css";
</style>