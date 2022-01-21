import { createApp, Directive } from 'vue';
import { mask } from 'vue-the-mask';
import '@/ui/assets/index.css';
import App from '@/ui/App.vue';
import router from '@/application/router';
import store from '@/application/store';
import CInput from '@/ui/components/forms/CInput.vue';
import CButton from '@/ui/components/forms/CButton.vue';
import CUploadImage from '@/ui/components/forms/CUploadImage.vue';

createApp(App)
  .component('c-input', CInput)
  .component('c-button', CButton)
  .component('c-upload-image', CUploadImage)
  .directive('mask', mask as Directive)
  .use(store)
  .use(router)
  .mount('#app');
