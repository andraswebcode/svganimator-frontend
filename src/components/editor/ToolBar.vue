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
				:color="editor.activeTool === 'list' ? 'primary' : undefined"
				@click="editor.activeTool = 'list'"
			/>
			<QSeparator />
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiShape"
				:color="editor.activeTool === 'shapes' ? 'primary' : undefined"
				@click="editor.activeTool = 'shapes'"
			/>
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiFormatText"
				:color="editor.activeTool === 'text' ? 'primary' : undefined"
				@click="editor.activeTool = 'text'"
			/>
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiUpload"
				:color="editor.activeTool === 'uploads' ? 'primary' : undefined"
				@click="editor.activeTool = 'uploads'"
			/>
			<QBtn
				class="q-ma-sm"
				square
				dense
				flat
				:icon="mdiImage"
				:color="editor.activeTool === 'images' ? 'primary' : undefined"
				@click="editor.activeTool = 'images'"
			/>
			<QSeparator />
			<QBtn class="q-ma-sm" square dense :icon="mdiCog" />
		</div>
	</QDrawer>
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	z-index: $z-fixed-drawer + 1;
}
</style>
