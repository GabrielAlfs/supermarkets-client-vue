<template>
  <div
    @click="($refs as any).fileInput.click()"
    :class="`${smaller ? 'w-28 h-28 py-8' : 'w-48 h-48 py-16'}`"
    class="relative rounded text-center border-dashed border-2 text-gray-500 border-gray-400 cursor-pointer"
  >
    <photograph-icon
      :class="`${smaller ? 'w-6 h-6' : 'w-10 h-10'} mx-auto`"
    ></photograph-icon>
    <div :class="`${smaller ? 'py-2 px-5 text-xs' : 'py-4 text-sm'}`">
      Carregar imagem
    </div>
    <img
      v-if="imageFile || imageUrl"
      :src="imageUrl"
      class="absolute rounded-md object-cover inset-0 w-full h-full"
    />
    <div
      v-if="imageFile || imageUrl"
      class="bg-black bg-opacity-30 rounded-full p-0.5 absolute top-2 right-2 cursor-pointer"
      @click.stop="removeImage()"
    >
      <trash-icon class="w-5 h-5 text-white" />
    </div>
  </div>
  <input
    type="file"
    v-show="false"
    ref="fileInput"
    @change="verifyBeforeFileChange"
  />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { PhotographIcon, TrashIcon } from '@heroicons/vue/outline';

export default defineComponent({
  name: 'CUploadImage',
  components: {
    PhotographIcon,
    TrashIcon,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => ({
        url: '',
        file: null,
      }),
    },
    smaller: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const imageFile = computed({
      get: () => props.modelValue.file,
      set: (value: Blob | null) =>
        emit('update:modelValue', {
          ...props.modelValue,
          url: props.modelValue.url,
          file: value,
        }),
    });
    const imageUrl = computed({
      get: () => props.modelValue.url,
      set: (value: string) =>
        emit('update:modelValue', {
          ...props.modelValue,
          url: value,
          file: props.modelValue.file,
        }),
    });

    const oldImg = ref<Blob | null>(props.modelValue.file || null);
    const oldImgUrl = ref('');

    const fileChange = (file: Blob) => {
      const fr = new FileReader();
      fr.onload = () => {
        oldImg.value = file;
        oldImgUrl.value = fr.result as string;
        emit('update:modelValue', {
          ...props.modelValue,
          url: fr.result as string,
          file,
        });
      };
      fr.readAsDataURL(file);
    };
    const verifyBeforeFileChange = (event: any) => {
      const [file] = event.target.files;
      if (!file) {
        imageFile.value = oldImg.value;
        return;
      }
      fileChange(file);
    };

    const removeImage = () => {
      oldImg.value = null;
      oldImgUrl.value = '';
      emit('update:modelValue', {
        ...props.modelValue,
        url: '',
        file: null,
      });
    };

    return {
      removeImage,
      imageFile,
      imageUrl,
      verifyBeforeFileChange,
    };
  },
});
</script>
