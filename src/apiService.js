import axios from 'axios';
const url = '/api/games/';

class Api {
	static getGames() {
		return new Promise(async(resolve,reject)=>{
			try{
				const res = await axios.get(url);
				const data = res.data;
				resolve(
					data.map(data=>({
						...data
					})))
			} catch(err){
				reject(err)
			}
		})
	}
	static getGame(id){
		return axios.get(`${url}${id}`);
	}
	static addGame(name, company, year){
		return axios.post(url,{name, company, year});
	}
	static updGame(game){
		return axios.put(`${url}${game._id}`,game);
	}
	static rmGame(id){
		return axios.delete(`${url}${id}`);
	}
}

export default Api;