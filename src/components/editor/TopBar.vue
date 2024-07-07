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
import { useEditor } from '../../store';
const editor = useEditor();
</script>

<template>
	<QHeader class="q-dark" elevated>
		<QToolbar>
			<QBtn class="q-mr-sm" size="sm" round flat :icon="mdiDotsVertical">
				<QMenu>
					<QList dense>
						<QItem>
							<QItemSection>
								<QIcon :name="mdiDraw" />
							</QItemSection>
							<QItemSection>Create New</QItemSection>
						</QItem>
						<QItem to="/dashboard">
							<QItemSection>
								<QIcon :name="mdiViewDashboard" />
							</QItemSection>
							<QItemSection>Projects</QItemSection>
						</QItem>
						<QSeparator />
						<QItem clickable>
							<QItemSection>
								<QIcon :name="mdiContentSave" />
							</QItemSection>
							<QItemSection>Save</QItemSection>
						</QItem>
						<QItem clickable>
							<QItemSection>
								<QIcon :name="mdiContentSaveAll" />
							</QItemSection>
							<QItemSection>Save as..</QItemSection>
						</QItem>
						<QSeparator />
						<QItem clickable>
							<QItemSection>
								<QIcon :name="mdiEye" />
							</QItemSection>
							<QItemSection>View</QItemSection>
							<QItemSection side>
								<QIcon :name="mdiChevronRight" />
							</QItemSection>
							<QMenu anchor="top end" self="top start">
								<QList dense>
									<QItem
										clickable
										@click="editor.showRulers = !editor.showRulers"
									>
										<QItemSection>
											<QIcon :name="mdiRulerSquare" />
										</QItemSection>
										<QItemSection>Show Rulers</QItemSection>
									</QItem>
									<QItem clickable @click="editor.showGrid = !editor.showGrid">
										<QItemSection>
											<QIcon :name="mdiGrid" />
										</QItemSection>
										<QItemSection>Show Grid</QItemSection>
									</QItem>
								</QList>
							</QMenu>
						</QItem>
						<QItem clickable>
							<QItemSection>
								<QIcon :name="mdiHelp" />
							</QItemSection>
							<QItemSection>Help</QItemSection>
							<QItemSection side>
								<QIcon :name="mdiChevronRight" />
							</QItemSection>
							<QMenu anchor="top end" self="top start">
								<QList dense>
									<QItem clickable>
										<QItemSection>
											<QIcon :name="mdiKeyboard" />
										</QItemSection>
										<QItemSection>Keyboard Shortcuts</QItemSection>
									</QItem>
									<QItem clickable>
										<QItemSection>
											<QIcon :name="mdiLightbulbOn" />
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
				@click="editor.mode = 'select'"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiPen"
				:color="editor.mode === 'draw' ? 'primary' : undefined"
				@click="editor.mode = 'draw'"
			/>
			<QBtn
				class="q-mx-sm"
				size="sm"
				round
				flat
				:icon="mdiHandBackLeft"
				:color="editor.mode === 'pan' ? 'primary' : undefined"
				@click="editor.mode = 'pan'"
			/>
			<QSeparator class="q-mr-sm" vertical />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiGroup" disable />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiUngroup" disable />
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiUndo" />
			<QBtn class="q-mx-sm" size="sm" round flat :icon="mdiRedo" />
			<QSpace />
			<QBtn class="q-mx-sm" size="sm" color="primary">Save</QBtn>
			<UserMenu />
		</QToolbar>
	</QHeader>
</template>

<style scoped></style>
