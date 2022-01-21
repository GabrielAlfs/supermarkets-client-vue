<template>
  <c-dialog :modelValue="modelValue" @update:modelValue="handleClose">
    <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div
          :class="`
            mx-auto
            flex-shrink-0 flex
            items-center
            justify-center
            h-12
            w-12
            rounded-full
            ${danger ? 'bg-red-100' : 'bg-sky-100'}
            sm:mx-0 sm:h-10 sm:w-10
          `"
        >
          <div
            :class="`h-6 w-6
            ${danger ? 'text-red-600' : 'text-sky-600'}`"
            aria-hidden="true"
          >
            <slot>
              <exclamation-circle-icon />
            </slot>
          </div>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ title }}
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <c-button
        @click="handleConfirm"
        class="confirmDialog__button"
        :danger="danger"
        border="border-transparent"
        :loading="loading"
        >Confirmar</c-button
      >
      <c-button
        @click="handleCancel"
        class="confirmDialog__button focus:ring-gray-400"
        border="border-gray-400"
        outlined
        textColor="text-gray-700"
        color="gray"
        >Cancelar</c-button
      >
    </template>
  </c-dialog>
</template>
<script lang="ts">
import CDialog from '@/ui/components/base/CDialog.vue';
import { defineComponent } from 'vue';
import { ExclamationCircleIcon } from '@heroicons/vue/outline';

export default defineComponent({
  name: 'CConfirmDialog',
  components: {
    CDialog,
    ExclamationCircleIcon,
  },
  emits: ['update:modelValue', 'cancel', 'confirm'],
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    danger: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
    },
  },
  setup(_props, { emit }) {
    const handleClose = () => {
      emit('update:modelValue', false);
    };

    const handleCancel = () => {
      emit('cancel');
    };

    const handleConfirm = async () => {
      emit('confirm');
    };

    return {
      handleClose,
      handleCancel,
      handleConfirm,
    };
  },
});
</script>

<style lang="postcss" scoped>
.confirmDialog__button {
  @apply w-full
    mt-3
    sm:ml-3
    sm:w-auto
    inline-flex
    justify-center
    border
    text-base
    font-medium
    focus:outline-none focus:ring-1 focus:ring-offset-1;
}
</style>
