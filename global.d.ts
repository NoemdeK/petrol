// global.d.ts

import { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  interface JSX {
    // Add your HTML elements here
    // Example:
    // IntrinsicElements: {

    //   // Add more elements as needed
    // }
    IntrinsicElements: {
      div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      [elemName: string]: DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    };
  }
}
