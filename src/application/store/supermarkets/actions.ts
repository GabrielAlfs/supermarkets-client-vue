import router from '@/application/router';
import { ActionTree } from 'vuex';
import { useRequestWrapper, useToast } from '@/application/store/helpers';
import {
  buildCreateSuperMarketUseCase,
  buildDeleteSuperMarketUseCase,
  buildGetSuperMarketListUseCase,
  buildGetSuperMarketUseCase,
  buildUpdateSuperMarketUseCase,
} from '@/application/factories/usecases/SuperMarketsUseCases';
import { TCreateSuperMarketPort } from '@/domain/supermarkets/usecases/CreateSuperMarket';
import { TUpdateSuperMarketPort } from '@/domain/supermarkets/usecases/UpdateSuperMarket';
import { RootState } from '..';
import { SuperMarketsState } from './state';

const getSuperMarketList = buildGetSuperMarketListUseCase();
const getSuperMarket = buildGetSuperMarketUseCase();
const createSuperMarket = buildCreateSuperMarketUseCase();
const updateSuperMarket = buildUpdateSuperMarketUseCase();
const deleteSuperMarket = buildDeleteSuperMarketUseCase();

export default {
  async fetchSuperMarketsList({ commit }) {
    await useRequestWrapper(commit, async () => {
      const superMarkets = await getSuperMarketList.execute();

      commit('SET_SUPERMARKETS', superMarkets);
    });
  },
  async fetchSuperMarket({ commit }, superMarketId: string) {
    await useRequestWrapper(commit, async () => {
      const superMarket = await getSuperMarket.execute({ id: superMarketId });

      commit('STAGE_SUPERMARKET', superMarket);
    });
  },
  async createSuperMarket({ commit }, payload: TCreateSuperMarketPort) {
    await useRequestWrapper(commit, async () => {
      const newSuperMarket = await createSuperMarket.execute({
        ...payload,
      });

      commit('ADD_SUPERMARKET', newSuperMarket);

      router.push({ name: 'SuperMarkets' });

      useToast({
        message: 'Supermercado adicionado com sucesso!',
        description: `O supermercado ${newSuperMarket.superMarketName} foi adicionado com sucesso.`,
        type: 'success',
      });
    });
  },
  async updateSuperMarket(
    { commit, state, getters },
    payload: TUpdateSuperMarketPort,
  ) {
    await useRequestWrapper(commit, async () => {
      const superMarket = await updateSuperMarket.execute({
        ...payload,
        id: state.stagedSuperMarket!.id,
      });

      commit('UPDATE_SUPERMARKET', {
        index: getters.getSuperMarketIndexById(state.stagedSuperMarket?.id),
        superMarket,
      });

      router.push({ name: 'SuperMarkets' });

      useToast({
        message: 'Supermercado atualizado com sucesso!',
        description: `Os dados do supermercado ${state.stagedSuperMarket?.superMarketName} foram atualizados com sucesso.`,
        type: 'success',
      });
    });
  },
  async removeSuperMarket({ commit, getters }, superMarketId: string) {
    await useRequestWrapper(commit, async () => {
      await deleteSuperMarket.execute({ id: superMarketId });

      commit(
        'REMOVE_SUPERMARKET',
        getters.getSuperMarketIndexById(superMarketId),
      );

      useToast({
        message: 'Supermercado excluído com sucesso!',
        description: `Um supermercado foi removido permanentemente.`,
        type: 'success',
      });
    });
  },
  clearStaged({ commit }) {
    commit('STAGE_SUPERMARKET', null);
  },
} as ActionTree<SuperMarketsState, RootState>;
