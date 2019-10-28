<template>
<div>
<h1>Update Game Page</h1>
<h3>{{game.name}} was made by {{game.company}} in {{game.year}}</h3>
<br/>
<router-link :to=" `/${game._id}` ">Game</router-link>  |
<router-link to='/'>List of Games</router-link>
<hr/>
<h2>Update Game Information</h2>
<input type='text' name='game.name' value='game.name' v-model='game.name'/>
<input type='text' name='game.company' value='game.company' v-model='game.company'/>
<input type='number' name='game.year' value='game.year' v-model='game.year'/>
<button v-on:click='updateGame(game)'>Update Game</button>
<hr/>
</div>
</template>

<script>
import Api from '../apiService';
export default {
	data(){
		return{
			game:{}
		}
	},
	mounted(){
		if(this.$route.params.id){
			Api.getGame(this.$route.params.id).then(res=>{
				this.game = res.data
			})
		}
	},
	methods:{
		async updateGame(game){
			await Api.updGame(game);
		}
	}
}	
</script>