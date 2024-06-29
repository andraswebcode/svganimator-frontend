<script setup>
import { mdiFileTree, mdiShape } from '@mdi/js';
</script>

<template>
	<QDrawer side="left" width="56px" persistent show-if-above>
		<QBtnGroup class="column">
			<QBtn :icon="mdiFileTree" />
			<QSeparator />
			<QBtn :icon="mdiShape" />
		</QBtnGroup>
	</QDrawer>
</template>

<style scoped>
::v-deep .q-drawer {
	z-index: 9999;
}
</style>
