<script setup>
const emit = defineEmits(['submit']);
</script>

<template>
	<QPageContainer>
		<QPage class="row justify-center items-center">
			<QCard class="col-4 shadow-5">
				<QCardSection>
					<div class="text-h6">
						<slot name="title" />
					</div>
					<div class="text-subtitle2">
						<slot name="subtitle" />
					</div>
				</QCardSection>
				<QSeparator />
				<QForm @submit="emit('submit')">
					<QCardSection>
						<slot name="form" />
					</QCardSection>
					<QSeparator />
					<QCardActions>
						<slot name="actions" />
					</QCardActions>
				</QForm>
			</QCard>
		</QPage>
	</QPageContainer>
</template>

<style scoped></style>
