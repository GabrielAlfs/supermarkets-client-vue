import { Commit } from 'vuex';
import store from '.';

export const useToast = ({
  message = 'Algo deu errado!',
  description = 'Infelizmente aconteceu um erro inesperado',
  type = 'error',
}: {
  type?: 'success' | 'info' | 'error';
  message: string;
  description: string;
}): void => {
  store.dispatch('ui/toast', {
    message,
    type,
    description: `${description}${
      { error: ', tente novamente...', info: '.', success: '.' }[type]
    }`,
  });
};

export const useRequestWrapper = async (
  commit: Commit,
  fn: () => Promise<void>,
): Promise<void> => {
  commit('SET_LOADING', true);
  try {
    await fn();
  } catch (error: any) {
    useToast({
      message: error.response?.data?.message,
      description: error.response?.data?.message,
    });
  } finally {
    commit('SET_LOADING', false);
  }
};
