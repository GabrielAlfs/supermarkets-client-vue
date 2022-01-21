import { MutationTree } from 'vuex';
import { SuperMarketsState } from './state';

export default {
  SET_SUPERMARKETS(state, superMarkets) {
    state.superMarkets = superMarkets;
  },
  ADD_SUPERMARKET(state, superMarket) {
    state.superMarkets.unshift(superMarket);
  },
  STAGE_SUPERMARKET(state, superMarket) {
    state.stagedSuperMarket = superMarket;
  },
  UPDATE_SUPERMARKET(state, { index, superMarket }) {
    state.superMarkets[index] = { ...superMarket };
  },
  REMOVE_SUPERMARKET(state, index) {
    state.superMarkets.splice(index, 1);
  },
  SET_LOADING(state, value) {
    state.loading = value;
  },
} as MutationTree<SuperMarketsState>;
