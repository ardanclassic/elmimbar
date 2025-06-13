// custom.d.ts atau modules.d.ts

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

// Tambahkan untuk format video lain jika diperlukan
// declare module '*.ogg' {
//   const src: string;
//   export default src;
// }
