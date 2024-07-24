import { BBox, clamp, Point } from '@grafikjs/core';
import { ref } from 'vue';
import { useEditor } from '../store';

const useKeyframeSelector = () => {
	const containerRef = ref<HTMLDivElement | null>(null);
	const style = ref({
		display: 'none',
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
	const leftSideWidth = 311;
	const keyframeHalfSize = 14 / 2;

	const setStyle = (hide = false) => {
		min.minPoints(bBox.min, bBox.max);
		max.maxPoints(bBox.min, bBox.max);
		size.subtractPoints(max, min);

		style.value = {
			display: hide ? 'none' : 'block',
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

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (x < leftSideWidth) {
			return;
		}

		bBox.reset().min.set(x, y);
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
			const x = clamp(e.clientX - rect.left, leftSideWidth, rect.width);
			const y = clamp(e.clientY - rect.top, 0, rect.height);
			bBox.max.set(x, y);
			setStyle();
		}
	};
	const stopSelect = () => {
		isSelecting.value = false;

		const rect = containerRef.value?.getBoundingClientRect();
		if (!rect) {
			return;
		}

		bBox.normalize();

		const keyframes = containerRef.value?.querySelectorAll<HTMLElement>('[data-keyframe]');
		editor.activeKeyframeIds = Array.from(keyframes || [])
			.map((item) => {
				const { left, top } = item.getBoundingClientRect();
				const position = new Point(
					left - rect.left + keyframeHalfSize,
					top - rect.top + keyframeHalfSize
				);
				return bBox.contains(position) ? (item.dataset.keyframe as string) : '';
			})
			.filter((id) => !!id);

		bBox.reset();
		setStyle(true);

		document.removeEventListener('mousemove', select);
		document.removeEventListener('mouseup', stopSelect);
	};

	return { containerRef, style, startSelect };
};

export default useKeyframeSelector;
