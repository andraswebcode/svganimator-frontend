<script setup>
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<QDrawer side="left" overlay elevated v-model="editor.showOptions"> </QDrawer>
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	z-index: $z-fixed-drawer + 1;
}
</style>
