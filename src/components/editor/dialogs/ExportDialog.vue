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
			<QCardSection>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
				voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis
				vel numquam exercitationem aut, natus minima, porro labore.
			</QCardSection>
			<QCardActions>
				<QBtn size="sm" color="primary">Export</QBtn>
			</QCardActions>
		</QCard>
	</QDialog>
</template>

<style scoped></style>
