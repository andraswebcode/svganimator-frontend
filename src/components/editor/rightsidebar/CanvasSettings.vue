<script setup>
import { mdiArtboard, mdiFormatColorFill } from '@mdi/js';
import { useProject } from '../../../store';

const project = useProject();
</script>

<template>
	<QList>
		<QExpansionItem dense dense-toggle expand-separator default-opened>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiArtboard" size="xs" />
				</QItemSection>
				<QItemSection>Canvas Size</QItemSection>
			</template>
			<QCard>
				<QCardSection>
					<InputGroup>
						<Input label="Canvas Width" v-model="project.width" />
						<Input label="Canvas Height" v-model="project.height" />
					</InputGroup>
				</QCardSection>
			</QCard>
		</QExpansionItem>
		<QExpansionItem dense dense-toggle expand-separator>
			<template v-slot:header>
				<QItemSection side>
					<QIcon :name="mdiFormatColorFill" size="xs" />
				</QItemSection>
				<QItemSection>Background</QItemSection>
			</template>
			<QCard>
				<QCardSection></QCardSection>
			</QCard>
		</QExpansionItem>
	</QList>
</template>

<style scoped></style>
