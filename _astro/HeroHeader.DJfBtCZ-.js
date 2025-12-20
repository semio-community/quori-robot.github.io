import{j as e}from"./jsx-runtime.D_zvdyIk.js";import"./index.CC6F48bw.js";import{c as p}from"./clsx.D-yZXX6k.js";import{C as j}from"./CallToActionButton.BkJczro4.js";const y={width:"100vw",position:"relative",left:"50%",right:"50%",marginLeft:"-50vw",marginRight:"-50vw"};function B({title:r,description:s,headingTag:c="h1",actions:t,icon:l,img:n,imgAlt:x,imgClassName:d,imgObjectPosition:i,fullBleed:g=!1,fullBleedClassName:k="relative pt-16 md:pt-20 lg:pt-4 mb-8 sm:mb-12"}){const m=e.jsxs("div",{className:"hero-container min-h-[380px] sm:min-h-[420px] md:min-h-[480px] w-full bg-transparent flex items-center justify-center relative overflow-hidden py-16 sm:py-20 md:py-24 pt-24 sm:pt-28 md:pt-32",children:[n?e.jsx("div",{className:"absolute inset-0 -z-10 overflow-hidden pointer-events-none",children:e.jsx("img",{src:n,alt:x||"",className:p("h-full w-full object-cover object-center",d),style:i?{objectPosition:i}:void 0})}):null,e.jsxs("div",{className:"relative px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full pointer-events-none space-y-6 text-center",children:[l?e.jsx("div",{className:"flex justify-center text-accent-base/80",children:l}):null,r?e.jsx(c,{className:"text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground uppercase",children:r}):null,s?e.jsx("p",{className:"text-sm sm:text-base md:text-lg lg:text-xl font-light text-color-600 dark:text-color-400 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0",children:s}):null,t&&t.length>0?e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:t.map(({label:h,href:o,variant:b="primary",indicatorText:a,ariaLabel:u,target:f,rel:w},v)=>e.jsx(j,{href:o,size:"large",variant:b,indicatorText:typeof a=="number"?a.toString():a,ariaLabel:u,target:f,rel:w,children:h},`${o}-${v}`))}):null]}),e.jsx("style",{children:`
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
        `})]});return g?e.jsx("div",{className:p("w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",k),style:y,children:m}):m}export{B as H};
//# sourceMappingURL=HeroHeader.DJfBtCZ-.js.map
