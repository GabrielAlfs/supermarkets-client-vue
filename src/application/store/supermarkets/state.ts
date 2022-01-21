import { SuperMarketEntity } from '@/domain/supermarkets/entities/SuperMarket';

export type SuperMarketsState = {
  superMarkets: Array<SuperMarketEntity>;
  stagedSuperMarket: SuperMarketEntity | null;
  loading: boolean;
};

const state = (): SuperMarketsState => ({
  superMarkets: [],
  stagedSuperMarket: null,
  loading: false,
});

export default state;
