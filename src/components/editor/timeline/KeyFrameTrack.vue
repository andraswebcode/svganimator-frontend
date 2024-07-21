<script setup lang="ts">
import { mdiRhombus } from '@mdi/js';
import { useEditor, useProject } from '../../../store';

const props = defineProps<{
	id: string;
}>();
const project = useProject();
const editor = useEditor();
const track = project.tre[props.id];
</script>

<template>
	<QItem>
		<QItemSection class="leftside">
			<div class="row justify-between items-center full-width q-pl-lg q-pr-sm">
				<span>{{ track.property }}</span>
				<QIcon :name="mdiRhombus" class="cursor-pointer" title="Add Keyframe" />
			</div>
		</QItemSection>
		<QItemSection class="keyframes relative-position q-px-none col-grow overflow-hidden">
			<div class="absolute full-height" :style="{ left: -editor.trackLeft + 'px' }">
				<KeyFrame v-for="kf of track.keyframes" :key="kf" :id="kf" />
			</div>
		</QItemSection>
	</QItem>
</template>

<style scoped lang="scss">
.leftside {
	width: 312px !important;
	flex: 0 0 auto;
}
.keyframes {
	margin: 0 !important;
}
</style>
