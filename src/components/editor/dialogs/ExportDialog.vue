<script setup>
import { mdiClose } from '@mdi/js';
import { useEditor } from '../../../store';

const editor = useEditor();
</script>

<template>
	<QDialog v-model="editor.exportDialog" persistent full-width full-height>
		<QCard>
			<QBar>
				<QSpace />
				<QBtn flat dense :icon="mdiClose" @click="editor.exportDialog = false" />
			</QBar>
		</QCard>
	</QDialog>
</template>

<style scoped></style>
