const fs = require('fs');
let content = fs.readFileSync('/index.html', 'utf8');

const cssStart = content.indexOf('/* --- NEON SNAKE SCOPED CSS --- */');
const cssEnd = content.indexOf('</style>');
const newCss = `/* --- SCROLLING CAROUSEL CSS --- */
      :root {
        --total-items: 9;
        --animation-duration: 30s;
      }
      .scrolling-container {
        width: 100%;
        max-width: 1536px;
        position: relative;
        height: 150px;
        overflow: hidden;
        mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
        -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
      }
      .scrolling-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @keyframes scrollleft {
        to { left: -250px; }
      }
      .scrolling-item {
        width: 250px;
        height: 100%;
        background-color: #bababa;
        border-radius: 6px;
        position: absolute;
        overflow: hidden;
        left: max(calc(250px * var(--total-items)), 100%);
        animation-name: scrollleft;
        animation-duration: var(--animation-duration);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
      .scrolling-item1 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 1) * -1); }
      .scrolling-item2 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 2) * -1); }
      .scrolling-item3 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 3) * -1); }
      .scrolling-item4 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 4) * -1); }
      .scrolling-item5 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 5) * -1); }
      .scrolling-item6 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 6) * -1); }
      .scrolling-item7 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 7) * -1); }
      .scrolling-item8 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 8) * -1); }
      .scrolling-item9 { animation-delay: calc(var(--animation-duration) / var(--total-items) * (var(--total-items) - 9) * -1); }
    `;
content = content.substring(0, cssStart) + newCss + content.substring(cssEnd);

const compStart = content.indexOf('const SnakeGame = () => {');
const compEnd = content.indexOf('const Footer = ({ content }) => (');

const newComp = `const OurGame = ({ content, openLightbox }) => {
        const images = [
          "https://pbs.twimg.com/media/HC-NUD0WQAAAPh8?format=jpg&name=large",
          "https://pbs.twimg.com/media/HC-NU0IWYAEdnDQ?format=jpg&name=large",
          "https://pbs.twimg.com/media/HC-NV1xXwAAmV5J?format=jpg&name=large"
        ];

        return (
          <section id="game" className="py-24 relative overflow-hidden border-t border-stone-900">
            <div className="absolute inset-0 bg-stone-950/70 z-[-1]"></div>
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-100 mb-4 tracking-wider">{content.game.title}</h2>
                <div className="w-24 h-1 bg-amber-700 mx-auto rounded-full mb-4"></div>
                <p className="font-heading text-amber-600 uppercase tracking-widest text-sm">
                  {content.game.status}
                </p>
              </div>

              <div className="scrolling-container mx-auto">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={\`scrolling-item scrolling-item\${i + 1} cursor-pointer\`} onClick={() => openLightbox(images[i % 3])}>
                    <img src={images[i % 3]} alt={\`Game preview \${i + 1}\`} referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      };

      `;
content = content.substring(0, compStart) + newComp + content.substring(compEnd);

fs.writeFileSync('/index.html', content);
