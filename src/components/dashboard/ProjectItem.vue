<script setup lang="ts">
import { CanvasProvider, Canvas, ShapeTree } from '@grafikjs/vue';
import {
	mdiContentDuplicate,
	mdiEyeOutline,
	mdiFileEditOutline,
	mdiTrashCanOutline,
	mdiShareVariant
} from '@mdi/js';
import { toRaw } from 'vue';

const props = defineProps<{
	id: number;
	title: string;
	data: any[];
	width: number;
	height: number;
}>();
</script>

<template>
	<div class="col col-xs-12 col-sm-6 col-md-3">
		<QCard>
			<QCardSection class="full-height" horizontal>
				<div class="preview full-height q-pa-md">
					<div class="full-width full-height bg-grey-9">
						<CanvasProvider
							:value="{ width: props.width, height: props.height, zoom: 1 }"
						>
							<Canvas>
								<ShapeTree :initialShapes="toRaw(props.data)" />
							</Canvas>
						</CanvasProvider>
					</div>
				</div>
				<QCardActions class="full-height" vertical>
					<QBtn :icon="mdiFileEditOutline" flat round size="sm" :to="`/${id}`" />
					<QBtn :icon="mdiEyeOutline" flat round size="sm" />
					<QBtn :icon="mdiContentDuplicate" flat round size="sm" />
					<QBtn :icon="mdiTrashCanOutline" flat round size="sm" />
					<QSpace vertical />
					<QBtn :icon="mdiShareVariant" flat round size="sm" />
				</QCardActions>
			</QCardSection>
		</QCard>
	</div>
</template>

<style scoped>
.q-card {
	height: 260px;
}
.preview {
	flex: 1 1 auto;
}
.grafik-canvas {
	position: static;
	display: block;
	width: 100%;
	height: 100%;
}
</style>
