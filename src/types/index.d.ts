export {};

declare global {
  interface Window {
    bootstrap: any;
    Cropper: any;
    mrz_worker: any;
    pdfjsLib: any;
    ZXing: any;
  }
}