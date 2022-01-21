<template>
  <div class="fixed top-0 right-0 mt-14 z-30">
    <transition name="toast">
      <div
        v-if="toast.show"
        class="text-gray-700 p-2 mr-14 ml-24 rounded-lg text-sm border border-gray-300 bg-white flex"
      >
        <div class="mr-2 p-1">
          <information-circle-icon
            v-show="toast.type == 'info'"
            class="text-blue-500 h-5 w-5"
          />
          <check-circle-icon
            v-show="toast.type == 'success'"
            class="text-green-600 h-5 w-5"
          />
          <exclamation-circle-icon
            v-show="toast.type == 'error'"
            class="text-red-600 h-5 w-5"
          />
        </div>
        <div class="flex flex-col">
          <div class="font-medium">{{ toast.message }}</div>
          <div
            v-show="toast.description"
            class="text-gray-600 text-xs font-light uppercase"
          >
            {{ toast.description }}
          </div>
        </div>
        <div class="ml-0 sm:ml-8 p-1" @click="closeToast">
          <x-icon class="h-5 w-5 hover:bg-gray-100 cursor-pointer rounded-md" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  XIcon,
} from '@heroicons/vue/outline';

export default defineComponent({
  name: 'ToastComponent',
  components: {
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    XIcon,
  },
  setup() {
    const store = useStore();

    return {
      toast: computed(() => store.state.ui.toast),
      closeToast: () => store.dispatch('ui/resetToast'),
    };
  },
});
</script>

<style lang="postcss" scoped>
.toast-enter-active,
.toast-leave-active {
  @apply transition duration-500 ease-in-out;
}

.toast-enter-from {
  @apply transform -translate-y-32;
}

.toast-leave-to {
  @apply transform -translate-y-32;
}
</style>
