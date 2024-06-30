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
</script>

<template>
	<QHeader class="q-dark" elevated>
		<QToolbar>
			<QBtn
				class="q-mr-sm"
				size="sm"
				round
				flat
				:icon="mdiDotsVertical"
				@click="editor.showOptions = !editor.showOptions"
			/>
			<QSeparator class="q-mr-sm" vertical />
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiCursorDefault"
				:color="editor.mode === 'select' ? 'primary' : undefined"
				@click="editor.mode = 'select'"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiPen"
				:color="editor.mode === 'draw' ? 'primary' : undefined"
				@click="editor.mode = 'draw'"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiHandBackLeft"
				:color="editor.mode === 'pan' ? 'primary' : undefined"
				@click="editor.mode = 'pan'"
			/>
			<QSeparator class="q-mr-sm" vertical />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiGroup" disable />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiUngroup" disable />
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiUndo" />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiRedo" />
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" color="primary">Save</QBtn>
			<UserMenu />
		</QToolbar>
	</QHeader>
</template>

<style scoped></style>
