export const studyPlan = [
  {
    section: 1,
    title: 'Foundry Foundations & Platform Architecture',
    description: 'Build your core vocabulary and understand the Palantir Foundry platform from the ground up. Learn how Foundry organizes projects, resources, and permissions.',
    activities: [
      { id: 'flashcards-1', type: 'flashcard', title: 'Core Platform Flashcards', description: 'Foundry projects, resources, Compass, Multipass, permissions, and platform architecture', timeEstimate: '30 min', route: '/flashcards/1' },
      { id: 'rosetta-1', type: 'rosetta', title: 'Rosetta Stone: Platform Basics', description: 'Map your existing platform knowledge to Foundry equivalents', timeEstimate: '20 min', route: '/rosetta-stone' },
      { id: 'reading-1', type: 'reading', title: 'Reading Guide', description: 'Explore learn.palantir.com and official platform docs', timeEstimate: '30 min', links: [{ title: 'Palantir Learn (Free Training)', url: 'https://learn.palantir.com' }, { title: 'Foundry Overview', url: 'https://www.palantir.com/docs/foundry/getting-started/overview' }, { title: 'Platform Security', url: 'https://www.palantir.com/docs/foundry/security/overview' }] },
      { id: 'quiz-1', type: 'quiz', title: 'Foundations Quiz', description: 'Multiple-choice questions on core Foundry terminology and platform concepts', timeEstimate: '15 min', route: '/quiz/1' },
    ],
  },
  {
    section: 2,
    title: 'Datasets, Branches & Data Connections',
    description: 'Learn how data enters Foundry through connectors and syncs, how datasets are organized, and how branching enables safe collaboration.',
    activities: [
      { id: 'flashcards-2', type: 'flashcard', title: 'Datasets & Connections Flashcards', description: 'Datasets, branches, transactions, syncs, connectors, file formats', timeEstimate: '30 min', route: '/flashcards/2' },
      { id: 'rosetta-2', type: 'rosetta', title: 'Rosetta Stone: Data Management', description: 'Map data import and versioning concepts to Foundry equivalents', timeEstimate: '20 min', route: '/rosetta-stone' },
      { id: 'reading-2', type: 'reading', title: 'Reading Guide', description: 'Datasets, branches, and data connection documentation', timeEstimate: '30 min', links: [{ title: 'Datasets Overview', url: 'https://www.palantir.com/docs/foundry/data-integration/datasets' }, { title: 'Branching', url: 'https://www.palantir.com/docs/foundry/data-integration/branches' }] },
      { id: 'quiz-2', type: 'quiz', title: 'Datasets & Branches Quiz', description: 'Questions on data management, branching, and connections', timeEstimate: '15 min', route: '/quiz/2' },
    ],
  },
  {
    section: 3,
    title: 'The Ontology Deep Dive',
    description: 'Master the Ontology — the backbone of every Foundry deployment. Understand object types, link types, properties, and how the Ontology models real-world entities.',
    activities: [
      { id: 'flashcards-3', type: 'flashcard', title: 'Ontology Architecture Flashcards', description: 'Object types, link types, properties, OMS, Object Storage V2, object views', timeEstimate: '30 min', route: '/flashcards/3' },
      { id: 'rosetta-3', type: 'rosetta', title: 'Rosetta Stone: Ontology Concepts', description: 'Map data modeling concepts to Foundry Ontology equivalents', timeEstimate: '20 min', route: '/rosetta-stone' },
      { id: 'reading-3', type: 'reading', title: 'Reading Guide', description: 'Ontology overview and core concepts documentation', timeEstimate: '30 min', links: [{ title: 'Ontology Overview', url: 'https://www.palantir.com/docs/foundry/ontology/overview' }, { title: 'Core Concepts', url: 'https://www.palantir.com/docs/foundry/ontology/core-concepts' }] },
      { id: 'quiz-3', type: 'quiz', title: 'Ontology Quiz', description: 'Scenario-based questions on ontology design and architecture', timeEstimate: '15 min', route: '/quiz/3' },
    ],
  },
  {
    section: 4,
    title: 'Pipeline Builder & Data Expectations',
    description: 'Learn how to build no-code data pipelines in Pipeline Builder, define data quality expectations, and schedule transforms to keep data fresh.',
    activities: [
      { id: 'flashcards-4', type: 'flashcard', title: 'Pipeline Builder Flashcards', description: 'Pipeline Builder, transforms, scheduling, data expectations, data health', timeEstimate: '30 min', route: '/flashcards/4' },
      { id: 'rosetta-4', type: 'rosetta', title: 'Rosetta Stone: Pipelines', description: 'Map ETL and data flow concepts to Foundry Pipeline Builder', timeEstimate: '15 min', route: '/rosetta-stone' },
      { id: 'reading-4', type: 'reading', title: 'Reading Guide', description: 'Pipeline Builder core concepts and data expectations', timeEstimate: '30 min', links: [{ title: 'Pipeline Builder Core Concepts', url: 'https://www.palantir.com/docs/foundry/pipeline-builder/core-concepts' }, { title: 'Transforms Overview', url: 'https://www.palantir.com/docs/foundry/pipeline-builder/transforms-overview' }, { title: 'Data Expectations', url: 'https://www.palantir.com/docs/foundry/data-health/data-expectations-overview' }] },
      { id: 'quiz-4', type: 'quiz', title: 'Pipeline Builder Quiz', description: 'Data integration and pipeline architecture questions', timeEstimate: '15 min', route: '/quiz/4' },
    ],
  },
  {
    section: 5,
    title: 'Code Repositories — Python & PySpark Fundamentals',
    description: 'Dive into Code Repositories with Python and PySpark transforms. Learn the @transform decorator pattern and how to write production-grade data transforms.',
    activities: [
      { id: 'flashcards-5', type: 'flashcard', title: 'Code Repos & PySpark Flashcards', description: '@transform, @transform_df, Input/Output, PySpark DataFrame operations, UDFs', timeEstimate: '30 min', route: '/flashcards/5' },
      { id: 'lab-1', type: 'lab', title: 'Lab: Python Transform Basics', description: 'Write PySpark transforms to clean, filter, and join datasets', timeEstimate: '45 min', route: '/lab/1' },
      { id: 'reading-5', type: 'reading', title: 'Reading Guide', description: 'Code Repositories and transforms documentation', timeEstimate: '30 min', links: [{ title: 'Code Repositories Overview', url: 'https://www.palantir.com/docs/foundry/code-repositories/overview' }, { title: 'Transforms Python', url: 'https://www.palantir.com/docs/foundry/transforms-python/overview' }] },
      { id: 'quiz-5', type: 'quiz', title: 'Code Repos Quiz', description: 'Questions on Python transforms, PySpark, and Code Repositories', timeEstimate: '15 min', route: '/quiz/5' },
    ],
  },
  {
    section: 6,
    title: 'Advanced Transforms & Incremental Pipelines',
    description: 'Master incremental computation, advanced PySpark patterns, and build efficient large-scale data pipelines that process only new data.',
    activities: [
      { id: 'flashcards-6', type: 'flashcard', title: 'Incremental Pipelines Flashcards', description: 'Incremental transforms, snapshot vs incremental, partitions, advanced PySpark', timeEstimate: '30 min', route: '/flashcards/6' },
      { id: 'lab-2', type: 'lab', title: 'Lab: Incremental Pipeline Design', description: 'Design and implement an incremental pipeline with proper handling of late-arriving data', timeEstimate: '45 min', route: '/lab/2' },
      { id: 'reading-6', type: 'reading', title: 'Reading Guide', description: 'Incremental computation and advanced transform patterns', timeEstimate: '30 min', links: [{ title: 'Incremental Transforms', url: 'https://www.palantir.com/docs/foundry/transforms-python/incremental-overview' }] },
      { id: 'quiz-6', type: 'quiz', title: 'Advanced Transforms Quiz', description: 'Questions on incremental pipelines and advanced PySpark patterns', timeEstimate: '15 min', route: '/quiz/6' },
    ],
  },
  {
    section: 7,
    title: 'Code Workbooks & pandas in Foundry',
    description: 'Explore Code Workbooks for interactive, notebook-style analysis using pandas. Understand when to use Code Workbooks vs Code Repositories.',
    activities: [
      { id: 'flashcards-7', type: 'flashcard', title: 'Code Workbooks & pandas Flashcards', description: 'Code Workbooks, pandas transforms, interactive analysis, SQL in Foundry', timeEstimate: '30 min', route: '/flashcards/7' },
      { id: 'lab-3', type: 'lab', title: 'Lab: Code Workbook Analysis', description: 'Build an interactive analysis using Code Workbooks and pandas', timeEstimate: '45 min', route: '/lab/3' },
      { id: 'reading-7', type: 'reading', title: 'Reading Guide', description: 'Code Workbooks and pandas documentation', timeEstimate: '30 min', links: [{ title: 'Code Workbook Overview', url: 'https://www.palantir.com/docs/foundry/code-workbook/overview' }] },
      { id: 'quiz-7', type: 'quiz', title: 'Code Workbooks Quiz', description: 'Questions on Code Workbooks, pandas, and interactive analysis', timeEstimate: '15 min', route: '/quiz/7' },
    ],
  },
  {
    section: 8,
    title: 'Data Science & ML in Foundry',
    description: 'Learn how to build, train, and deploy machine learning models in Foundry using Palantir modeling capabilities and model integration patterns.',
    activities: [
      { id: 'flashcards-8', type: 'flashcard', title: 'ML in Foundry Flashcards', description: 'Model training, model integration, Palantir modeling, feature engineering', timeEstimate: '30 min', route: '/flashcards/8' },
      { id: 'lab-4', type: 'lab', title: 'Lab: ML Model Pipeline', description: 'Design a machine learning pipeline from feature engineering to model deployment', timeEstimate: '45 min', route: '/lab/4' },
      { id: 'reading-8', type: 'reading', title: 'Reading Guide', description: 'Machine learning and modeling documentation', timeEstimate: '30 min', links: [{ title: 'Modeling Overview', url: 'https://www.palantir.com/docs/foundry/models/overview' }] },
      { id: 'quiz-8', type: 'quiz', title: 'Data Science Quiz', description: 'Questions on ML workflows, model deployment, and data science in Foundry', timeEstimate: '15 min', route: '/quiz/8' },
    ],
  },
  {
    section: 9,
    title: 'Workshop — Building Operational Applications',
    description: 'Build user-facing operational applications with Workshop. Master widgets, events, variables, and action-backed workflows.',
    activities: [
      { id: 'flashcards-9', type: 'flashcard', title: 'Workshop Flashcards', description: 'Widgets, events, variables, modules, action-backed workflows, Workshop layout', timeEstimate: '30 min', route: '/flashcards/9' },
      { id: 'lab-5', type: 'lab', title: 'Lab: Workshop App Design', description: 'Design a Workshop app for operational task management', timeEstimate: '45 min', route: '/lab/5' },
      { id: 'rosetta-9', type: 'rosetta', title: 'Rosetta Stone: Applications', description: 'Map application-building concepts to Workshop equivalents', timeEstimate: '15 min', route: '/rosetta-stone' },
      { id: 'quiz-9', type: 'quiz', title: 'Workshop Quiz', description: 'Application building and Workshop concepts', timeEstimate: '15 min', route: '/quiz/9' },
    ],
  },
  {
    section: 10,
    title: 'Slate, Contour & Quiver — Analytics & Visualization',
    description: 'Explore Foundry analytics tools: Slate for custom dashboards, Contour for no-code analysis, and Quiver for Ontology-powered exploration.',
    activities: [
      { id: 'flashcards-10', type: 'flashcard', title: 'Analytics & Visualization Flashcards', description: 'Slate, Contour, Quiver, charts, filters, Ontology-powered analytics', timeEstimate: '30 min', route: '/flashcards/10' },
      { id: 'lab-6', type: 'lab', title: 'Lab: Analytics Dashboard Design', description: 'Design an analytics dashboard using Contour and Quiver', timeEstimate: '45 min', route: '/lab/6' },
      { id: 'rosetta-10', type: 'rosetta', title: 'Rosetta Stone: Analytics', description: 'Map BI and analytics concepts to Foundry tools', timeEstimate: '15 min', route: '/rosetta-stone' },
      { id: 'quiz-10', type: 'quiz', title: 'Analytics Quiz', description: 'Questions on Slate, Contour, Quiver, and data visualization', timeEstimate: '15 min', route: '/quiz/10' },
    ],
  },
  {
    section: 11,
    title: 'Functions, OSDK & External Integration',
    description: 'Learn about Functions for server-side logic, the Ontology SDK for external app integration, and how to extend Foundry beyond the platform.',
    activities: [
      { id: 'flashcards-11', type: 'flashcard', title: 'Functions & OSDK Flashcards', description: 'Functions, Action Types, OSDK, webhooks, external integrations', timeEstimate: '30 min', route: '/flashcards/11' },
      { id: 'lab-7', type: 'lab', title: 'Lab: Action Type & Function Design', description: 'Design an approval workflow with action types and functions', timeEstimate: '45 min', route: '/lab/7' },
      { id: 'reading-11', type: 'reading', title: 'Reading Guide', description: 'Functions, OSDK, and integration documentation', timeEstimate: '30 min', links: [{ title: 'Functions Overview', url: 'https://www.palantir.com/docs/foundry/functions/overview' }, { title: 'OSDK Overview', url: 'https://www.palantir.com/docs/foundry/ontology-sdk/overview' }] },
      { id: 'quiz-11', type: 'quiz', title: 'Functions & OSDK Quiz', description: 'Questions on Functions, Action Types, and external integration', timeEstimate: '15 min', route: '/quiz/11' },
    ],
  },
  {
    section: 12,
    title: 'AIP — AI-Powered Foundry',
    description: 'Explore AIP (Artificial Intelligence Platform) features including AIP Logic, AIP Assist, and how large language models integrate with the Ontology.',
    activities: [
      { id: 'flashcards-12', type: 'flashcard', title: 'AIP Flashcards', description: 'AIP Logic, AIP Assist, LLM integration, prompt engineering in Foundry', timeEstimate: '30 min', route: '/flashcards/12' },
      { id: 'lab-8', type: 'lab', title: 'Lab: AIP Integration Design', description: 'Design an AIP-powered workflow with LLM-backed actions', timeEstimate: '45 min', route: '/lab/8' },
      { id: 'reading-12', type: 'reading', title: 'Reading Guide', description: 'AIP platform and AI integration documentation', timeEstimate: '30 min', links: [{ title: 'AIP Overview', url: 'https://www.palantir.com/docs/foundry/aip/overview' }] },
      { id: 'quiz-12', type: 'quiz', title: 'AIP Quiz', description: 'Questions on AIP features, LLM integration, and AI-powered workflows', timeEstimate: '15 min', route: '/quiz/12' },
    ],
  },
  {
    section: 13,
    title: 'FDE Skills — Decomposition & Communication',
    description: 'Practice the core FDE skills: problem decomposition, stakeholder communication, translating your experience, and behavioral interview techniques.',
    activities: [
      { id: 'interview-decomp', type: 'interview', title: 'Mock Interview: Decomposition', description: 'AI-powered decomposition interview practice (3 scenarios)', timeEstimate: '45 min', route: '/interview/decomposition' },
      { id: 'lab-9', type: 'lab', title: 'Decomposition Practice', description: 'Take a vague business problem and produce a structured Foundry solution', timeEstimate: '30 min', route: '/lab/9' },
      { id: 'translate-exp', type: 'exercise', title: 'Translate Your Experience', description: 'Frame your past work experience in Foundry language', timeEstimate: '30 min', route: '/translate' },
      { id: 'interview-behavioral', type: 'interview', title: 'Behavioral Interview Practice', description: 'STAR format practice with cultural fit questions', timeEstimate: '30 min', route: '/interview/behavioral' },
      { id: 'quiz-13', type: 'quiz', title: 'FDE Skills Quiz', description: 'Decomposition and communication questions', timeEstimate: '15 min', route: '/quiz/13' },
    ],
  },
  {
    section: 14,
    title: 'Full Simulation & Comprehensive Assessment',
    description: 'Put it all together with end-to-end simulations and a comprehensive assessment covering all sections of the curriculum.',
    activities: [
      { id: 'lab-10', type: 'lab', title: 'Full Engagement Simulation', description: 'End-to-end: intake, discovery, ontology design, pipeline, app, presentation', timeEstimate: '60 min', route: '/lab/10' },
      { id: 'interview-full', type: 'interview', title: 'Full Interview Simulation', description: '45-minute interview: coding + behavioral + decomposition', timeEstimate: '45 min', route: '/interview/technical' },
      { id: 'flashcards-review', type: 'flashcard', title: 'Flashcard Review', description: 'Review all weak cards across all sections', timeEstimate: '30 min', route: '/flashcards' },
      { id: 'quiz-14', type: 'quiz', title: 'Final Assessment', description: 'Comprehensive assessment covering all 14 sections', timeEstimate: '30 min', route: '/quiz/14' },
    ],
  },
]

