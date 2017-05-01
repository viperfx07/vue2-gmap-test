////////////////
// Components //
////////////////
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps{
	load:{
		key: 'AIzaSyBCOZegXrIHTJZfg_8OTBf8OffRFvLhRYI'
	}
});

export default {
	data() {
		return{
			center: {lat:-33.8566508, lng:151.2673389 }
			zoom: 18
		}
	}
}