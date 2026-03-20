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
  options: SplitTextOptions;

  constructor(
    target: string | string[] | HTMLElement | HTMLElement[] | NodeList,
    options: SplitTextOptions = {}
  ) {
    this.options = {
      type: "chars,words,lines",
      linesClass: "",
      wordsClass: "",
      charsClass: "",
      ...options
    };

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
      this.splitElement(el);
    });
  }

  private splitElement(el: HTMLElement) {
    const types = this.options.type?.split(",").map(t => t.trim()) || [];
    
    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (text.trim() === "" && text.length > 0) return; // Keep whitespace but don't split empty

        const fragment = document.createDocumentFragment();
        const tokens = text.split(/(\s+)/);

        tokens.forEach((token) => {
          if (token === "") return;
          if (/\s+/.test(token)) {
            fragment.appendChild(document.createTextNode(token));
            return;
          }

          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          if (this.options.wordsClass) wordSpan.className = this.options.wordsClass;
          
          if (types.includes("chars")) {
            token.split("").forEach((char) => {
              const charSpan = document.createElement("span");
              charSpan.style.display = "inline-block";
              charSpan.textContent = char;
              if (this.options.charsClass) charSpan.className = this.options.charsClass;
              wordSpan.appendChild(charSpan);
              this.chars.push(charSpan);
            });
          } else {
            wordSpan.textContent = token;
          }

          fragment.appendChild(wordSpan);
          this.words.push(wordSpan);
        });

        node.parentNode?.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Don't recurse into our own created spans
        const element = node as HTMLElement;
        if (element.className !== this.options.wordsClass && 
            element.className !== this.options.charsClass && 
            element.className !== this.options.linesClass) {
          Array.from(element.childNodes).forEach(processNode);
        }
      }
    };

    Array.from(el.childNodes).forEach(processNode);

    if (types.includes("lines")) {
      this.splitIntoLines(el);
    }
  }

  private splitIntoLines(el: HTMLElement) {
    const words = this.words.filter(w => el.contains(w));
    if (words.length === 0) return;

    const lines: HTMLElement[][] = [];
    let currentLine: HTMLElement[] = [];
    let lastTop = -1;
    const threshold = 5;

    // Use a temporary flat array of words to determine lines
    words.forEach((word) => {
      const top = word.getBoundingClientRect().top;
      if (lastTop === -1) lastTop = top;

      if (Math.abs(top - lastTop) > threshold) {
        if (currentLine.length > 0) lines.push(currentLine);
        currentLine = [word];
        lastTop = top;
      } else {
        currentLine.push(word);
      }
    });
    if (currentLine.length > 0) lines.push(currentLine);

    // To avoid breaking nested structure, GSAP's SplitText usually flattens the DOM 
    // when splitting into lines. We will do the same if lines are requested.
    // This is the most reliable way to ensure the reveal animations work.
    
    el.innerHTML = "";
    this.lines = [];

    lines.forEach(lineWords => {
      const lineSpan = document.createElement("span");
      lineSpan.style.display = "block";
      if (this.options.linesClass) lineSpan.className = this.options.linesClass;
      
      lineWords.forEach((word, index) => {
        lineSpan.appendChild(word);
        if (index < lineWords.length - 1) {
          lineSpan.appendChild(document.createTextNode(" "));
        }
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
