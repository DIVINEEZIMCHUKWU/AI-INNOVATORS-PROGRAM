import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProgramOverview } from './components/ProgramOverview';
import { ModulesSection } from './components/ModulesSection';
import { TargetAudience } from './components/TargetAudience';
import { RequirementsSection } from './components/RequirementsSection';
import { EnrollmentSection } from './components/EnrollmentSection';
import { Footer } from './components/Footer';
import { AIAdvisor } from './components/AIAdvisor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProgramOverview />
        <TargetAudience />
        <ModulesSection />
        <RequirementsSection />
        <EnrollmentSection />
      </main>
      <Footer />
      <AIAdvisor />
    </div>
  );
};

export default App;