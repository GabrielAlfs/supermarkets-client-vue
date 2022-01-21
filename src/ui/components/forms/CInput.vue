<template>
  <div class="text-gray-600">
    <label
      v-show="!hideLabel"
      :for="componentLabelName"
      class="text-xs font-semibold px-1"
      >{{ label }}</label
    >
    <div class="flex items-center">
      <div
        class="pl-2 pointer-events-none z-10 text-gray-400"
        v-if="hasDefaultSlot"
      >
        <slot></slot>
      </div>
      <input
        min="0"
        step="1"
        :type="type"
        :required="required"
        :id="uid"
        :name="componentLabelName"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder || `Informe o ${label.toLowerCase()}`"
        :disabled="disabled"
        class="w-full px-3 py-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-300 block border shadow-sm sm:text-sm border-gray-300 rounded-md"
        :class="{
          'border-red-300': error,
          'text-gray-500 cursor-not-allowed bg-gray-100': disabled,
          '-ml-7 pl-9': hasDefaultSlot,
        }"
      />
    </div>
    <p v-show="error" class="text-xs text-red-500 px-2 py-1">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  name: 'CInput',
  props: {
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: () => 'input',
    },
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    hideLabel: {
      type: Boolean,
    },
    error: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const uid = `${getCurrentInstance()?.uid}`;

    const updateValue = (event: Event) => {
      const { value } = event.target as HTMLInputElement;
      emit('update:modelValue', value);
    };

    const hasDefaultSlot = computed(() => slots.default);

    return {
      updateValue,
      hasDefaultSlot,
      componentLabelName: computed(() =>
        props.label.toLowerCase().split(' ').join('-'),
      ),
      uid,
    };
  },
});
</script>

<style></style>
