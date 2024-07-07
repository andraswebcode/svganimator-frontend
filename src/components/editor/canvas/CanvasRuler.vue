<script setup lang="ts">
import { computed } from 'vue';
import { useProject } from '../../../store';
import { useCanvas } from '@grafikjs/vue';

const { direction } = defineProps<{
	direction: 'x' | 'y';
}>();
const isX = direction === 'x';
const project = useProject();
const {
	state: { left, top, width, height }
} = useCanvas(
	(canvas) => {
		const vpt = canvas.get('viewportMatrix');
		const { x, y } = canvas.getDrawingAreaPosition().transform(vpt);
		const size = { x: 0, y: 0 }; //canvas.getDrawingAreaSize().transform(vpt);
		return { left: x, top: y, width: size.x, height: size.y };
	},
	null,
	'set'
);
const style = computed(() => {
	console.log(left);

	return isX
		? {
				left: left.value + 'px',
				width: width.value + 'px'
		  }
		: {
				top: top.value + 'px',
				height: height.value + 'px'
		  };
});
</script>

<template>
	<div class="ruler q-dark" :class="{ [`ruler__${direction}`]: direction }">
		<div class="ruler__inner no-wrap" :class="isX ? 'row' : 'column'" :style="style">
			<div v-for="mark in project[isX ? 'rulerXMarks' : 'rulerYMarks']" class="col mark">
				<span class="number">{{ mark }}</span>
				<div class="no-wrap" :class="isX ? 'row' : 'column'">
					<div class="col submark" v-for="_submark in project.rulerSubmarks" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.ruler {
	position: absolute;
	z-index: 2;
	overflow: hidden;
	&__x {
		width: 100%;
		height: 24px;
		.mark,
		.submark {
			border-left: solid 1px $editor-border-dark-color;
		}
	}
	&__y {
		width: 24px;
		height: 100%;
	}
	&__inner {
		position: absolute;
	}
	&__x &__inner {
		top: 0;
		width: 100%;
	}
	&__y &__inner {
		left: 0;
		height: 100%;
	}
}
</style>
