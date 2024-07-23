<script setup>
import { mdiClose } from '@mdi/js';
import { useDashboard } from '../../store';

const dashboard = useDashboard();
const close = () => {
	dashboard.$patch({
		showPreview: false,
		preview: null
	});
};
</script>

<template>
	<QDialog v-model="dashboard.showPreview" persistent>
		<QCard class="overflow-hidden">
			<QBar>
				<div class="text-h6">Preview - {{ dashboard.preview.title }}</div>
				<QSpace />
				<QBtn flat dense :icon="mdiClose" @click="close" />
			</QBar>
			<ProjectPreview v-bind="dashboard.preview" />
		</QCard>
	</QDialog>
</template>

<style scoped>
:deep(.grafik-canvas) {
	max-width: 100%;
	max-height: 50vh;
}
</style>
