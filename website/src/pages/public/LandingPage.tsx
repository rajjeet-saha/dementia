import React from 'react';
import { Hero } from '../../components/public/Hero';
import { WhyRedler } from '../../components/public/WhyRedler';
import { HowItWorks } from '../../components/public/HowItWorks';
import { NorthEastSection } from '../../components/public/NorthEastSection';
import { CaregiverSection } from '../../components/public/CaregiverSection';
import { DownloadSection } from '../../components/public/DownloadSection';

export const LandingPage: React.FC = () => {
  return (
    <main id="main-content" className="w-full">
      <Hero />
      <WhyRedler />
      <HowItWorks />
      <NorthEastSection />
      <CaregiverSection />
      <DownloadSection />
    </main>
  );
};
