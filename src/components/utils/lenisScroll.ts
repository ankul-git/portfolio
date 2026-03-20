import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class LenisSmoother {
  lenis: Lenis;

  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    this.lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Compatibility methods for gsap-trial/ScrollSmoother
  paused(value?: boolean) {
    if (value !== undefined) {
      if (value) {
        this.lenis.stop();
      } else {
        this.lenis.start();
      }
      return this;
    }
    return !this.lenis.options.autoRaf; // Approximate
  }

  scrollTop(value?: number) {
    if (value !== undefined) {
      this.lenis.scrollTo(value, { immediate: true });
      return value;
    }
    return this.lenis.scroll;
  }

  scrollTo(target: any, immediate?: boolean) {
    this.lenis.scrollTo(target, { immediate });
  }

  refresh() {
    // Lenis doesn't need hard refresh usually, but we can call it if needed
  }
}

export const smoother = new LenisSmoother();
