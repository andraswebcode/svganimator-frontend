<script setup>
import {
	mdiCheck,
	mdiChevronDown,
	mdiChevronUp,
	mdiContentSave,
	mdiContentSaveAll,
	mdiDraw,
	mdiExport,
	mdiEye,
	mdiGrid,
	mdiHelp,
	mdiKeyboard,
	mdiLightbulbOn,
	mdiRulerSquare,
	mdiViewDashboard
} from '@mdi/js';
import { useEditor } from '../../store';

const editor = useEditor();
const toggleRulers = () => {
	editor.showRulers = !editor.showRulers;
};
const toggleGrid = () => {
	editor.showGrid = !editor.showGrid;
};
</script>

<template>
	<VNavigationDrawer v-model="editor.showOptions" temporary>
		<VTextField class="px-4 mt-4" label="Project Name" />
		<VDivider />
		<VList>
			<VListItem to="/dashboard">
				<template v-slot:prepend>
					<VIcon :icon="mdiViewDashboard" />
				</template>
				<VListItemTitle>Projects</VListItemTitle>
			</VListItem>
			<VListItem href="#">
				<template v-slot:prepend>
					<VIcon :icon="mdiDraw" />
				</template>
				<VListItemTitle>Create New</VListItemTitle>
			</VListItem>
			<VDivider />
			<VListItem href="#">
				<template v-slot:prepend>
					<VIcon :icon="mdiContentSave" />
				</template>
				<VListItemTitle>Save</VListItemTitle>
			</VListItem>
			<VListItem href="#">
				<template v-slot:prepend>
					<VIcon :icon="mdiContentSaveAll" />
				</template>
				<VListItemTitle>Save As...</VListItemTitle>
			</VListItem>
			<VListItem href="#">
				<template v-slot:prepend>
					<VIcon :icon="mdiExport" />
				</template>
				<VListItemTitle>Export</VListItemTitle>
			</VListItem>
			<VDivider />
			<VListGroup :expand-icon="mdiChevronDown" :collapse-icon="mdiChevronUp">
				<template v-slot:activator="{ props }">
					<VListItem v-bind="props">
						<template v-slot:prepend>
							<VIcon :icon="mdiEye" />
						</template>
						<VListItemTitle>View</VListItemTitle>
					</VListItem>
				</template>
				<VListItem href="#" @click.prevent="toggleRulers">
					<template v-slot:prepend>
						<VIcon :icon="mdiRulerSquare" />
					</template>
					<VListItemTitle>Show Rulers</VListItemTitle>
					<template v-if="editor.showRulers" v-slot:append>
						<VIcon :icon="mdiCheck" />
					</template>
				</VListItem>
				<VListItem href="#" @click.prevent="toggleGrid">
					<template v-slot:prepend>
						<VIcon :icon="mdiGrid" />
					</template>
					<VListItemTitle>Show Grid</VListItemTitle>
					<template v-if="editor.showGrid" v-slot:append>
						<VIcon :icon="mdiCheck" />
					</template>
				</VListItem>
			</VListGroup>
			<VListGroup :expand-icon="mdiChevronDown" :collapse-icon="mdiChevronUp">
				<template v-slot:activator="{ props }">
					<VListItem v-bind="props">
						<template v-slot:prepend>
							<VIcon :icon="mdiHelp" />
						</template>
						<VListItemTitle>Help</VListItemTitle>
					</VListItem>
				</template>
				<VListItem href="#">
					<template v-slot:prepend>
						<VIcon :icon="mdiKeyboard" />
					</template>
					<VListItemTitle>Keyboard Shortcuts</VListItemTitle>
				</VListItem>
				<VListItem href="#">
					<template v-slot:prepend>
						<VIcon :icon="mdiLightbulbOn" />
					</template>
					<VListItemTitle>Start Tour</VListItemTitle>
				</VListItem>
			</VListGroup>
		</VList>
	</VNavigationDrawer>
</template>

<style scoped></style>
