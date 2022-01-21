<template>
  <div class="mt-12 w-full">
    <form class="bg-gray-50 mx-3 md:mx-6 flex flex-col rounded-lg divide-y">
      <div class="flex items-center justify-between px-5 py-5">
        <div>
          <p class="text-3xl text-gray-800">
            {{ editing ? 'Editar Supermercado' : 'Criar Supermercado' }}
          </p>
          <p class="mt-1 text-sm text-gray-600">
            {{
              editing
                ? 'Informe os dados atualizados desse supermercado.'
                : 'Informe os dados do novo supermercado para criá-lo.'
            }}
          </p>
        </div>
        <span
          @click="$router.push({ name: 'SuperMarkets' })"
          class="cursor-pointer"
        >
          <x-icon class="w-6 h-6 text-gray-500"></x-icon>
        </span>
      </div>
      <div class="flex flex-col sm:flex-row px-5 pt-4 pb-8">
        <p
          class="w-full sm:w-1/3 text-center sm:text-left text-gray-700 mb-3 sm:mt-3"
        >
          Informações Gerais
        </p>
        <div class="w-full sm:w-2/3 grid gap-3 grid-cols-2">
          <c-input
            v-model="currentSuperMarket.name"
            :error="errors.name"
            label="Nome"
            placeholder="Informe o nome do mercado"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.phone"
            :error="errors.phone"
            label="Telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.short_description"
            :error="errors.short_description"
            label="Descrição"
            class="col-span-2"
          ></c-input>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row px-5 pt-4 pb-8">
        <p
          class="w-full sm:w-1/3 text-center sm:text-left text-gray-700 mb-3 sm:mt-3"
        >
          Localização
        </p>
        <div class="w-full sm:w-2/3 grid gap-3 grid-cols-1 md:grid-cols-3">
          <c-input
            v-model="currentSuperMarket.country"
            :error="errors.country"
            label="País"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.state"
            :error="errors.state"
            label="Estado"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.city"
            :error="errors.city"
            label="Cidade"
            placeholder="Informe a cidade"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.zip"
            :error="errors.zip"
            label="CEP"
            v-mask="'#####-###'"
            placeholder="Informe o CEP"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.district"
            :error="errors.district"
            label="Bairro"
            class="md:col-span-2"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.street"
            :error="errors.street"
            label="Rua"
            placeholder="Informe o logradouro"
            class="md:col-span-2"
          ></c-input>
          <c-input
            v-model="currentSuperMarket.number"
            :error="errors.number"
            label="Número"
          ></c-input>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row px-5 pt-4 pb-8">
        <div
          class="w-full sm:w-1/3 text-center sm:text-left text-gray-700 mb-3 sm:mt-3"
        >
          Imagens
        </div>

        <div class="w-full sm:w-2/3 grid gap-3 grid-cols-1">
          <div class="flex gap-x-5">
            <label
              class="text-xs mt-3 font-semibold px-1 text-gray-600 flex flex-col"
            >
              Imagem principal :
              <span
                class="font-normal text-red-500"
                >{{ (errors as any).main_image }}</span
              >
            </label>
            <c-upload-image v-model="mainImage"></c-upload-image>
          </div>
          <div class="flex gap-x-5">
            <label
              class="text-xs mt-3 font-semibold px-1 text-gray-600 flex flex-col"
            >
              Imagens adicionais :
              <span
                class="font-normal text-red-500"
                >{{ (errors as any).main_image }}</span
              >
            </label>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-2 p-1 rounded-md border border-gray-400"
            >
              <c-upload-image
                v-for="(_, index) in additionalImages"
                :key="index"
                smaller
                v-model="additionalImages[index]"
              ></c-upload-image>
              <div
                @click="addSlotAddImages()"
                v-if="additionalImages.length < 10"
                class="w-28 h-28 flex items-center justify-center border-2 border-gray-400 border-dashed rounded-md cursor-pointer"
              >
                <plus-icon class="w-6 h-6 text-gray-500"></plus-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end px-3 py-2">
        <c-button
          :loading="loading"
          class="w-full sm:w-24"
          @click.prevent="handleSave"
          >{{ editing ? 'Salvar' : 'Criar' }}</c-button
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { SuperMarketEntity } from '@/domain/supermarkets/entities/SuperMarket';
import { TCreateSuperMarketPort } from '@/domain/supermarkets/usecases/CreateSuperMarket';
import { TUpdateSuperMarketPort } from '@/domain/supermarkets/usecases/UpdateSuperMarket';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { XIcon, PlusIcon } from '@heroicons/vue/outline';
import { updateSuperMarketSchema } from '@/ui/validators/supermarkets/UpdateSuperMarketSchema';
import { createSuperMarketSchema } from '@/ui/validators/supermarkets/CreateSuperMarketSchema';
import { extractErrors } from '@/ui/validators';
import { ValidationError } from 'yup';

