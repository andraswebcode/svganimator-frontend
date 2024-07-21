<script setup>
import { mdiFile, mdiPencilRuler } from '@mdi/js';
import { useProject, useEditor } from './../../../store';
const project = useProject();
const editor = useEditor();
</script>

<template>
	<QList>
		<QExpansionItem dense dense-toggle expand-separator default-opened>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiFile" size="xs" />
				</QItemSection>
				<QItemSection>Project</QItemSection>
			</template>
			<QCard>
				<QCardSection>
					<Input type="text" label="Project Title" v-model="project.title" />
					<Input
						type="textarea"
						label="Project Description"
						v-model="project.description"
					/>
				</QCardSection>
			</QCard>
		</QExpansionItem>
		<QExpansionItem dense dense-toggle expand-separator default-opened>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiPencilRuler" size="xs" />
				</QItemSection>
				<QItemSection>Pencil</QItemSection>
			</template>
			<QCard>
				<QCardSection>
					<Slider label="Pencil Width" v-model="editor.penWidth" :min="1" :max="100" />
					<ColorPicker label="Pencil Color" v-model="editor.penColor" />
				</QCardSection>
			</QCard>
		</QExpansionItem>
	</QList>
</template>

<style scoped></style>
