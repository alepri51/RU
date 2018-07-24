<template>
	<div class="chacheli-layout">
		<div class="chacheli"
			v-for="c in components"
			v-if="!c.available"
			:key="c.id"
			:style="{ top: (c.y * v) + '%', left: (c.x * h) + '%', width: (c.w * h) + '%', height: (c.h * v) + '%'}">
			<keep-alive>
                <component :is="c.comp" :meta="c" :data="data[c.id]"/>
			</keep-alive>
		</div>
	</div>
</template>

<style > 
.chacheli-layout {
	height: 100%;
	flex: 1 1 auto;
	position: relative;
	margin: 0;
	overflow: hidden
}

.chacheli-layout,
.chacheli-layout * {
	-moz-box-sizing: border-box;
	box-sizing: border-box
}

.chacheli-layout .chacheli {
	padding: 5px;
	position: absolute
}

.chacheli-layout .chacheli>* {
	height: 100%;
	display: inline-block
}
</style>

<script>
export default {
	name: 'chacheli-layout',
	props: [ 'layout', 'components', 'data' ],

	data() {
		return {
			v: 0,
			h: 0
		}
	},

	watch: {
		'layout.cols'() {
			this.calc()
		},
		'layout.rows'() {
			this.calc()
		}
	},

	created() {
        this.calc();
        //debugger;
        this.components.forEach(element => {
            this.commit('REGISTER_COMPONENT', element.comp);
        });
	},

	methods: {
		calc() {
			this.v = 100 / this.layout.rows
			this.h = 100 / this.layout.cols
        }

	}
}
</script>
