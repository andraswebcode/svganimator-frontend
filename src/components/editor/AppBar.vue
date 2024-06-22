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
</script>

<template>
	<VAppBar>
		<template v-slot:prepend>
			<VBtn :icon="mdiDotsVertical" title="Options" @click="editor.showOptions = true" />
			<VDivider vertical />
			<VBtn :icon="mdiCursorDefault" title="Select Mode" />
			<VBtn :icon="mdiPen" title="Drawing Mode" />
			<VBtn :icon="mdiHandBackLeft" title="Hand Mode" />
			<VDivider vertical />
			<VBtn :icon="mdiGroup" disabled title="Group Shapes" />
			<VBtn :icon="mdiUngroup" disabled />
		</template>
		<VBtn :icon="mdiUndo" disabled title="Undo" />
		<VBtn :icon="mdiRedo" disabled title="Redo" />
		<template v-slot:append>
			<VBtn variant="flat" color="primary" size="small">Save</VBtn>
			<UserMenu />
		</template>
	</VAppBar>
</template>

<style scoped></style>
