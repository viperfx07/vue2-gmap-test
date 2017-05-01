<template>
	<div class="u-embed u-embed--16by9">
		<div style="background:#fff; position:relative; z-index: 2;">
			<div>{{currentCenter}}</div>
			<div>{{currentZoom}}</div>
		</div>
		<gmap-map ref="map" :center="JSON.parse(center)" :zoom="JSON.parse(zoom)" class="u-embed__item" style="position: absolute" @bounds_changed ="boundsChanged">
	  	</gmap-map>
  	</div>
</template>

<script>
////////////////
// Components //
////////////////

import togeo from 'togeojson';


/**
 * Notes: Can't import VueGoogleMaps directly from here, since the build of lodash produces big file size (>500kb)
 */

let rbg;
$.get('./rbg.kml', function(res){
    rbg = togeo.kml(res);
    console.log(rbg);
});

Vue.use(VueGoogleMaps, {
	load:{
		key: 'AIzaSyBCOZegXrIHTJZfg_8OTBf8OffRFvLhRYI'
	},
	deferredReady: function(){
		console.log(this.$refs.map);
	}
});

export default {
	props: {
		center: Object,
		zoom: Number
	},
	data() {
		return{
			currentCenter: '',
			currentZoom: '',
		}
	},
	methods: {
		init(){
			this.gmap.data.addGeoJson(rbg);

			this.gmap.data.setStyle(function(f){
				let strokeColor = '#0000ff';
				let strokeWeight = 2;

				if(f.getProperty('isColorful')){
					strokeColor = '#ff0000';
				}

				return { strokeColor,  strokeWeight }
			});

			this.gmap.data.addListener('mouseover', (e) =>{
				this.gmap.data.revertStyle();
				this.gmap.data.overrideStyle(e.feature, { strokeColor: '#ff0000' });
			});

			this.gmap.data.addListener('mouseout', (e) =>{
				this.gmap.data.revertStyle();
			});
		},
		boundsChanged(){
			this.currentCenter = this.$refs.map.$mapObject.getCenter();
			this.currentZoom =  this.$refs.map.$mapObject.getZoom();
		}
	},
	mounted() {
		this.$refs.map.$mapCreated.then(()=> {
			this.map = this.$refs.map;
			this.gmap = this.$refs.map.$mapObject;

			this.init();
		});
	}
}
</script>