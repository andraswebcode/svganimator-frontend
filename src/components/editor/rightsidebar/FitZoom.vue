<script setup lang="ts">
import { mdiFitToScreen, mdiMagnify } from '@mdi/js';
import { useEditor } from '../../../store';
import { computed } from 'vue';
import { useCanvas } from '@grafikjs/vue';

const props = defineProps<{
	position: 'fixed' | 'absolute';
}>();
const editor = useEditor();
const {
	actions: { getFitZoom }
} = useCanvas(
	null,
	(canvas) => ({
		getFitZoom: canvas.getFitZoom?.bind(canvas)
	}),
	''
);
const style = computed(() => {
	const btm = editor.timelineHeight + 6;
	return {
		bottom: props.position === 'fixed' ? btm + 'px' : '6px'
	};
});
const clickZoom = (zoom) => {
	editor.zoom = zoom;
};
const fitToScreen = () => {
	editor.$patch({
		zoom: getFitZoom(),
		panX: 0,
		panY: 0
	});
};
</script>

<template>
	<QBtnGroup class="q-dark" :class="props.position" :style="style">
		<QBtn dense :icon="mdiFitToScreen" @click="fitToScreen" />
		<QBtn dense :icon="mdiMagnify">
			<QMenu self="bottom right">
				<QList dense>
					<QItem>
						<QItemSection>
							<QSlider
								v-model:model-value="editor.zoom"
								dense
								label
								:label-value="Math.ceil(editor.zoom * 100) + '%'"
								:min="0.1"
								:max="10"
								:step="0.1"
							/>
						</QItemSection>
					</QItem>
					<QItem clickable @click="clickZoom(0.5)">
						<QItemSection>Zoom 50%</QItemSection>
					</QItem>
					<QItem clickable @click="clickZoom(1)">
						<QItemSection>Zoom 100%</QItemSection>
					</QItem>
					<QItem clickable @click="clickZoom(1.5)">
						<QItemSection>Zoom 150%</QItemSection>
					</QItem>
					<QItem clickable @click="clickZoom(2)">
						<QItemSection>Zoom 200%</QItemSection>
					</QItem>
					<QItem clickable @click="fitToScreen">
						<QItemSection>Fit to Screen</QItemSection>
					</QItem>
				</QList>
			</QMenu>
		</QBtn>
	</QBtnGroup>
</template>

<style scoped>
.q-btn-group {
	&.fixed {
		right: 6px;
	}
	&.absolute {
		left: -70px;
	}
}
.q-list {
	min-width: 150px;
}
</style>
