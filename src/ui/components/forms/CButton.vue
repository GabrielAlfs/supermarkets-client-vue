<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    class="CButton__button"
    :class="{
      [`${textColor} ${border}`]: true,
      'cursor-not-allowed': disabled,
      'bg-red-700 hover:bg-red-600': danger && !outlined,
      'bg-sky-700 hover:bg-sky-600': !danger && !outlined,
    }"
  >
    <c-loading class="mx-auto w-6 h-6" v-show="loading" />
    <div v-show="!loading">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CLoading from '@/ui/components/base/CLoading.vue';

export default defineComponent({
  name: 'CButton',
  components: {
    CLoading,
  },
  props: {
    type: String,
    loading: {
      type: Boolean,
      default: false,
    },
    textColor: {
      type: String,
      default: 'text-white',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    border: {
      type: String,
      default: 'border-transparent',
    },
    disabled: {
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss" scoped>
.CButton__button {
  @apply px-4
    py-2
    border
    rounded-md
    transition-colors
    text-sm
    font-medium;
}
</style>
