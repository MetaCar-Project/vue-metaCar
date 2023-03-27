<template>
<div style="width: 600px; height: 90%">
		<ul style="width: 90%; list-style-type: none;">
			<li>
				<br>
				<img :src="src"
				style="width: 550px;"/>
				<br>
			</li>
			<li><br>
			<label>차량번호</label> <input class="form-control" 
				style="text-align:center;" name='carNum' v-model="carNum"
				readonly="readonly">
			</li>
			<li><label>차량모델</label> <input class="form-control"
				style="text-align:center;" name='carModel' v-model="carModel"
				readonly="readonly">
			</li>
			<li><label>차종</label> <input class="form-control" 
				style="text-align:center;" name='carKind' v-model="carKind"
				readonly="readonly">
			</li>
			<li><label>차량제조사</label> <input class="form-control"
				style="text-align:center;" name='carMaking' v-model="carMaking"
				readonly="readonly">
			</li>
			<li><label>차량기름</label> <input class="form-control"
				style="text-align:center;" name='carGas' v-model="carGas"
				readonly="readonly">
			</li>
			<li><label>연비</label> <input class="form-control" 
				style="text-align:center;" name='carEff' v-model="carEff"
				readonly="readonly">
			</li>

		</ul>
	</div>
</template>

<script>
import axios from 'axios';
import {useRouter, useRoute} from 'vue-router';
import {ref} from 'vue';
export default {
	setup() {
	const route = useRoute();
	const carNum = route.params.carNum;
	const carModel = ref('');
	const carKind = ref('');
	const carMaking = ref('');
	const carGas = ref('');
	const carEff = ref('');
	const src = ref('');

	const getDetailPopup = async () => {
     await axios.get(`http://localhost:8081/metaCar/detail/${carNum}`)
        .then((data) => {
			console.log(data);
        //   this.carNum = data[0].carNum;
			carMaking.value = data.data.carMaking;
			carModel.value = data.data.carModel;
			carKind.value = data.data.carKind;
			carGas.value = data.data.carGas;
			carEff.value = data.data.carEff;
			src.value = require("@/assets/" + carModel.value + ".jpg");
        })
        .catch(error => console.log(error));
    }

	getDetailPopup();
		return {
			getDetailPopup,
			carNum,
			carMaking,
			carModel,
			carKind,
			carGas,
			carEff,
			src
		};
	},
};
</script>

<style>

</style>