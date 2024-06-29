<script setup></script>

<template>
	<QPageContainer>
		<QPage class="row justify-center items-center">
			<QCard class="col-4 shadow-5">
				<QCardSection>
					<slot name="title" />
				</QCardSection>
				<QSeparator />
				<QCardSection>
					<slot name="form" />
				</QCardSection>
				<QSeparator />
				<QCardActions>
					<slot name="actions" />
				</QCardActions>
			</QCard>
		</QPage>
	</QPageContainer>
</template>

<style scoped></style>
