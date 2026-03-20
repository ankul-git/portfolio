declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(
      target: string | string[] | Element | Element[] | NodeList,
      vars?: {
        type?: string;
        charsClass?: string;
        wordsClass?: string;
        linesClass?: string;
        wordDelimiter?: string;
        lineThreshold?: number;
        position?: string;
        special?: object;
        reduceWhiteSpace?: boolean;
        autoSplit?: boolean;
        onSplit?: (self: SplitText) => void;
        [key: string]: unknown;
      }
    );
    split(vars?: object): SplitText;
    revert(): void;
  }
}