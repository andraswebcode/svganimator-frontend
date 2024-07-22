<script setup lang="ts">
import { toFixed } from '@grafikjs/core';
import { useCanvas } from '@grafikjs/vue';
import { mdiPause, mdiPlay } from '@mdi/js';
const {
	state: { time, playing, duration },
	actions: { play, pause, seek }
} = useCanvas(
	(canvas) => {
		const animation = canvas.getAnimation();
		return {
			time: animation.time,
			playing: animation.playing,
			duration: animation.duration
		};
	},
	(canvas) => {
		const animation = canvas.getAnimation();
		return {
			play: animation.play.bind(animation),
			pause: animation.pause.bind(animation),
			seek: animation.seek.bind(animation)
		};
	}
);
const playPause = () => {
	if (playing.value) {
		pause();
	} else {
		play();
	}
};
</script>

<template>
	<QItemSection side>
		<QBtn :icon="playing ? mdiPause : mdiPlay" flat @click="playPause" />
	</QItemSection>
	<QItemSection>
		<QSlider
			v-model="time"
			:max="duration"
			label
			:label-value="toFixed(time / 1000) + 'sec'"
			@update:model-value="seek($event)"
		/>
	</QItemSection>
</template>

<style scoped></style>
