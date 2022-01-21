<template>
  <div class="w-full">
    <div
      class="flex flex-col sm:flex-row justify-between items-center my-6 border-b border-transparent sm:border-gray-300 px-3"
    >
      <p class="text-4xl text-white font-light py-3">Supermercados</p>
      <button
        @click="handleCreate"
        class="bg-sky-700 border-sky-800 border rounded-lg px-4 py-2 text-sky-100 hover:text-sky-50 font-medium uppercase text-sm hover:bg-sky-600 transition duration-200 ease-in-out"
      >
        Adicionar Supermercado
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-3 mb-3">
      <super-market-card
        v-for="(superMarket, index) in superMarkets"
        :key="index"
        :superMarket="superMarket"
        @detail="handleDetail"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
  <remove-super-market-dialog v-model="dialogs.delete" />
  <detail-super-market-dialog v-model="dialogs.detail" />
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import SuperMarketCard from './components/SuperMarketCard.vue';
import RemoveSuperMarketDialog from './components/RemoveSuperMarketDialog.vue';
import DetailSuperMarketDialog from './components/DetailSuperMarketDialog.vue';

export default defineComponent({
  name: 'SuperMarketsView',
  components: {
    SuperMarketCard,
    RemoveSuperMarketDialog,
    DetailSuperMarketDialog,
  },
  setup() {
    const { state, commit, getters, dispatch } = useStore();
    const { push } = useRouter();

    const dialogs = reactive({
      delete: false,
      detail: false,
    });

    dispatch('supermarkets/clearStaged');
    dispatch('supermarkets/fetchSuperMarketsList');

    const handleDetail = ({ id }: { id: string }) => {
      dialogs.detail = true;
      commit(
        'supermarkets/STAGE_SUPERMARKET',
        getters['supermarkets/getSuperMarketById'](id),
      );
    };

    const handleEdit = ({ id }: { id: string }) => {
      push({ name: 'EditSuperMarket', params: { superMarketId: id } });
    };

    const handleDelete = ({ id }: { id: string }) => {
      dialogs.delete = true;
      commit(
        'supermarkets/STAGE_SUPERMARKET',
        getters['supermarkets/getSuperMarketById'](id),
      );
    };

    const handleCreate = () => {
      push({ name: 'NewSuperMarket' });
    };

    return {
      handleCreate,
      handleDetail,
      handleEdit,
      handleDelete,
      dialogs,
      superMarkets: computed(() => state.supermarkets.superMarkets),
      loading: computed(() => state.technicians.loading),
    };
  },
});
</script>
