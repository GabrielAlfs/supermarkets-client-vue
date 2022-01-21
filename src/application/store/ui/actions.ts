import { ActionTree } from 'vuex';
import { RootState } from '..';
import { UIState } from './state';

export default {
  toast({ commit }, { message, type, description, timeout }) {
    commit('SET_TOAST', {
      message,
      type,
      description,
    });

    setTimeout(() => {
      commit('RESET_TOAST');
    }, timeout || 5000);
  },
  resetToast({ commit }) {
    commit('RESET_TOAST');
  },
} as ActionTree<UIState, RootState>;
