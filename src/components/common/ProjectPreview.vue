<script setup lang="ts">
import { CanvasProvider, Canvas, ShapeTree } from '@grafikjs/vue';
import { PreviewItem } from './../../store/dashboard';
import { toRaw } from 'vue';
const props = defineProps<PreviewItem>();
</script>

<template>
	<CanvasProvider :value="{ width: props.width, height: props.height, zoom: 1 }">
		<QList>
			<QItem class="q-pa-md">
				<div class="bg-grey-9">
					<Canvas>
						<ShapeTree :initialShapes="toRaw(props.data)" />
					</Canvas>
				</div>
			</QItem>
			<QItem>
				<PreviewPlayer />
			</QItem>
		</QList>
	</CanvasProvider>
</template>

<style scoped></style>
