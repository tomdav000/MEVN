<template>
<div>
<h1>Game Page</h1>
<h3>{{game.name}} was made by {{game.company}} in {{game.year}}</h3>
<br/>
<router-link :to=" `/edit/${game._id}` ">Edit Game</router-link> |
<router-link to='/'>List of Games</router-link>
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
	}
}	
</script>