declare global {
  interface Window {
    vInitialized: boolean;
    initializeVUI: () => void;
    removeModal: (id?: string) => void;
    FloatingUIDOM: any;
  }
}

export interface IAccordionOptions {
  min?: number;
  max?: number | null;
}

export interface IModalOptions {
  id: string;
  size?: 'sm' | 'lg' | 'xl';
  beforeShown?: string;
  imgSrc?: string;
  iframeSrc?: string;
}
export {};
