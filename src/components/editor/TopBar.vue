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
				:color="editor.activeMode === 'select' ? 'primary' : undefined"
				@click="editor.activeMode = 'select'"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiPen"
				:color="editor.activeMode === 'draw' ? 'primary' : undefined"
				@click="editor.activeMode = 'draw'"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiHandBackLeft"
				:color="editor.activeMode === 'pan' ? 'primary' : undefined"
				@click="editor.activeMode = 'pan'"
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
