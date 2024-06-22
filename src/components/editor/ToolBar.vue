<script setup>
import { mdiCog, mdiFileTree, mdiFormatText, mdiImage, mdiShape, mdiUpload } from '@mdi/js';
import { useEditor } from '../../store';
const editor = useEditor();
</script>

<template>
	<VNavigationDrawer tag="aside" width="56">
		<ToolBarList v-model="editor.activeTool">
			<ToolBarItem value="list" :icon="mdiFileTree" />
			<VDivider />
			<ToolBarItem value="shapes" :icon="mdiShape" />
			<ToolBarItem value="text" :icon="mdiFormatText" />
			<ToolBarItem value="uploads" :icon="mdiUpload" />
			<ToolBarItem value="images" :icon="mdiImage" />
			<VDivider />
			<ToolBarItem value="settings" :icon="mdiCog" />
		</ToolBarList>
	</VNavigationDrawer>
</template>

<style scoped></style>
