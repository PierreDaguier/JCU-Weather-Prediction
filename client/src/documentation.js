import React, { useMemo, useState } from 'react';
import { Card } from 'antd';

import AboutDataset from './components/AboutDataset';
import AboutPredictionModel from './components/AboutPredictionModel';
import Introduction from './components/Introduction';
import TechnicalDescription from './components/TechnicalDescription';
import ToolDescription from './components/ToolDescription';

const sections = [
  {
    key: 'introduction',
    label: 'Introduction',
    summary: 'Context, dataset source and roadmap',
    component: Introduction
  },
  {
    key: 'tool',
    label: 'Tool Description',
    summary: 'Input features and interpretation',
    component: ToolDescription
  },
  {
    key: 'dataset',
    label: 'About Dataset',
    summary: 'Coverage, variables and distributions',
    component: AboutDataset
  },
  {
    key: 'model',
    label: 'Prediction Model',
    summary: 'Training pipeline and evaluation',
    component: AboutPredictionModel
  },
  {
    key: 'technical',
    label: 'Technical Description',
    summary: 'Architecture and system flow',
    component: TechnicalDescription
  }
];

function Documentation() {
  const [current, setCurrent] = useState('introduction');

  const selectedSection = useMemo(
    () => sections.find((item) => item.key === current) || sections[0],
    [current]
  );

  const ActiveSection = selectedSection.component;

  return (
    <section className="surface-card docs-shell">
      <aside className="docs-sidebar" role="tablist" aria-label="Documentation sections">
        {sections.map((section) => (
          <button
            key={section.key}
            type="button"
            role="tab"
            aria-selected={section.key === selectedSection.key}
            className={`docs-tab ${section.key === selectedSection.key ? 'is-active' : ''}`}
            onClick={() => setCurrent(section.key)}
          >
            <span className="docs-tab-title">{section.label}</span>
            <span className="docs-tab-summary">{section.summary}</span>
          </button>
        ))}
      </aside>

      <div className="docs-main">
        <Card bordered={false} className="docs-content-card">
          <p className="content-kicker">Documentation</p>
          <ActiveSection />
        </Card>
      </div>
    </section>
  );
}

export default Documentation;
