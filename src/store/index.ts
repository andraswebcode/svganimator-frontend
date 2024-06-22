import { createPinia } from 'pinia';
import useEditor from './editor';
import useUser from './user';
import useNotification from './notification';

export default createPinia();
export { useEditor, useUser, useNotification };
