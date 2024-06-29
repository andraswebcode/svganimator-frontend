<script setup>
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<QDrawer side="left" overlay elevated v-model="editor.showOptions"> </QDrawer>
</template>

<style scoped>
::v-deep .q-drawer {
	z-index: 99999;
}
</style>
