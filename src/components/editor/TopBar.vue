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
import UserMenu from '../common/UserMenu.vue';
const editor = useEditor();
const toggleOptions = () => {
	editor.showOptions = !editor.showOptions;
};
</script>

<template>
	<QHeader class="q-dark">
		<QToolbar>
			<QBtn size="sm" round :icon="mdiDotsVertical" @click="toggleOptions" />
			<QSeparator vertical />
			<QBtn size="sm" round :icon="mdiCursorDefault" />
			<QBtn size="sm" round :icon="mdiPen" />
			<QBtn size="sm" round :icon="mdiHandBackLeft" />
			<QSeparator vertical />
			<QBtn size="sm" round :icon="mdiGroup" disable />
			<QBtn size="sm" round :icon="mdiUngroup" disable />
			<QSpace />
			<QBtn size="sm" round :icon="mdiUndo" />
			<QBtn size="sm" round :icon="mdiRedo" />
			<QSpace />
			<UserMenu />
		</QToolbar>
	</QHeader>
</template>

<style scoped></style>
