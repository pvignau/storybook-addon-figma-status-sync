/// <reference types="vite/client" />

declare module '*.png?url' {
  const src: string
  export default src
}
