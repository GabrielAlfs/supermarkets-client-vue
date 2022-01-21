import { GetterTree } from 'vuex';
import { RootState } from '..';
import { SuperMarketsState } from './state';

export default {
  getSuperMarketIndexById(state) {
    return (id: string) =>
      state.superMarkets.findIndex((each) => each.id === id);
  },
  getSuperMarketById(state) {
    return (id: string) => state.superMarkets.find((each) => each.id === id);
  },
} as GetterTree<SuperMarketsState, RootState>;
