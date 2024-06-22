import { createPinia } from 'pinia';
import useEditor from './editor';
import useUser from './user';

export default createPinia();
export { useEditor, useUser };
