<script setup lang="ts">
import { TrackObject } from '@grafikjs/core';
import { useEditor } from '../../../store';
import { mdiRhombus } from '@mdi/js';

const props = defineProps<{
	track: TrackObject;
}>();
const editor = useEditor();
</script>

<template>
	<div class="absolute full-height" :style="{ left: -editor.trackLeft + 'px' }">
		<QIcon
			v-for="kf in props.track.keyframes"
			:name="mdiRhombus"
			color="primary"
			class="keyframe absolute cursor-pointer"
			:style="{ left: (kf.to / 1000) * editor.secondWidth + 'px' }"
			:title="`Value: ${kf.value} at Time: ${kf.to / 1000}s with ${
				kf.easing || 'linear'
			} easing.`"
		/>
	</div>
</template>

<style scoped lang="scss">
.keyframe {
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
