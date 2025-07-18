// types/dom-to-image.d.ts
// Crie este arquivo na pasta src/types/ do seu projeto

declare module "dom-to-image-more" {
  export interface Options {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: { [key: string]: string };
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  export function toBlob(node: Node, options?: Options): Promise<Blob>;
  export function toPng(node: Node, options?: Options): Promise<string>;
  export function toPixelData(
    node: Node,
    options?: Options
  ): Promise<Uint8ClampedArray>;
  export function toJpeg(node: Node, options?: Options): Promise<string>;
  export function toSvg(node: Node, options?: Options): Promise<string>;
}

declare module "dom-to-image" {
  export interface Options {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: { [key: string]: string };
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  export function toBlob(node: Node, options?: Options): Promise<Blob>;
  export function toPng(node: Node, options?: Options): Promise<string>;
  export function toPixelData(
    node: Node,
    options?: Options
  ): Promise<Uint8ClampedArray>;
  export function toJpeg(node: Node, options?: Options): Promise<string>;
  export function toSvg(node: Node, options?: Options): Promise<string>;
}