export const referenceLinks = {
  1: [
    { title: 'Palantir Learn', url: 'https://learn.palantir.com' },
    { title: 'Foundry Overview', url: 'https://www.palantir.com/docs/foundry/getting-started/overview' },
    { title: 'Platform Security', url: 'https://www.palantir.com/docs/foundry/security/overview' },
  ],
  2: [
    { title: 'Datasets Overview', url: 'https://www.palantir.com/docs/foundry/data-integration/datasets' },
    { title: 'Branching', url: 'https://www.palantir.com/docs/foundry/data-integration/branches' },
    { title: 'Data Connection Overview', url: 'https://www.palantir.com/docs/foundry/data-connection/overview' },
  ],
  3: [
    { title: 'Ontology Overview', url: 'https://www.palantir.com/docs/foundry/ontology/overview' },
    { title: 'Core Concepts', url: 'https://www.palantir.com/docs/foundry/ontology/core-concepts' },
    { title: 'Object Backend Architecture', url: 'https://www.palantir.com/docs/foundry/object-backend/overview' },
  ],
  4: [
    { title: 'Pipeline Builder Core Concepts', url: 'https://www.palantir.com/docs/foundry/pipeline-builder/core-concepts' },
    { title: 'Transforms Overview', url: 'https://www.palantir.com/docs/foundry/pipeline-builder/transforms-overview' },
    { title: 'Data Expectations', url: 'https://www.palantir.com/docs/foundry/data-health/data-expectations-overview' },
  ],
  5: [
    { title: 'Code Repositories Overview', url: 'https://www.palantir.com/docs/foundry/code-repositories/overview' },
    { title: 'Transforms Python', url: 'https://www.palantir.com/docs/foundry/transforms-python/overview' },
  ],
  6: [
    { title: 'Incremental Transforms', url: 'https://www.palantir.com/docs/foundry/transforms-python/incremental-overview' },
  ],
  7: [
    { title: 'Code Workbook Overview', url: 'https://www.palantir.com/docs/foundry/code-workbook/overview' },
  ],
  8: [
    { title: 'Modeling Overview', url: 'https://www.palantir.com/docs/foundry/models/overview' },
  ],
  9: [
    { title: 'Workshop Overview', url: 'https://www.palantir.com/docs/foundry/workshop/overview' },
    { title: 'Workshop Widgets', url: 'https://www.palantir.com/docs/foundry/workshop/widgets-overview' },
  ],
  10: [
    { title: 'Quiver Overview', url: 'https://www.palantir.com/docs/foundry/quiver/overview' },
    { title: 'Contour Overview', url: 'https://www.palantir.com/docs/foundry/contour/overview' },
    { title: 'Slate Overview', url: 'https://www.palantir.com/docs/foundry/slate/overview' },
  ],
  11: [
    { title: 'Functions Overview', url: 'https://www.palantir.com/docs/foundry/functions/overview' },
    { title: 'OSDK Overview', url: 'https://www.palantir.com/docs/foundry/ontology-sdk/overview' },
  ],
  12: [
    { title: 'AIP Overview', url: 'https://www.palantir.com/docs/foundry/aip/overview' },
  ],
  13: [
    { title: 'Palantir Learn', url: 'https://learn.palantir.com' },
  ],
  14: [
    { title: 'Ontology Data Pipelines Course', url: 'https://www.palantir.com/docs/foundry/learning-data-dataeng-08-builder/01/' },
    { title: 'Palantir Learn', url: 'https://learn.palantir.com' },
  ],
}
