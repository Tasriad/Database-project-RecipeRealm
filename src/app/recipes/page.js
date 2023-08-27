// page.js

import React from 'react';
import Layout from '@/ui-components/layout';
import ToggleSwitch from '@/ui-components/ToggleSwitch';

const Page = () => (
  <Layout>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '-390px', right: '20px' }}>
        {/* Position the ToggleSwitch in the top right corner */}
        <ToggleSwitch />
      </div>
      {/* Other content goes here */}
    </div>
  </Layout>
);

export default Page;
