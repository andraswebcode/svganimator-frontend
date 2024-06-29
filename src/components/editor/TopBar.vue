<script setup>
import {
	mdiCursorDefault,
	mdiDotsVertical,
	mdiGroup,
	mdiHandBackLeft,
	mdiPen,
	mdiRedo,
	mdiUndo,
	mdiUngroup
} from '@mdi/js';
import { useEditor } from '../../store';
const editor = useEditor();
const toggleOptions = () => {
	editor.showOptions = !editor.showOptions;
};
</script>

<template>
	<QHeader class="q-dark" elevated>
		<QToolbar>
			<QBtn class="q-mr-sm" size="sm" round :icon="mdiDotsVertical" @click="toggleOptions" />
			<QSeparator class="q-mr-sm" vertical />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiCursorDefault" />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiPen" />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiHandBackLeft" />
			<QSeparator class="q-mr-sm" vertical />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiGroup" disable />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiUngroup" disable />
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiUndo" />
			<QBtn class="q-mx-sm" size="sm" round :icon="mdiRedo" />
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" color="primary">Save</QBtn>
			<UserMenu />
		</QToolbar>
	</QHeader>
</template>

<style scoped></style>
