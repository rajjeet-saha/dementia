import React from 'react';
import { 
  Mountain, 
  WifiOff, 
  MapPin, 
  HeartHandshake
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const NorthEastSection: React.FC = () => {
  const { speakText } = useAccessibility();

  const points = [
    {
      title: 'Works Without Internet',
      desc: 'All activities and daily schedules run completely offline on the device.',
      icon: WifiOff,
    },
    {
      title: 'Distance-Aware Care',
      desc: 'Helps families stay connected when specialized clinics are hours away.',
      icon: Mountain,
    },
    {
      title: 'Familiar Daily Routines',
      desc: 'Designed around everyday objects, warm pacing, and regional living rhythm.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section 
      id="north-east" 
      className="py-16 md:py-20 bg-white border-b border-stone-200/70 relative overflow-hidden"
      aria-labelledby="ne-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#f5f0e6] rounded-3xl p-8 sm:p-12 border border-amber-200/70 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Context & Message */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>Regional Care Initiative</span>
              </div>

              <h2 
                id="ne-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight"
              >
                Designed with the North-East in mind
              </h2>

              <p className="text-base text-slate-700 leading-relaxed max-w-xl">
                In many parts of North-East India, hilly terrain, remote locations, and intermittent connectivity can make regular clinic visits and daily elderly monitoring difficult.
              </p>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Redler was built from the ground up to operate reliably without continuous network access, providing older adults and caregivers with steady, dignified support right at home.
              </p>

              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {points.map((p, idx) => {
                  const Icon = p.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white/90 p-4 rounded-xl border border-amber-200/60 shadow-2xs space-y-1"
                      onMouseEnter={() => speakText(`${p.title}: ${p.desc}`)}
                    >
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                        <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{p.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {p.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Subtle Artistic North-East Hills & Valleys Representation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm bg-white p-6 rounded-2xl border border-amber-200/80 shadow-xs text-center space-y-4">
                {/* Stylized Modern Landscape Graphic */}
                <div className="h-44 rounded-xl bg-gradient-to-b from-[#e0f2fe] via-[#ecfdf5] to-[#dcfce7] p-4 flex flex-col justify-between relative overflow-hidden border border-emerald-100">
                  <div className="flex justify-between items-center text-[10px] font-mono text-emerald-900 font-bold z-10">
                    <span className="bg-white/80 px-2 py-0.5 rounded">North-East India</span>
                    <span className="bg-white/80 px-2 py-0.5 rounded">Zero-Data Ready</span>
                  </div>

                  {/* Soft Vector Hills Landscape */}
                  <svg className="w-full h-24 absolute bottom-0 left-0 right-0 text-emerald-700" viewBox="0 0 300 100" preserveAspectRatio="none" fill="none">
                    <path d="M0 60 Q 60 20, 150 45 T 300 30 L 300 100 L 0 100 Z" fill="#bbf7d0" opacity="0.7" />
                    <path d="M0 75 Q 90 40, 180 65 T 300 50 L 300 100 L 0 100 Z" fill="#86efac" opacity="0.8" />
                    <path d="M0 85 Q 120 65, 200 80 T 300 70 L 300 100 L 0 100 Z" fill="#4ade80" opacity="0.9" />
                  </svg>

                  <div className="relative z-10 text-left pt-6">
                    <p className="text-xs font-bold text-emerald-950">Practical Accessibility</p>
                    <p className="text-[10px] text-emerald-800">Bridging geographical distance</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  "Thoughtfully designed for communities where care matters most."
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
