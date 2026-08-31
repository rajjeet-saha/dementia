import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Brain, 
  CheckCircle, 
  Play, 
  RefreshCw,
  Award
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const GameCards: React.FC = () => {
  const { speakText } = useAccessibility();
  const [activeTab, setActiveTab] = useState<number>(0);

  // Interactive Mini Preview State for Game 1 (Card Matching Demo)
  const [cardsFlipped, setCardsFlipped] = useState<boolean[]>([false, false, false, false]);
  const [matchScore, setMatchScore] = useState<number>(0);

  const handleCardClick = (index: number) => {
    if (cardsFlipped[index]) return;
    const next = [...cardsFlipped];
    next[index] = true;
    setCardsFlipped(next);
    setMatchScore(prev => prev + 250);
  };

  const resetGameDemo = () => {
    setCardsFlipped([false, false, false, false]);
    setMatchScore(0);
  };

  const games = [
    {
      id: 'game-01',
      title: 'Memory Game 01',
      skill: 'Memory Improvement & Daily Item Recall',
      adaptive: true,
      difficultyRange: 'Adaptive Level 1 → 3',
      description:
        'Engages short-term recall and visual memory through familiar daily objects (traditional tea kettles, medicinal herbs, domestic utensils). Automatically adjusts grid size and card visibility time based on player speed and accuracy.',
      mechanics: [
        'Short-term visual recall',
        'Familiar regional object recognition',
        'Adaptive 3-tier difficulty engine',
        'Tracks mistakes and hints utilized',
      ],
      uiPreviewType: 'match',
    },
    {
      id: 'game-02',
      title: 'Memory Game 02',
      skill: 'Pattern & Sequence Recognition',
      adaptive: true,
      difficultyRange: 'Adaptive Level 1 → 3',
      description:
        'Strengthens working memory and logical progression by challenging players to replicate sequences of familiar cultural colors, symbols, and spatial patterns. Dynamically lengthens sequences as recall accuracy increases.',
      mechanics: [
        'Working memory sequencing',
        'Spatial orientation & rhythm',
        'Adaptive sequence length & display speed',
        'Zero-stress encouragement feedback',
      ],
      uiPreviewType: 'sequence',
    },
    {
      id: 'game-03',
      title: 'Cognitive Game 03',
      skill: 'Attention & Concentration Focus',
      adaptive: false,
      difficultyRange: 'Calibrated Steady Pace',
      description:
        'Focuses on sustained attention, target discrimination, and motor coordination. Players identify designated target objects among peaceful visual scenes at a comfortable, unpressured pace without timer penalties.',
      mechanics: [
        'Sustained attention & visual focus',
        'Distractor filtering',
        'Gentle unhurried completion pacing',
        'Large high-contrast touch targets',
      ],
      uiPreviewType: 'focus',
    },
  ];

  return (
    <section 
      id="games" 
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/70"
      aria-labelledby="games-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Targeted Cognitive Activities</span>
          </div>

          <h2 
            id="games-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Our Cognitive Games
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Purpose-built in Godot 4.x for elderly accessibility, featuring large interactive buttons, high contrast, gentle audio reinforcement, and performance-based adaptation.
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {games.map((game, idx) => (
            <div
              key={game.id}
              className={`rounded-3xl p-7 transition-all duration-200 flex flex-col justify-between border-2 text-left ${
                activeTab === idx 
                  ? 'bg-white border-teal-500 shadow-xl ring-4 ring-teal-100/70' 
                  : 'bg-white/80 hover:bg-white border-slate-200 shadow-xs hover:shadow-md'
              }`}
              onMouseEnter={() => speakText(`${game.title}: targeting ${game.skill}. ${game.description}`)}
            >
              <div>
                {/* Header with Adaptive Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-extrabold font-mono text-base shadow-xs">
                    0{idx + 1}
                  </div>

                  {game.adaptive ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>Adaptive AI Enabled</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                      <span>Standard Calibration</span>
                    </span>
                  )}
                </div>

                {/* Title & Target Skill */}
                <h3 className="text-2xl font-bold text-slate-900 mt-5">
                  {game.title}
                </h3>
                
                <div className="mt-1.5 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-teal-700 shrink-0" />
                  <span className="text-xs font-bold text-teal-900 bg-teal-50/80 px-2 py-0.5 rounded border border-teal-100">
                    {game.skill}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                  {game.description}
                </p>

                {/* Mechanics List */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Core Mechanics
                  </span>
                  {game.mechanics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button to switch preview */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveTab(idx)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    activeTab === idx
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{activeTab === idx ? 'Viewing Game Layout' : 'Inspect Game UI'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive In-Browser Game UI Showcase */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-teal-800 text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded">
                  Godot 4.x Engine View
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {games[activeTab].title} — In-Game Interface Simulation
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Targeting: {games[activeTab].skill} • {games[activeTab].difficultyRange}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetGameDemo}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Board</span>
              </button>
            </div>
          </div>

          {/* Simulated Godot Game Canvas */}
          <div className="mt-6 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white min-h-[280px] flex flex-col justify-between border-4 border-slate-800 shadow-inner">
            {/* Top Game Bar */}
            <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <span>PATIENT: <strong className="text-teal-400">Tenzing N.</strong></span>
                <span>DIFFICULTY: <strong className="text-amber-400">Level 2</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span>SCORE: <strong className="text-emerald-400">{matchScore}</strong></span>
                <span>TIME: <strong className="text-slate-300">01:14</strong></span>
              </div>
            </div>

            {/* Game Canvas Body based on activeTab */}
            <div className="my-6">
              {activeTab === 0 && (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-teal-200 font-medium">
                    Tap a card to reveal the matching regional object:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
                    {[
                      { icon: '🍵', label: 'Assam Tea' },
                      { icon: '🌿', label: 'Tulsi Herb' },
                      { icon: '🍵', label: 'Assam Tea' },
                      { icon: '🌿', label: 'Tulsi Herb' },
                    ].map((card, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => handleCardClick(cIdx)}
                        className={`h-24 sm:h-28 rounded-2xl border-2 font-bold text-center flex flex-col items-center justify-center transition transform active:scale-95 ${
                          cardsFlipped[cIdx]
                            ? 'bg-teal-800 border-teal-400 text-white shadow-lg shadow-teal-500/20'
                            : 'bg-slate-800 border-slate-700 hover:border-teal-500 text-slate-400'
                        }`}
                      >
                        {cardsFlipped[cIdx] ? (
                          <>
                            <span className="text-3xl">{card.icon}</span>
                            <span className="text-xs mt-1 text-teal-200">{card.label}</span>
                          </>
                        ) : (
                          <>
                            <Brain className="w-7 h-7 text-slate-500 mb-1" />
                            <span className="text-[11px]">Card #{cIdx + 1}</span>
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-teal-200 font-medium">
                    Follow the highlighted sequence of colors and symbols:
                  </p>
                  <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
                    {['🔵 Blue Circle', '🟢 Green Leaf', '🟡 Amber Sun', '🔴 Red Bloom'].map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center p-2 text-center text-xs font-bold hover:border-teal-400 transition"
                      >
                        <span className="text-lg">{step.split(' ')[0]}</span>
                        <span className="text-[9px] text-slate-300 mt-1">{step.split(' ')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-teal-200 font-medium">
                    Find the target symbol without time limits:
                  </p>
                  <div className="inline-flex items-center gap-3 p-3 bg-teal-900/60 rounded-xl border border-teal-600">
                    <span className="text-xs text-slate-300">Target Object:</span>
                    <span className="text-2xl">🏮</span>
                    <span className="text-xs font-bold text-teal-300">Traditional Lantern</span>
                  </div>
                  <div className="flex justify-center gap-4 pt-2">
                    {['🌸', '🏮', '🍃', '🍵', '🏮', '🌾'].map((item, iIdx) => (
                      <button
                        key={iIdx}
                        className="w-14 h-14 rounded-xl bg-slate-800 hover:bg-teal-700 text-2xl border border-slate-700 flex items-center justify-center transition"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom In-Game Assistance Footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-teal-300">
                <Award className="w-4 h-4" /> Spoken feedback enabled via voice assistant
              </span>
              <span className="font-mono text-slate-400">Godot GDScript High-Contrast Mode</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
