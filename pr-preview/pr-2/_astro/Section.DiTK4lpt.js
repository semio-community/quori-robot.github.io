import{j as e}from"./jsx-runtime.D_zvdyIk.js";import"./index.DwQS_Y10.js";import{c as b}from"./NavIconButton.Ch9olFTS.js";import{C as y}from"./CallToActionButton.BUHKXKlC.js";const w={width:"100vw",position:"relative",left:"50%",right:"50%",marginLeft:"-50vw",marginRight:"-50vw"};function S({title:t,description:a,headingTag:s="h1",actions:r,icon:l,img:o,imgAlt:d,imgClassName:i,imgObjectPosition:c,fullBleed:m=!1,fullBleedClassName:h="relative pt-16 md:pt-20 lg:pt-4 mb-8 sm:mb-12"}){const x=e.jsxs("div",{className:"hero-container min-h-[380px] sm:min-h-[420px] md:min-h-[480px] w-full bg-transparent flex items-center justify-center relative overflow-hidden py-16 sm:py-20 md:py-24 pt-24 sm:pt-28 md:pt-32",children:[o?e.jsx("div",{className:"absolute inset-0 -z-10 overflow-hidden pointer-events-none",children:e.jsx("img",{src:o,alt:d||"",className:b("h-full w-full object-cover object-center",i),style:c?{objectPosition:c}:void 0})}):null,e.jsxs("div",{className:"relative px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full pointer-events-none space-y-6 text-center",children:[l?e.jsx("div",{className:"flex justify-center text-accent-base/80",children:l}):null,t?e.jsx(s,{className:"text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground uppercase",children:t}):null,a?e.jsx("p",{className:"text-sm sm:text-base md:text-lg lg:text-xl font-light text-color-600 dark:text-color-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0",children:a}):null,r&&r.length>0?e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:r.map(({label:p,href:n,variant:g="primary",indicatorText:u,ariaLabel:f,target:k,rel:v},j)=>e.jsx(y,{href:n,size:"large",variant:g,indicatorText:typeof u=="number"?u.toString():u,ariaLabel:f,target:k,rel:v,children:p},`${n}-${j}`))}):null]}),e.jsx("style",{children:`
          .glyph-wrapper {
            mask-image:
              linear-gradient(
                to right,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                transparent 0%,
                black 15%,
                black 85%,
                transparent 100%
              );
            mask-size: 100% 100%;
            mask-position: center;
            mask-repeat: no-repeat;
            mask-composite: intersect;

            -webkit-mask-image:
              linear-gradient(
                to right,
                transparent 0%,
                black 10%,
                black 90%,
                transparent 100%
              ),
              linear-gradient(
                to bottom,
                transparent 0%,
                black 15%,
                black 85%,
                transparent 100%
              );
            -webkit-mask-size: 100% 100%;
            -webkit-mask-position: center;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-composite: source-in;
          }

          @supports not (mask-composite: intersect) {
            .glyph-wrapper {
              mask: radial-gradient(
                ellipse 90% 80% at center,
                black 40%,
                transparent 100%
              );
              -webkit-mask: radial-gradient(
                ellipse 90% 80% at center,
                black 40%,
                transparent 100%
              );
            }
          }
        `})]});return m?e.jsx("div",{className:b("w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",h),style:w,children:x}):x}const B=({title:t,subtitle:a,image:s,variant:r="primary",className:l="",id:o,ariaLabel:d,html:i,children:c})=>{const m={primary:"text-accent-two",secondary:"text-accent-one",tertiary:"text-accent-three",default:"text-accent-base"}[r]||"text-accent-base",h={primary:"text-accent-base/70",secondary:"text-accent-base/70",tertiary:"text-accent-base/70",default:"text-accent-base/70"}[r]||"text-accent-base/70",x=s?"":"py-8 sm:py-10",p=s?"py-8 sm:py-10":"",n=o??t;return e.jsxs("div",{className:`${x} ${l}`,id:n,"aria-label":d||t,children:[s&&t?e.jsx("div",{className:"relative w-full h-64 sm:h-80 mb-6 sm:mb-8 rounded-t-lg overflow-hidden",children:e.jsxs("a",{href:`#${n}`,className:"group block w-full h-full",children:[e.jsx("img",{src:s.src,alt:s.alt||t,className:"w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"}),e.jsxs("div",{className:"absolute bottom-0 left-0 p-4 sm:p-6",children:[e.jsxs("h2",{className:`title text-xl sm:text-2xl lg:text-3xl cursor-pointer transition-colors duration-200 relative ${m}`,children:[e.jsx("svg",{className:"absolute -right-6 top-[55%] transform -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})}),t]}),a&&e.jsx("p",{className:"text-base sm:text-lg text-white/90 mt-2",children:a})]})]})}):t?e.jsxs("div",{className:"text-center mb-6 sm:mb-8",children:[e.jsx("a",{href:`#${n}`,className:"group inline-block",children:e.jsxs("h2",{className:`title mb-4 text-lg sm:text-xl cursor-pointer transition-colors duration-200 relative ${m}`,children:[e.jsx("svg",{className:"absolute -left-6 top-[55%] transform -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"})}),t]})}),a&&e.jsx("p",{className:`text-base sm:text-lg ${h}`,children:a})]}):null,i?e.jsx("div",{className:p,dangerouslySetInnerHTML:{__html:i}}):e.jsx("div",{className:p,children:c})]})};export{S as H,B as S};
//# sourceMappingURL=Section.DiTK4lpt.js.map
