import { createStore } from 'vuex';
import modules from './modules';

const state = () => ({});

export type RootState = ReturnType<typeof state>;

export default createStore({
  state,
  modules,
});
