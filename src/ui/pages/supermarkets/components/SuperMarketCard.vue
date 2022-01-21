<template>
  <section
    class="bg-gray-50 rounded-xl shadow-md overflow-hidden divide-y w-full"
  >
    <div class="flex items-center h-44 min-h-max gap-x-2">
      <figure class="w-44 h-full min-w-max relative">
        <div class="bg-slate-200 animate-pulse w-44 h-full"></div>
        <img
          class="w-44 h-full object-cover inset-0 absolute"
          :src="`${s3BucketUrl}${superMarket.superMarketMainImage}`"
        />
      </figure>
      <div
        class="flex flex-col h-full justify-between py-1 px-3 min-w-0 gap-y-1 grow"
      >
        <p
          class="text-sky-900 uppercase font-medium pt-2 text-sm sm:text-base pl-1"
        >
          {{ superMarket.superMarketName }}
        </p>
        <p class="text-gray-700 min-w-0 truncate text-sm">
          {{
            superMarket.superMarketDescription
              ? superMarket.superMarketDescription
              : 'Descrição não informada...'
          }}
        </p>
        <div class="flex flex-col justify-center gap-y-3 grow">
          <div class="flex items-center gap-x-2">
            <location-marker-icon
              class="w-4 h-4 text-gray-500"
            ></location-marker-icon>
            <p class="text-sm text-gray-700 font-light truncate min-w-0">
              {{ superMarket.superMarketLocation.street }}, Nº
              {{ superMarket.superMarketLocation.number }},
              {{ superMarket.superMarketLocation.district }}.
            </p>
          </div>
          <div class="flex items-center gap-x-2 text-sm">
            <phone-icon class="w-4 h-4 text-gray-500"></phone-icon>
            <p class="text-gray-700">
              {{ superMarket.superMarketPhone }}
            </p>
          </div>
        </div>
        <p class="text-xs text-gray-600 self-end">
          {{ superMarket.superMarketLocation.city }} -
          {{ superMarket.superMarketLocation.state }},
          {{ superMarket.superMarketLocation.country }}
        </p>
      </div>
    </div>
    <div class="flex divide-x divide-gray-200 bg-gray-100">
      <div
        class="hover:bg-gray-200 group cursor-pointer flex gap-3 py-3 px-2 items-center justify-center w-full"
        v-for="(action, index) in actions"
        :key="index"
        @click="action.onClick(superMarket.id)"
      >
        <component
          :is="action.icon"
          class="w-5 h-5 min-w-max text-gray-500 group-hover:text-sky-700"
        />
        <span
          class="text-gray-600 text-xs group-hover:text-sky-700 font-medium truncate hidden md:block"
        >
          {{ action.label }}
        </span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SuperMarketEntity } from '@/domain/supermarkets/entities/SuperMarket';
import {
  LocationMarkerIcon,
  PhoneIcon,
  InformationCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/vue/outline';

export default defineComponent({
  name: 'SuperMarketCard',
  components: { LocationMarkerIcon, PhoneIcon },
  emits: ['detail', 'edit', 'delete'],
  props: {
    superMarket: {
      type: Object as PropType<SuperMarketEntity>,
      required: true,
    },
  },
  setup(_props, { emit }) {
    return {
      s3BucketUrl: import.meta.env.VITE_S3_BUCKET_URL,
      actions: [
        {
          icon: InformationCircleIcon,
          onClick: (id: string) => emit('detail', { id }),
          label: 'Detalhes',
        },
        {
          icon: PencilAltIcon,
          onClick: (id: string) => emit('edit', { id }),
          label: 'Editar',
        },
        {
          icon: TrashIcon,
          onClick: (id: string) => emit('delete', { id }),
          label: 'Excluir',
        },
      ],
    };
  },
});
</script>
