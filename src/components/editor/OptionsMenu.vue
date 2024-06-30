<script setup>
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<QDrawer side="left" class="q-pa-md" overlay elevated v-model="editor.showOptions">
		<QInput label="Project Name" />
		<QSeparator />
	</QDrawer>
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	z-index: $z-menu;
}
</style>
