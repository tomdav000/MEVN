import Home from './components/Home.vue';
import Game from './components/Game.vue';
import Add from './components/Add.vue';
import Edit from './components/Edit.vue';

export const routes = [
	{path:'', component:Home},
	{path:'/add', component:Add},
	{path:'/:id', component:Game},
	{path:'/edit/:id', component:Edit}

]