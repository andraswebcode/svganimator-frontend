import { createPinia } from 'pinia';
import useEditor from './editor';
import useUser from './user';
import useProject from './project';
import undoRedo from '../plugins/undo-redo';
import grafikUpdater from '../plugins/grafik-updater';

const pinia = createPinia();

pinia.use(undoRedo);
// pinia.use(grafikUpdater);

export default pinia;
export { useEditor, useUser, useProject };
