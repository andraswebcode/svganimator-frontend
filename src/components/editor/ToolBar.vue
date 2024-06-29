<script setup>
import { mdiFileTree, mdiShape } from '@mdi/js';
</script>

<template>
	<QDrawer side="left" :width="56" :breakpoint="0" elevated persistent show-if-above>
		<div class="column">
			<QBtn class="q-ma-sm" square dense :icon="mdiFileTree" />
			<QSeparator />
			<QBtn class="q-ma-sm" square dense :icon="mdiShape" />
		</div>
	</QDrawer>
</template>

<style scoped lang="scss">
:deep(.q-drawer) {
	z-index: $z-fixed-drawer + 1;
}
</style>
