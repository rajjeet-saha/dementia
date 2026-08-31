import React from 'react';
import { Hero } from '../../components/public/Hero';
import { ProblemSection } from '../../components/public/ProblemSection';
import { SolutionSection } from '../../components/public/SolutionSection';
import { FeatureGrid } from '../../components/public/FeatureGrid';
import { GameCards } from '../../components/public/GameCards';
import { AdaptiveAISection } from '../../components/public/AdaptiveAISection';
import { HowItWorks } from '../../components/public/HowItWorks';
import { ElderlyDesign } from '../../components/public/ElderlyDesign';
import { AccessibilityNER } from '../../components/public/AccessibilityNER';
import { CaregiverSection } from '../../components/public/CaregiverSection';
import { ReminderSection } from '../../components/public/ReminderSection';
import { OfflineSection } from '../../components/public/OfflineSection';
import { ImpactSection } from '../../components/public/ImpactSection';
import { TechStackArchitecture } from '../../components/public/TechStackArchitecture';
import { DownloadSection } from '../../components/public/DownloadSection';

export const LandingPage: React.FC = () => {
  return (
    <main id="main-content" className="w-full">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeatureGrid />
      <GameCards />
      <AdaptiveAISection />
      <HowItWorks />
      <ElderlyDesign />
      <AccessibilityNER />
      <CaregiverSection />
      <ReminderSection />
      <OfflineSection />
      <ImpactSection />
      <TechStackArchitecture />
      <DownloadSection />
    </main>
  );
};
