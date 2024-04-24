// import { ChatCompletionContentPartImage } from 'openai/resources/index.mjs';
import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import SuggestionForm from '@/features/suggestions/components/SuggestionForm';

const Index = () => {
  return (
    <MainLayout title="Matching Suggestions">
      <SuggestionForm />
    </MainLayout>
  );
};

export default Index;
