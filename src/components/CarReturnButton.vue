<template>
    <div>
        <button class="btn btn-primary" @click="returnCar">차량 반납</button>
    </div>
</template>


<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {

    setup() {
        const route = useRoute();
        const paramid = route.params.id;

        const returnCar = async () => {

            const data = {
                id: paramid,
            };
            try {
                await axios.post('/return', data);
                alert('반납이 완료되었습니다.');
                location.reload();
            } catch (error) {
                // API 호출에 실패했을 때의 처리를 작성합니다.
                console.error(error);
            }

        };
        returnCar();


        return {

            returnCar,

        }
    }

}
</script>

<style></style>