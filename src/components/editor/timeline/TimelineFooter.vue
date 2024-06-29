<script setup>
import { useEditor } from '../../../store';

const editor = useEditor();
</script>

<template>
	<div class="footer row align-center">
		<div class="zoom col">
			<QSlider v-model="editor.secondWidth" :min="40" :max="400" />
		</div>
		<div class="col"></div>
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
