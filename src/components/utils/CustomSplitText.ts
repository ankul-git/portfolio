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
    const children = Array.from(el.childNodes);
    el.innerHTML = "";

    children.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        this.splitTextNode(el, node as Text, types, classes);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const clonedElement = node.cloneNode(false) as HTMLElement;
        el.appendChild(clonedElement);
        this.splitElement(clonedElement, types, classes);
      }
    });

    if (types.includes("lines") && el === this.elements.find(e => e === el)) { // Only top-level for lines
      this.splitIntoLines(el, classes.linesClass);
    }
  }

  private splitTextNode(
    parent: HTMLElement,
    node: Text,
    types: string[],
    classes: { linesClass: string; wordsClass: string; charsClass: string }
  ) {
    const text = node.textContent || "";
    const tokens = text.split(/(\s+)/);

    tokens.forEach((token) => {
      if (token === "") return;
      
      if (/\s+/.test(token)) {
        parent.appendChild(document.createTextNode(token));
        return;
      }

      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      if (classes.wordsClass) wordSpan.className = classes.wordsClass;
      
      if (types.includes("chars")) {
        token.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.style.display = "inline-block";
          charSpan.textContent = char;
          if (classes.charsClass) charSpan.className = classes.charsClass;
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = token;
      }

      parent.appendChild(wordSpan);
      this.words.push(wordSpan);
    });
  }

  private splitIntoLines(el: HTMLElement, linesClass: string) {
    const children = Array.from(el.childNodes);
    const lines: (Node | HTMLElement)[][] = [];
    let currentLine: (Node | HTMLElement)[] = [];
    let lastTop = -1;
    const threshold = 5;

    children.forEach((child) => {
      let forceNewLine = false;
      let top = -1;

      if (child instanceof HTMLElement) {
        const rect = child.getBoundingClientRect();
        top = rect.top;
        
        // Force new line for block elements or BR
        const style = window.getComputedStyle(child);
        if (style.display === "block" || style.display === "flex" || child.tagName === "BR" || child.tagName === "DIV") {
          forceNewLine = true;
        }

        if (lastTop === -1) lastTop = top;

        if (forceNewLine || Math.abs(top - lastTop) > threshold) {
          if (currentLine.length > 0) lines.push(currentLine);
          currentLine = [child];
          lastTop = top;
        } else {
          currentLine.push(child);
        }
      } else {
        // Text nodes (whitespace)
        currentLine.push(child);
      }
    });

    if (currentLine.length > 0) lines.push(currentLine);

    el.innerHTML = "";
    this.lines = [];

    lines.forEach((nodes) => {
      if (nodes.length === 0) return;
      
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
