<template>
	<dashboard :layout="layout" :chachelis="components" :data={} v-resize="onResize" />
</template>


<script>
	import dashboard from '../components/dashboard';

    export default {
		components: { dashboard },
		methods: {
			onResize() {

			}
		},
		data() {
			return {
				layout: {
					cols: 9,
					rows: 6
				},
				components: [
					{
						id: 1,
						x: 1,
						y: 0,
						w: 6,
						h: 5,
						text: 'GRID',
						available: false,
						comp: ''
					},
					{
						id: 2,
						x: 0,
						y: 5,
						w: 9,
						h: 1,
						text: 'GRID',
						available: false,
						comp: ''
					},
					{
						id: 3,
						x: 0,
						y: 0,
						w: 1,
						h: 5,
						text: 'GRID',
						available: false,
						comp: ''
					},
					{
						id: 4,
						x: 7,
						y: 2,
						w: 2,
						h: 3,
						text: 'GRID',
						available: false,
						comp: ''
					},
					{
						id: 11,
						x: 7,
						y: 0,
						w: 2,
						h: 2,
						text: 'GRID',
						available: false,
						comp: ''
					}
				]
			}
		}
	}

</script>

<style scoped>
	.chacheli-layout .chacheli {
		border: 1px solid #ccc!important;
	}
</style>