type ImageInputWrapper = {
  file: Blob | null;
  url: string;
  key?: string;
};

export default defineComponent({
  name: 'SaveSuperMarketView',
  components: { XIcon, PlusIcon },
  props: {
    superMarketId: {
      type: String,
    },
  },
  setup(props) {
    const s3BucketUrl = import.meta.env.VITE_S3_BUCKET_URL;

    const { dispatch, state } = useStore();
    const { currentRoute } = useRouter();

    const mainImage = ref<ImageInputWrapper>({
      file: null,
      url: '',
      key: undefined,
    });

    const additionalImages = ref<Array<ImageInputWrapper>>([]);

    const removedAdditionalImages = ref<Array<string>>([]);

    const currentSuperMarket = ref<
      | Omit<TCreateSuperMarketPort, 'main_image' | 'additional_images'>
      | TUpdateSuperMarketPort
    >({
      name: '',
      short_description: '',
      phone: '',
      street: '',
      number: '',
      district: '',
      zip: '',
      country: '',
      city: '',
      state: '',
    });

    const errors = ref<
      | Omit<TCreateSuperMarketPort, 'main_image' | 'additional_images'>
      | TUpdateSuperMarketPort
    >({
      name: '',
      short_description: '',
      phone: '',
      street: '',
      number: '',
      district: '',
      zip: '',
      country: '',
      city: '',
      state: '',
    });

    if (props.superMarketId) {
      dispatch('supermarkets/fetchSuperMarket', props.superMarketId).then(
        () => {
          const {
            superMarketName,
            superMarketMainImage,
            superMarketAdditionalImages,
            superMarketDescription,
            superMarketLocation,
            superMarketPhone,
          } = state.supermarkets.stagedSuperMarket as SuperMarketEntity;
          currentSuperMarket.value = {
            name: superMarketName,
            short_description: superMarketDescription,
            phone: superMarketPhone,
            street: superMarketLocation.street,
            number: superMarketLocation.number,
            district: superMarketLocation.district,
            zip: superMarketLocation.zip,
            country: superMarketLocation.country,
            city: superMarketLocation.city,
            state: superMarketLocation.state,
          };
          mainImage.value = {
            file: null,
            url: s3BucketUrl + superMarketMainImage,
            key: superMarketMainImage,
          };
          additionalImages.value = [
            ...superMarketAdditionalImages.map(
              (imageUrl) =>
                ({
                  file: null,
                  url: s3BucketUrl + imageUrl,
                  key: imageUrl,
                } as ImageInputWrapper),
            ),
          ];
        },
      );
    }

    const editing = computed(
      () => currentRoute.value.name !== 'NewSuperMarket',
    );

    const handleSave = async () => {
      try {
        const payload:
          | (TCreateSuperMarketPort & {
              removed_additional_images?: Array<string>;
            })
          | TUpdateSuperMarketPort = editing.value
          ? ({
              ...currentSuperMarket.value,
            } as TUpdateSuperMarketPort)
          : ({
              ...currentSuperMarket.value,
            } as TCreateSuperMarketPort);

        if (mainImage.value.file) {
          payload.main_image = mainImage.value.file;
        }

        if (additionalImages.value.length) {
          payload.additional_images = [
            ...(additionalImages.value
              .map((addImages) => addImages.file)
              .filter((addImages) => addImages) as Array<Blob>),
          ];
        }

        if (editing.value && additionalImages.value.length) {
          removedAdditionalImages.value = [
            ...(additionalImages.value
              .filter((addImage) => addImage.file === null && addImage.key)
              .map((addImage) => addImage.key) as Array<string>),
          ];

          payload.removed_additional_images = [
            ...removedAdditionalImages.value,
          ];
        }

        await (editing.value
          ? updateSuperMarketSchema
          : createSuperMarketSchema
        ).validate(payload, { abortEarly: false });

        await dispatch(
          editing.value
            ? 'supermarkets/updateSuperMarket'
            : 'supermarkets/createSuperMarket',
          payload,
        );
      } catch (e) {
        if (e instanceof ValidationError) {
          errors.value = { ...extractErrors(e) } as
            | Omit<TCreateSuperMarketPort, 'main_image' | 'additional_images'>
            | TUpdateSuperMarketPort;
        }
        throw e;
      }
    };

    const addSlotAddImages = () => {
      additionalImages.value.push({ file: null, url: '' });
    };

    return {
      addSlotAddImages,
      mainImage,
      additionalImages,
      currentSuperMarket,
      errors,
      editing,
      loading: computed(() => state.supermarkets.loading),
      handleSave,
    };
  },
});
</script>
