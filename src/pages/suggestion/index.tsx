// import { ChatCompletionContentPartImage } from 'openai/resources/index.mjs';
import React from 'react';

import MainLayout from '@/components/layouts/layout/MainLayout';
import Form from '@/features/suggestions/components/SuggestionForm';

const Index = () => {
  return (
    <MainLayout title="Matching Suggestions">
      <Form />
    </MainLayout>
  );
};

export default Index;
