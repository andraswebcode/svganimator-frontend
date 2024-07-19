<script setup>
import { mdiAspectRatio, mdiBrushVariant, mdiStar } from '@mdi/js';
import { useEditor } from '../../../store';
const editor = useEditor();
</script>

<template>
	<QList>
		<QExpansionItem
			v-if="editor.activeLayerIds.length === 1"
			dense
			dense-toggle
			expand-separator
			default-opened
		>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiStar" size="xs" />
				</QItemSection>
				<QItemSection>Shape</QItemSection>
			</template>
			<QCard>
				<QCardSection>
					<SettingsShape />
				</QCardSection>
			</QCard>
		</QExpansionItem>
		<QExpansionItem dense dense-toggle expand-separator default-opened>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiAspectRatio" size="xs" />
				</QItemSection>
				<QItemSection>Transforms</QItemSection>
			</template>
			<QCard>
				<QCardSection>
					<SettingsTransforms />
				</QCardSection>
			</QCard>
		</QExpansionItem>
		<QExpansionItem dense dense-toggle expand-separator>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiBrushVariant" size="xs" />
				</QItemSection>
				<QItemSection>Appearance</QItemSection>
			</template>
			<QCard>
				<QCardSection>
					<SettingsAppearance />
				</QCardSection>
			</QCard>
		</QExpansionItem>
		<QExpansionItem dense dense-toggle expand-separator>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiStar" size="xs" />
				</QItemSection>
				<QItemSection>Mask</QItemSection>
			</template>
			<QCard>
				<QCardSection></QCardSection>
			</QCard>
		</QExpansionItem>
		<QExpansionItem dense dense-toggle expand-separator>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiStar" size="xs" />
				</QItemSection>
				<QItemSection>Filter</QItemSection>
			</template>
			<QCard>
				<QCardSection></QCardSection>
			</QCard>
		</QExpansionItem>
	</QList>
</template>

<style scoped></style>
