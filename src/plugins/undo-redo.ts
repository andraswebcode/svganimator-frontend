import { PiniaPluginContext } from 'pinia';
import { ProjectState } from '../store/project';
import { toRaw } from 'vue';
import { debounce } from 'quasar';

export interface UndoRedoActions {
	undo: () => void;
	redo: () => void;
	canUndo: () => boolean;
	canRedo: () => boolean;
	startHistory: () => void;
	clearHistory: () => void;
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
	let _unsubscribe: (() => void) | null = null;

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
	const saveState = debounce(() => {
		const state = JSON.parse(JSON.stringify(toRaw(store.$state)));
		_stack = _stack.slice(0, _index + 1);
		_stack.push(state);
		_index++;
	}, 200);
	const startHistory = () => {
		_stack.push(JSON.parse(JSON.stringify(toRaw(store.$state))));
		_unsubscribe = store.$subscribe(() => {
			if (!_isUndoRedoing) {
				saveState();
			}
			console.log(_stack, _index);
		});
	};
	const clearHistory = () => {
		_stack = [];
		_index = 0;
		if (_unsubscribe) {
			_unsubscribe();
			_unsubscribe = null;
		}
	};

	return {
		undo,
		redo,
		canUndo,
		canRedo,
		startHistory,
		clearHistory
	};
};
