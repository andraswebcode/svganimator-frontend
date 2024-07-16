<script setup></script>

<template>
	<InputGroup label="Translate">
		<Input label="left" animatable property="left" />
		<Input label="top" animatable property="top" />
	</InputGroup>
	<InputGroup label="Scale">
		<Input label="x" animatable property="scaleX" />
		<Input label="y" animatable property="scaleY" />
	</InputGroup>
	<Input label="Rotate" animatable property="angle" />
	<InputGroup label="Skew">
		<Input label="x" animatable />
		<Input label="y" animatable />
	</InputGroup>
</template>

<style scoped></style>
