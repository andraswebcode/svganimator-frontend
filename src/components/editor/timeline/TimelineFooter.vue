<script setup>
import { mdiMagnifyMinus, mdiMagnifyPlus, mdiChat, mdiHelpCircle, mdiShareVariant } from '@mdi/js';
import { useEditor } from '../../../store';

const editor = useEditor();
const zoom = (dir) => {
	if (dir === 'plus') {
		editor.secondWidth += 10;
	} else {
		editor.secondWidth -= 10;
	}
};
</script>

<template>
	<div class="footer row align-center">
		<div class="zoom col">
			<div class="row items-center">
				<div class="col col-shrink q-ml-sm">
					<QBtn
						:icon="mdiMagnifyMinus"
						round
						flat
						size="sm"
						:disable="editor.secondWidth <= 40"
						@click="zoom('minus')"
					/>
				</div>
				<div class="col q-mx-sm">
					<QSlider v-model="editor.secondWidth" :min="40" :max="400" />
				</div>
				<div class="col col-shrink q-mr-sm">
					<QBtn
						:icon="mdiMagnifyPlus"
						round
						flat
						size="sm"
						:disable="editor.secondWidth >= 400"
						@click="zoom('plus')"
					/>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="row justify-between items-center">
				<div class="col-3">
					<QSlider v-model="editor.trackLeft" :max="2000" />
				</div>
				<div class="col-shrink">
					<QBtn :icon="mdiShareVariant" title="Share" round size="sm" />
					<QBtn :icon="mdiChat" title="Feedback" round size="sm" />
					<QBtn :icon="mdiHelpCircle" title="Help" round size="sm" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.footer {
	border-top: solid 1px $editor-border-dark-color;
}
.zoom {
	width: 312px !important;
	flex-grow: 0;
	flex-basis: auto;
	border-right: solid 1px $editor-border-dark-color;
}
</style>
