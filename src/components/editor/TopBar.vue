<script setup>
import {
	mdiChevronRight,
	mdiContentSave,
	mdiContentSaveAll,
	mdiCursorDefault,
	mdiDotsVertical,
	mdiDraw,
	mdiEye,
	mdiGrid,
	mdiGroup,
	mdiHandBackLeft,
	mdiHelp,
	mdiKeyboard,
	mdiLightbulbOn,
	mdiPen,
	mdiRedo,
	mdiRulerSquare,
	mdiUndo,
	mdiUngroup,
	mdiViewDashboard
} from '@mdi/js';
import { useEditor, useProject } from '../../store';
import { useProjectRequest } from '../../hooks';
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';

const editor = useEditor();
const project = useProject();
const router = useRouter();
const { save } = useProjectRequest();
const changeMode = (mode) => {
	editor.mode = mode;
	if (mode === 'draw') {
		editor.activeLayerIds = [];
	}
};
const saveProject = (id) => {
	const { title, description, status, width, height, byIds, ids, tre, kfe } = project;
	save(
		id,
		{
			title,
			description,
			status,
			width,
			height,
			layers: toRaw(byIds),
			layer_ids: toRaw(ids),
			tracks: toRaw(tre),
			keyframes: toRaw(kfe)
		},
		({ id }) => {
			router.push({
				params: { id }
			});
		}
	);
};
</script>

<template>
	<QHeader class="q-dark" elevated>
		<QToolbar>
			<QBtn class="q-mr-sm" size="sm" round flat :icon="mdiDotsVertical">
				<QMenu>
					<QList dense>
						<QItem to="/">
							<QItemSection side>
								<QIcon :name="mdiDraw" size="small" />
							</QItemSection>
							<QItemSection>Create New</QItemSection>
						</QItem>
						<QItem to="/dashboard">
							<QItemSection side>
								<QIcon :name="mdiViewDashboard" size="small" />
							</QItemSection>
							<QItemSection>Projects</QItemSection>
						</QItem>
						<QSeparator />
						<QItem clickable>
							<QItemSection side>
								<QIcon :name="mdiContentSave" size="small" />
							</QItemSection>
							<QItemSection>Save</QItemSection>
						</QItem>
						<QItem clickable>
							<QItemSection side>
								<QIcon :name="mdiContentSaveAll" size="small" />
							</QItemSection>
							<QItemSection>Save as..</QItemSection>
						</QItem>
						<QSeparator />
						<QItem clickable>
							<QItemSection side>
								<QIcon :name="mdiEye" size="small" />
							</QItemSection>
							<QItemSection>View</QItemSection>
							<QItemSection side>
								<QIcon :name="mdiChevronRight" size="small" />
							</QItemSection>
							<QMenu anchor="top end" self="top start">
								<QList dense>
									<QItem
										clickable
										@click="editor.showRulers = !editor.showRulers"
									>
										<QItemSection side>
											<QIcon :name="mdiRulerSquare" size="small" />
										</QItemSection>
										<QItemSection>Show Rulers</QItemSection>
									</QItem>
									<QItem clickable @click="editor.showGrid = !editor.showGrid">
										<QItemSection side>
											<QIcon :name="mdiGrid" size="small" />
										</QItemSection>
										<QItemSection>Show Grid</QItemSection>
									</QItem>
								</QList>
							</QMenu>
						</QItem>
						<QItem clickable>
							<QItemSection side>
								<QIcon :name="mdiHelp" size="small" />
							</QItemSection>
							<QItemSection>Help</QItemSection>
							<QItemSection side>
								<QIcon :name="mdiChevronRight" size="small" />
							</QItemSection>
							<QMenu anchor="top end" self="top start">
								<QList dense>
									<QItem clickable>
										<QItemSection side>
											<QIcon :name="mdiKeyboard" size="small" />
										</QItemSection>
										<QItemSection>Keyboard Shortcuts</QItemSection>
									</QItem>
									<QItem clickable>
										<QItemSection side>
											<QIcon :name="mdiLightbulbOn" size="small" />
										</QItemSection>
										<QItemSection>Start Tour</QItemSection>
									</QItem>
								</QList>
							</QMenu>
						</QItem>
					</QList>
				</QMenu>
			</QBtn>
			<QSeparator class="q-mr-sm" vertical />
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiCursorDefault"
				:color="editor.mode === 'select' ? 'primary' : undefined"
				@click="changeMode('select')"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiPen"
				:color="editor.mode === 'draw' ? 'primary' : undefined"
				@click="changeMode('draw')"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiHandBackLeft"
				:color="editor.mode === 'pan' ? 'primary' : undefined"
				@click="changeMode('pan')"
			/>
			<QSeparator class="q-mr-sm" vertical />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiGroup" disable />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiUngroup" disable />
			<QSpace />
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiUndo"
				:disable="!project.canUndo()"
				@click="project.undo()"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiRedo"
				:disable="!project.canRedo()"
				@click="project.redo()"
			/>
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" flat @click="editor.exportDialog = true">Export</QBtn>
			<QBtn class="q-mx-sm" size="sm" color="primary" @click="saveProject($route.params.id)">
				Save
			</QBtn>
			<UserMenu />
		</QToolbar>
	</QHeader>
</template>

<style scoped></style>
