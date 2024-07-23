<script setup>
import { mdiChartBellCurveCumulative, mdiTransition } from '@mdi/js';
import { useEditor } from '../../../store';

const editor = useEditor();
const easings = [
	{
		label: 'Linear',
		value: 'linear'
	},
	{
		label: 'Quadratic In',
		value: 'quadraticIn'
	},
	{
		label: 'Quadratic Out',
		value: 'quadraticOut'
	},
	{
		label: 'Quadratic InOut',
		value: 'quadraticInOut'
	},
	{
		label: 'Cubic In',
		value: 'cubicIn'
	},
	{
		label: 'Cubic Out',
		value: 'cubicOut'
	},
	{
		label: 'Cubic InOut',
		value: 'cubicInOut'
	},
	{
		label: 'Bounce In',
		value: 'bounceIn'
	},
	{
		label: 'Bounce Out',
		value: 'bounceOut'
	},
	{
		label: 'Bounce InOut',
		value: 'bounceInOut'
	},
	{
		label: 'Back In',
		value: 'backIn'
	},
	{
		label: 'Back Out',
		value: 'backOut'
	}
];
</script>

<template>
	<QBtn
		title="Animation Presets"
		:icon="mdiTransition"
		class="q-mx-xs"
		dense
		flat
		size="sm"
		:disable="!editor.activeLayerIds.length"
	/>
	<QBtn
		title="Easing"
		:icon="mdiChartBellCurveCumulative"
		class="q-mx-xs"
		dense
		flat
		size="sm"
		:disable="!editor.activeKeyframeIds.length"
	>
		<QMenu>
			<QList dense>
				<QItem v-for="easing of easings" clickable>
					<QItemSection>{{ easing.label }}</QItemSection>
				</QItem>
			</QList>
		</QMenu>
	</QBtn>
</template>

<style scoped></style>
