<template>
  <c-dialog :modelValue="modelValue" @update:modelValue="handleClose">
    <figure class="relative">
      <img
        :src="`${s3BucketUrl}${stagedSuperMarket.superMarketMainImage}`"
        class="w-full h-32 object-cover"
      />
      <div
        class="w-full h-32 inset-0 absolute bg-gradient-to-t from-black to-transparent opacity-50"
      ></div>
      <p class="absolute bottom-3 left-7 text-white text-xl font-semibold">
        {{ stagedSuperMarket.superMarketName }}
      </p>
      <div
        @click="handleClose"
        class="absolute top-2 right-2 bg-white rounded-full p-1 bg-opacity-30 hover:bg-opacity-60 cursor-pointer"
      >
        <x-icon class="w-6 h-6 text-gray-900"></x-icon>
      </div>
    </figure>
    <div class="flex flex-col gap-y-3 px-5 py-2">
      <p class="text-gray-600 text-lg">
        {{
          stagedSuperMarket.superMarketDescription ||
          'Mercado sem descrição informada...'
        }}
      </p>
      <div
        class="grid grid-cols-2 sm:grid-cols-4 justify-items-center md:grid-cols-5 gap-y-2 gap-x-3"
      >
        <figure
          v-for="(
            addImage, index
          ) in stagedSuperMarket.superMarketAdditionalImages"
          :key="index"
          class="w-32 h-32 bg-gray-200 border rounded-md border-gray-400 p-0.5"
        >
          <img
            class="w-full h-full object-cover rounded-md"
            :src="`${s3BucketUrl}${addImage}`"
          />
        </figure>
      </div>
      <dl class="">
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Telefone de contato</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedSuperMarket.superMarketPhone }}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">CEP</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedSuperMarket.superMarketLocation.zip }}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Endereço</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedSuperMarket.superMarketLocation.street }}, Nº
            {{ stagedSuperMarket.superMarketLocation.number }}, Bairro
            {{ stagedSuperMarket.superMarketLocation.district }}.
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Cidade</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedSuperMarket.superMarketLocation.city }}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Estado</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedSuperMarket.superMarketLocation.state }}
          </dd>
        </div>
        <div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">País</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ stagedSuperMarket.superMarketLocation.country }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="border-t border-gray-200 -mb-5">
      <dl class="text-xs">
        <div class="px-4 py-1 flex flex-wrap items-center justify-end gap-x-3">
          <dt class="font-medium text-gray-500">Data do cadastro :</dt>
          <dd class="text-gray-600 col-span-2">
            {{ new Date(stagedSuperMarket.createdAt).toLocaleString() }}
          </dd>
        </div>
        <div class="px-4 py-1 flex flex-wrap items-center justify-end gap-x-3">
          <dt class="font-medium text-gray-500">Data da última edição :</dt>
          <dd class="text-gray-600 col-span-2">
            {{ new Date(stagedSuperMarket.updatedAt).toLocaleString() }}
          </dd>
        </div>
      </dl>
    </div>
  </c-dialog>
</template>

<script lang="ts">
import { SuperMarketEntity } from '@/domain/supermarkets/entities/SuperMarket';
import CDialog from '@/ui/components/base/CDialog.vue';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { XIcon } from '@heroicons/vue/outline';

export default defineComponent({
  name: 'DetailSuperMarketDialog',
  components: { CDialog, XIcon },
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  setup(_props, { emit }) {
    const { state } = useStore();
    const handleClose = () => {
      emit('update:modelValue', false);
    };

    return {
      handleClose,
      s3BucketUrl: import.meta.env.VITE_S3_BUCKET_URL,
      stagedSuperMarket: computed(
        () => (state.supermarkets.stagedSuperMarket as SuperMarketEntity) || {},
      ),
    };
  },
});
</script>
