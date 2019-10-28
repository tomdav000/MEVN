<template>
  <div class="hello">
    <h1>List of Games</h1>
    <router-link :to=" `/add` ">Add New Game</router-link>  |
    <ul>
      <li v-for='(game, index) in games' v-bind:index='index' v-bind:key='game._id'>
      <h1>{{game.name}}</h1>
      <router-link :to=" `/${game._id}` ">See Game</router-link>  |
      <router-link :to=" `/edit/${game._id}` ">Edit Game</router-link>  |
      <p v-on:click='deleteGame(game._id)'>Remove Game</p> 
      </li>
    </ul>
  </div>
</template>

<script>
import Api from '../apiService';
export default {
  data(){
    return{
      error:'',
      games:[]
    }
  },
  async created(){
    try{
      this.games = await Api.getGames();
    } catch(err){
      this.error = err.message
    }
  },
  methods:{
    async deleteGame(id){
      await Api.rmGame(id);
      this.games = await Api.getGames();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
