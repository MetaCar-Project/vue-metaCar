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
                            한예찬
                        </h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>ID : kosa00
                            </li>

                            <li id="phoneNum">전화번호 : 010-1234-1234
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

                        <th style="width: 22%;">대여장소</th>
                        <th style="width: 22%;">차 번호</th>
                        <th style="width: 22%;">차종</th>
                        <th style="width: 22%;">시간</th>
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
                        <td>
                            4
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <input type='button' class="btn btn-primary" value='예약취소목록' style="float: right;"
        @click="moveCancel"/>
    </main>
</template>

<script>
import { useRouter,useRoute } from 'vue-router';

export default {
  
    setup(){
        const router = useRouter();
        const route = useRoute();
        const id = route.params.id;
        const moveCancel = function(){
            router.push({
                name : "Cancel",
                params : {"id": id }
            })
        }

        return{
            moveCancel
        }
    }
}
</script>

<style>
 @import "@/css/profile.css"; 
 
</style>