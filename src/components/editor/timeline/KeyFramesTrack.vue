<script setup lang="ts">
import { TrackObject } from '@grafikjs/core';
import { useEditor } from '../../../store';

const props = defineProps<{
	track: TrackObject;
}>();
const editor = useEditor();
</script>

<template>
	<div class="absolute full-height" :style="{ left: -editor.trackLeft + 'px' }">
		<div
			v-for="kf in props.track.keyframes"
			class="keyframe absolute"
			:style="{ left: (kf.to / 1000) * editor.secondWidth + 'px' }"
		/>
	</div>
</template>

<style scoped lang="scss">
.keyframe {
	width: 12px;
	height: 12px;
	top: 0;
	transform: rotate(45deg);
	transform-origin: top left;
	background-color: $grey-5;
}
</style>
