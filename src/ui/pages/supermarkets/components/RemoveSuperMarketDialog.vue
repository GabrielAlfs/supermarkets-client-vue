<template>
  <c-confirm-dialog
    :modelValue="modelValue"
    @update:modelValue="handleClose"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    :title="`Excluir o supermercado ${stagedSuperMarket.superMarketName}`"
    :description="`Tem certeza que você deseja excluir o supermercado
              ${stagedSuperMarket.superMarketName}? Todos os dados desse supermercado serão
              permanentemente removidos. Essa ação não pode ser desfeita.`"
    :loading="loading"
    danger
  />
</template>

<script lang="ts">
import { SuperMarketEntity } from '@/domain/supermarkets/entities/SuperMarket';
import CConfirmDialog from '@/ui/components/base/CConfirmDialog.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'RemoveSuperMarketDialog',
  components: {
    CConfirmDialog,
  },
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  setup(_props, { emit }) {
    const { state, dispatch } = useStore();
    const handleClose = () => {
      emit('update:modelValue', false);
    };

    const handleCancel = () => {
      handleClose();
      setTimeout(() => {
        dispatch('supermarkets/clearStaged');
      }, 1000);
    };

    const handleConfirm = async () => {
      await dispatch(
        'supermarkets/removeSuperMarket',
        state.supermarkets.stagedSuperMarket.id,
      );
      dispatch('supermarkets/clearStaged');
      handleClose();
    };

    return {
      handleClose,
      handleCancel,
      handleConfirm,
      stagedSuperMarket: computed(
        () => (state.supermarkets.stagedSuperMarket as SuperMarketEntity) || {},
      ),
      loading: computed(() => state.supermarkets.loading),
    };
  },
});
</script>
