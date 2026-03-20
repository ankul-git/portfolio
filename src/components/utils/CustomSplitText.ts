interface SplitTextOptions {
  type?: string;
  linesClass?: string;
  wordsClass?: string;
  charsClass?: string;
}

export class CustomSplitText {
  elements: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  originalContent: Map<HTMLElement, string> = new Map();

  constructor(
    target: string | string[] | HTMLElement | HTMLElement[] | NodeList,
    options: SplitTextOptions = {}
  ) {
    const { type = "chars,words,lines", linesClass = "", wordsClass = "", charsClass = "" } = options;
    const types = type.split(",").map((t) => t.trim());

    // Resolve target to HTML elements
    if (typeof target === "string") {
      this.elements = Array.from(document.querySelectorAll(target)) as HTMLElement[];
    } else if (Array.isArray(target)) {
      target.forEach((t) => {
        if (typeof t === "string") {
          this.elements.push(...(Array.from(document.querySelectorAll(t)) as HTMLElement[]));
        } else if (t instanceof HTMLElement) {
          this.elements.push(t);
        }
      });
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else if (target instanceof NodeList) {
      this.elements = Array.from(target) as HTMLElement[];
    }

    this.elements.forEach((el) => {
      this.originalContent.set(el, el.innerHTML);
      this.splitElement(el, types, { linesClass, wordsClass, charsClass });
    });
  }

  private splitElement(
    el: HTMLElement,
    types: string[],
    classes: { linesClass: string; wordsClass: string; charsClass: string }
  ) {
    const text = el.textContent || "";
    el.innerHTML = "";

    const words: HTMLElement[] = [];
    const chars: HTMLElement[] = [];

    // Split text into tokens (words and whitespace)
    const tokens = text.split(/(\s+)/);

    tokens.forEach((token) => {
      if (token === "") return;
      
      if (/\s+/.test(token)) {
        // It's whitespace
        el.appendChild(document.createTextNode(token));
        return;
      }

      // It's a word
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      if (classes.wordsClass) wordSpan.className = classes.wordsClass;
      
      if (types.includes("chars")) {
        const charArray = token.split("");
        charArray.forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.style.display = "inline-block";
          charSpan.textContent = char;
          if (classes.charsClass) charSpan.className = classes.charsClass;
          wordSpan.appendChild(charSpan);
          chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = token;
      }

      el.appendChild(wordSpan);
      words.push(wordSpan);
    });

    this.words.push(...words);
    this.chars.push(...chars);

    if (types.includes("lines")) {
      this.splitIntoLines(el, classes.linesClass);
    }
  }

  private splitIntoLines(el: HTMLElement, linesClass: string) {
    const children = Array.from(el.childNodes);
    const lines: (Node | HTMLElement)[][] = [];
    let currentLine: (Node | HTMLElement)[] = [];
    let lastTop = -1;

    // Use a small buffer to handle sub-pixel differences
    const threshold = 5;

    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        const top = child.offsetTop;
        if (lastTop === -1) lastTop = top;

        if (Math.abs(top - lastTop) > threshold) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [child];
          lastTop = top;
        } else {
          currentLine.push(child);
        }
      } else {
        // For text nodes (spaces), append to the current line
        currentLine.push(child);
      }
    });

    if (currentLine.length > 0) lines.push(currentLine);

    el.innerHTML = "";
    this.lines = [];

    lines.forEach((nodes) => {
      const lineSpan = document.createElement("span");
      lineSpan.style.display = "block";
      if (linesClass) lineSpan.className = linesClass;
      
      nodes.forEach((node) => {
        lineSpan.appendChild(node);
      });
      
      el.appendChild(lineSpan);
      this.lines.push(lineSpan);
    });
  }

  revert() {
    this.elements.forEach((el) => {
      const original = this.originalContent.get(el);
      if (original !== undefined) {
        el.innerHTML = original;
      }
    });
  }
}
