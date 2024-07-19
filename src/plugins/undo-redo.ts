import { PiniaPluginContext } from 'pinia';
import { ProjectState } from '../store/project';
import { toRaw } from 'vue';
import { throttle } from 'lodash';

export interface UndoRedoActions {
	undo: () => void;
	redo: () => void;
	canUndo: () => boolean;
	canRedo: () => boolean;
	startHistory: () => void;
}

export default ({
	store
}: PiniaPluginContext<string, ProjectState>): UndoRedoActions | undefined => {
	if (store.$id !== 'project') {
		return;
	}

	let _stack: ProjectState[] = [];
	let _index = 0;
	let _isUndoRedoing = false;

	const undo = () => {
		_isUndoRedoing = true;
		if (_index > 0) {
			_index--;
			store.$patch(_stack[_index]);
		}
		_isUndoRedoing = false;
	};
	const redo = () => {
		_isUndoRedoing = true;
		if (_index < _stack.length - 1) {
			_index++;
			store.$patch(_stack[_index]);
		}
		_isUndoRedoing = false;
	};
	const canUndo = () => true;
	const canRedo = () => true;
	const startHistory = () => {
		_stack.push(JSON.parse(JSON.stringify(toRaw(store.$state))));
		store.$subscribe(
			throttle(() => {
				if (!_isUndoRedoing) {
					const state = JSON.parse(JSON.stringify(toRaw(store.$state)));
					_stack = _stack.slice(0, _index + 1);
					_stack.push(state);
					_index++;
				}
			}, 200)
		);
	};

	return {
		undo,
		redo,
		canUndo,
		canRedo,
		startHistory
	};
};
