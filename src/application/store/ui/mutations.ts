import { MutationTree } from 'vuex';
import { UIState } from './state';

export default {
  SET_TOAST(state, { message, type, description }) {
    state.toast = {
      ...state.toast,
      show: true,
      message,
      type,
      description: description || null,
    };
  },
  RESET_TOAST(state) {
    Object.assign(state.toast, {
      show: false,
      type: 'info',
      message: null,
      description: null,
    } as typeof state.toast);
  },
} as MutationTree<UIState>;
