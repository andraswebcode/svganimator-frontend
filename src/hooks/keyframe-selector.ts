import { BBox, Point } from '@grafikjs/core';
import { ref } from 'vue';
import { useEditor } from '../store';

const useKeyframeSelector = () => {
	const containerRef = ref<HTMLDivElement | null>(null);
	const style = ref({
		left: '0px',
		top: '0px',
		width: '0px',
		height: '0px'
	});
	const isSelecting = ref(false);
	const editor = useEditor();
	const bBox = new BBox();
	const min = new Point();
	const max = new Point();
	const size = new Point();

	const setStyle = () => {
		min.minPoints(bBox.min, bBox.max);
		max.maxPoints(bBox.min, bBox.max);
		size.subtractPoints(max, min);

		style.value = {
			left: min.x + 'px',
			top: min.y + 'px',
			width: size.x + 'px',
			height: size.y + 'px'
		};
	};

	const startSelect = (e: MouseEvent) => {
		// @ts-ignore
		if (e.target?.dataset?.keyframe) {
			return;
		}

		isSelecting.value = true;

		const rect = containerRef.value?.getBoundingClientRect();
		if (!rect) {
			return;
		}

		bBox.reset().min.set(e.clientX - rect.left, e.clientY - rect.top);
		bBox.max.copy(bBox.min);

		setStyle();

		document.addEventListener('mousemove', select);
		document.addEventListener('mouseup', stopSelect);
	};
	const select = (e: MouseEvent) => {
		if (isSelecting.value) {
			const rect = containerRef.value?.getBoundingClientRect();
			if (!rect) {
				return;
			}
			bBox.max.set(e.clientX - rect.left, e.clientY - rect.top);
			setStyle();
		}
	};
	const stopSelect = () => {
		isSelecting.value = false;

		const rect = containerRef.value?.getBoundingClientRect();
		if (!rect) {
			return;
		}

		const keyframes = containerRef.value?.querySelectorAll<HTMLElement>('[data-keyframe]');
		editor.activeKeyframeIds = Array.from(keyframes || [])
			.map((item) => {
				const { left, top } = item.getBoundingClientRect();
				const position = new Point(left - rect.left, top - rect.top);
				console.log(bBox, position);

				return bBox.contains(position) ? (item.dataset.keyframe as string) : '';
			})
			.filter((id) => !!id);

		bBox.reset();
		setStyle();

		document.removeEventListener('mousemove', select);
		document.removeEventListener('mouseup', stopSelect);
	};

	return { containerRef, style, startSelect };
};

export default useKeyframeSelector;
