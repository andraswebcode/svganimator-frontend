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
		const size = canvas.getDrawingAreaSize().multiplyScalar(canvas.zoom);
		return { left: x, top: y, width: size.x, height: size.y };
	},
	null,
	'set'
);
const style = computed(() =>
	isX
		? {
				left: left.value + 'px',
				width: width.value + 'px'
		  }
		: {
				top: top.value + 'px',
				height: height.value + 'px'
		  }
);
</script>

<template>
	<div class="ruler q-dark" :class="{ [`ruler__${direction}`]: direction }">
		<div class="ruler__inner no-wrap" :class="isX ? 'row' : 'column'" :style="style">
			<div v-for="mark in project[isX ? 'rulerXMarks' : 'rulerYMarks']" class="col mark">
				<span class="number">{{ mark }}</span>
				<div class="no-wrap submarks" :class="isX ? 'row' : 'column'">
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
		.submarks {
			align-items: flex-end;
			width: 100%;
			height: 50%;
			left: 0;
			bottom: 0;
		}
		.submark {
			height: 50%;
		}
		.mark:last-child {
			border-right: solid 1px $editor-border-dark-color;
		}
		.submark:first-child {
			border-left: none;
		}
		.submark:nth-child(6) {
			height: 100%;
		}
	}
	&__y {
		width: 24px;
		height: 100%;
		.mark,
		.submark {
			border-top: solid 1px $editor-border-dark-color;
		}
		.submarks {
			align-items: flex-end;
			width: 50%;
			height: 100%;
			top: 0;
			right: 0;
		}
		.submark {
			width: 50%;
		}
		.submark:first-child {
			border-top: none;
		}
		.mark:last-child {
			border-bottom: solid 1px $editor-border-dark-color;
		}
		.submark:nth-child(6) {
			width: 100%;
		}
	}
	&__inner {
		position: absolute;
	}
	&__x &__inner {
		top: 0;
		height: 100%;
	}
	&__y &__inner {
		left: 0;
		width: 100%;
	}
	.number {
		display: inline-block;
		font-size: 12px;
	}
	.mark {
		position: relative;
	}
	.submarks {
		position: absolute;
	}
}
</style>
