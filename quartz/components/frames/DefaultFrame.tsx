import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import CareerTimeline from "../CareerTimeline"

const Header = HeaderConstructor()

const khayyamScript = `
(function(){
  function initKhayyamScene(){
    const svg = document.getElementById('khayyamGrassScene');
    if(!svg || svg.dataset.initialized) return;
    svg.dataset.initialized = "true";
    const NS = 'http://www.w3.org/2000/svg';
    const W = 1200, GROUND_Y = 65;

    function el(tag, attrs){
      const e = document.createElementNS(NS, tag);
      for(const k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    svg.appendChild(el('line',{x1:0, y1:GROUND_Y, x2:W, y2:GROUND_Y, stroke:'var(--gold)', opacity:0.3, 'stroke-width':1}));
    const bladesGroup = el('g',{id:'khayyamBlades'});
    svg.appendChild(bladesGroup);
    const dustGroup = el('g',{id:'khayyamDust'});
    svg.appendChild(dustGroup);

    const blades = [];
    const count = 100;
    for(let i=0;i<count;i++){
      const x = (W/count)*i + (Math.random()*10-5);
      const baseH = 15 + Math.random()*35;
      const lean = (Math.random()*20 - 10);
      const width = 1.1 + Math.random()*1.3;
      const hueShift = Math.random();
      const color = hueShift < 0.2 ? '#c2683f' : (hueShift < 0.4 ? '#d1a24a' : '#3c5c49');
      const delay = Math.random()*2.5;
      const y0 = GROUND_Y;

      const path = el('path', {
        d: bladePath(x, y0, baseH, lean, false),
        fill:'none',
        stroke: color,
        'stroke-width': width,
        'stroke-linecap':'round',
        opacity: 0
      });
      bladesGroup.appendChild(path);
      blades.push({path, x, y0, baseH, lean, color, delay});
    }

    function bladePath(x, y0, h, lean, wilt){
      const growth = wilt ? h*0.35 : h;
      const tipX = x + lean;
      const tipY = y0 - growth;
      const cx1 = x + lean*0.3;
      const cy1 = y0 - growth*0.5;
      return 'M ' + x.toFixed(1) + ',' + y0.toFixed(1) + ' Q ' + cx1.toFixed(1) + ',' + cy1.toFixed(1) + ' ' + tipX.toFixed(1) + ',' + tipY.toFixed(1);
    }

    const motes = [];
    for(let i=0;i<35;i++){
      const c = el('circle', {
        cx: Math.random()*W,
        cy: GROUND_Y,
        r: 0.8 + Math.random()*1.2,
        fill:'#d1a24a',
        opacity: 0
      });
      dustGroup.appendChild(c);
      motes.push({el:c, baseX: parseFloat(c.getAttribute('cx')), drift: (Math.random()*30-15)});
    }

    const CYCLE_MS = 14000;
    let start = performance.now();
    function ease(t){ return t<0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function frame(now){
      let t = ((now - start) % CYCLE_MS) / CYCLE_MS;
      blades.forEach(b=>{
        let local = Math.min(1, Math.max(0, (t*CYCLE_MS/1000 - b.delay) / 3.5));
        let growPhase, wiltAmt=0, op=0;
        if(t < 0.45){
          growPhase = ease(Math.min(1, local));
          op = growPhase;
          wiltAmt = 0;
        } else if(t < 0.65){
          growPhase = 1; op = 1; wiltAmt = 0;
        } else if(t < 0.85){
          const wt = (t-0.65)/0.2;
          growPhase = 1;
          wiltAmt = wt;
          op = Math.max(0, 1 - wt*1.2);
        } else {
          growPhase = 0; op = 0; wiltAmt = 1;
        }
        const h = b.baseH * growPhase * (1 - wiltAmt*0.5);
        const lean = b.lean * (1 + wiltAmt*1.4);
        b.path.setAttribute('d', bladePath(b.x, b.y0, h, lean, false));
        b.path.setAttribute('opacity', op.toFixed(2));
      });

      let dustOp = 0, riseT = 0;
      if(t >= 0.55 && t < 0.92){
        riseT = (t-0.55)/0.37;
        dustOp = Math.sin(riseT*Math.PI);
      }
      motes.forEach((m,i)=>{
        const phase = (riseT + i*0.015) % 1;
        m.el.setAttribute('cy', (GROUND_Y - phase*50).toFixed(1));
        m.el.setAttribute('cx', (m.baseX + Math.sin(phase*6+i)*m.drift*0.3).toFixed(1));
        m.el.setAttribute('opacity', (dustOp*0.6).toFixed(2));
      });
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKhayyamScene);
  } else {
    initKhayyamScene();
  }
  document.addEventListener('nav', initKhayyamScene);
})();
`

/**
 * The default page frame — three-column layout with left sidebar, center
 * content (header + body + afterBody), and right sidebar, followed by a footer.
 *
 * This is the original Quartz layout, extracted from renderPage.tsx.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer: Footer,
  }: PageFrameProps) {
    return (
      <>
        <div class="left sidebar">
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <div class="center">
          <div class="page-header">
            <Header {...componentData}>
              {header.map((HeaderComponent) => (
                <HeaderComponent {...componentData} />
              ))}
            </Header>
            <div class="popover-hint">
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
            <div class="khayyam-footer" aria-label="Khayyám verse">
              <div class="khayyam-grass-stage">
                <svg id="khayyamGrassScene" viewBox="0 0 1200 70" preserveAspectRatio="none"></svg>
              </div>
              <p class="khayyam-fa">این سبزه که امروز تماشاگه ماست <span>تا سبزهٔ خاک ما تماشاگه کیست</span></p>
              <p class="khayyam-en">“This grass we watch today, so green, so near — whose watching-ground will rise from our own dust?” <span class="khayyam-credit">— Khayyám</span></p>
              <script dangerouslySetInnerHTML={{ __html: khayyamScript }} />
            </div>
          </div>
        </div>
        <div class="right sidebar">
          {componentData.fileData.slug === "index" && <CareerTimeline {...componentData} />}
          {right.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <Footer {...componentData} />
      </>
    )
  },
}
