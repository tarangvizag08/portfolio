/**
 * The React Bits components are vendored as untyped .jsx. With `allowJs` on,
 * TypeScript infers their prop types from the destructuring defaults — which
 * makes every prop that has no default (`onClick`, `fontUrl`,
 * `onLetterAnimationComplete`, ...) *required*, and types `frontImage = null`
 * as `null` rather than `string | null`.
 *
 * Rather than pass a pile of meaningless props at every call site, declare the
 * modules loosely here and leave `allowJs` off. Turbopack still bundles the
 * .jsx files at build time — module resolution in the bundler doesn't consult
 * tsconfig. If one of these ever grows real types, delete its line below.
 */

type ReactBitsProps = {
  children?: import('react').ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
};

type ReactBitsComponent = import('react').ComponentType<ReactBitsProps>;

declare module '@/components/reactbits/SplitText' {
  const SplitText: ReactBitsComponent;
  export default SplitText;
}

declare module '@/components/reactbits/ShinyText' {
  const ShinyText: ReactBitsComponent;
  export default ShinyText;
}

declare module '@/components/reactbits/SpotlightCard' {
  const SpotlightCard: ReactBitsComponent;
  export default SpotlightCard;
}

declare module '@/components/reactbits/CountUp' {
  const CountUp: ReactBitsComponent;
  export default CountUp;
}

declare module '@/components/reactbits/Aurora' {
  const Aurora: ReactBitsComponent;
  export default Aurora;
}

declare module '@/components/reactbits/Masonry' {
  const Masonry: ReactBitsComponent;
  export default Masonry;
}

declare module '@/components/reactbits/AccordionGallery' {
  const AccordionGallery: ReactBitsComponent;
  export default AccordionGallery;
}

declare module '@/components/reactbits/InfiniteSpiral' {
  const InfiniteSpiral: ReactBitsComponent;
  export default InfiniteSpiral;
}

declare module '@/components/reactbits/CircularGallery' {
  const CircularGallery: ReactBitsComponent;
  export default CircularGallery;
}

declare module '@/components/reactbits/SpecularButton' {
  const SpecularButton: ReactBitsComponent;
  export default SpecularButton;
}

declare module '@/components/reactbits/Lanyard' {
  const Lanyard: ReactBitsComponent;
  export default Lanyard;
}

declare module '@/components/reactbits/MagicBento' {
  const MagicBento: ReactBitsComponent;
  export default MagicBento;
}

declare module '@/components/reactbits/BorderGlow' {
  const BorderGlow: ReactBitsComponent;
  export default BorderGlow;
}

declare module '@/components/reactbits/Dock' {
  const Dock: ReactBitsComponent;
  export default Dock;
}

declare module '@/components/reactbits/Galaxy' {
  const Galaxy: ReactBitsComponent;
  export default Galaxy;
}

declare module '@/components/reactbits/LineSidebar' {
  const LineSidebar: ReactBitsComponent;
  export default LineSidebar;
}

declare module '@/components/reactbits/AeroShards' {
  const AeroShards: ReactBitsComponent;
  export default AeroShards;
}

declare module '@/components/reactbits/ScrollFloat' {
  const ScrollFloat: ReactBitsComponent;
  export default ScrollFloat;
}

declare module '@/components/reactbits/ScrollReveal' {
  const ScrollReveal: ReactBitsComponent;
  export default ScrollReveal;
}

declare module '@/components/reactbits/GradualBlur' {
  const GradualBlur: ReactBitsComponent;
  export default GradualBlur;
}
