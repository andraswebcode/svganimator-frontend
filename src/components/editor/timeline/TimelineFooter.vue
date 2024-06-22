<script setup>
import { mdiMagnifyMinus, mdiMagnifyPlus } from '@mdi/js';
import { useEditor } from '../../../store';
const editor = useEditor();
const clickIcon = (dir) => {
	if (dir === 'plus') {
		editor.secondWidth += 10;
	} else {
		editor.secondWidth -= 10;
	}
};
</script>

<template>
	<VRow class="footer" no-gutters align="stretch">
		<VCol class="zoom">
			<VSlider v-model="editor.secondWidth" min="40" max="400">
				<template v-slot:prepend>
					<VBtn :icon="mdiMagnifyMinus" @click="clickIcon('minus')" />
				</template>
				<template v-slot:append>
					<VBtn :icon="mdiMagnifyPlus" @click="clickIcon('plus')" />
				</template>
			</VSlider>
		</VCol>
		<VCol class="scroll"></VCol>
	</VRow>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.footer {
	height: 48px;
	min-height: 48px;
	flex-grow: 0;
	border-top: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
.zoom {
	width: 312px;
	flex-grow: 0;
	flex-basis: auto;
	border-right: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
</style>
