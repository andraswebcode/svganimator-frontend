<script setup>
import {
	mdiContentDuplicate,
	mdiEyeOutline,
	mdiFileEditOutline,
	mdiTrashCanOutline
} from '@mdi/js';
</script>

<template>
	<div class="row q-col-gutter-md">
		<div v-for="n in 12" class="col col-xs-12 col-sm-6 col-md-3">
			<QCard>
				<QCardSection horizontal>
					<div class="col-grow" />

					<QCardActions vertical>
						<QBtn :icon="mdiFileEditOutline" :to="`/${n}`" flat round size="sm" />
						<QBtn :icon="mdiEyeOutline" flat round size="sm" />
						<QBtn :icon="mdiContentDuplicate" flat round size="sm" />
						<QBtn :icon="mdiTrashCanOutline" flat round size="sm" />
					</QCardActions>
				</QCardSection>
			</QCard>
		</div>
	</div>
</template>

<style scoped>
.q-card {
	height: 200px;
}
</style>
