export type UIState = {
  toast: {
    show: boolean;
    type: 'success' | 'info' | 'error';
    message: string | null;
    description: string | null;
  };
};

const state = (): UIState => ({
  toast: {
    show: false,
    type: 'info',
    message: null,
    description: null,
  },
});

export default state;
