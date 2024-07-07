<script setup>
import { mdiCog, mdiFileTree, mdiFormatText, mdiImage, mdiShape, mdiUpload } from '@mdi/js';
import { useEditor } from '../../store';
const editor = useEditor();
</script>

<template>
	<QDrawer side="left" :width="56" :breakpoint="0" elevated persistent show-if-above>
		<div class="column">
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiFileTree"
				:color="editor.tool === 'list' ? 'primary' : undefined"
				@click="editor.tool = 'list'"
			/>
			<QSeparator />
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiShape"
				:color="editor.tool === 'shapes' ? 'primary' : undefined"
				@click="editor.tool = 'shapes'"
			/>
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiFormatText"
				:color="editor.tool === 'text' ? 'primary' : undefined"
				@click="editor.tool = 'text'"
			/>
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiUpload"
				:color="editor.tool === 'uploads' ? 'primary' : undefined"
				@click="editor.tool = 'uploads'"
			/>
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiImage"
				:color="editor.tool === 'images' ? 'primary' : undefined"
				@click="editor.tool = 'images'"
			/>
			<QSeparator />
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiCog"
				:color="editor.tool === 'settings' ? 'primary' : undefined"
				@click="editor.tool = 'settings'"
			/>
		</div>
	</QDrawer>
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	z-index: $z-fixed-drawer + 1;
}
</style>
