import React, { useState } from 'react';
import { 
  Bot, 
  ArrowDown, 
  TrendingUp, 
  MinusCircle, 
  TrendingDown, 
  Sliders, 
  Info, 
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

export const AdaptiveAISection: React.FC = () => {
  // Interactive Adaptive AI Simulator State
  const [accuracy, setAccuracy] = useState<number>(85); // 0 - 100%
  const [responseTimeMs, setResponseTimeMs] = useState<number>(1800); // 800ms - 4500ms
  const [streak, setStreak] = useState<number>(4); // 0 - 10
  const rawScore = 820; // baseline score

  // Calculate composite performance score (Explainable Heuristic)
  // Accuracy (50%), Normalized Speed (25%), Streak bonus (15%), Score (10%)
  const speedScore = Math.max(0, Math.min(100, 100 - ((responseTimeMs - 1000) / 35)));
  const streakScore = Math.min(100, streak * 20);
  const scorePercent = (rawScore / 1000) * 100;
  
  const computedPerformance = Math.round(
    accuracy * 0.50 +
    speedScore * 0.25 +
    streakScore * 0.15 +
    scorePercent * 0.10
  );

  let difficultyDecision = 'Maintain Difficulty';
  let decisionBadge = 'bg-amber-100 text-amber-900 border-amber-300';
  let decisionIcon = MinusCircle;
  let decisionExplanation = 'Performance is stable (Score between 55–79). Maintaining current difficulty level to preserve confidence.';

  if (computedPerformance >= 80) {
    difficultyDecision = 'Increase Difficulty';
    decisionBadge = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    decisionIcon = TrendingUp;
    decisionExplanation = 'High performance detected (Score ≥ 80). Promoting to next difficulty level to maintain cognitive stimulation.';
  } else if (computedPerformance < 55) {
    difficultyDecision = 'Decrease Difficulty';
    decisionBadge = 'bg-rose-100 text-rose-900 border-rose-300';
    decisionIcon = TrendingDown;
    decisionExplanation = 'Fatigue or low recall detected (Score < 55). Lowering difficulty to reduce frustration and rebuild engagement.';
  }

  const DecisionIcon = decisionIcon;

  return (
    <section 
      id="adaptive-ai" 
      className="py-20 md:py-28 bg-white border-b border-slate-200/70"
      aria-labelledby="adaptive-ai-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>Intelligent Adaptation</span>
          </div>

          <h2 
            id="adaptive-ai-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Adaptive AI That Responds <br className="hidden sm:inline" />
            <span className="text-teal-700">to Patient Performance</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            "The platform continuously evaluates gameplay performance and adjusts the challenge to better match the user's current ability."
          </p>
        </div>

        {/* Technical Notice Banner: Explainable Rule-Based AI */}
        <div className="mt-10 max-w-4xl mx-auto p-4 bg-teal-50/90 rounded-2xl border border-teal-200 text-teal-950 flex items-start gap-3.5 shadow-xs">
          <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold text-teal-900">Technical Credibility Notice: </span>
            The current prototype implementation utilizes an <strong>explainable rule-based Adaptive AI Engine</strong> rather than uninterpretable black-box neural networks. This guarantees transparent, deterministic difficulty adjustments that healthcare workers can audit with complete clinical safety.
          </div>
        </div>

        {/* Flow Diagram & Interactive Simulator Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Flow Architecture Diagram */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 border-4 border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                Adaptive AI Engine Workflow
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                3-Tier State Machine
              </span>
            </div>

            {/* Step 1: Player */}
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Elderly Player Session</h4>
                  <p className="text-xs text-slate-400">Interacts with Godot Cognitive Game</p>
                </div>
              </div>
              <span className="text-[11px] bg-teal-900 text-teal-300 px-2 py-0.5 rounded font-mono">Active</span>
            </div>

            <div className="flex justify-center -my-2 text-teal-400">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>

            {/* Step 2: Performance Telemetry */}
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-teal-400" />
                <h4 className="text-sm font-bold text-white">Real-Time Performance Metrics</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Metric 1</span>
                  <strong className="text-teal-300">Accuracy</strong>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Metric 2</span>
                  <strong className="text-amber-300">Reaction Time</strong>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Metric 3</span>
                  <strong className="text-emerald-300">Session Score</strong>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Metric 4</span>
                  <strong className="text-purple-300">Best Streak</strong>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-2 text-teal-400">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 3: Adaptive AI Rule Engine */}
            <div className="p-4 bg-gradient-to-r from-teal-950 to-slate-900 rounded-2xl border-2 border-teal-500/80 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Bot className="w-5 h-5 text-teal-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Adaptive AI Engine Calculation</h4>
                    <p className="text-xs text-teal-300 font-mono">Calculates Composite Performance Score</p>
                  </div>
                </div>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div className="flex justify-center -my-2 text-teal-400">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* Step 4: 3-Tier Decision Matrix */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-2">
                Deterministic Decision Rules:
              </span>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Performance Score <strong className="text-emerald-300">≥ 80</strong></span>
                </div>
                <span className="font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                  → Increase Difficulty (Level +1)
                </span>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MinusCircle className="w-4 h-4 text-amber-400" />
                  <span>Performance Score <strong className="text-amber-300">55 – 79</strong></span>
                </div>
                <span className="font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-700">
                  → Maintain Difficulty
                </span>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-rose-500/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                  <span>Performance Score <strong className="text-rose-300">&lt; 55</strong></span>
                </div>
                <span className="font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-700">
                  → Decrease Difficulty (Level -1)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Adaptive AI Simulator */}
          <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-lg text-left space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-700" />
                <h3 className="text-xl font-bold text-slate-900">
                  Live Adaptive AI Simulator
                </h3>
              </div>
              <span className="text-xs font-bold bg-teal-100 text-teal-900 px-2.5 py-1 rounded-full">
                Interactive Test
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Drag the performance parameters below to test how the Adaptive AI Engine calculates composite scores and determines difficulty calibration in real time.
            </p>

            {/* Slider 1: Accuracy */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Player Accuracy</span>
                <span className="text-teal-700 font-mono">{accuracy}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={accuracy}
                onChange={(e) => setAccuracy(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                aria-label="Adjust accuracy percentage"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Low Recall (30%)</span>
                <span>High Precision (100%)</span>
              </div>
            </div>

            {/* Slider 2: Response Time */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Response Time (Latency)</span>
                <span className="text-teal-700 font-mono">{responseTimeMs} ms</span>
              </div>
              <input
                type="range"
                min="800"
                max="4000"
                step="50"
                value={responseTimeMs}
                onChange={(e) => setResponseTimeMs(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                aria-label="Adjust response time in milliseconds"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Fast (800ms)</span>
                <span>Slow / Hesitant (4000ms)</span>
              </div>
            </div>

            {/* Slider 3: Streak */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Consecutive Best Streak</span>
                <span className="text-teal-700 font-mono">{streak} Rounds</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                value={streak}
                onChange={(e) => setStreak(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                aria-label="Adjust consecutive streak"
              />
            </div>

            {/* Computed Output Box */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <span className="text-xs font-medium text-slate-500 block">Computed Performance Score</span>
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">
                    {computedPerformance} <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${decisionBadge}`}>
                  <DecisionIcon className="w-5 h-5" />
                  <span className="text-sm font-bold">{difficultyDecision}</span>
                </div>
              </div>

              <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200 text-xs text-teal-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  Engine Recommendation:
                </span>
                <p className="leading-relaxed">{decisionExplanation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
