<template>
<div>
<h1>Add New Game</h1>
<input type='text' name='name' v-model='name' placeholder='Console Name...'/>
<input type='text' name='company' v-model='company' placeholder='Company Name...'/>
<input type='number' name='year' v-model='year'/>
<button v-on:click='addNewGame()'>Add New Game Console</button>
</div>
</template>

<script>
import Api from '../apiService';
export default {
	data(){
		return{
			name:'',
			company:'',
			year:0
		}
	},
	methods:{
		async addNewGame(){
			await Api.addGame(this.name, this.company, this.year);
		}
	}
}
</script>