/**
 * Critical CSS utility for extracting and inlining above-the-fold CSS
 * This helps improve First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
 * 
 * Using Beasties-style approach but manually curated for React Router SSR
 */

// Critical CSS for above-the-fold content
// This includes ONLY the minimum styles needed to render hero + navigation
export const criticalCSS = `
/* beasties:include start */
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
html,:host{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}
body{margin:0;line-height:inherit}

/* Container */
.container,.max-w-7xl{max-width:80rem;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}

/* Hero section critical */
.relative{position:relative}
.bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}
.from-primary-50{--tw-gradient-from:#f5f1e8 var(--tw-gradient-from-position);--tw-gradient-to:rgb(245 241 232 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}
.to-warm-50{--tw-gradient-to:#f0f7f4 var(--tw-gradient-to-position)}
.py-20{padding-top:5rem;padding-bottom:5rem}
.overflow-hidden{overflow:hidden}

/* Text styles */
.text-4xl,.text-3xl,.text-2xl,.text-xl,.text-lg{font-weight:700;line-height:1.2}
.text-4xl{font-size:2.25rem}
.text-3xl{font-size:1.875rem}
.text-2xl{font-size:1.5rem}
.text-xl{font-size:1.25rem}
.text-lg{font-size:1.125rem}
.text-gray-700{color:#374151}
.text-primary-700{color:#72533a}
.font-bold{font-weight:700}
.italic{font-style:italic}

/* Flexbox */
.flex{display:flex}
.flex-col{flex-direction:column}
.items-center{align-items:center}
.justify-center{justify-content:center}
.gap-4,.gap-6,.gap-8{gap:1rem}
.gap-6{gap:1.5rem}
.gap-8{gap:2rem}

/* Spacing */
.mb-6,.mb-8{margin-bottom:1.5rem}
.mb-8{margin-bottom:2rem}
.mt-8{margin-top:2rem}

/* Button styles */
.inline-flex{display:inline-flex}
.px-8,.px-6{padding-left:2rem;padding-right:2rem}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.py-4,.py-3{padding-top:1rem;padding-bottom:1rem}
.py-3{padding-top:0.75rem;padding-bottom:0.75rem}
.rounded-lg{border-radius:0.5rem}
.bg-primary-600{background-color:#72533a}
.text-white{color:#fff}
.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}

/* Images */
.absolute{position:absolute}
.inset-0{inset:0}
.opacity-30{opacity:0.3}
.w-full{width:100%}
.h-full{height:100%}
.object-cover{object-fit:cover}
/* beasties:include end */
`;

