<template>
	<dashboard class="dashboard" :layout="layout" :components="components" :data={} v-resize="onResize" />
</template>


<script>
	import dashboard from '../components/dashboard';

    export default {
		components: { dashboard },
		methods: {
			onResize() {

			}
        },
        activated() {
            this.execute({ 
                endpoint: 'account',
                callback: response => this.commit('ACCOUNT', response.data)
            });
        },
		data() {
			return {
				layout: {
					cols: 7,
					rows: 6
				},
				components: [
                    {
                        "id": 2,
                        "x": 1,
                        "y": 0,
                        "w": 3,
                        "h": 1,
                        "text": "GRID",
                        "available": false,
                        "comp": "bio"
                    },
                    {
                        "id": 3,
                        "x": 4,
                        "y": 0,
                        "w": 2,
                        "h": 1,
                        "text": "GRID",
                        "available": false,
                        "comp": "balance"
                    },
                    {
                        "id": 4,
                        "x": 4,
                        "y": 1,
                        "w": 2,
                        "h": 5,
                        "text": "GRID",
                        "available": false,
                        "comp": "dreams"
                    },
                    {
                        "id": 5,
                        "x": 1,
                        "y": 1,
                        "w": 3,
                        "h": 5,
                        "text": "GRID",
                        "available": false,
                        "comp": "structure"
                    }
                ]
			}
		}
	}

</script>

<style>

</style>
