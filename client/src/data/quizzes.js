export const quizzes = {
  1: [
    {
      id: "q1-01",
      section: 1,
      question: "What is Palantir Foundry best described as?",
      type: "multiple_choice",
      options: [
        "A cloud storage provider like AWS S3",
        "An operating system for data-driven decision making that integrates data, models, and actions",
        "A business intelligence reporting tool",
        "A relational database management system"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry is an operating system for modern enterprises that brings together data integration, modeling (via the Ontology), and operational applications into a single platform. It goes far beyond simple BI or storage by enabling closed-loop decision making.",
      category: "platform"
    },
    {
      id: "q1-02",
      section: 1,
      question:
        "Foundry's architecture separates the control plane (metadata, permissions, lineage) from the data plane (compute, storage).",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry uses a clear separation between the control plane, which handles metadata, security, governance, and lineage tracking, and the data plane, which handles data storage and compute execution. This separation enables multi-cloud deployments and flexible infrastructure.",
      category: "platform"
    },
    {
      id: "q1-03",
      section: 1,
      question: "What is a Project in Foundry primarily used for?",
      type: "multiple_choice",
      options: [
        "Running Spark jobs",
        "Organizing resources (datasets, code repos, applications) and controlling access via permissions",
        "Defining Object Types in the Ontology",
        "Scheduling data syncs from external systems"
      ],
      correctAnswer: 1,
      explanation:
        "Projects are Foundry's primary organizational and access-control unit. They group related resources together and define who can access them. Projects can be nested into folders, and permissions cascade from parent to child resources unless overridden.",
      category: "platform"
    },
    {
      id: "q1-04",
      section: 1,
      question:
        "Compass is the navigation layer in Foundry that allows users to search, browse, and organize all platform resources.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Compass is Foundry's global navigation and resource management interface. It provides a unified way to search for, browse, and organize any resource on the platform, including datasets, code repos, applications, and Ontology entities. It also displays metadata, lineage, and permissions.",
      category: "platform"
    },
    {
      id: "q1-05",
      section: 1,
      question:
        "Which of the following is NOT part of Foundry's security model?",
      type: "multiple_choice",
      options: [
        "Markings for classification-based access control",
        "Role-based permissions on Projects and resources",
        "Organizations for multi-tenant governance",
        "Blockchain-verified audit trails"
      ],
      correctAnswer: 3,
      explanation:
        "Foundry's security model includes Markings (classification labels like Confidential or Restricted), role-based permissions on Projects and individual resources, and Organizations for multi-tenant data segregation. There is no blockchain component; Foundry uses its own audit logging system.",
      category: "platform"
    },
    {
      id: "q1-06",
      section: 1,
      question:
        "What is Multipass in the Foundry platform?",
      type: "multiple_choice",
      options: [
        "A tool for building multi-step pipelines",
        "Foundry's authentication and identity management service",
        "A Spark optimization feature for multi-pass aggregations",
        "A data connector for multiple source systems"
      ],
      correctAnswer: 1,
      explanation:
        "Multipass is Foundry's centralized authentication and identity management service. It handles user authentication (SSO, SAML, OAuth), manages user accounts and groups, and issues tokens used for API access. All Foundry services rely on Multipass for identity verification.",
      category: "platform"
    },
    {
      id: "q1-07",
      section: 1,
      question:
        "Foundry uses Apache Spark as its primary distributed compute engine for data transformations.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry leverages Apache Spark as its core distributed compute engine. Transforms written in Python (PySpark), Java, or SQL are executed on Spark clusters. This enables Foundry to process datasets at scale, from megabytes to petabytes, using distributed computation.",
      category: "platform"
    },
    {
      id: "q1-08",
      section: 1,
      question:
        "How does Foundry differ from a traditional data warehouse?",
      type: "multiple_choice",
      options: [
        "Foundry only supports structured data",
        "Foundry provides an Ontology layer that models business entities and enables operational applications, not just analytics",
        "Foundry cannot connect to external data sources",
        "Foundry uses a single-node architecture instead of distributed computing"
      ],
      correctAnswer: 1,
      explanation:
        "Unlike traditional data warehouses focused on analytical queries, Foundry adds a semantic Ontology layer that maps data to real-world business concepts. This enables not just analytics but also operational applications (via Workshop), automated actions, and closed-loop decision making.",
      category: "platform"
    },
    {
      id: "q1-09",
      section: 1,
      question:
        "What is the role of Organizations in Foundry's security model?",
      type: "multiple_choice",
      options: [
        "Organizations are folders for storing datasets",
        "Organizations provide multi-tenant data governance, ensuring users only see data their organization is permitted to access",
        "Organizations define Spark cluster configurations",
        "Organizations are visual groupings in Workshop applications"
      ],
      correctAnswer: 1,
      explanation:
        "Organizations in Foundry provide multi-tenant governance. They ensure that users belonging to one organization cannot access data marked for another organization unless explicitly granted. This is critical for deployments where multiple business units or external partners share a Foundry instance.",
      category: "platform"
    },
    {
      id: "q1-10",
      section: 1,
      question:
        "Markings in Foundry are applied to resources to enforce classification-based access control that is independent of Project-level permissions.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Markings provide an additional layer of access control on top of Project permissions. Even if a user has Project-level access to a resource, they also need the appropriate markings to access classified data. Markings flow through the lineage graph, so derived datasets inherit the markings of their inputs.",
      category: "platform"
    },
    {
      id: "q1-11",
      section: 1,
      question:
        "Which Foundry component provides data lineage tracking from source to output?",
      type: "multiple_choice",
      options: [
        "Monocle",
        "Multipass",
        "The build system and resource graph",
        "Workshop"
      ],
      correctAnswer: 2,
      explanation:
        "Foundry's build system automatically tracks every dataset transformation and its inputs, creating a complete resource graph. This enables full data lineage, allowing users to trace any output dataset back to its original sources and every transformation applied along the way.",
      category: "platform"
    },
    {
      id: "q1-12",
      section: 1,
      question:
        "Foundry can be deployed on-premises, in Palantir Cloud, or in a customer's own cloud (AWS, Azure, GCP).",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports flexible deployment models including Palantir-managed cloud (SaaS), customer-managed cloud (on AWS, Azure, or GCP), and on-premises installations. The control plane / data plane separation makes this flexibility possible.",
      category: "platform"
    },
    {
      id: "q1-13",
      section: 1,
      question:
        "What is the primary storage format used by Foundry for tabular datasets?",
      type: "multiple_choice",
      options: [
        "CSV files",
        "JSON documents",
        "Apache Parquet",
        "XML files"
      ],
      correctAnswer: 2,
      explanation:
        "Foundry primarily stores tabular data in Apache Parquet format, a columnar storage format optimized for analytics workloads. Parquet provides efficient compression, column pruning, and predicate pushdown, enabling fast reads for Spark-based transforms and queries.",
      category: "platform"
    },
    {
      id: "q1-14",
      section: 1,
      question:
        "Which statement best describes Foundry's approach to data governance?",
      type: "multiple_choice",
      options: [
        "Governance is optional and must be manually configured for each resource",
        "Governance is built into the platform from the ground up, with automatic lineage tracking, marking propagation, and audit logging",
        "Governance only applies to the Ontology, not to raw datasets",
        "Governance is handled entirely by third-party tools"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry treats governance as a first-class concern baked into the platform. Every data operation is tracked for lineage, markings propagate automatically through transformations, permissions are enforced at every layer, and all access is audit-logged. This enables enterprises to build rapidly while maintaining compliance.",
      category: "platform"
    },
    {
      id: "q1-15",
      section: 1,
      question:
        "Foundry's closed-loop architecture means data flows from sources into analytics and operational applications, and actions taken in applications can write back to the Ontology.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The closed-loop architecture is a key differentiator of Foundry. Data flows from source systems through pipelines into the Ontology, is consumed by applications (Workshop, Contour), and user actions in those applications write back to the Ontology and potentially to source systems, completing the feedback loop.",
      category: "platform"
    },
    {
      id: "q1-16",
      section: 1,
      question:
        "What role does HDFS (or an HDFS-compatible layer) play in Foundry?",
      type: "multiple_choice",
      options: [
        "It provides the user interface",
        "It serves as the underlying distributed file storage for datasets",
        "It manages user authentication",
        "It schedules pipeline builds"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry uses HDFS (or cloud-native equivalents like S3/ABFS) as the underlying distributed file storage layer for datasets. This provides scalable, fault-tolerant storage that integrates with Spark for distributed compute operations.",
      category: "platform"
    },
    {
      id: "q1-17",
      section: 1,
      question:
        "In Foundry, what is a Resource?",
      type: "multiple_choice",
      options: [
        "A CPU or memory allocation for Spark",
        "Any entity in the platform that can be discovered, permissioned, and governed, including datasets, code repos, and applications",
        "A REST API endpoint",
        "A row in a dataset"
      ],
      correctAnswer: 1,
      explanation:
        "In Foundry, a Resource is any first-class entity on the platform: datasets, code repositories, Workshop applications, Ontology entities, and more. Every resource has a unique identifier, can be searched via Compass, has permissions, and participates in the lineage graph.",
      category: "platform"
    },
    {
      id: "q1-18",
      section: 1,
      question:
        "Foundry's permission model supports role-based access at the resource level but does not support row-level or object-level security.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "This is false. Foundry supports both resource-level permissions (via roles on Projects) AND fine-grained row/object-level security. Object Type permissions can be scoped to Object Sets, meaning different users can see different subsets of Objects based on property values.",
      category: "platform"
    },
    {
      id: "q1-19",
      section: 1,
      question:
        "Which of the following best describes the three core layers of the Foundry platform?",
      type: "multiple_choice",
      options: [
        "Frontend, Backend, Database",
        "Data Integration (pipelines/datasets), Ontology (semantic model), Application Layer (Workshop, Contour, etc.)",
        "Ingestion, Storage, Visualization",
        "ETL, Data Lake, Business Intelligence"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry's three core layers are: (1) Data Integration, where raw data is ingested and transformed through pipelines into clean datasets; (2) the Ontology, which models that data as real-world business concepts; and (3) the Application Layer, where tools like Workshop and Contour present data and enable operational workflows.",
      category: "platform"
    },
    {
      id: "q1-20",
      section: 1,
      question:
        "A user has Viewer role on a Project but lacks the 'Sensitive' marking. They try to access a dataset in the Project that has the 'Sensitive' marking. What happens?",
      type: "multiple_choice",
      options: [
        "They can view the dataset because Project permissions take precedence",
        "They are denied access because both Project permissions AND the required marking are needed",
        "They can see the dataset metadata but not the data",
        "The marking is automatically granted to them"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry enforces both Project-level permissions and markings simultaneously. A user must have the appropriate Project role AND the required markings to access a resource. If either condition is not met, access is denied. Markings are never automatically granted.",
      category: "platform"
    }
  ],

  2: [
    {
      id: "q2-01",
      section: 2,
      question: "What is a Dataset in Foundry?",
      type: "multiple_choice",
      options: [
        "A visualization chart",
        "A versioned, immutable collection of files stored on the platform with full lineage tracking",
        "A type of user role",
        "A Workshop application template"
      ],
      correctAnswer: 1,
      explanation:
        "A Dataset in Foundry is a versioned, immutable collection of files (typically Parquet) that serves as the fundamental storage unit. Each change to a dataset creates a new transaction, enabling full version history, lineage tracking, and reproducibility.",
      category: "data"
    },
    {
      id: "q2-02",
      section: 2,
      question:
        "Dataset branches in Foundry allow you to have multiple versions of a dataset for development and testing without affecting production.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Dataset branches work similarly to git branches. You can create a branch to test pipeline changes or new transforms without modifying the production (master) branch. Once validated, changes can be merged back to master via branch proposals.",
      category: "data"
    },
    {
      id: "q2-03",
      section: 2,
      question:
        "What is the purpose of a branch proposal in Foundry?",
      type: "multiple_choice",
      options: [
        "To request more compute resources for a build",
        "To propose merging changes from a development branch into the master branch, similar to a pull request",
        "To suggest a new dataset schema",
        "To request access to a restricted resource"
      ],
      correctAnswer: 1,
      explanation:
        "Branch proposals in Foundry are analogous to pull requests in git. When you have made changes on a development branch, you create a proposal to merge those changes into master. Reviewers can inspect the changes before approving the merge.",
      category: "data"
    },
    {
      id: "q2-04",
      section: 2,
      question:
        "What is Data Connection in Foundry used for?",
      type: "multiple_choice",
      options: [
        "Building dashboards",
        "Syncing data from external source systems into Foundry datasets",
        "Running machine learning models",
        "Defining Object Types"
      ],
      correctAnswer: 1,
      explanation:
        "Data Connection is Foundry's framework for ingesting data from external source systems (databases, APIs, file systems, SaaS apps) into Foundry as datasets. It supports a wide variety of connectors and can be configured for different sync strategies.",
      category: "data"
    },
    {
      id: "q2-05",
      section: 2,
      question:
        "Which of the following is NOT a valid sync type in Foundry's Data Connection?",
      type: "multiple_choice",
      options: [
        "Batch (full snapshot)",
        "Incremental (append new records)",
        "Change Data Capture (CDC)",
        "Quantum sync"
      ],
      correctAnswer: 3,
      explanation:
        "Foundry supports batch syncs (full table snapshots), incremental syncs (only new or changed records since last sync), and CDC (change data capture for real-time or near-real-time updates). There is no 'quantum sync' in Foundry.",
      category: "data"
    },
    {
      id: "q2-06",
      section: 2,
      question:
        "A SNAPSHOT transaction in Foundry replaces the entire contents of a dataset.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "A SNAPSHOT transaction replaces the full contents of a dataset. This is in contrast to APPEND transactions (which add new files without removing existing ones) and UPDATE transactions (which can modify or delete specific rows). Full snapshots are the simplest but most expensive transaction type.",
      category: "data"
    },
    {
      id: "q2-07",
      section: 2,
      question:
        "What is the difference between APPEND and UPDATE transaction types?",
      type: "multiple_choice",
      options: [
        "There is no difference; they are aliases",
        "APPEND adds new files to the dataset; UPDATE can modify or delete existing rows using a primary key",
        "APPEND is faster because it skips validation; UPDATE validates all data",
        "APPEND is for structured data; UPDATE is for unstructured data"
      ],
      correctAnswer: 1,
      explanation:
        "APPEND transactions add new data files to the dataset without modifying existing data, ideal for log-style or event data. UPDATE transactions can insert, modify, or delete specific rows identified by a primary key, which is needed for mutable dimension tables or CDC scenarios.",
      category: "data"
    },
    {
      id: "q2-08",
      section: 2,
      question:
        "Foundry automatically tracks data lineage, so you can trace any output dataset back to its original sources.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry automatically records the relationship between input and output datasets for every transform. This creates a complete lineage graph that allows users to trace any dataset back through every transformation to its original source systems. This is fundamental for governance and debugging.",
      category: "data"
    },
    {
      id: "q2-09",
      section: 2,
      question:
        "What is a Media Set in Foundry?",
      type: "multiple_choice",
      options: [
        "A collection of Workshop application themes",
        "A dataset type designed for storing unstructured files like images, PDFs, and videos",
        "A group of data connectors",
        "A visualization palette for Contour charts"
      ],
      correctAnswer: 1,
      explanation:
        "Media Sets are a specialized dataset type for storing unstructured files such as images, PDFs, videos, and other binary content. They integrate with the Ontology so that Objects can reference media files, and they are viewable in Workshop and other Foundry applications.",
      category: "data"
    },
    {
      id: "q2-10",
      section: 2,
      question:
        "Foundry supports geospatial data types for location-based analysis and mapping.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports geospatial data types (points, polygons, lines) at both the dataset and Ontology level. These can be used with Workshop map widgets, spatial joins in pipelines, and geospatial indexing in Object Storage V2 for efficient location-based queries.",
      category: "data"
    },
    {
      id: "q2-11",
      section: 2,
      question:
        "What is the purpose of Time Series data in Foundry?",
      type: "multiple_choice",
      options: [
        "Recording user login timestamps",
        "Storing and efficiently querying time-indexed sensor, telemetry, or event data associated with Objects",
        "Scheduling pipeline builds at specific times",
        "Tracking Foundry platform uptime"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry's Time Series support provides efficient storage and querying of time-indexed data (sensor readings, telemetry, stock prices) that is associated with Ontology Objects. Time Series properties enable high-resolution temporal analysis and visualization in Workshop.",
      category: "data"
    },
    {
      id: "q2-12",
      section: 2,
      question:
        "Which file format provides the best query performance for analytical workloads in Foundry?",
      type: "multiple_choice",
      options: [
        "CSV",
        "JSON",
        "Apache Parquet",
        "Plain text"
      ],
      correctAnswer: 2,
      explanation:
        "Apache Parquet is a columnar storage format that provides excellent performance for analytical workloads. It supports efficient compression, column pruning (reading only needed columns), and predicate pushdown (filtering at the storage level). This is why Foundry uses Parquet as its default format.",
      category: "data"
    },
    {
      id: "q2-13",
      section: 2,
      question:
        "When a Data Connection sync fails, the existing dataset remains unchanged because transactions are atomic.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry dataset transactions are atomic. If a sync fails partway through, the transaction is not committed, and the dataset retains its previous state. This prevents partial or corrupt data from appearing in downstream pipelines and applications.",
      category: "data"
    },
    {
      id: "q2-14",
      section: 2,
      question:
        "What is the primary benefit of using dataset branching during pipeline development?",
      type: "multiple_choice",
      options: [
        "It makes builds run faster",
        "It allows developers to test changes in isolation without affecting production data or downstream consumers",
        "It reduces storage costs",
        "It automatically fixes data quality issues"
      ],
      correctAnswer: 1,
      explanation:
        "Dataset branching provides isolation during development. Developers can modify transforms and see results on a branch without impacting the master branch that production applications depend on. This enables safe experimentation and testing before merging to production.",
      category: "data"
    },
    {
      id: "q2-15",
      section: 2,
      question:
        "A Data Connection source supports the following: JDBC connector, batch sync, incremental sync via a watermark column. What is the watermark column used for?",
      type: "multiple_choice",
      options: [
        "Encrypting the data during transfer",
        "Tracking which rows have already been synced so only new or updated rows are fetched in subsequent syncs",
        "Sorting the data alphabetically",
        "Compressing the data for storage"
      ],
      correctAnswer: 1,
      explanation:
        "A watermark column (typically a timestamp or auto-incrementing ID) tracks the high-water mark of previously synced data. On each incremental sync, only rows with a watermark value greater than the previous high-water mark are fetched. This dramatically reduces sync time and load on the source system.",
      category: "data"
    },
    {
      id: "q2-16",
      section: 2,
      question:
        "Foundry supports streaming data ingestion for real-time or near-real-time use cases.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports streaming data ingestion through streaming connectors and the streaming dataset type. This enables near-real-time data flows from sources like Kafka, event hubs, and other streaming platforms into Foundry for low-latency processing and application updates.",
      category: "data"
    },
    {
      id: "q2-17",
      section: 2,
      question:
        "What happens to downstream datasets when an upstream dataset receives a new transaction?",
      type: "multiple_choice",
      options: [
        "Downstream datasets are automatically rebuilt immediately",
        "Nothing happens until the downstream pipelines are explicitly triggered or scheduled to run",
        "Downstream datasets are deleted",
        "The upstream transaction is blocked until all downstream builds complete"
      ],
      correctAnswer: 1,
      explanation:
        "New upstream transactions do not automatically trigger downstream builds unless those builds are scheduled or configured with triggers. The build system tracks that downstream datasets are stale (out of date relative to their inputs), but actual rebuilding requires explicit scheduling, manual triggering, or auto-build configuration.",
      category: "data"
    },
    {
      id: "q2-18",
      section: 2,
      question:
        "CSV files ingested into Foundry are typically converted to Parquet during the pipeline process for better performance.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "While raw CSV files can be stored in Foundry, best practice is to convert them to Parquet format in an early pipeline stage. Parquet's columnar format, compression, and support for complex types provide significantly better performance for downstream transforms and queries.",
      category: "data"
    },
    {
      id: "q2-19",
      section: 2,
      question:
        "Which of the following data sources can Foundry's Data Connection framework connect to?",
      type: "multiple_choice",
      options: [
        "Only SQL databases",
        "SQL databases, REST APIs, file systems (S3, SFTP), SaaS applications, and streaming platforms",
        "Only cloud storage (S3, Azure Blob)",
        "Only Palantir-specific data formats"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry's Data Connection supports a wide variety of source types including relational databases (JDBC), REST APIs, cloud storage (S3, Azure Blob, GCS), file systems (SFTP, NFS), SaaS applications (Salesforce, SAP, etc.), and streaming platforms (Kafka). Custom connectors can also be built.",
      category: "data"
    },
    {
      id: "q2-20",
      section: 2,
      question:
        "A dataset in Foundry can only contain structured tabular data.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "This is false. Foundry datasets can contain structured tabular data (Parquet, CSV), semi-structured data (JSON), and unstructured data (via Media Sets for images, PDFs, videos, etc.). Foundry also supports geospatial and time series data types.",
      category: "data"
    }
  ],

  3: [
    {
      id: "q3-01",
      section: 3,
      question: "An Object Type in Foundry is most analogous to which concept?",
      type: "multiple_choice",
      options: [
        "A database row",
        "A database table schema that defines the structure for a category of real-world entities",
        "A SQL query",
        "An API endpoint"
      ],
      correctAnswer: 1,
      explanation:
        "An Object Type defines the schema (properties, types, constraints) for a category of real-world entities, just like a table schema defines columns. Individual Objects are like rows. For example, 'Employee' is an Object Type; 'Jane Smith' is an Object.",
      category: "ontology"
    },
    {
      id: "q3-02",
      section: 3,
      question:
        "A Link Type can only connect Objects of the same Object Type.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "Link Types can connect Objects of different Object Types. For example, an Employee Object Type can be linked to a Department Object Type through a 'belongs to' Link Type. Links can also connect Objects of the same type (e.g., Employee 'reports to' Employee).",
      category: "ontology"
    },
    {
      id: "q3-03",
      section: 3,
      question:
        "What is the role of the Ontology Manager (OMS) in Foundry?",
      type: "multiple_choice",
      options: [
        "Building Workshop applications",
        "Configuring Object Types, their properties, primary keys, backing datasets, Link Types, and Action Types",
        "Running Spark jobs",
        "Managing user authentication"
      ],
      correctAnswer: 1,
      explanation:
        "The Ontology Management System (OMS) is the central configuration hub for the Ontology. From OMS you create and configure Object Types (properties, primary keys, backing datasets), Link Types (relationships), Action Types, search settings, and other Ontology metadata.",
      category: "ontology"
    },
    {
      id: "q3-04",
      section: 3,
      question:
        "An Object Set is a dynamic, filtered collection of Objects that can span one or more Object Types.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "An Object Set is a dynamic collection of Objects that can be filtered and scoped. Object Sets can contain Objects from one or more Object Types and are used extensively in Workshop, Functions, and other Foundry applications to define which Objects a user can see or act upon.",
      category: "ontology"
    },
    {
      id: "q3-05",
      section: 3,
      question: "What is an Action Type in Foundry?",
      type: "multiple_choice",
      options: [
        "A read-only query against the Ontology",
        "A visual dashboard layout",
        "A configured set of permissible changes users can make to Objects, with parameters, validation rules, and side effects",
        "A data pipeline schedule"
      ],
      correctAnswer: 2,
      explanation:
        "An Action Type defines a set of permissible changes that users can make to Objects in the Ontology, such as creating, editing, or deleting Objects. Action Types include parameters (user inputs), validation rules (submission criteria), and side effects (e.g., notifications, webhook calls).",
      category: "ontology"
    },
    {
      id: "q3-06",
      section: 3,
      question:
        "An Object Type's primary key must be unique across all Objects of that type.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Every Object Type must have a primary key property whose values are unique across all instances. The primary key uniquely identifies each Object, similar to a primary key in a database table. Duplicate primary keys cause sync errors and unpredictable behavior.",
      category: "ontology"
    },
    {
      id: "q3-07",
      section: 3,
      question:
        "What is the Object Data Funnel responsible for?",
      type: "multiple_choice",
      options: [
        "Reading objects from the Ontology for analytics",
        "Orchestrating writes from Actions back to backing datasets and source systems",
        "Visualizing object relationships as graphs",
        "Scheduling Ontology sync jobs"
      ],
      correctAnswer: 1,
      explanation:
        "The Object Data Funnel orchestrates writes from the Ontology back to backing datasets or source systems. When a user submits an Action that edits an Object, the Funnel validates the changes, applies them to the Ontology, and persists them to the backing dataset.",
      category: "ontology"
    },
    {
      id: "q3-08",
      section: 3,
      question:
        "What is a Function in Foundry's Ontology context?",
      type: "multiple_choice",
      options: [
        "A raw SQL query stored in Contour",
        "A reusable piece of TypeScript logic that operates on Ontology Objects and can be called from Workshop, Actions, and other applications",
        "A file upload mechanism",
        "A type of data connector"
      ],
      correctAnswer: 1,
      explanation:
        "Functions are reusable pieces of TypeScript logic authored in Code Repositories that operate on Ontology Objects. They can compute derived values, filter Object Sets, enforce business rules, and are callable from Workshop, Actions, AIP Logic, and OSDK applications.",
      category: "ontology"
    },
    {
      id: "q3-09",
      section: 3,
      question:
        "An Interface in Foundry allows you to define a common contract across multiple Object Types.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Interfaces define a shared set of properties and links that multiple Object Types can implement. This allows applications (like Workshop modules) to be built generically against an Interface rather than a specific Object Type, improving reusability across different domains.",
      category: "ontology"
    },
    {
      id: "q3-10",
      section: 3,
      question:
        "What is the Object Explorer used for?",
      type: "multiple_choice",
      options: [
        "Writing Python transforms",
        "Browsing, searching, and inspecting individual Objects and their properties, links, and history",
        "Configuring data connectors",
        "Deploying Workshop applications"
      ],
      correctAnswer: 1,
      explanation:
        "Object Explorer provides an interface for browsing and inspecting Objects in the Ontology. Users can search for specific Objects, view their properties, navigate links to related Objects, see audit history, and understand how Objects relate to each other.",
      category: "ontology"
    },
    {
      id: "q3-11",
      section: 3,
      question:
        "Object Storage V2 (OSv2) is the recommended backing store for Object Types in Foundry.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Object Storage V2 (OSv2) is the modern, recommended storage backend for Object Types. It provides faster reads, better indexing, full-text search, geospatial queries, and efficient aggregations compared to the legacy Phonograph storage.",
      category: "ontology"
    },
    {
      id: "q3-12",
      section: 3,
      question:
        "A Link Type in Foundry supports which cardinality configurations?",
      type: "multiple_choice",
      options: [
        "Only one-to-one",
        "Only one-to-many",
        "One-to-one, one-to-many, and many-to-many",
        "Only many-to-many"
      ],
      correctAnswer: 2,
      explanation:
        "Link Types support all cardinality configurations: one-to-one (e.g., Employee to Badge), one-to-many (e.g., Department to Employees), and many-to-many (e.g., Students to Courses). The cardinality is configured when defining the Link Type in OMS.",
      category: "ontology"
    },
    {
      id: "q3-13",
      section: 3,
      question:
        "What is a derived property on an Object Type?",
      type: "multiple_choice",
      options: [
        "A property whose value is manually entered by users",
        "A property whose value is computed dynamically from other properties or linked Objects using a Function",
        "A property that is always null",
        "A property that can only be set during Object creation"
      ],
      correctAnswer: 1,
      explanation:
        "Derived properties are computed dynamically rather than stored in the backing dataset. They use Functions to calculate their values based on other properties of the Object or its linked Objects. For example, a 'Full Name' derived property could concatenate first and last name properties.",
      category: "ontology"
    },
    {
      id: "q3-14",
      section: 3,
      question:
        "Object Views allow you to customize how an Object's detail page appears to users.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Object Views let you customize the layout and content of an Object's detail page. You can configure which properties are shown, add related Object lists, embed Workshop modules, charts, and timelines to give users a rich, contextual view of each Object.",
      category: "ontology"
    },
    {
      id: "q3-15",
      section: 3,
      question:
        "You are designing an Ontology for a hospital. Patients, Doctors, Appointments, and Medications are involved. Which modeling approach is best?",
      type: "multiple_choice",
      options: [
        "One Object Type called 'Hospital Data' with all columns",
        "Four Object Types (Patient, Doctor, Appointment, Medication) with Link Types: Patient-to-Appointment, Appointment-to-Doctor, Patient-to-Medication",
        "Store everything in a single dataset without an Ontology",
        "Create one Object Type per source system column"
      ],
      correctAnswer: 1,
      explanation:
        "Best practice is to model each distinct real-world entity as its own Object Type and use Link Types to express relationships. This provides a clean, navigable data model where users can traverse from Patients to their Appointments to their Doctors naturally.",
      category: "ontology"
    },
    {
      id: "q3-16",
      section: 3,
      question:
        "What is the purpose of configuring a 'title property' on an Object Type?",
      type: "multiple_choice",
      options: [
        "It sets the database table name",
        "It determines which property is displayed as the human-readable label for Objects across the platform",
        "It locks the property from being edited",
        "It indexes the property for pipeline builds"
      ],
      correctAnswer: 1,
      explanation:
        "The title property is the human-readable label used to display Objects throughout Foundry (search results, Workshop dropdowns, Object Views). For an Employee Object Type, you would set the title property to 'Full Name' so users see names instead of IDs.",
      category: "ontology"
    },
    {
      id: "q3-17",
      section: 3,
      question:
        "Ontology search allows users to find Objects using full-text search across indexed properties.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports full-text search on Ontology Objects. Properties can be configured as searchable in OMS, and OSv2 indexes them for efficient querying. Users can search for Objects by name, description, or any searchable property from Object Explorer, Workshop, and other applications.",
      category: "ontology"
    },
    {
      id: "q3-18",
      section: 3,
      question:
        "What happens when the backing dataset for an Object Type is updated by a pipeline build?",
      type: "multiple_choice",
      options: [
        "Nothing; Objects must be manually refreshed",
        "The Ontology automatically syncs, and Objects reflect the updated data",
        "The Object Type must be deleted and recreated",
        "An admin must approve every individual change"
      ],
      correctAnswer: 1,
      explanation:
        "When the backing dataset receives a new transaction (e.g., from a pipeline build), Object Storage detects the change and automatically syncs the Objects. This keeps the Ontology current without manual intervention.",
      category: "ontology"
    },
    {
      id: "q3-19",
      section: 3,
      question:
        "Which Foundry feature enables row-level security on Object Types so different users see different subsets of Objects?",
      type: "multiple_choice",
      options: [
        "Marking rules only",
        "Object Type permissions with Object Set-based restrictions",
        "Pipeline Builder filters",
        "Contour row filters"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry supports Object-level security by configuring permissions on Object Types with Object Set-based restrictions. You can define which users or groups can view or edit specific subsets of Objects based on property values, enabling row-level security.",
      category: "ontology"
    },
    {
      id: "q3-20",
      section: 3,
      question:
        "An Action Type can include validation rules (submission criteria) that prevent execution if conditions are not met.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Action Types support validation rules that check conditions before the Action is executed. For example, you can require that a 'Transfer' Action only proceeds if the quantity is greater than zero and the destination differs from the source. This enforces business logic at the Ontology level.",
      category: "ontology"
    }
  ],

  4: [
    {
      id: "q4-01",
      section: 4,
      question: "What is Pipeline Builder in Foundry primarily used for?",
      type: "multiple_choice",
      options: [
        "Building Workshop applications",
        "Visually authoring data transformation pipelines without writing code",
        "Managing user roles and permissions",
        "Running machine learning training jobs"
      ],
      correctAnswer: 1,
      explanation:
        "Pipeline Builder is a visual, no-code tool for creating data transformation pipelines. Users can drag and drop data sources, apply joins, filters, aggregations, and other transforms, and output the results to new datasets, all without writing Python or SQL.",
      category: "pipeline"
    },
    {
      id: "q4-02",
      section: 4,
      question:
        "Pipeline Builder represents transforms as a directed acyclic graph (DAG) of nodes.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Pipeline Builder uses a DAG model where each node represents a transform operation (join, filter, aggregate, etc.) and edges represent data flow. The acyclic constraint ensures there are no circular dependencies, and the graph determines build order.",
      category: "pipeline"
    },
    {
      id: "q4-03",
      section: 4,
      question:
        "Which of the following is NOT a standard transform node type in Pipeline Builder?",
      type: "multiple_choice",
      options: [
        "Join",
        "Filter",
        "Aggregate",
        "Neural Network"
      ],
      correctAnswer: 3,
      explanation:
        "Pipeline Builder includes standard transform nodes like Join, Filter, Aggregate, Pivot, Union, Expression, and more. There is no built-in Neural Network node; machine learning tasks are handled in Code Repositories or Code Workbooks.",
      category: "pipeline"
    },
    {
      id: "q4-04",
      section: 4,
      question:
        "What are Data Expectations in Foundry?",
      type: "multiple_choice",
      options: [
        "User interface guidelines for Foundry applications",
        "Quality assertions on datasets that validate conditions like no nulls, values in range, and column existence",
        "Expected delivery dates for data connectors",
        "Performance benchmarks for Spark jobs"
      ],
      correctAnswer: 1,
      explanation:
        "Data Expectations are quality rules defined on datasets that are checked after each build. They can assert conditions like no null values in a column, values within expected ranges, row count thresholds, and schema compliance. Failed expectations generate alerts and can block downstream builds.",
      category: "pipeline"
    },
    {
      id: "q4-05",
      section: 4,
      question:
        "A build schedule in Foundry can be configured using cron expressions or event-based triggers.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports both time-based scheduling (via cron expressions like 'every day at 6 AM') and event-based triggers (build when an upstream dataset receives a new transaction). You can also combine both approaches for different parts of a pipeline.",
      category: "pipeline"
    },
    {
      id: "q4-06",
      section: 4,
      question:
        "What is the purpose of build dependencies in Foundry's pipeline system?",
      type: "multiple_choice",
      options: [
        "To define which users can trigger builds",
        "To specify which input datasets a transform reads from, so the build system knows the correct execution order",
        "To limit the memory available to each build",
        "To control the visual layout of Pipeline Builder"
      ],
      correctAnswer: 1,
      explanation:
        "Build dependencies declare which datasets a transform reads from. The build system uses this dependency graph to determine execution order, detect staleness (when inputs have new transactions the output has not consumed), and orchestrate multi-step pipeline builds.",
      category: "pipeline"
    },
    {
      id: "q4-07",
      section: 4,
      question:
        "Incremental builds in Foundry process only new or changed data since the last build, rather than reprocessing the entire dataset.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Incremental builds only process data added or changed since the last successful build. This dramatically reduces compute time and cost for large, append-heavy datasets. Incremental pipelines require specific coding patterns (using the @incremental decorator in Code Repositories).",
      category: "pipeline"
    },
    {
      id: "q4-08",
      section: 4,
      question:
        "Which of the following best describes what happens when a pipeline build fails?",
      type: "multiple_choice",
      options: [
        "The output dataset is partially updated with whatever data was processed",
        "The build fails atomically; the output dataset is not modified, and the failure is reported with logs",
        "The entire pipeline is deleted",
        "Foundry automatically emails the CEO"
      ],
      correctAnswer: 1,
      explanation:
        "Pipeline builds are atomic. If a build fails at any point, the output dataset transaction is not committed, leaving the dataset in its previous valid state. Build logs and error details are available for debugging, and alert configurations can notify relevant users.",
      category: "pipeline"
    },
    {
      id: "q4-09",
      section: 4,
      question:
        "What does a 'stale' build status indicate for a dataset?",
      type: "multiple_choice",
      options: [
        "The dataset has been deleted",
        "One or more upstream input datasets have newer transactions that this dataset has not yet consumed",
        "The dataset's schema is invalid",
        "The dataset has too many rows"
      ],
      correctAnswer: 1,
      explanation:
        "A 'stale' status means the dataset's inputs have been updated since its last build. The output dataset does not reflect the latest input data and needs to be rebuilt. This is tracked automatically by Foundry's build system via transaction timestamps.",
      category: "pipeline"
    },
    {
      id: "q4-10",
      section: 4,
      question:
        "Data Expectations that fail can be configured to either warn or block downstream builds.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Data Expectations support different severity levels. A 'warn' expectation logs a warning but allows the build to succeed and downstream builds to proceed. A 'block' (or 'error') expectation causes the build to fail, preventing bad data from propagating downstream.",
      category: "pipeline"
    },
    {
      id: "q4-11",
      section: 4,
      question:
        "What is the purpose of the retry logic in Foundry's build system?",
      type: "multiple_choice",
      options: [
        "To retry failed data connector syncs indefinitely",
        "To automatically re-attempt failed builds a configurable number of times before reporting final failure",
        "To retry user login attempts",
        "To rebuild all datasets in the platform"
      ],
      correctAnswer: 1,
      explanation:
        "Foundry's build system can be configured to retry failed builds a specified number of times. This handles transient failures like temporary resource contention or network issues. After exhausting retries, the build is reported as permanently failed for manual investigation.",
      category: "pipeline"
    },
    {
      id: "q4-12",
      section: 4,
      question:
        "Pipeline Builder supports joining datasets using inner, left, right, outer, and cross join types.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Pipeline Builder's Join node supports all standard SQL join types: inner join, left outer join, right outer join, full outer join, and cross join. Users configure join conditions by selecting matching columns from each input dataset.",
      category: "pipeline"
    },
    {
      id: "q4-13",
      section: 4,
      question:
        "Which approach is recommended for monitoring pipeline health in production?",
      type: "multiple_choice",
      options: [
        "Manually check build statuses every hour",
        "Configure Data Expectations, build alerts, and health checks that automatically notify teams of failures or quality issues",
        "Only check builds when users report problems",
        "Disable all monitoring to save resources"
      ],
      correctAnswer: 1,
      explanation:
        "Production pipelines should have Data Expectations for quality checks, build alerts (email or webhook) for failure notifications, and health check schedules. Proactive monitoring catches issues before they impact downstream applications and users.",
      category: "pipeline"
    },
    {
      id: "q4-14",
      section: 4,
      question:
        "In Pipeline Builder, an Expression node allows you to create new columns using formula-based logic.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Expression nodes let you define new columns or modify existing ones using formula expressions. These support arithmetic, string manipulation, conditional logic (CASE/IF), date functions, and more, enabling complex column-level transformations without writing code.",
      category: "pipeline"
    },
    {
      id: "q4-15",
      section: 4,
      question:
        "What determines the order in which transforms execute during a multi-step pipeline build?",
      type: "multiple_choice",
      options: [
        "Alphabetical order of dataset names",
        "The dependency graph (DAG); upstream transforms run before downstream ones",
        "Random order for load balancing",
        "The order in which datasets were created"
      ],
      correctAnswer: 1,
      explanation:
        "The build system uses the dependency graph (DAG) to determine execution order through topological sorting. A transform only runs after all of its input datasets have been successfully built. This ensures data flows correctly from source to final output.",
      category: "pipeline"
    },
    {
      id: "q4-16",
      section: 4,
      question:
        "Pipeline permissions in Foundry control who can view, edit, and trigger builds for specific pipelines and datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Pipeline resources (code repositories, datasets) have their own permissions. Users need appropriate roles to view pipeline code, edit transforms, trigger builds, or access output datasets. This ensures that sensitive data transformations are only modified by authorized users.",
      category: "pipeline"
    },
    {
      id: "q4-17",
      section: 4,
      question:
        "A pipeline has three stages: Raw -> Clean -> Analytics. If the 'Clean' build fails, what happens to the 'Analytics' dataset?",
      type: "multiple_choice",
      options: [
        "Analytics is built using the failed Clean output",
        "Analytics build is skipped because its input (Clean) did not produce a new successful transaction",
        "Analytics is automatically deleted",
        "Analytics uses the Raw dataset directly, bypassing Clean"
      ],
      correctAnswer: 1,
      explanation:
        "If the Clean build fails, it does not produce a new transaction. Since Analytics depends on Clean, the build system recognizes that there is no new input and either skips the Analytics build or reports it as blocked. Analytics retains its previous valid state.",
      category: "pipeline"
    },
    {
      id: "q4-18",
      section: 4,
      question:
        "What is the benefit of using Pipeline Builder over Code Repositories for simple transforms?",
      type: "multiple_choice",
      options: [
        "Pipeline Builder runs faster on large datasets",
        "Pipeline Builder provides a visual, no-code interface that is accessible to analysts and non-developers",
        "Pipeline Builder supports more programming languages",
        "Pipeline Builder has no limitations compared to code"
      ],
      correctAnswer: 1,
      explanation:
        "Pipeline Builder's main advantage is accessibility. Analysts and non-developers can build data transformations visually without writing Python or SQL. However, Code Repositories offer more flexibility for complex logic, custom functions, and incremental builds.",
      category: "pipeline"
    },
    {
      id: "q4-19",
      section: 4,
      question:
        "Build triggers can be configured to start a build automatically when an upstream dataset receives a new transaction.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Event-based build triggers listen for new transactions on upstream datasets and automatically start downstream builds. This creates reactive pipelines that process data as soon as it arrives, reducing latency compared to purely schedule-based approaches.",
      category: "pipeline"
    },
    {
      id: "q4-20",
      section: 4,
      question:
        "Which of the following is a best practice for managing pipeline errors in production?",
      type: "multiple_choice",
      options: [
        "Ignore errors as long as the pipeline eventually succeeds",
        "Set up Data Expectations to catch quality issues, configure alerts for build failures, and review build logs to diagnose root causes",
        "Delete and recreate the pipeline from scratch",
        "Increase compute resources until errors stop"
      ],
      correctAnswer: 1,
      explanation:
        "Best practices include: defining Data Expectations for proactive quality monitoring, configuring build alerts to notify the team of failures, reviewing detailed build logs for root cause diagnosis, and implementing retry logic for transient issues. Simply increasing resources or ignoring errors leads to unreliable pipelines.",
      category: "pipeline"
    }
  ],

  5: [
    {
      id: "q5-01",
      section: 5,
      question:
        "What is the purpose of the @transform_df decorator in Foundry's Python transforms?",
      type: "multiple_choice",
      options: [
        "It converts a function into a REST API endpoint",
        "It declares a function that takes PySpark DataFrames as inputs and returns a PySpark DataFrame as output",
        "It schedules a function to run on a cron schedule",
        "It creates a new dataset without any transformation"
      ],
      correctAnswer: 1,
      explanation:
        "The @transform_df decorator wraps a function so that it receives PySpark DataFrames as inputs (automatically read from input datasets) and must return a PySpark DataFrame as output (which is written to the output dataset). It handles all the I/O plumbing automatically.",
      category: "pyspark"
    },
    {
      id: "q5-02",
      section: 5,
      question:
        "The @transform decorator differs from @transform_df in that it provides raw FoundryInput/FoundryOutput objects instead of DataFrames.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The @transform decorator gives you TransformInput and TransformOutput objects, which provide lower-level access. You can call .dataframe() to get a DataFrame, or use .filesystem() for file-level operations. This is useful when working with non-tabular data or when you need to write multiple files.",
      category: "pyspark"
    },
    {
      id: "q5-03",
      section: 5,
      question:
        "What does the following PySpark code produce?\n\n```python\ndf = df.select('name', 'age').filter(F.col('age') > 30)\n```",
      type: "multiple_choice",
      options: [
        "A DataFrame with all columns but only rows where age > 30",
        "A DataFrame with only 'name' and 'age' columns, filtered to rows where age > 30",
        "An error because select and filter cannot be chained",
        "A DataFrame with rows where age <= 30"
      ],
      correctAnswer: 1,
      explanation:
        "The select() call projects only the 'name' and 'age' columns, and filter() retains only rows where age > 30. PySpark operations can be chained fluently, with each operation returning a new DataFrame. The original DataFrame is not modified.",
      category: "pyspark"
    },
    {
      id: "q5-04",
      section: 5,
      question:
        "In PySpark, the groupBy() operation must be followed by an aggregation function like agg(), count(), or sum().",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "After calling groupBy(), you get a GroupedData object, not a DataFrame. You must apply an aggregation (agg(), count(), sum(), avg(), max(), min(), etc.) to produce a result DataFrame. Trying to use DataFrame operations directly on GroupedData will cause an error.",
      category: "pyspark"
    },
    {
      id: "q5-05",
      section: 5,
      question:
        "What does this PySpark code do?\n\n```python\nfrom pyspark.sql import functions as F\nfrom pyspark.sql.window import Window\n\nw = Window.partitionBy('department').orderBy('salary')\ndf = df.withColumn('rank', F.row_number().over(w))\n```",
      type: "multiple_choice",
      options: [
        "Sorts the entire DataFrame by salary",
        "Assigns a row number to each employee within their department, ordered by salary",
        "Counts the number of departments",
        "Deletes rows with null salary values"
      ],
      correctAnswer: 1,
      explanation:
        "This code uses a window function to partition data by department and order by salary within each partition. F.row_number().over(w) assigns a sequential integer to each row within its partition, effectively ranking employees by salary within each department.",
      category: "pyspark"
    },
    {
      id: "q5-06",
      section: 5,
      question:
        "What is the correct way to handle null values when filtering in PySpark?",
      type: "multiple_choice",
      options: [
        "df.filter(F.col('status') == None)",
        "df.filter(F.col('status').isNull())",
        "df.filter(F.col('status') is None)",
        "df.filter(F.col('status').equals(null))"
      ],
      correctAnswer: 1,
      explanation:
        "In PySpark, you must use .isNull() or .isNotNull() to check for null values. Using == None or 'is None' does not work correctly because PySpark column expressions use overloaded operators, and Python's 'is' keyword compares object identity, not column values.",
      category: "pyspark"
    },
    {
      id: "q5-07",
      section: 5,
      question:
        "The meta.yml file in a Code Repository defines the dependencies between transforms and their input/output datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "This is false. The meta.yml file defines repository-level metadata like conda dependencies and Python package configurations. Transform input/output dependencies are declared directly in the code via the @transform_df or @transform decorators, not in meta.yml.",
      category: "pyspark"
    },
    {
      id: "q5-08",
      section: 5,
      question:
        "What does this PySpark code produce?\n\n```python\ndf1.join(df2, df1['id'] == df2['id'], 'left')\n```",
      type: "multiple_choice",
      options: [
        "An inner join keeping only matching rows",
        "A left outer join keeping all rows from df1, with nulls for non-matching df2 columns",
        "A cross join of all rows",
        "A union of both DataFrames"
      ],
      correctAnswer: 1,
      explanation:
        "A left join keeps all rows from the left DataFrame (df1) and matches them with rows from the right DataFrame (df2) on the join condition. Where no match exists, df2 columns are filled with null values. This is useful for enriching data while preserving all records.",
      category: "pyspark"
    },
    {
      id: "q5-09",
      section: 5,
      question:
        "Which PySpark function is used to cast a column to a different data type?",
      type: "multiple_choice",
      options: [
        "F.convert()",
        "F.col('column').cast('integer')",
        "F.type_change()",
        "F.col('column').asType('int')"
      ],
      correctAnswer: 1,
      explanation:
        "The .cast() method on a Column is used to convert data types in PySpark. You can pass a string type name ('integer', 'double', 'string', 'date') or a DataType object. For example: F.col('price').cast('double') converts the price column to double precision.",
      category: "pyspark"
    },
    {
      id: "q5-10",
      section: 5,
      question:
        "A UDF (User Defined Function) in PySpark is serialized and sent to each executor, which can impact performance compared to built-in Spark functions.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "UDFs are Python functions that Spark serializes and sends to executors. Each row is processed by the Python interpreter on the executor, incurring serialization overhead. Built-in Spark functions run natively in the JVM and are much faster. Use UDFs only when no built-in function can accomplish the task.",
      category: "pyspark"
    },
    {
      id: "q5-11",
      section: 5,
      question:
        "What is wrong with this transform code?\n\n```python\n@transform_df(\n    Output('/path/to/output'),\n    source=Input('/path/to/input')\n)\ndef compute(source):\n    result = source.collect()\n    return result\n```",
      type: "multiple_choice",
      options: [
        "The Input/Output paths are incorrect",
        "collect() brings all data to the driver as a Python list, which is not a DataFrame and will fail for large datasets",
        "The function name must be 'main', not 'compute'",
        "The decorator syntax is wrong"
      ],
      correctAnswer: 1,
      explanation:
        "The collect() method brings all data from executors to the driver as a Python list of Row objects, not a DataFrame. This will cause the transform to fail because @transform_df expects a DataFrame return. Even if converted back, collect() on large data will cause out-of-memory errors on the driver.",
      category: "pyspark"
    },
    {
      id: "q5-12",
      section: 5,
      question:
        "In Foundry Code Repositories, transforms are tested using pytest with mock datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry Code Repositories support unit testing transforms using pytest. You create test DataFrames (mock inputs), pass them to your transform function, and assert the output matches expectations. The transforms library provides test utilities to simplify setting up test fixtures.",
      category: "pyspark"
    },
    {
      id: "q5-13",
      section: 5,
      question:
        "Which PySpark operation would you use to add a new column to a DataFrame?",
      type: "multiple_choice",
      options: [
        "df.addColumn('new_col', value)",
        "df.withColumn('new_col', expression)",
        "df.insert('new_col', value)",
        "df.append_column('new_col', expression)"
      ],
      correctAnswer: 1,
      explanation:
        "The withColumn() method adds a new column (or replaces an existing one) in the DataFrame. It takes a column name and a Column expression. For example: df.withColumn('full_name', F.concat(F.col('first'), F.lit(' '), F.col('last'))).",
      category: "pyspark"
    },
    {
      id: "q5-14",
      section: 5,
      question:
        "What does this code do?\n\n```python\ndf = df.withColumn('year', F.year(F.col('event_date')))\n       .withColumn('month', F.month(F.col('event_date')))\n```",
      type: "multiple_choice",
      options: [
        "Deletes the event_date column and replaces it with year and month",
        "Extracts the year and month from event_date into two new columns while keeping event_date",
        "Filters rows to a specific year and month",
        "Sorts the DataFrame by year and month"
      ],
      correctAnswer: 1,
      explanation:
        "F.year() and F.month() are date functions that extract the year and month components from a date or timestamp column. withColumn() adds these as new columns without removing the original event_date column.",
      category: "pyspark"
    },
    {
      id: "q5-15",
      section: 5,
      question:
        "PySpark string functions like F.upper(), F.lower(), F.trim(), and F.regexp_replace() operate on string columns.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "PySpark provides a rich set of string functions in pyspark.sql.functions. These include upper(), lower(), trim(), ltrim(), rtrim(), substring(), regexp_replace(), regexp_extract(), split(), concat(), and many more for manipulating string columns.",
      category: "pyspark"
    },
    {
      id: "q5-16",
      section: 5,
      question:
        "What is the correct structure of a Foundry Code Repository?",
      type: "multiple_choice",
      options: [
        "A single Python file with all transforms",
        "A Python package with src/ directory containing transform modules, a build.gradle or meta.yml for configuration, and a test/ directory for tests",
        "A Jupyter notebook with cells",
        "A folder of SQL files only"
      ],
      correctAnswer: 1,
      explanation:
        "A Foundry Code Repository follows a standard Python package structure: a src/ directory with transform modules (Python files containing @transform_df or @transform functions), a configuration file (meta.yml or build.gradle) for dependencies, and a test/ directory for pytest-based unit tests.",
      category: "pyspark"
    },
    {
      id: "q5-17",
      section: 5,
      question:
        "Which decorator should you use when you need to work with raw files (e.g., reading CSVs or writing non-tabular output) instead of DataFrames?",
      type: "multiple_choice",
      options: [
        "@transform_df (it handles all cases)",
        "@transform (provides TransformInput/TransformOutput with filesystem access)",
        "@raw_transform",
        "@file_transform"
      ],
      correctAnswer: 1,
      explanation:
        "The @transform decorator provides TransformInput and TransformOutput objects that expose both .dataframe() for tabular access and .filesystem() for raw file operations. Use @transform when you need file-level control, such as reading non-Parquet files or writing multiple output files.",
      category: "pyspark"
    },
    {
      id: "q5-18",
      section: 5,
      question:
        "What does F.coalesce() do in PySpark?",
      type: "multiple_choice",
      options: [
        "Reduces the number of partitions in a DataFrame",
        "Returns the first non-null value among the given columns",
        "Merges two DataFrames together",
        "Counts null values in a column"
      ],
      correctAnswer: 1,
      explanation:
        "F.coalesce() returns the first non-null value from a list of columns. For example, F.coalesce(F.col('phone_mobile'), F.col('phone_home'), F.lit('N/A')) returns the mobile number if available, otherwise home number, otherwise 'N/A'. Note: DataFrame.coalesce() (without F.) reduces partitions, which is different.",
      category: "pyspark"
    },
    {
      id: "q5-19",
      section: 5,
      question:
        "In Foundry, the meta.yml file in a Code Repository is used to specify Python package dependencies (like pandas, scikit-learn) that need to be available in the Spark environment.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The meta.yml (or conda-recipe/meta.yml) file specifies Python package dependencies for the Code Repository. These packages are installed in the Spark environment when builds run. Common dependencies include pandas, numpy, scikit-learn, and other libraries needed by transforms.",
      category: "pyspark"
    },
    {
      id: "q5-20",
      section: 5,
      question:
        "What is wrong with this transform?\n\n```python\n@transform_df(\n    Output('/path/to/output'),\n    source=Input('/path/to/input')\n)\ndef compute(source):\n    pdf = source.toPandas()\n    pdf['new_col'] = pdf['amount'] * 2\n    return spark.createDataFrame(pdf)\n```",
      type: "multiple_choice",
      options: [
        "The syntax is perfectly correct and will work for any dataset size",
        "toPandas() loads the entire dataset into driver memory, which will fail for large datasets; use PySpark operations instead",
        "The Output path format is wrong",
        "You cannot create new columns in pandas"
      ],
      correctAnswer: 1,
      explanation:
        "Calling toPandas() collects the entire distributed DataFrame onto the driver as a pandas DataFrame. For small datasets this works, but for large ones it causes out-of-memory errors. The correct approach is to use PySpark's withColumn: source.withColumn('new_col', F.col('amount') * 2).",
      category: "pyspark"
    }
  ],

  6: [
    {
      id: "q6-01",
      section: 6,
      question:
        "What is the purpose of the @incremental decorator in Foundry transforms?",
      type: "multiple_choice",
      options: [
        "To make builds run faster by using more CPUs",
        "To process only new or changed data since the last build instead of reprocessing the entire dataset",
        "To automatically scale Spark clusters",
        "To incrementally add columns to a dataset"
      ],
      correctAnswer: 1,
      explanation:
        "The @incremental decorator enables a transform to process only new data (rows added since the last build) rather than the entire dataset. This dramatically reduces compute time and cost for large, append-heavy datasets like event logs or transaction records.",
      category: "transforms"
    },
    {
      id: "q6-02",
      section: 6,
      question:
        "Semantic incremental transforms use the transaction history to determine which rows are new, while non-semantic incremental relies on explicit row-level tracking.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Semantic incremental uses Foundry's transaction metadata to identify new data since the last build. The transform sees only unprocessed transactions. Non-semantic incremental requires the developer to explicitly track which rows have been processed, typically using a watermark or checkpoint.",
      category: "transforms"
    },
    {
      id: "q6-03",
      section: 6,
      question:
        "What is the difference between 'replace' and 'append' output modes in incremental transforms?",
      type: "multiple_choice",
      options: [
        "There is no difference",
        "'replace' overwrites the entire output on each build; 'append' adds new results to the existing output",
        "'replace' is faster; 'append' is more accurate",
        "'replace' works with Parquet; 'append' works with CSV"
      ],
      correctAnswer: 1,
      explanation:
        "In 'replace' mode, the output dataset is fully overwritten on each build, even when the input is read incrementally. In 'append' mode, new results are added to the existing output without removing previous data. Use 'append' for accumulating results (like event processing) and 'replace' when you need full recomputation of output.",
      category: "transforms"
    },
    {
      id: "q6-04",
      section: 6,
      question:
        "Broadcast joins in PySpark are an optimization for joining a large DataFrame with a small DataFrame.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Broadcast joins copy the smaller DataFrame to every executor node, avoiding an expensive shuffle of the larger DataFrame. This is optimal when one side of the join is small enough to fit in memory on each executor (typically under a few hundred MB). Use F.broadcast(small_df) to hint this to Spark.",
      category: "transforms"
    },
    {
      id: "q6-05",
      section: 6,
      question:
        "What does the following code do?\n\n```python\n@incremental()\n@transform_df(\n    Output('/output'),\n    source=Input('/input')\n)\ndef compute(source, ctx):\n    if ctx.is_incremental:\n        return source.filter(F.col('status') == 'new')\n    else:\n        return source\n```",
      type: "multiple_choice",
      options: [
        "Always returns the full dataset",
        "On incremental runs, filters to only 'new' status rows from new transactions; on snapshot (non-incremental) runs, returns all data",
        "Deletes rows with status 'new'",
        "Causes an error because @incremental and @transform_df cannot be combined"
      ],
      correctAnswer: 1,
      explanation:
        "The ctx.is_incremental flag tells whether the current build is running incrementally or as a full snapshot. This pattern lets you apply different logic for each case. On incremental runs, only new transactions are visible in 'source', and additional filtering is applied. On snapshot runs, all data is processed.",
      category: "transforms"
    },
    {
      id: "q6-06",
      section: 6,
      question:
        "Repartitioning a DataFrame before writing can improve read performance for downstream consumers.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Repartitioning (using repartition() or partitionBy()) organizes data into partitions based on column values. Downstream transforms that filter on the partition columns can skip irrelevant partitions entirely (partition pruning), significantly reducing read time. This is especially effective for large datasets filtered by date, region, or category.",
      category: "transforms"
    },
    {
      id: "q6-07",
      section: 6,
      question:
        "What is a common anti-pattern when writing PySpark transforms in Foundry?",
      type: "multiple_choice",
      options: [
        "Using built-in Spark functions like F.col() and F.when()",
        "Collecting large DataFrames to the driver using .collect() or .toPandas() when PySpark operations would suffice",
        "Using filter() to reduce data volume early in the pipeline",
        "Chaining multiple DataFrame operations together"
      ],
      correctAnswer: 1,
      explanation:
        "Calling .collect() or .toPandas() on large DataFrames is a common anti-pattern because it pulls all data to the driver, causing out-of-memory errors and eliminating the benefits of distributed processing. Always use PySpark DataFrame operations to keep computation distributed across the cluster.",
      category: "transforms"
    },
    {
      id: "q6-08",
      section: 6,
      question:
        "Schema evolution in Foundry allows a dataset's schema to change over time (e.g., adding new columns) without breaking downstream consumers.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports schema evolution, meaning new columns can be added to datasets over time. Downstream transforms that select specific columns continue to work even as new columns are added. However, removing or renaming columns can break downstream consumers and should be handled carefully.",
      category: "transforms"
    },
    {
      id: "q6-09",
      section: 6,
      question:
        "What is the purpose of caching a DataFrame in PySpark?\n\n```python\ndf = df.cache()\n```",
      type: "multiple_choice",
      options: [
        "Saving the DataFrame to disk permanently",
        "Storing the DataFrame in memory so it can be reused across multiple operations without recomputation",
        "Compressing the DataFrame to reduce size",
        "Creating a backup copy of the DataFrame"
      ],
      correctAnswer: 1,
      explanation:
        "cache() (or persist()) tells Spark to store the DataFrame in memory after the first computation. Subsequent operations on the same DataFrame reuse the cached version instead of recomputing from scratch. This is beneficial when a DataFrame is used in multiple downstream operations within the same transform.",
      category: "transforms"
    },
    {
      id: "q6-10",
      section: 6,
      question:
        "A Spark execution plan can be viewed using .explain() to understand how Spark will execute a DataFrame query.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Calling .explain() on a DataFrame prints the physical and logical execution plan. This shows the sequence of operations Spark will perform, including joins, filters, shuffles, and exchanges. Understanding execution plans helps identify performance bottlenecks like unnecessary shuffles or missing optimizations.",
      category: "transforms"
    },
    {
      id: "q6-11",
      section: 6,
      question:
        "What does this code do?\n\n```python\n@transform(\n    out1=Output('/output1'),\n    out2=Output('/output2'),\n    source=Input('/input')\n)\ndef compute(source, out1, out2):\n    df = source.dataframe()\n    good = df.filter(F.col('quality') == 'pass')\n    bad = df.filter(F.col('quality') != 'pass')\n    out1.write_dataframe(good)\n    out2.write_dataframe(bad)\n```",
      type: "multiple_choice",
      options: [
        "Reads two inputs and merges them into one output",
        "Splits one input into two outputs: passed quality records and failed quality records",
        "Deletes all records with quality != 'pass'",
        "Causes an error because a transform can only have one output"
      ],
      correctAnswer: 1,
      explanation:
        "This is a multi-output transform using the @transform decorator. It reads a single input dataset, splits records based on quality status, and writes passing records to out1 and failing records to out2. Multi-output transforms are useful for routing data to different downstream paths.",
      category: "transforms"
    },
    {
      id: "q6-12",
      section: 6,
      question:
        "Spark's lazy evaluation means that transformations are not executed until an action (like write, collect, or count) is triggered.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Spark uses lazy evaluation: transformation operations (select, filter, join, withColumn) only build up an execution plan without actually processing data. The plan is executed only when an action (write, collect, count, show) is called. This allows Spark to optimize the entire plan before execution.",
      category: "transforms"
    },
    {
      id: "q6-13",
      section: 6,
      question:
        "What is a transform library in Foundry?",
      type: "multiple_choice",
      options: [
        "A collection of pre-built Workshop templates",
        "A shared Python package that contains reusable functions and utilities imported by multiple Code Repositories",
        "A visual library of Pipeline Builder nodes",
        "A database of transform execution logs"
      ],
      correctAnswer: 1,
      explanation:
        "Transform libraries are shared Python packages that can be imported by multiple Code Repositories. They contain reusable utility functions, common schemas, validation logic, and other shared code. This promotes DRY (Don't Repeat Yourself) principles across pipeline development.",
      category: "transforms"
    },
    {
      id: "q6-14",
      section: 6,
      question:
        "What is the impact of data skew on Spark performance?",
      type: "multiple_choice",
      options: [
        "Data skew has no impact on performance",
        "When data is unevenly distributed across partitions, some tasks take much longer than others, creating bottlenecks",
        "Data skew makes queries return incorrect results",
        "Data skew only affects streaming workloads"
      ],
      correctAnswer: 1,
      explanation:
        "Data skew occurs when data is unevenly distributed, causing some partitions to be much larger than others. Tasks processing skewed partitions take disproportionately longer, creating bottlenecks. Mitigation strategies include salting join keys, repartitioning, and using broadcast joins for skewed dimensions.",
      category: "transforms"
    },
    {
      id: "q6-15",
      section: 6,
      question:
        "Spark's Catalyst optimizer can push filter operations down to the data source to minimize the amount of data read.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Predicate pushdown is a key optimization in Spark's Catalyst optimizer. When reading Parquet files, filters on partition columns or columns with statistics can be pushed down to the file reader, allowing Spark to skip reading entire files or row groups that don't match the filter criteria.",
      category: "transforms"
    },
    {
      id: "q6-16",
      section: 6,
      question:
        "What causes an 'out of memory' error on the Spark driver in Foundry?",
      type: "multiple_choice",
      options: [
        "Having too many columns in a DataFrame",
        "Calling collect(), toPandas(), or other actions that bring large amounts of data to the single driver node",
        "Using the filter() function too many times",
        "Having more than 100 transforms in a pipeline"
      ],
      correctAnswer: 1,
      explanation:
        "The Spark driver is a single node with limited memory. Actions like collect(), toPandas(), and broadcasting very large DataFrames send data to the driver, which can exceed its memory. The fix is to keep data distributed on executors using PySpark operations and only collect small result sets.",
      category: "transforms"
    },
    {
      id: "q6-17",
      section: 6,
      question:
        "In incremental transforms, the 'require_incremental' flag ensures the transform always runs incrementally and never falls back to snapshot mode.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "When require_incremental is set, the transform will only run in incremental mode. If incremental processing is not possible (e.g., the output was deleted or a schema change occurred), the build will fail rather than silently falling back to a full snapshot. This provides safety for transforms where accidental snapshot reprocessing could cause issues.",
      category: "transforms"
    },
    {
      id: "q6-18",
      section: 6,
      question:
        "What is the recommended approach for handling a join between a 100GB table and a 50MB lookup table?",
      type: "multiple_choice",
      options: [
        "Use a sort-merge join (default)",
        "Use a broadcast join by broadcasting the 50MB lookup table to all executors",
        "Convert both tables to pandas DataFrames first",
        "Split the 100GB table into smaller pieces and join separately"
      ],
      correctAnswer: 1,
      explanation:
        "Broadcasting the small 50MB lookup table to all executors avoids shuffling the large 100GB table across the network. Use F.broadcast(small_df) or set spark.sql.autoBroadcastJoinThreshold. This converts an expensive shuffle join into a fast map-side join.",
      category: "transforms"
    },
    {
      id: "q6-19",
      section: 6,
      question:
        "Writing multiple small files per partition degrades read performance. What is the recommended mitigation?",
      type: "multiple_choice",
      options: [
        "Use more executors",
        "Coalesce or repartition the output DataFrame to an appropriate number of partitions before writing",
        "Switch from Parquet to CSV format",
        "Increase driver memory"
      ],
      correctAnswer: 1,
      explanation:
        "Many small files (the 'small files problem') increases metadata overhead and reduces read efficiency. Before writing, use .coalesce(n) or .repartition(n) to consolidate output into fewer, larger files. A common rule of thumb is to target files around 128MB-256MB for optimal Parquet performance.",
      category: "transforms"
    },
    {
      id: "q6-20",
      section: 6,
      question:
        "The persist() method with StorageLevel.MEMORY_AND_DISK stores the DataFrame in memory and spills to disk if memory is insufficient.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "persist(StorageLevel.MEMORY_AND_DISK) first tries to store the DataFrame in memory. If there is not enough memory, it spills overflow partitions to disk. This is safer than MEMORY_ONLY (which recomputes evicted partitions) and useful for large intermediate DataFrames that are reused multiple times.",
      category: "transforms"
    }
  ],

  7: [
    {
      id: "q7-01",
      section: 7,
      question:
        "What is the primary difference between Code Workbook and Code Repository in Foundry?",
      type: "multiple_choice",
      options: [
        "Code Workbook supports Python; Code Repository does not",
        "Code Workbook is an interactive notebook environment for exploration and prototyping; Code Repository is a structured, production-grade Python package for reliable pipelines",
        "Code Repository is only for Java; Code Workbook is only for Python",
        "There is no difference; they are aliases"
      ],
      correctAnswer: 1,
      explanation:
        "Code Workbook provides an interactive, notebook-style environment ideal for ad-hoc exploration, data science prototyping, and quick analysis. Code Repository provides a structured Python package with version control, testing, and CI/CD, making it the right choice for production-grade, maintainable pipelines.",
      category: "workbooks"
    },
    {
      id: "q7-02",
      section: 7,
      question:
        "The @pandas_transform decorator in Code Workbook converts PySpark DataFrames to pandas automatically for single-node processing.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The @pandas_transform decorator automatically converts the input PySpark DataFrame to a pandas DataFrame before passing it to your function, and converts the returned pandas DataFrame back to PySpark for writing. This is convenient but only suitable for data that fits in driver memory.",
      category: "workbooks"
    },
    {
      id: "q7-03",
      section: 7,
      question:
        "When should you use Code Workbook instead of Code Repository?",
      type: "multiple_choice",
      options: [
        "For production pipelines that run daily",
        "For exploratory data analysis, quick prototyping, and one-off analysis tasks",
        "When you need unit tests and CI/CD",
        "When you need to manage multiple output datasets in a single transform"
      ],
      correctAnswer: 1,
      explanation:
        "Code Workbook is ideal for exploration, prototyping, and ad-hoc analysis where interactivity and quick iteration matter more than production reliability. For production pipelines, Code Repository is preferred because it supports version control, testing, code review, and structured project organization.",
      category: "workbooks"
    },
    {
      id: "q7-04",
      section: 7,
      question:
        "What does the .toPandas() method do on a PySpark DataFrame?",
      type: "multiple_choice",
      options: [
        "Converts the DataFrame to a pandas DataFrame in-place on the executors",
        "Collects all data from executors to the driver and converts it to a pandas DataFrame in driver memory",
        "Creates a view of the DataFrame that uses pandas syntax",
        "Writes the DataFrame to a CSV file"
      ],
      correctAnswer: 1,
      explanation:
        "toPandas() collects all rows from the distributed Spark executors to the single driver node and creates a pandas DataFrame in driver memory. This is fine for small datasets but will cause out-of-memory errors for large ones. Always check data size before calling toPandas().",
      category: "workbooks"
    },
    {
      id: "q7-05",
      section: 7,
      question:
        "Code Workbook supports SQL cells for querying datasets using SQL syntax.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Code Workbook supports SQL cells where you can write SQL queries against input datasets. This is useful for analysts comfortable with SQL. SQL cells can be mixed with Python cells, and results from SQL cells can be used as inputs to Python cells.",
      category: "workbooks"
    },
    {
      id: "q7-06",
      section: 7,
      question:
        "What does this pandas code do?\n\n```python\nresult = df.groupby('region')['revenue'].agg(['sum', 'mean', 'count'])\n```",
      type: "multiple_choice",
      options: [
        "Filters the DataFrame to rows with non-null revenue",
        "Groups by region and computes sum, mean, and count of revenue for each region",
        "Sorts the DataFrame by region and revenue",
        "Creates three new DataFrames, one for each aggregation"
      ],
      correctAnswer: 1,
      explanation:
        "This groups the DataFrame by the 'region' column, then applies three aggregation functions (sum, mean, count) to the 'revenue' column. The result is a DataFrame indexed by region with columns for each aggregation. This is a common pandas pattern for summary statistics.",
      category: "workbooks"
    },
    {
      id: "q7-07",
      section: 7,
      question:
        "spark.createDataFrame(pandas_df) converts a pandas DataFrame back to a PySpark DataFrame.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "spark.createDataFrame() can take a pandas DataFrame and convert it to a distributed PySpark DataFrame. This is the reverse of .toPandas() and is used when you have processed data with pandas and need to write it back as a Foundry dataset.",
      category: "workbooks"
    },
    {
      id: "q7-08",
      section: 7,
      question:
        "What is the key tradeoff between pandas and PySpark in Foundry?",
      type: "multiple_choice",
      options: [
        "pandas is always faster than PySpark",
        "pandas runs on a single node and is limited by its memory; PySpark distributes computation across a cluster and scales to large datasets",
        "PySpark cannot perform joins; pandas can",
        "pandas supports more data types than PySpark"
      ],
      correctAnswer: 1,
      explanation:
        "The fundamental tradeoff is scale vs. convenience. pandas offers a richer API and is easier for many data scientists, but runs on a single node. PySpark distributes processing across the cluster, handling datasets far too large for a single machine.",
      category: "workbooks"
    },
    {
      id: "q7-09",
      section: 7,
      question:
        "What does this pandas code do?\n\n```python\ndf_merged = pd.merge(orders, customers, on='customer_id', how='left')\n```",
      type: "multiple_choice",
      options: [
        "Concatenates orders and customers vertically",
        "Left joins orders with customers on customer_id, keeping all orders and matching customer info",
        "Filters orders to only those with matching customers",
        "Creates a cross join of orders and customers"
      ],
      correctAnswer: 1,
      explanation:
        "pd.merge() with how='left' performs a left join, keeping all rows from the left DataFrame (orders) and adding matching columns from the right DataFrame (customers). Orders without a matching customer will have NaN in the customer columns.",
      category: "workbooks"
    },
    {
      id: "q7-10",
      section: 7,
      question:
        "Code Workbook supports R cells in addition to Python and SQL.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Code Workbook supports three cell types: Python (PySpark or pandas), SQL, and R. This makes it versatile for different data science workflows and allows teams to use the language they are most comfortable with.",
      category: "workbooks"
    },
    {
      id: "q7-11",
      section: 7,
      question:
        "What is the primary limitation of scheduling Code Workbook outputs as production pipelines?",
      type: "multiple_choice",
      options: [
        "Code Workbooks cannot produce output datasets",
        "Code Workbooks lack the version control, testing, and code review workflows that Code Repositories provide for production reliability",
        "Code Workbooks run slower than Code Repositories",
        "Code Workbooks cannot read input datasets"
      ],
      correctAnswer: 1,
      explanation:
        "While Code Workbook outputs can be scheduled, they lack the production-grade features of Code Repositories: structured version control, unit testing with pytest, code review processes, and modular project organization. For critical production pipelines, promote workbook code to a Code Repository.",
      category: "workbooks"
    },
    {
      id: "q7-12",
      section: 7,
      question:
        "What does this pandas code do?\n\n```python\npivot = df.pivot_table(values='sales', index='product', columns='quarter', aggfunc='sum')\n```",
      type: "multiple_choice",
      options: [
        "Filters sales data by product and quarter",
        "Creates a pivot table showing total sales for each product across quarters",
        "Sorts the DataFrame by sales amount",
        "Groups by product and counts the number of quarters"
      ],
      correctAnswer: 1,
      explanation:
        "pivot_table() reshapes the data into a matrix format with products as rows, quarters as columns, and summed sales as values. This is a powerful pandas operation for creating cross-tabulation summaries commonly used in business reporting.",
      category: "workbooks"
    },
    {
      id: "q7-13",
      section: 7,
      question:
        "In Code Workbook, you can create inline visualizations using libraries like matplotlib and plotly.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Code Workbook supports inline visualization using Python libraries like matplotlib, plotly, seaborn, and others. Plots render directly in the workbook output, making it excellent for exploratory data analysis and sharing visual insights with stakeholders.",
      category: "workbooks"
    },
    {
      id: "q7-14",
      section: 7,
      question:
        "Which pandas method applies a custom function to each row or column of a DataFrame?",
      type: "multiple_choice",
      options: [
        "df.transform()",
        "df.apply()",
        "df.map()",
        "df.foreach()"
      ],
      correctAnswer: 1,
      explanation:
        "df.apply() applies a function along an axis of the DataFrame. With axis=0 (default), it applies to each column; with axis=1, it applies to each row. This is useful for custom row-level or column-level computations that are not available as built-in pandas functions.",
      category: "workbooks"
    },
    {
      id: "q7-15",
      section: 7,
      question:
        "When using @pandas_transform, the entire input dataset must fit in driver memory.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Since @pandas_transform converts the PySpark DataFrame to pandas on the driver, the entire dataset must fit in the driver's memory. For datasets larger than available memory, use PySpark operations directly or increase driver memory.",
      category: "workbooks"
    },
    {
      id: "q7-16",
      section: 7,
      question:
        "What does this pandas code do?\n\n```python\ndf['status'] = df['days_overdue'].apply(\n    lambda x: 'Critical' if x > 30 else ('Warning' if x > 7 else 'OK')\n)\n```",
      type: "multiple_choice",
      options: [
        "Deletes the days_overdue column",
        "Creates a new 'status' column with values 'Critical', 'Warning', or 'OK' based on days_overdue thresholds",
        "Filters rows where days_overdue is greater than 30",
        "Sorts the DataFrame by days_overdue"
      ],
      correctAnswer: 1,
      explanation:
        "This uses apply() with a lambda function to create a new column that categorizes each row based on the days_overdue value. Rows with more than 30 days are Critical, 7-30 are Warning, and 7 or fewer are OK. This is a common pattern for derived categorical columns.",
      category: "workbooks"
    },
    {
      id: "q7-17",
      section: 7,
      question:
        "Code Workbook cells execute in a dependency-based order, not necessarily top to bottom.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Code Workbook determines execution order based on cell dependencies (which cells reference outputs of other cells), not their visual position. Cells can be arranged for readability while the system ensures correct execution order based on the data dependency graph.",
      category: "workbooks"
    },
    {
      id: "q7-18",
      section: 7,
      question:
        "Which approach should you use to handle a 500GB dataset in Code Workbook?",
      type: "multiple_choice",
      options: [
        "Use @pandas_transform to load it into pandas",
        "Use PySpark DataFrame operations to process it distributedly across the cluster",
        "Export it to CSV and process locally",
        "Code Workbook cannot handle datasets this large"
      ],
      correctAnswer: 1,
      explanation:
        "For large datasets, always use PySpark DataFrame operations which process data distributedly across the cluster. Never use toPandas() or @pandas_transform on datasets this large, as they would attempt to load 500GB into the driver's memory and fail.",
      category: "workbooks"
    },
    {
      id: "q7-19",
      section: 7,
      question:
        "Code Workbook supports scheduling output datasets to build on a recurring basis.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Code Workbook output nodes can be scheduled to build on a recurring basis. This allows workbook-based transforms to run as part of a data pipeline. However, for critical production use, Code Repositories are recommended due to their better testing and version control support.",
      category: "workbooks"
    },
    {
      id: "q7-20",
      section: 7,
      question:
        "What is the equivalent PySpark operation for pandas df.groupby('col').agg({'val': 'sum'})?",
      type: "multiple_choice",
      options: [
        "df.groupBy('col').agg(F.sum('val'))",
        "df.group('col').sum('val')",
        "df.aggregate('col', 'sum')",
        "df.reduce('col', F.sum('val'))"
      ],
      correctAnswer: 0,
      explanation:
        "In PySpark, groupBy() followed by agg() with Spark functions is the equivalent of pandas groupby().agg(). Note the camelCase groupBy in PySpark vs. lowercase groupby in pandas. The PySpark version distributes the computation across the cluster.",
      category: "workbooks"
    }
  ],

  8: [
    {
      id: "q8-01",
      section: 8,
      question:
        "What is the typical ML workflow in Foundry?",
      type: "multiple_choice",
      options: [
        "Train models externally and import predictions as CSV",
        "Prepare features in pipelines, train models in Code Workbook or Code Repository, serialize models, and deploy for batch or real-time inference",
        "Use only pre-built models with no customization",
        "Train models exclusively in Workshop applications"
      ],
      correctAnswer: 1,
      explanation:
        "The Foundry ML workflow involves: (1) feature engineering in PySpark pipelines, (2) model training in Code Workbooks or Repositories using scikit-learn, PyTorch, or other libraries, (3) model serialization and storage, and (4) deployment for batch inference in pipelines or real-time inference via model APIs.",
      category: "ml"
    },
    {
      id: "q8-02",
      section: 8,
      question:
        "Scikit-learn models can be trained inside Foundry transforms by collecting features to the driver and using standard scikit-learn APIs.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Scikit-learn is a single-node library, so training data must be collected to the driver (using toPandas()) before training. This works well when the training data fits in memory. For larger datasets, you can use distributed ML libraries or sample the data.",
      category: "ml"
    },
    {
      id: "q8-03",
      section: 8,
      question:
        "What does this code do in a Foundry ML context?\n\n```python\nimport pickle\nmodel = train_model(X_train, y_train)\nwith output.filesystem().open('model.pkl', 'wb') as f:\n    pickle.dump(model, f)\n```",
      type: "multiple_choice",
      options: [
        "Loads a pre-trained model from a dataset",
        "Serializes a trained model to a pickle file and saves it to the output dataset's filesystem",
        "Sends the model to an external API",
        "Converts the model to a PySpark DataFrame"
      ],
      correctAnswer: 1,
      explanation:
        "This uses the @transform decorator's filesystem access to serialize a trained model using Python's pickle module and save it to the output dataset. This is a common pattern for persisting models in Foundry that can later be loaded in another transform for inference.",
      category: "ml"
    },
    {
      id: "q8-04",
      section: 8,
      question:
        "Feature engineering in Foundry is typically done using PySpark transforms to create a clean, joined feature table from multiple source datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Feature engineering in Foundry leverages PySpark's distributed processing to join, aggregate, and transform data from multiple sources into a feature table. This is done in Code Repositories or Pipeline Builder, creating a clean, versioned feature dataset that feeds model training.",
      category: "ml"
    },
    {
      id: "q8-05",
      section: 8,
      question:
        "What is the purpose of train/test splitting in machine learning?",
      type: "multiple_choice",
      options: [
        "To reduce storage costs by discarding half the data",
        "To evaluate model performance on unseen data, preventing overfitting",
        "To speed up training by using less data",
        "To create two different models"
      ],
      correctAnswer: 1,
      explanation:
        "Train/test splitting holds out a portion of data (typically 20-30%) that the model never sees during training. Performance on this test set estimates how the model will perform on new, real-world data, preventing overfitting where a model memorizes training data but fails to generalize.",
      category: "ml"
    },
    {
      id: "q8-06",
      section: 8,
      question:
        "What does this code do?\n\n```python\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5, scoring='accuracy')\nprint(f'Mean accuracy: {scores.mean():.3f}')\n```",
      type: "multiple_choice",
      options: [
        "Trains the model once and reports accuracy",
        "Performs 5-fold cross-validation, training and evaluating the model 5 times on different splits, and reports mean accuracy",
        "Tests the model on 5 different datasets",
        "Reduces the dataset to 5 rows for testing"
      ],
      correctAnswer: 1,
      explanation:
        "5-fold cross-validation splits the data into 5 folds, trains on 4 folds and tests on the remaining one, repeating 5 times with a different test fold each time. This gives a more robust estimate of model performance than a single train/test split.",
      category: "ml"
    },
    {
      id: "q8-07",
      section: 8,
      question:
        "PyTorch and TensorFlow models can be trained in Foundry using GPU-enabled compute profiles.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry supports GPU compute for deep learning frameworks like PyTorch and TensorFlow. GPU-enabled Spark profiles can be configured for Code Repositories and Code Workbooks, enabling training of neural networks and other GPU-accelerated models within the platform.",
      category: "ml"
    },
    {
      id: "q8-08",
      section: 8,
      question:
        "What is batch inference in the context of Foundry ML?",
      type: "multiple_choice",
      options: [
        "Training the model on batches of data",
        "Applying a trained model to a large dataset in a scheduled pipeline build to generate predictions for all records",
        "Running the model in a real-time API",
        "Splitting training data into batches for parallel training"
      ],
      correctAnswer: 1,
      explanation:
        "Batch inference applies a pre-trained model to an entire dataset in a scheduled pipeline run. The model is loaded, predictions are generated for all input records, and results are written to an output dataset. This is the most common inference pattern in Foundry.",
      category: "ml"
    },
    {
      id: "q8-09",
      section: 8,
      question:
        "Hyperparameter tuning involves finding the best model configuration by testing multiple parameter combinations.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Hyperparameter tuning systematically searches for the best model parameters (learning rate, tree depth, regularization strength, etc.) by training and evaluating multiple models with different configurations. Common approaches include grid search, random search, and Bayesian optimization.",
      category: "ml"
    },
    {
      id: "q8-10",
      section: 8,
      question:
        "What is the recommended approach for real-time model inference in Foundry?",
      type: "multiple_choice",
      options: [
        "Run a Code Workbook continuously in the background",
        "Use Foundry's model hosting service or wrap the model in a Function callable via API or OSDK",
        "Email predictions to users manually",
        "Store predictions in a Workshop application"
      ],
      correctAnswer: 1,
      explanation:
        "For real-time inference, models can be deployed using Foundry's model hosting service or wrapped in Functions that serve predictions via API. This enables applications (Workshop, external apps via OSDK) to get predictions on demand rather than waiting for batch pipeline runs.",
      category: "ml"
    },
    {
      id: "q8-11",
      section: 8,
      question:
        "What does this code do?\n\n```python\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report\n\nmodel = RandomForestClassifier(n_estimators=100, max_depth=10)\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)\nprint(classification_report(y_test, y_pred))\n```",
      type: "multiple_choice",
      options: [
        "Creates a neural network and trains it",
        "Trains a Random Forest classifier with 100 trees and max depth 10, predicts on test data, and prints precision/recall/F1 metrics",
        "Performs unsupervised clustering",
        "Runs a grid search over hyperparameters"
      ],
      correctAnswer: 1,
      explanation:
        "This trains a Random Forest classifier (ensemble of 100 decision trees, max depth 10), generates predictions on the test set, and prints a classification report with precision, recall, F1-score, and support for each class. This is a standard model evaluation workflow.",
      category: "ml"
    },
    {
      id: "q8-12",
      section: 8,
      question:
        "ML Objectives in Foundry provide a framework for tracking model experiments, metrics, and lineage.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "ML Objectives help data scientists track and compare model experiments. They record metrics (accuracy, loss, etc.), parameters, and model artifacts for each training run, providing lineage from data to model and supporting reproducibility and model governance.",
      category: "ml"
    },
    {
      id: "q8-13",
      section: 8,
      question:
        "What is the primary advantage of feature engineering in PySpark over pandas in Foundry?",
      type: "multiple_choice",
      options: [
        "PySpark has more ML algorithms",
        "PySpark processes data distributedly across the cluster, handling datasets too large for a single node",
        "PySpark produces more accurate features",
        "pandas cannot perform joins or aggregations"
      ],
      correctAnswer: 1,
      explanation:
        "PySpark distributes feature engineering computations across the cluster, enabling processing of datasets far larger than what fits in a single node's memory. Feature tables often require joining and aggregating many large source datasets, making distributed processing essential.",
      category: "ml"
    },
    {
      id: "q8-14",
      section: 8,
      question:
        "Model monitoring involves tracking prediction quality and data drift over time to detect model degradation.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Model monitoring tracks metrics like prediction accuracy, feature distributions, and data drift over time. If the real-world data distribution shifts from what the model was trained on, performance degrades. Monitoring enables timely retraining and prevents stale models from making poor decisions.",
      category: "ml"
    },
    {
      id: "q8-15",
      section: 8,
      question:
        "What is the difference between batch and real-time inference?",
      type: "multiple_choice",
      options: [
        "Batch is more accurate; real-time is less accurate",
        "Batch runs on a schedule and scores entire datasets; real-time serves individual predictions on demand via API",
        "Real-time requires GPUs; batch does not",
        "There is no difference in Foundry"
      ],
      correctAnswer: 1,
      explanation:
        "Batch inference runs periodically and generates predictions for all records in a dataset. Real-time inference serves individual predictions on demand via an API endpoint. Choose based on latency requirements: batch for daily/hourly scoring, real-time for interactive applications.",
      category: "ml"
    },
    {
      id: "q8-16",
      section: 8,
      question:
        "Foundry supports distributed model training using PySpark MLlib for large-scale datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "PySpark MLlib provides distributed implementations of common ML algorithms (linear regression, random forest, k-means, etc.) that can train on datasets too large for single-node libraries. MLlib leverages the Spark cluster for distributed training.",
      category: "ml"
    },
    {
      id: "q8-17",
      section: 8,
      question:
        "What does model serialization accomplish in the ML workflow?",
      type: "multiple_choice",
      options: [
        "It converts the model to a dashboard visualization",
        "It saves the trained model's parameters and structure to a file so it can be loaded later without retraining",
        "It converts the model to a SQL query",
        "It distributes the model across multiple Spark executors"
      ],
      correctAnswer: 1,
      explanation:
        "Model serialization (using pickle, joblib, torch.save, etc.) persists the trained model to a file. This allows the model to be loaded in a separate inference transform or deployed to a model hosting service without retraining, decoupling training from inference.",
      category: "ml"
    },
    {
      id: "q8-18",
      section: 8,
      question:
        "A well-designed ML pipeline in Foundry separates feature engineering, model training, and model inference into distinct transforms.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Separating feature engineering, training, and inference into distinct transforms improves maintainability, reusability, and debuggability. The feature pipeline can be reused for both training and inference, the training transform runs on demand, and the inference transform runs on a schedule.",
      category: "ml"
    },
    {
      id: "q8-19",
      section: 8,
      question:
        "What does this PySpark code do for feature engineering?\n\n```python\nfrom pyspark.sql.window import Window\nw = Window.partitionBy('customer_id').orderBy('order_date').rowsBetween(-30, 0)\ndf = df.withColumn('rolling_30d_spend', F.sum('amount').over(w))\n```",
      type: "multiple_choice",
      options: [
        "Calculates total spend per customer",
        "Computes a rolling 30-row window sum of amount for each customer ordered by date",
        "Deletes orders older than 30 days",
        "Filters to the last 30 customers"
      ],
      correctAnswer: 1,
      explanation:
        "This uses a window function to compute a rolling sum over the last 30 rows for each customer ordered by order_date. Rolling aggregations like this are powerful features for ML models, capturing recent behavioral patterns. For exact 30-day windows, use rangeBetween with timestamps.",
      category: "ml"
    },
    {
      id: "q8-20",
      section: 8,
      question:
        "GPU compute in Foundry is configured through Spark profiles that allocate GPU resources to executors.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Foundry allows configuring Spark profiles with GPU-enabled instances. These profiles allocate GPU resources to executor nodes, enabling deep learning frameworks like PyTorch and TensorFlow to leverage GPU acceleration for model training and inference.",
      category: "ml"
    }
  ],

  9: [
    {
      id: "q9-01",
      section: 9,
      question:
        "Which Workshop widget allows users to select a single value from a list of options?",
      type: "multiple_choice",
      options: [
        "Object Table widget",
        "Dropdown widget",
        "Map widget",
        "Chart widget"
      ],
      correctAnswer: 1,
      explanation:
        "The Dropdown widget presents a list of options (static values or dynamic from an Object Set) and lets users select one. It is commonly used as a filter to drive other widgets on the page and is one of the most fundamental Workshop input widgets.",
      category: "workshop"
    },
    {
      id: "q9-02",
      section: 9,
      question:
        "In Workshop, Variables serve as the shared state that connects widgets and enables interactivity.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Variables are the core mechanism for interactivity in Workshop. Widgets read from and write to Variables, creating a reactive data flow. For example, a dropdown sets a variable, and a table filters its data based on that variable.",
      category: "workshop"
    },
    {
      id: "q9-03",
      section: 9,
      question:
        "What is the purpose of Events in Workshop?",
      type: "multiple_choice",
      options: [
        "To schedule pipeline builds",
        "To define triggered side effects (setting a variable, opening a panel, submitting an action) when a user interacts with a widget",
        "To log errors in the console",
        "To export data to CSV"
      ],
      correctAnswer: 1,
      explanation:
        "Events define what happens when a user interacts with a widget (click, select, submit). Events can set variables, open/close panels, submit Actions, navigate to other pages, and more. They are the glue that makes Workshop applications interactive and responsive.",
      category: "workshop"
    },
    {
      id: "q9-04",
      section: 9,
      question:
        "Workshop applications are built directly on top of the Ontology, using Object Types, Link Types, and Action Types.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Workshop is deeply integrated with the Ontology. Widgets display data from Object Types, tables navigate Links, and buttons submit Actions. The Ontology must be well-modeled before building Workshop applications, as the app directly reflects the Ontology structure.",
      category: "workshop"
    },
    {
      id: "q9-05",
      section: 9,
      question:
        "What is an Object Set binding in Workshop?",
      type: "multiple_choice",
      options: [
        "A JavaScript library for object serialization",
        "A configuration that connects a widget to a filtered collection of Ontology Objects, determining which data the widget displays",
        "A CSS styling rule for Object cards",
        "A database connection string"
      ],
      correctAnswer: 1,
      explanation:
        "Object Set bindings connect widgets to the Ontology data they display. A table widget bound to a filtered Employees Object Set shows those employees. Bindings can be filtered by variables, enabling dynamic filtering as users interact with the application.",
      category: "workshop"
    },
    {
      id: "q9-06",
      section: 9,
      question:
        "What are Modules in Workshop?",
      type: "multiple_choice",
      options: [
        "External JavaScript plugins",
        "Reusable, self-contained groups of widgets that can be shared across multiple Workshop applications",
        "Database modules for SQL queries",
        "Server-side compute modules"
      ],
      correctAnswer: 1,
      explanation:
        "Modules are reusable groups of widgets, variables, and events that can be embedded in multiple Workshop applications. They promote consistency and reduce duplication. For example, a Customer Detail Card module can be reused across different apps.",
      category: "workshop"
    },
    {
      id: "q9-07",
      section: 9,
      question:
        "Workshop supports conditional visibility, where widgets are shown or hidden based on variable values.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Conditional visibility allows widgets or entire sections to show or hide based on variable values, user roles, or other conditions. For example, an Approve button might only appear when a user has manager permissions.",
      category: "workshop"
    },
    {
      id: "q9-08",
      section: 9,
      question:
        "How are Actions triggered in a Workshop application?",
      type: "multiple_choice",
      options: [
        "Actions run automatically every minute",
        "Users trigger Actions via button clicks, form submissions, or events; the Action submits changes to the Ontology",
        "Actions are triggered by pipeline builds only",
        "Actions are defined in SQL and run on the database"
      ],
      correctAnswer: 1,
      explanation:
        "In Workshop, Actions are typically triggered by user interactions: clicking a button, submitting a form, or via events. The Action collects parameter values from variables or user inputs, validates them against the Action Type's rules, and submits changes to the Ontology.",
      category: "workshop"
    },
    {
      id: "q9-09",
      section: 9,
      question:
        "Workshop supports layout options including tabs, panels, split views, and stacked layouts.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Workshop provides flexible layout options including tabs for multi-page navigation, panels for slide-out detail views, split views for side-by-side content, and stacked layouts for vertical arrangement. Good layout design is essential for usable applications.",
      category: "workshop"
    },
    {
      id: "q9-10",
      section: 9,
      question:
        "What is the recommended approach for building forms in Workshop?",
      type: "multiple_choice",
      options: [
        "Build forms entirely in custom HTML",
        "Use input widgets (text input, dropdown, date picker) bound to variables, with a submit button that triggers an Action",
        "Forms are not supported in Workshop",
        "Use a separate Slate application for all forms"
      ],
      correctAnswer: 1,
      explanation:
        "Workshop forms use input widgets (text inputs, dropdowns, date pickers, toggles) each bound to a variable. A submit button triggers an Action that passes the variable values as parameters. This creates a clean, reactive form pattern integrated with the Ontology.",
      category: "workshop"
    },
    {
      id: "q9-11",
      section: 9,
      question:
        "Workshop permissions control who can view, edit, or configure an application.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Workshop applications have their own permissions controlling who can view (use) the application and who can edit (configure) it. The data visible within the app is also governed by Ontology permissions, so different users may see different data in the same application.",
      category: "workshop"
    },
    {
      id: "q9-12",
      section: 9,
      question:
        "A user wants a dashboard showing alerts, where clicking an alert opens details. Which Workshop pattern achieves this?",
      type: "multiple_choice",
      options: [
        "Use a single static HTML page",
        "Use an Object Table with a row click event that sets a variable, and a slide-out panel that displays details of the selected alert",
        "Use only chart widgets",
        "Build it entirely in Contour"
      ],
      correctAnswer: 1,
      explanation:
        "The master-detail pattern uses a table to list items. When a user clicks a row, an event sets a variable to the selected Object. A panel displays details of the selected Object. This is one of the most common and effective Workshop patterns.",
      category: "workshop"
    },
    {
      id: "q9-13",
      section: 9,
      question:
        "Templates in Workshop allow you to create reusable application layouts that can be applied to new applications.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Workshop templates provide pre-built application layouts and patterns that can be used as starting points for new applications. This accelerates development and promotes consistent UX patterns across an organization's Foundry applications.",
      category: "workshop"
    },
    {
      id: "q9-14",
      section: 9,
      question:
        "Which widget type is best for displaying geographic locations of Objects on a map?",
      type: "multiple_choice",
      options: [
        "Object Table",
        "Map widget with Object Set binding to Objects with geospatial properties",
        "Bar chart",
        "Text widget"
      ],
      correctAnswer: 1,
      explanation:
        "The Map widget renders Objects with geospatial properties on an interactive map. It supports clustering, custom markers, pop-ups with Object details, and filtering via variables. This is ideal for fleet tracking, store locations, or asset management.",
      category: "workshop"
    },
    {
      id: "q9-15",
      section: 9,
      question:
        "Workshop applications can filter Object Sets dynamically based on user selections without writing any code.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Workshop's variable system enables no-code dynamic filtering. A dropdown sets a variable, and Object Set configurations use that variable as a filter criterion. The table or chart updates automatically as the user changes selections.",
      category: "workshop"
    },
    {
      id: "q9-16",
      section: 9,
      question:
        "What is a common performance issue in Workshop applications?",
      type: "multiple_choice",
      options: [
        "Using too many colors in the theme",
        "Loading excessively large Object Sets without pagination or filtering, causing slow rendering",
        "Having too many tabs",
        "Using the Map widget"
      ],
      correctAnswer: 1,
      explanation:
        "Loading very large Object Sets (millions of Objects) without filtering causes slow load times and poor performance. Best practices include applying initial filters, using server-side pagination in tables, and leveraging aggregations instead of loading raw Objects when possible.",
      category: "workshop"
    },
    {
      id: "q9-17",
      section: 9,
      question:
        "Workshop supports embedding external web content using iframe widgets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Workshop provides an HTML/iframe widget that can embed external web content, custom HTML, or third-party visualizations within a Workshop application. This extends Workshop's capabilities beyond its built-in widgets.",
      category: "workshop"
    },
    {
      id: "q9-18",
      section: 9,
      question:
        "What UX best practice should be followed when designing Workshop applications?",
      type: "multiple_choice",
      options: [
        "Show all available data on a single page to minimize clicks",
        "Design for the user's workflow: present the most important information first, use progressive disclosure, and minimize cognitive load",
        "Use as many widgets as possible to demonstrate platform capabilities",
        "Require users to understand the Ontology schema"
      ],
      correctAnswer: 1,
      explanation:
        "Good Workshop UX design prioritizes the user's workflow. Present key information and actions prominently, use progressive disclosure (show details on demand), and minimize cognitive load. Users should accomplish their tasks efficiently without needing to understand the underlying Ontology.",
      category: "workshop"
    },
    {
      id: "q9-19",
      section: 9,
      question:
        "A well-modeled Ontology directly translates into more effective Workshop applications.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Since Workshop is built on the Ontology, the quality of the Ontology directly impacts application quality. Well-defined Object Types, clear Link Types, meaningful title properties, and properly configured Actions make Workshop applications easier to build and more intuitive for users.",
      category: "workshop"
    },
    {
      id: "q9-20",
      section: 9,
      question:
        "Which of the following is NOT a standard Workshop widget type?",
      type: "multiple_choice",
      options: [
        "Object Table",
        "Chart (bar, line, pie)",
        "3D Virtual Reality Viewer",
        "Timeline"
      ],
      correctAnswer: 2,
      explanation:
        "Workshop includes many widget types: Object Table, various charts (bar, line, pie, scatter), Maps, Timelines, text inputs, dropdowns, buttons, images, and more. There is no built-in 3D Virtual Reality viewer, though custom content can be embedded via iframe widgets.",
      category: "workshop"
    }
  ],

  10: [
    {
      id: "q10-01",
      section: 10,
      question: "What is the primary difference between Slate and Workshop in Foundry?",
      type: "multiple_choice",
      options: [
        "Slate is newer; Workshop is deprecated",
        "Slate is a code-first, highly customizable application builder using HTML/CSS/JS; Workshop is a no-code/low-code builder focused on Ontology-backed applications",
        "Workshop supports maps; Slate does not",
        "Slate is for data pipelines; Workshop is for applications"
      ],
      correctAnswer: 1,
      explanation: "Slate provides a code-first environment with full HTML, CSS, and JavaScript control for building highly customized dashboards. Workshop is a no-code/low-code builder designed around the Ontology. Workshop is preferred for most use cases; Slate is used when deep UI customization is required.",
      category: "analytics"
    },
    {
      id: "q10-02",
      section: 10,
      question: "Contour is Foundry's point-and-click analytical tool for exploring and analyzing data without writing code.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Contour provides an intuitive, point-and-click interface for data exploration. Users can filter, aggregate, pivot, join, and chart data without coding. It is designed for analysts who need to explore data interactively.",
      category: "analytics"
    },
    {
      id: "q10-03",
      section: 10,
      question: "When should you use Contour instead of Workshop?",
      type: "multiple_choice",
      options: [
        "When building operational applications for end users",
        "When performing ad-hoc data exploration and analysis where the user is an analyst, not an operational end user",
        "When you need to submit Actions to the Ontology",
        "When you need real-time dashboards for executives"
      ],
      correctAnswer: 1,
      explanation: "Contour is best for analysts doing exploratory data analysis, ad-hoc queries, and building analytical boards. Workshop is better for operational applications where end users need to view data, take actions, and complete workflows.",
      category: "analytics"
    },
    {
      id: "q10-04",
      section: 10,
      question: "Quiver is a Foundry tool for building interactive reports and dashboards focused on metrics and KPIs.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Quiver provides a dashboard and reporting experience focused on metrics, KPIs, and executive-level summaries. It offers chart types, tables, and layout options optimized for building polished reports that can be shared across the organization.",
      category: "analytics"
    },
    {
      id: "q10-05",
      section: 10,
      question: "In Slate, data bindings connect widgets to Foundry datasets or Ontology queries to display dynamic content.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Slate data bindings fetch data from Foundry datasets, Ontology Object Sets, or custom queries and make it available to Slate widgets and custom JavaScript code. This enables dynamic, data-driven visualizations.",
      category: "analytics"
    },
    {
      id: "q10-06",
      section: 10,
      question: "Which tool would you recommend for an executive who needs a weekly KPI summary dashboard?",
      type: "multiple_choice",
      options: [
        "Code Workbook",
        "Quiver for a polished, chart-driven dashboard, or Workshop if Ontology Actions are also needed",
        "Pipeline Builder",
        "A raw SQL query shared via email"
      ],
      correctAnswer: 1,
      explanation: "For executive dashboards focused on KPIs and metrics, Quiver provides polished charts and layouts optimized for reporting. If the dashboard also needs Ontology interactions (filtering by Objects, taking Actions), Workshop with chart widgets is the better choice.",
      category: "analytics"
    },
    {
      id: "q10-07",
      section: 10,
      question: "Contour supports joining multiple datasets together in a single analysis without writing code.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Contour allows users to join multiple datasets by dragging and dropping them onto the analysis canvas and configuring join conditions. This enables analysts to combine data from different sources without writing SQL or Python.",
      category: "analytics"
    },
    {
      id: "q10-08",
      section: 10,
      question: "What is a Contour board?",
      type: "multiple_choice",
      options: [
        "A Kanban-style project management tool",
        "A saveable analysis combining data transformations, filters, and visualizations that can be shared with others",
        "A configuration panel for Spark settings",
        "A user permissions dashboard"
      ],
      correctAnswer: 1,
      explanation: "A Contour board is a saveable analytical workspace that combines data source selections, transformations (joins, filters, aggregations), and visualizations (charts, tables, pivot tables). Boards can be shared with colleagues for collaborative analysis.",
      category: "analytics"
    },
    {
      id: "q10-09",
      section: 10,
      question: "Slate applications require knowledge of HTML, CSS, and JavaScript to build, unlike Workshop's no-code approach.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Slate is a code-first tool where builders write HTML templates, CSS styles, and JavaScript logic. This provides maximum flexibility but requires web development skills. Workshop's no-code interface is more accessible for standard Ontology-driven application patterns.",
      category: "analytics"
    },
    {
      id: "q10-10",
      section: 10,
      question: "When should you use Slate instead of Workshop?",
      type: "multiple_choice",
      options: [
        "For every application; Slate is always better",
        "When you need highly customized visualizations or UI patterns not possible with Workshop's built-in widgets",
        "When you need to connect to the Ontology",
        "For simple CRUD applications"
      ],
      correctAnswer: 1,
      explanation: "Use Slate when you need custom visualizations (D3.js, custom charts), pixel-perfect layouts, or UI interactions not available in Workshop's widget library. For most Ontology-driven operational applications, Workshop is faster to build and easier to maintain.",
      category: "analytics"
    },
    {
      id: "q10-11",
      section: 10,
      question: "Contour analyses can be saved as datasets for use in downstream pipelines.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Contour analyses can be materialized (saved) as Foundry datasets. This allows analysts to prepare data using point-and-click tools and then make the results available to pipelines, the Ontology, or other consumers.",
      category: "analytics"
    },
    {
      id: "q10-12",
      section: 10,
      question: "Which visualization principle is most important when designing dashboards for decision-makers?",
      type: "multiple_choice",
      options: [
        "Use as many chart types as possible to show variety",
        "Prioritize clarity: use appropriate chart types for the data, minimize chartjunk, and highlight key insights",
        "Always use 3D charts for visual impact",
        "Include raw data tables instead of charts"
      ],
      correctAnswer: 1,
      explanation: "Effective dashboards prioritize clarity and actionability. Choose chart types appropriate for the data (bar for comparison, line for trends, scatter for correlation), minimize visual clutter, use consistent color coding, and draw attention to the most important insights.",
      category: "analytics"
    },
    {
      id: "q10-13",
      section: 10,
      question: "Quiver supports drilling down from summary metrics to detailed data.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Quiver dashboards support drill-down capabilities where users can click on summary metrics to see underlying detail data. This enables the progressive disclosure pattern: executives see top-level KPIs and can drill into specifics when something needs attention.",
      category: "analytics"
    },
    {
      id: "q10-14",
      section: 10,
      question: "An analyst needs to quickly explore a new dataset, filter rows, create aggregations, and share a chart. Which tool is most appropriate?",
      type: "multiple_choice",
      options: [
        "Workshop",
        "Code Repository",
        "Contour",
        "Pipeline Builder"
      ],
      correctAnswer: 2,
      explanation: "Contour is purpose-built for this workflow: quick, interactive data exploration with point-and-click filtering, aggregation, and charting. It requires no setup or coding and allows the analyst to share the analysis board immediately.",
      category: "analytics"
    },
    {
      id: "q10-15",
      section: 10,
      question: "Slate data bindings can refresh automatically on a schedule or when underlying data changes.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Slate data bindings can be configured to refresh on a schedule (e.g., every 30 seconds) or when the underlying dataset receives a new transaction. This keeps Slate dashboards current without requiring manual refresh.",
      category: "analytics"
    },
    {
      id: "q10-16",
      section: 10,
      question: "Which tool combination would you recommend for a use case requiring both analytical exploration (for analysts) and an operational dashboard (for field workers)?",
      type: "multiple_choice",
      options: [
        "Contour for both",
        "Workshop for both",
        "Contour for analytical exploration and Workshop for the operational dashboard",
        "Slate for both"
      ],
      correctAnswer: 2,
      explanation: "Different personas need different tools. Contour's interactive exploration interface serves analysts well, while Workshop's Ontology-driven application framework provides field workers with a focused, task-oriented dashboard with action capabilities.",
      category: "analytics"
    },
    {
      id: "q10-17",
      section: 10,
      question: "Foundry's analytics tools (Contour, Quiver, Workshop) can all display data from the same underlying datasets and Ontology.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "All of Foundry's analytics and application tools share the same data layer. Contour, Quiver, Workshop, and Slate can all access the same datasets and Ontology Objects, ensuring consistency across presentation layers.",
      category: "analytics"
    },
    {
      id: "q10-18",
      section: 10,
      question: "What is the primary advantage of Contour's board concept for analytics reporting?",
      type: "multiple_choice",
      options: [
        "Boards run on GPU for faster processing",
        "Boards combine data exploration steps, transformations, and visualizations into a shareable, reproducible analysis",
        "Boards replace the need for data pipelines",
        "Boards can only contain one chart"
      ],
      correctAnswer: 1,
      explanation: "Contour boards capture the entire analysis workflow in a shareable unit. This makes analyses reproducible, collaborative, and maintainable. Boards update automatically when underlying data changes.",
      category: "analytics"
    },
    {
      id: "q10-19",
      section: 10,
      question: "Slate applications can call Foundry Functions to execute business logic and display results.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Slate can invoke Foundry Functions via JavaScript, enabling complex business logic execution and Ontology operations within custom UIs. This bridges Slate's custom visualization capabilities with Foundry's serverless compute and Ontology ecosystem.",
      category: "analytics"
    },
    {
      id: "q10-20",
      section: 10,
      question: "What best practice should you follow when choosing between Foundry's visualization and application tools?",
      type: "multiple_choice",
      options: [
        "Always use the most complex tool available",
        "Match the tool to the user persona: Contour for analyst exploration, Workshop for operational apps, Quiver for reporting, Slate for custom UIs",
        "Use Slate for everything because it is most flexible",
        "Let the end user choose which tool to use"
      ],
      correctAnswer: 1,
      explanation: "Select tools based on user persona and use case requirements. Contour for analytical exploration, Workshop for Ontology-driven operational applications, Quiver for KPI dashboards and reports, and Slate for highly customized visualizations.",
      category: "analytics"
    }
  ],

  11: [
    {
      id: "q11-01",
      section: 11,
      question: "What is a Function in Foundry?",
      type: "multiple_choice",
      options: [
        "A Python script that runs on a schedule",
        "A reusable piece of TypeScript logic that operates on the Ontology and can be called from Workshop, Actions, OSDK, and other applications",
        "A data connector configuration",
        "A Spark job definition"
      ],
      correctAnswer: 1,
      explanation: "Functions are TypeScript logic blocks authored in Code Repositories that operate on the Ontology. They can query Objects, compute derived values, enforce business rules, and return results. Functions are callable from Workshop, Actions, AIP Logic, OSDK, and other Foundry surfaces.",
      category: "integration"
    },
    {
      id: "q11-02",
      section: 11,
      question: "The OSDK allows external applications to interact with the Foundry Ontology via type-safe client libraries.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "OSDK auto-generates type-safe client libraries (in TypeScript or Python) from your Ontology schema. External applications can use these libraries to read Objects, execute Actions, call Functions, and subscribe to changes with full type safety.",
      category: "integration"
    },
    {
      id: "q11-03",
      section: 11,
      question: "What does this Functions code do?\n\n```typescript\n@Function()\npublic getHighValueOrders(orders: ObjectSet<Order>): ObjectSet<Order> {\n  return orders.filter(o => o.totalAmount.gt(10000));\n}\n```",
      type: "multiple_choice",
      options: [
        "Deletes all orders over $10,000",
        "Filters an Object Set of Orders to only those with totalAmount greater than 10,000",
        "Creates new Order Objects with amount 10,000",
        "Calculates the sum of all order amounts"
      ],
      correctAnswer: 1,
      explanation: "This Function takes an ObjectSet of Order Objects and returns a filtered subset containing only Orders where totalAmount exceeds 10,000. This Function can be called from Workshop to display high-value orders or used in other applications.",
      category: "integration"
    },
    {
      id: "q11-04",
      section: 11,
      question: "Foundry provides a REST API for programmatic access to datasets, the Ontology, and other platform resources.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Foundry exposes REST APIs for accessing datasets (read/write), the Ontology (query Objects, execute Actions), and platform resources. These APIs can be used by external systems, scripts, and applications that need to integrate with Foundry programmatically.",
      category: "integration"
    },
    {
      id: "q11-05",
      section: 11,
      question: "What is foundry-dev-tools?",
      type: "multiple_choice",
      options: [
        "A Foundry UI testing framework",
        "A Python library for local development that enables reading/writing Foundry datasets and testing transforms locally",
        "A Spark cluster management tool",
        "A Workshop widget library"
      ],
      correctAnswer: 1,
      explanation: "foundry-dev-tools is a Python library that enables local development with Foundry. Developers can read Foundry datasets into local pandas/PySpark DataFrames, test transforms locally, and write results back. This accelerates development by allowing iteration without deploying to the platform.",
      category: "integration"
    },
    {
      id: "q11-06",
      section: 11,
      question: "Foundry provides an S3-compatible API that allows tools like Spark, pandas, and other S3 clients to read and write datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Foundry's S3-compatible API allows any tool that supports S3 (boto3, PySpark with S3 paths, AWS CLI, etc.) to read and write Foundry datasets. This enables seamless integration with the broader data ecosystem without custom client code.",
      category: "integration"
    },
    {
      id: "q11-07",
      section: 11,
      question: "What does this OSDK code do?\n\n```typescript\nconst employees = await client.ontology.objects.Employee\n  .where({ department: 'Engineering' })\n  .fetchPage();\n```",
      type: "multiple_choice",
      options: [
        "Creates new Employee Objects in the Engineering department",
        "Queries the Ontology for Employee Objects where department is Engineering and fetches a page of results",
        "Deletes all Engineering employees",
        "Updates all employees to the Engineering department"
      ],
      correctAnswer: 1,
      explanation: "This OSDK code queries the Foundry Ontology for Employee Objects filtered by department 'Engineering'. fetchPage() retrieves a paginated set of results. The OSDK provides type-safe access to Ontology Objects from external applications.",
      category: "integration"
    },
    {
      id: "q11-08",
      section: 11,
      question: "Authentication for Foundry APIs is handled through OAuth2 bearer tokens issued by Multipass.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "All Foundry API access requires authentication via bearer tokens issued by Multipass. For user-facing applications, OAuth2 flows obtain tokens. For service accounts and scripts, personal access tokens or client credentials can be used.",
      category: "integration"
    },
    {
      id: "q11-09",
      section: 11,
      question: "What are webhooks used for in Foundry integration?",
      type: "multiple_choice",
      options: [
        "Styling Workshop applications",
        "Sending HTTP notifications to external systems when events occur in Foundry (e.g., dataset updated, Action executed)",
        "Connecting to JDBC databases",
        "Scheduling Spark jobs"
      ],
      correctAnswer: 1,
      explanation: "Webhooks enable Foundry to push notifications to external systems when specific events occur (dataset transactions, Action executions, build completions). This allows external systems to react to Foundry events in near-real-time without polling.",
      category: "integration"
    },
    {
      id: "q11-10",
      section: 11,
      question: "The OSDK supports both TypeScript and Python client libraries.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "OSDK generates type-safe client libraries for both TypeScript (for web applications, Node.js backends) and Python (for scripts, data science workflows, backend services). Both provide the same Ontology access capabilities with language-appropriate APIs.",
      category: "integration"
    },
    {
      id: "q11-11",
      section: 11,
      question: "What does this Function code demonstrate?\n\n```typescript\n@Function()\npublic computeOrderSummary(customer: Customer): OrderSummary {\n  const orders = customer.orders.getAll();\n  const total = orders.reduce((sum, o) => sum + o.amount, 0);\n  return { totalOrders: orders.length, totalSpent: total };\n}\n```",
      type: "multiple_choice",
      options: [
        "Deleting a customer's orders",
        "Navigating a Link from Customer to their Orders, aggregating count and total amount, and returning a summary",
        "Creating new orders for a customer",
        "Filtering customers by order count"
      ],
      correctAnswer: 1,
      explanation: "This Function takes a Customer Object, traverses the Link to their Orders (customer.orders.getAll()), computes aggregate metrics (count and total amount), and returns a typed summary object. This demonstrates Functions traversing Ontology links for computed properties.",
      category: "integration"
    },
    {
      id: "q11-12",
      section: 11,
      question: "External applications built with OSDK can execute Actions on the Foundry Ontology.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "OSDK client libraries can execute Actions defined in the Ontology, allowing external applications to create, update, or delete Objects. All Action validation rules and permissions are enforced server-side, ensuring data integrity regardless of the client.",
      category: "integration"
    },
    {
      id: "q11-13",
      section: 11,
      question: "What is the recommended approach for building a customer-facing web application that reads from the Foundry Ontology?",
      type: "multiple_choice",
      options: [
        "Give customers direct Foundry platform access",
        "Use OSDK TypeScript client in a React/Angular/Vue app with OAuth2 authentication for secure, type-safe Ontology access",
        "Export data to CSV and build a static website",
        "Use Contour and share the URL publicly"
      ],
      correctAnswer: 1,
      explanation: "The OSDK TypeScript client integrates with modern web frameworks (React, Angular, Vue) and uses OAuth2 for secure authentication. This provides type-safe access to Ontology Objects, Functions, and Actions while respecting all Foundry permissions.",
      category: "integration"
    },
    {
      id: "q11-14",
      section: 11,
      question: "Foundry's REST API follows standard HTTP conventions with JSON request/response bodies.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Foundry REST APIs use standard HTTP methods (GET, POST, PUT, DELETE), JSON request/response bodies, and HTTP status codes. This makes them accessible from any programming language or tool that supports HTTP requests.",
      category: "integration"
    },
    {
      id: "q11-15",
      section: 11,
      question: "What does this OSDK Python code do?\n\n```python\nfrom foundry_sdk import FoundryClient\nclient = FoundryClient()\nresult = client.ontology.actions.ApproveRequest.apply(\n    request_id='REQ-123',\n    approved_by='jane.smith'\n)\n```",
      type: "multiple_choice",
      options: [
        "Reads an Object with ID REQ-123",
        "Executes the ApproveRequest Action on the Ontology with the given parameters",
        "Creates a new Function called ApproveRequest",
        "Deletes the request REQ-123"
      ],
      correctAnswer: 1,
      explanation: "This Python OSDK code executes the ApproveRequest Action Type on the Foundry Ontology, passing request_id and approved_by as parameters. The Action's validation rules and side effects are processed server-side.",
      category: "integration"
    },
    {
      id: "q11-16",
      section: 11,
      question: "Functions in Foundry execute server-side on Foundry infrastructure, not on the client.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Functions execute on Foundry's server-side compute infrastructure. When called from Workshop, OSDK, or other clients, the request is sent to Foundry, the Function runs on the server with access to the Ontology, and results are returned to the caller.",
      category: "integration"
    },
    {
      id: "q11-17",
      section: 11,
      question: "What is the primary security benefit of using OSDK over direct REST API calls?",
      type: "multiple_choice",
      options: [
        "OSDK encrypts data with a stronger algorithm",
        "OSDK provides type-safe, auto-generated clients that reduce incorrect API usage, while all permissions are enforced server-side",
        "OSDK bypasses authentication for faster access",
        "OSDK does not provide security benefits over REST"
      ],
      correctAnswer: 1,
      explanation: "OSDK generates type-safe clients from the Ontology schema, reducing errors from incorrect property names, wrong types, or invalid API calls. All permissions, markings, and validation rules are enforced server-side regardless of client type.",
      category: "integration"
    },
    {
      id: "q11-18",
      section: 11,
      question: "Foundry supports third-party application registrations for OAuth2 authentication flows.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Foundry allows registering third-party applications that use OAuth2 flows (authorization code, client credentials) to authenticate users and obtain access tokens. This is essential for building external web and mobile applications that integrate with Foundry via OSDK.",
      category: "integration"
    },
    {
      id: "q11-19",
      section: 11,
      question: "What is a best practice for integrating external systems with Foundry?",
      type: "multiple_choice",
      options: [
        "Bypass authentication for simplicity",
        "Use service account tokens with least-privilege permissions, validate inputs, and handle errors gracefully",
        "Give the external system admin access to everything",
        "Store API tokens in client-side JavaScript code"
      ],
      correctAnswer: 1,
      explanation: "Best practices include: using service accounts with least-privilege permissions, validating all inputs before sending to Foundry, handling API errors and rate limits gracefully, and never exposing tokens in client-side code.",
      category: "integration"
    },
    {
      id: "q11-20",
      section: 11,
      question: "OSDK clients automatically handle pagination when querying large Object Sets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "OSDK clients provide pagination helpers (fetchPage, fetchAll, async iterators) to handle large result sets. fetchPage returns a page with a continuation token, while fetchAll or async iteration handles multiple pages automatically.",
      category: "integration"
    }
  ],

  12: [
    {
      id: "q12-01",
      section: 12,
      question: "What is AIP Logic in Foundry?",
      type: "multiple_choice",
      options: [
        "A data connector for AI models",
        "A way to define LLM-backed logic using natural language prompts that can be called like Functions",
        "A pipeline scheduling tool",
        "A Spark configuration setting"
      ],
      correctAnswer: 1,
      explanation: "AIP Logic allows you to define AI-powered logic using natural language prompts. These logic blocks take inputs (including Ontology Objects), send them to an LLM with your prompt, and return structured outputs. They can be used in Workshop, Actions, and other Foundry applications.",
      category: "aip"
    },
    {
      id: "q12-02",
      section: 12,
      question: "AIP Assist helps end users interact with Foundry applications using natural language.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP Assist provides natural language interfaces within Foundry applications. End users can ask questions, filter data, and get AI-generated summaries using plain English instead of manually configuring filters.",
      category: "aip"
    },
    {
      id: "q12-03",
      section: 12,
      question: "How does AIP integrate with the Ontology?",
      type: "multiple_choice",
      options: [
        "AIP replaces the Ontology entirely",
        "AIP uses the Ontology as context, grounding LLM responses in real enterprise data rather than relying on general knowledge alone",
        "AIP and the Ontology are completely separate systems",
        "The Ontology stores AI model weights"
      ],
      correctAnswer: 1,
      explanation: "AIP is grounded in the Ontology. When LLMs process queries, they have access to actual Object Types, properties, links, and data. This grounding ensures AI responses are factual and relevant to the enterprise's specific data rather than hallucinated from general knowledge.",
      category: "aip"
    },
    {
      id: "q12-04",
      section: 12,
      question: "AIP Logic outputs must be structured (typed), not free-form text, to be usable in downstream applications.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP Logic blocks define structured output schemas (strings, numbers, booleans, enums, objects) so their results can be consumed programmatically by Workshop widgets, Actions, or other Functions. This ensures AI outputs integrate cleanly into application workflows.",
      category: "aip"
    },
    {
      id: "q12-05",
      section: 12,
      question: "What is the role of prompt engineering in AIP Logic?",
      type: "multiple_choice",
      options: [
        "Writing SQL queries for the database",
        "Crafting clear, specific instructions for the LLM to produce accurate, structured responses from Ontology data",
        "Configuring Spark cluster settings",
        "Designing Workshop widget layouts"
      ],
      correctAnswer: 1,
      explanation: "Prompt engineering in AIP Logic involves writing clear instructions that guide the LLM to produce desired structured output. Good prompts include domain context, specify expected output format, provide examples, and handle edge cases.",
      category: "aip"
    },
    {
      id: "q12-06",
      section: 12,
      question: "AIP permissions ensure that LLM-powered features respect the same data access controls as the rest of the platform.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP enforces the same permissions model as the rest of Foundry. LLMs can only access Ontology Objects that the requesting user has permission to see. Markings, Object-level permissions, and Project permissions all apply.",
      category: "aip"
    },
    {
      id: "q12-07",
      section: 12,
      question: "What is RAG (Retrieval-Augmented Generation) in the context of Foundry AIP?",
      type: "multiple_choice",
      options: [
        "A type of data connector",
        "A technique where relevant Ontology Objects and documents are retrieved and provided as context to the LLM before generating a response",
        "A data quality tool",
        "A Spark optimization strategy"
      ],
      correctAnswer: 1,
      explanation: "RAG in Foundry AIP retrieves relevant Objects, properties, and documents from the Ontology and passes them as context to the LLM. This grounds the AI's response in actual enterprise data, reducing hallucinations and ensuring factual answers.",
      category: "aip"
    },
    {
      id: "q12-08",
      section: 12,
      question: "AI safety in Foundry AIP includes guardrails that prevent LLMs from taking unauthorized actions or accessing restricted data.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP includes safety guardrails: permission enforcement, action constraints (only pre-defined Actions with validation), output validation (type-checked structured outputs), and audit logging of all AI interactions.",
      category: "aip"
    },
    {
      id: "q12-09",
      section: 12,
      question: "What is an AI FDE expected to understand about AIP?",
      type: "multiple_choice",
      options: [
        "Only how to train LLMs from scratch",
        "How to configure AIP Logic, design effective prompts, integrate AI with the Ontology, and advise on responsible AI deployment",
        "Only how to use AIP Assist as an end user",
        "How to build GPU hardware"
      ],
      correctAnswer: 1,
      explanation: "An AI FDE should understand how to configure AIP Logic blocks, write effective prompts, integrate AI with the Ontology and Workshop, set up RAG patterns, advise on AI safety and permissions, and help customers design AI-powered workflows responsibly.",
      category: "aip"
    },
    {
      id: "q12-10",
      section: 12,
      question: "AIP Logic blocks can be called from Workshop widgets to provide AI-generated insights in operational applications.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP Logic blocks integrate with Workshop just like Functions. They can be bound to widgets, called on button clicks, or used to compute dynamic content. This enables AI-powered features like summaries, recommendations, or risk assessments directly in operational applications.",
      category: "aip"
    },
    {
      id: "q12-11",
      section: 12,
      question: "What is AIP Automate used for?",
      type: "multiple_choice",
      options: [
        "Automatically formatting code in Code Repositories",
        "Orchestrating automated, AI-driven workflows that monitor conditions and take Actions autonomously",
        "Automating user account creation",
        "Automatically scaling Spark clusters"
      ],
      correctAnswer: 1,
      explanation: "AIP Automate enables autonomous AI-driven workflows that monitor conditions in the Ontology, evaluate situations using LLM reasoning, and take Actions when appropriate. For example, it could monitor inventory levels and create reorder Actions automatically.",
      category: "aip"
    },
    {
      id: "q12-12",
      section: 12,
      question: "LLMs in AIP can only use models hosted by Palantir and cannot integrate with external model providers.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "AIP supports integration with multiple LLM providers including Palantir-hosted models and external providers. The platform provides a model-agnostic interface so organizations can choose the LLM that best fits their requirements for capability, cost, and data governance.",
      category: "aip"
    },
    {
      id: "q12-13",
      section: 12,
      question: "What best practice should you follow when writing AIP Logic prompts?",
      type: "multiple_choice",
      options: [
        "Write vague prompts so the LLM has creative freedom",
        "Be specific about output format, provide examples, include relevant context, and handle edge cases explicitly",
        "Copy prompts from the internet without modification",
        "Avoid mentioning the Ontology in prompts"
      ],
      correctAnswer: 1,
      explanation: "Effective AIP Logic prompts specify expected output format, include examples of desired behavior, provide domain context, explicitly handle edge cases, and guide the LLM toward structured, deterministic responses.",
      category: "aip"
    },
    {
      id: "q12-14",
      section: 12,
      question: "All AIP interactions in Foundry are audit-logged for governance and compliance.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Every AIP interaction (prompts sent, responses received, actions taken) is audit-logged. This provides full traceability for compliance, enables monitoring of AI usage patterns, and supports investigation of any AI-generated decisions.",
      category: "aip"
    },
    {
      id: "q12-15",
      section: 12,
      question: "How does AIP handle sensitive data in prompts sent to LLMs?",
      type: "multiple_choice",
      options: [
        "Sensitive data is always sent to external LLMs without restriction",
        "AIP enforces permissions so only authorized data is included in prompts, and organizations can configure data residency policies for LLM processing",
        "All data is anonymized before sending to LLMs",
        "Sensitive data cannot be used with AIP at all"
      ],
      correctAnswer: 1,
      explanation: "AIP enforces Foundry's permission model so LLMs only receive data the requesting user can access. Organizations can configure data residency policies, choose between on-premises and cloud-hosted models, and control what data flows to which LLM endpoints.",
      category: "aip"
    },
    {
      id: "q12-16",
      section: 12,
      question: "AIP-powered Actions can modify Ontology Objects, but only if the Action Type validates the changes and the user has appropriate permissions.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "When AIP triggers an Action, the same validation rules, permission checks, and audit logging apply as for manually-triggered Actions. The AI cannot bypass security controls and operates within the same governance framework as human users.",
      category: "aip"
    },
    {
      id: "q12-17",
      section: 12,
      question: "What is the benefit of grounding LLM responses in the Ontology rather than using a generic LLM?",
      type: "multiple_choice",
      options: [
        "It makes the LLM respond faster",
        "It reduces hallucinations and ensures responses are based on actual enterprise data rather than generic knowledge",
        "It makes the LLM cheaper to run",
        "It eliminates the need for prompt engineering"
      ],
      correctAnswer: 1,
      explanation: "Grounding LLM responses in the Ontology provides the model with real enterprise data as context. This dramatically reduces hallucinations and ensures AI outputs reflect the actual state of the business rather than plausible-sounding but incorrect information.",
      category: "aip"
    },
    {
      id: "q12-18",
      section: 12,
      question: "AIP Logic can generate classification labels, summaries, sentiment scores, and other structured outputs from unstructured text.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP Logic excels at processing unstructured text and producing structured outputs. Common use cases include classifying support tickets, summarizing documents, extracting entities, scoring sentiment, and generating recommendations as typed outputs.",
      category: "aip"
    },
    {
      id: "q12-19",
      section: 12,
      question: "Which is a responsible AI practice when deploying AIP in production?",
      type: "multiple_choice",
      options: [
        "Deploy AI features without testing because LLMs are generally reliable",
        "Implement human-in-the-loop review for high-stakes decisions, monitor AI outputs, and clearly indicate when content is AI-generated",
        "Give the AI unrestricted access to all data for better results",
        "Hide the fact that AI is involved to avoid user skepticism"
      ],
      correctAnswer: 1,
      explanation: "Responsible AI deployment includes human-in-the-loop review for critical decisions, ongoing monitoring of AI output quality, clear labeling of AI-generated content, appropriate access controls, and regular evaluation of AI performance and fairness.",
      category: "aip"
    },
    {
      id: "q12-20",
      section: 12,
      question: "AIP can be used both for user-facing features (AI Assist, AI-generated insights) and backend automation (AIP Automate).",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP spans both user-facing and backend use cases. AIP Assist provides natural language interaction for end users, AIP Logic adds AI-computed fields in applications, and AIP Automate enables autonomous backend workflows.",
      category: "aip"
    }
  ],

  13: [
    {
      id: "q13-01",
      section: 13,
      question: "When scoping a new FDE engagement, what is the most important first step?",
      type: "multiple_choice",
      options: [
        "Immediately start building a demo in Workshop",
        "Understand the customer's business problem and desired outcomes before proposing any technical solution",
        "Set up a data pipeline from all available source systems",
        "Create an Ontology with as many Object Types as possible"
      ],
      correctAnswer: 1,
      explanation: "The most critical first step is understanding the customer's business problem, goals, and desired outcomes. An FDE must listen before building. Technical solutions should be driven by business needs, not the other way around. Starting with technology risks building the wrong thing.",
      category: "fde-skills"
    },
    {
      id: "q13-02",
      section: 13,
      question: "A good FDE should focus exclusively on technical implementation and leave all stakeholder communication to the account manager.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "FDEs are expected to manage stakeholder relationships directly. While account managers handle commercial aspects, FDEs must communicate progress, manage expectations, present technical findings, facilitate workshops, and build trust with technical and business stakeholders.",
      category: "fde-skills"
    },
    {
      id: "q13-03",
      section: 13,
      question: "What is the recommended approach for problem decomposition in an FDE engagement?",
      type: "multiple_choice",
      options: [
        "Solve the entire problem at once in a single deployment",
        "Break the problem into phases with quick wins early to build momentum, then tackle more complex use cases",
        "Focus only on the hardest problem first to demonstrate technical capability",
        "Wait for the customer to fully specify every requirement before starting"
      ],
      correctAnswer: 1,
      explanation: "Phased delivery with early quick wins is the FDE best practice. Start with high-value, lower-complexity use cases to demonstrate ROI quickly. This builds customer confidence and momentum, making it easier to tackle more complex problems in later phases.",
      category: "fde-skills"
    },
    {
      id: "q13-04",
      section: 13,
      question: "An effective FDE adapts their communication style based on whether they are speaking to technical engineers or business executives.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "FDEs must tailor their communication to the audience. With technical stakeholders, discuss architecture, data models, and implementation details. With executives, focus on business outcomes, ROI, timeline, and strategic value. The same information, framed differently, ensures each audience gets what they need.",
      category: "fde-skills"
    },
    {
      id: "q13-05",
      section: 13,
      question: "During a discovery session with a customer, which type of questions are most valuable?",
      type: "multiple_choice",
      options: [
        "Yes/no questions about whether they want specific features",
        "Open-ended questions about their current workflows, pain points, data sources, and decision-making processes",
        "Questions about their budget and timeline only",
        "Technical questions about their database schemas"
      ],
      correctAnswer: 1,
      explanation: "Open-ended discovery questions reveal the customer's workflows, pain points, and needs in their own words. Questions like 'Walk me through how you handle X today' and 'What would change if you had perfect information?' surface deeper insights than yes/no or purely technical questions.",
      category: "fde-skills"
    },
    {
      id: "q13-06",
      section: 13,
      question: "An FDE should always build exactly what the customer asks for, even if a better solution exists.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "FDEs should listen to the customer's needs but are expected to propose better solutions when their expertise suggests one. Customers describe symptoms and desired outcomes; FDEs diagnose root causes and recommend the most effective approach, while explaining the tradeoffs clearly.",
      category: "fde-skills"
    },
    {
      id: "q13-07",
      section: 13,
      question: "What is the best way to handle a customer requirement that is technically infeasible within the engagement timeline?",
      type: "multiple_choice",
      options: [
        "Agree to do it anyway and hope to figure it out later",
        "Refuse without offering alternatives",
        "Transparently explain the constraint, propose a phased approach or alternative that delivers partial value now with a path to the full solution later",
        "Ignore the requirement and focus on other tasks"
      ],
      correctAnswer: 2,
      explanation: "Transparency about constraints builds trust. Propose a realistic alternative that delivers value within the timeline while acknowledging the full vision. For example, 'We can build a manual workflow now and automate it in Phase 2' shows problem-solving ability and manages expectations.",
      category: "fde-skills"
    },
    {
      id: "q13-08",
      section: 13,
      question: "Sprint planning in an FDE engagement should prioritize tasks that deliver the highest business value with the least technical risk.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Effective sprint planning balances business value against technical risk and effort. High-value, low-risk tasks should be prioritized early to demonstrate ROI and build momentum. High-risk items should be de-risked through prototyping and research before committing to delivery timelines.",
      category: "fde-skills"
    },
    {
      id: "q13-09",
      section: 13,
      question: "A customer stakeholder is frustrated because they expected a feature to be delivered this week, but it was never promised. How should the FDE respond?",
      type: "multiple_choice",
      options: [
        "Blame the customer for misunderstanding",
        "Drop everything and build the feature immediately",
        "Acknowledge the miscommunication empathetically, clarify what was agreed upon, and work together to adjust priorities if the feature is important",
        "Escalate to your manager and avoid the conversation"
      ],
      correctAnswer: 2,
      explanation: "The best response combines empathy with clarity. Acknowledge the frustration, clarify the agreed-upon scope (referencing documentation), and collaboratively prioritize going forward. This maintains the relationship while setting clear expectations. Preventing this with regular status updates is even better.",
      category: "fde-skills"
    },
    {
      id: "q13-10",
      section: 13,
      question: "Requirements gathering should continue throughout the engagement, not just at the beginning.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Requirements evolve as stakeholders see working software and gain clarity on their needs. An iterative approach to requirements gathering, with regular demos and feedback loops, produces better outcomes than trying to capture all requirements upfront in a waterfall manner.",
      category: "fde-skills"
    },
    {
      id: "q13-11",
      section: 13,
      question: "What is the purpose of an executive presentation at the end of an FDE engagement?",
      type: "multiple_choice",
      options: [
        "To show off technical complexity and code",
        "To demonstrate business value delivered, align on outcomes, present ROI, and secure buy-in for continued investment",
        "To list every technical task completed",
        "To request more budget"
      ],
      correctAnswer: 1,
      explanation: "Executive presentations should focus on business value: what outcomes were achieved, what ROI was generated, and what the roadmap for continued value looks like. Avoid technical jargon; instead, connect Foundry capabilities to business metrics that executives care about.",
      category: "fde-skills"
    },
    {
      id: "q13-12",
      section: 13,
      question: "Trade-off analysis is an important FDE skill for helping customers make informed decisions about scope, timeline, and technical approach.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "FDEs frequently need to present trade-offs: build quickly with technical debt vs. invest in a robust solution, use no-code tools for speed vs. code for flexibility, prioritize feature A vs. feature B. Framing these as clear trade-offs with pros/cons empowers customers to make informed decisions.",
      category: "fde-skills"
    },
    {
      id: "q13-13",
      section: 13,
      question: "A customer has 15 use cases they want implemented. What is the recommended FDE approach?",
      type: "multiple_choice",
      options: [
        "Commit to all 15 use cases with a tight timeline",
        "Prioritize use cases by business value and feasibility, propose implementing 2-3 high-impact ones first, then iterate",
        "Tell the customer 15 use cases is too many and refuse",
        "Work on all 15 in parallel to show progress everywhere"
      ],
      correctAnswer: 1,
      explanation: "Prioritization is key. Work with the customer to rank use cases by business value, urgency, and feasibility. Propose a phased approach starting with 2-3 high-impact use cases that demonstrate the platform's value. This focused approach delivers tangible results rather than spreading effort too thin.",
      category: "fde-skills"
    },
    {
      id: "q13-14",
      section: 13,
      question: "Risk assessment in an FDE engagement should identify potential blockers (data quality, stakeholder availability, technical complexity) early.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Early risk identification allows proactive mitigation. Common risks include poor data quality in source systems, stakeholder unavailability for feedback, unclear requirements, technical complexity of integrations, and organizational change resistance. Identifying these early enables contingency planning.",
      category: "fde-skills"
    },
    {
      id: "q13-15",
      section: 13,
      question: "When presenting a technical demo to a non-technical audience, what approach is most effective?",
      type: "multiple_choice",
      options: [
        "Show the code and explain every technical detail",
        "Walk through the user's actual workflow, showing how the solution solves their real problems and makes their job easier",
        "Read from a slide deck without showing the application",
        "Skip the demo and just share screenshots via email"
      ],
      correctAnswer: 1,
      explanation: "Non-technical audiences respond best to demos framed around their workflow: 'Here is how you would handle [real scenario] with this tool.' Focus on outcomes (faster decisions, fewer errors, time saved) rather than implementation details. Use real or realistic data to make it tangible.",
      category: "fde-skills"
    },
    {
      id: "q13-16",
      section: 13,
      question: "An FDE should document decisions, assumptions, and data model rationale throughout the engagement for knowledge transfer.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Documentation of decisions, assumptions, data models, and architecture choices is essential for knowledge transfer. When the FDE transitions the project to the customer's team or another FDE, this documentation prevents loss of institutional knowledge and enables continuity.",
      category: "fde-skills"
    },
    {
      id: "q13-17",
      section: 13,
      question: "A customer asks 'Can Foundry do X?' and the honest answer is 'Not well.' How should an FDE respond?",
      type: "multiple_choice",
      options: [
        "Say yes and figure it out later",
        "Say no and end the conversation",
        "Be honest about the limitation, explain why, and propose an alternative approach that achieves the same business outcome using Foundry's strengths",
        "Redirect to the sales team"
      ],
      correctAnswer: 2,
      explanation: "Honesty about limitations builds trust and credibility. Rather than overpromising, explain the limitation, the reason behind it, and offer alternative approaches that achieve the business outcome. Customers respect this transparency more than discovering limitations after a failed implementation.",
      category: "fde-skills"
    },
    {
      id: "q13-18",
      section: 13,
      question: "Engagement management includes regular status updates, clear ownership of tasks, and proactive communication about blockers.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Good engagement management requires regular cadences (daily standups, weekly status updates), clear task ownership, proactive communication about blockers or risks, and shared visibility into progress. This prevents surprises and keeps all stakeholders aligned.",
      category: "fde-skills"
    },
    {
      id: "q13-19",
      section: 13,
      question: "What makes a good 'quick win' in the early phase of an FDE engagement?",
      type: "multiple_choice",
      options: [
        "The most technically impressive feature possible",
        "Something that delivers visible business value quickly, is relatively low-risk to implement, and demonstrates the platform's potential",
        "The feature that the most senior executive wants, regardless of complexity",
        "A complete end-to-end pipeline with all data sources connected"
      ],
      correctAnswer: 1,
      explanation: "Good quick wins are high-value but low-risk: they solve a real pain point, can be delivered quickly, and showcase Foundry's capabilities. Examples include replacing a manual spreadsheet process with a Workshop app, or visualizing data that was previously siloed. They build momentum and trust for bigger initiatives.",
      category: "fde-skills"
    },
    {
      id: "q13-20",
      section: 13,
      question: "The decomposition methodology involves breaking a complex business problem into smaller, independently deliverable components that collectively solve the larger problem.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Decomposition is a core FDE skill. Complex problems are broken into smaller, independently valuable components that can be delivered incrementally. Each component provides standalone value while contributing to the larger solution. This reduces risk, enables faster feedback, and maintains momentum.",
      category: "fde-skills"
    }
  ],

  14: [
    {
      id: "q14-01",
      section: 14,
      question: "A manufacturing company wants to reduce equipment downtime. They have sensor data, maintenance logs, and operator reports in three separate systems. What is the best Foundry approach?",
      type: "multiple_choice",
      options: [
        "Load all data into a single flat table",
        "Ingest all sources via Data Connection, build pipelines to clean and join them, model Equipment/Sensor/MaintenanceRecord as Object Types with Links, and build a Workshop app for operators to monitor equipment health and trigger maintenance Actions",
        "Only build a Contour dashboard showing raw sensor data",
        "Train an ML model without building any data pipelines first"
      ],
      correctAnswer: 1,
      explanation: "A complete solution requires: Data Connection for all three sources, pipelines for cleaning/joining, an Ontology with Object Types for Equipment, Sensor Readings, and Maintenance Records linked together, and a Workshop application enabling operators to monitor health and initiate maintenance via Actions.",
      category: "comprehensive"
    },
    {
      id: "q14-02",
      section: 14,
      question: "Foundry's closed-loop architecture differentiates it from traditional data platforms because data flows both from sources into analytics AND user actions flow back to modify the Ontology.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "The closed-loop architecture is a key differentiator. Traditional platforms are one-directional (source to analytics). Foundry adds the ability for operational actions taken in applications to write back to the Ontology and even to source systems, creating a complete decision-action feedback loop.",
      category: "comprehensive"
    },
    {
      id: "q14-03",
      section: 14,
      question: "Your pipeline is failing due to schema changes in the source system. What is the likely issue and fix?",
      type: "multiple_choice",
      options: [
        "The Spark cluster is too small",
        "The source system has added/removed/renamed columns that the pipeline references; update the pipeline to handle the new schema",
        "The Foundry platform needs to be restarted",
        "The schedule is misconfigured"
      ],
      correctAnswer: 1,
      explanation: "When a source system changes its schema, pipelines referencing old column names will fail. The fix is to update the pipeline code. Best practice: add Data Expectations for schema validation in early pipeline stages to catch changes early before they break downstream transforms.",
      category: "comprehensive"
    },
    {
      id: "q14-04",
      section: 14,
      question: "What does this PySpark code do?\n\n```python\ndf = df.withColumn('risk_score',\n    F.when(F.col('days_overdue') > 90, 'High')\n     .when(F.col('days_overdue') > 30, 'Medium')\n     .otherwise('Low')\n)\n```",
      type: "multiple_choice",
      options: [
        "Deletes rows where days_overdue is null",
        "Creates a risk_score column that categorizes rows as High (>90 days), Medium (>30 days), or Low based on days_overdue",
        "Filters the DataFrame to only High risk rows",
        "Sorts the DataFrame by days_overdue"
      ],
      correctAnswer: 1,
      explanation: "F.when().when().otherwise() creates a conditional column similar to a CASE statement in SQL. It evaluates conditions in order and assigns the first matching value. Rows with >90 days get 'High', 30-90 get 'Medium', and the rest get 'Low'.",
      category: "comprehensive"
    },
    {
      id: "q14-05",
      section: 14,
      question: "An Object Type has duplicate primary key values in its backing dataset. What happens?",
      type: "multiple_choice",
      options: [
        "Both Objects are created normally",
        "The sync will produce errors or unpredictable behavior; duplicate primary keys must be resolved in the pipeline",
        "Foundry automatically deduplicates them",
        "The Object Type is automatically deleted"
      ],
      correctAnswer: 1,
      explanation: "Duplicate primary keys cause sync issues because each Object must have a unique key. The resolution is to fix the pipeline to ensure uniqueness via deduplication or composite keys. This is a common data quality issue an FDE must watch for.",
      category: "comprehensive"
    },
    {
      id: "q14-06",
      section: 14,
      question: "When designing an Ontology for a supply chain, Shipments have exactly one origin Warehouse and one destination Warehouse. How should you model this?",
      type: "multiple_choice",
      options: [
        "Create one Link Type from Shipment to Warehouse",
        "Create two Link Types: Shipment-origin->Warehouse and Shipment-destination->Warehouse",
        "Put warehouse IDs as properties on Shipment only, no links needed",
        "Create separate Object Types: Origin Warehouse and Destination Warehouse"
      ],
      correctAnswer: 1,
      explanation: "When an Object has multiple distinct relationships to the same Object Type, create separate Link Types for each relationship. This preserves semantic meaning and allows applications to correctly distinguish between origin and destination warehouses.",
      category: "comprehensive"
    },
    {
      id: "q14-07",
      section: 14,
      question: "Workshop Variables, Events, and Object Set bindings form the reactive data flow pattern that makes Workshop applications interactive.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Workshop's interactivity is built on three pillars: Variables (shared state), Events (user interaction handlers that update variables), and Object Set bindings (queries filtered by variables). Together they create a reactive pattern where user interactions automatically update the displayed data.",
      category: "comprehensive"
    },
    {
      id: "q14-08",
      section: 14,
      question: "What does this incremental transform code do?\n\n```python\n@incremental()\n@transform_df(\n    Output('/output'),\n    events=Input('/events')\n)\ndef compute(events, ctx):\n    new_events = events\n    return new_events.groupBy('user_id').agg(\n        F.count('*').alias('event_count'),\n        F.max('timestamp').alias('last_activity')\n    )\n```",
      type: "multiple_choice",
      options: [
        "Processes all events in the dataset on every build",
        "On incremental runs, processes only new events and computes per-user event counts and last activity timestamps",
        "Deletes old events from the dataset",
        "Creates a real-time streaming pipeline"
      ],
      correctAnswer: 1,
      explanation: "The @incremental decorator makes this transform process only new event transactions since the last build. It groups the new events by user_id and computes aggregates. Note: for correct running totals across incremental runs, the output mode and merge strategy must be configured appropriately.",
      category: "comprehensive"
    },
    {
      id: "q14-09",
      section: 14,
      question: "A customer wants both an internal operations dashboard (with Actions) and a customer-facing portal. What is the recommended approach?",
      type: "multiple_choice",
      options: [
        "Build both in Workshop",
        "Workshop for the internal dashboard (Ontology Actions, permissions); OSDK-powered React app for the customer-facing portal (OAuth2, type-safe API, controlled access)",
        "Slate for both applications",
        "Share the internal Workshop link with customers"
      ],
      correctAnswer: 1,
      explanation: "Workshop is ideal for internal operations with its no-code builder and Action integration. For customer-facing portals, OSDK with a React/Vue/Angular frontend provides the custom UX, branding, and authentication flows customers expect, while still backed by the same Ontology.",
      category: "comprehensive"
    },
    {
      id: "q14-10",
      section: 14,
      question: "Data Expectations that fail with 'error' severity block the build and prevent bad data from propagating to downstream datasets.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Error-severity Data Expectations cause the build to fail atomically if the quality check fails. This prevents bad data from being committed to the output dataset and from propagating to downstream consumers. Warning-severity expectations log issues but allow the build to succeed.",
      category: "comprehensive"
    },
    {
      id: "q14-11",
      section: 14,
      question: "What is wrong with this PySpark transform?\n\n```python\n@transform_df(\n    Output('/output'),\n    source=Input('/input')\n)\ndef compute(source):\n    large_list = source.collect()\n    processed = [transform_row(row) for row in large_list]\n    return spark.createDataFrame(processed)\n```",
      type: "multiple_choice",
      options: [
        "The function name should be 'main'",
        "collect() brings all data to the driver, breaking distributed processing; use PySpark DataFrame operations or a UDF instead",
        "The Output path format is wrong",
        "You cannot use list comprehensions in transforms"
      ],
      correctAnswer: 1,
      explanation: "Calling collect() pulls all data to the driver as a Python list, losing all benefits of distributed processing and risking driver out-of-memory errors. Instead, use PySpark operations (withColumn, select, filter) or register transform_row as a UDF to keep computation distributed.",
      category: "comprehensive"
    },
    {
      id: "q14-12",
      section: 14,
      question: "AIP Logic grounded in the Ontology reduces hallucinations because the LLM receives actual enterprise data as context rather than relying on general knowledge.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Grounding is essential for enterprise AI. When AIP Logic receives Ontology Objects as context, the LLM reasons over actual data (real customer records, actual order amounts, specific equipment readings) rather than generating plausible but potentially incorrect information from its general training.",
      category: "comprehensive"
    },
    {
      id: "q14-13",
      section: 14,
      question: "A retail company needs to track Products, Stores, and daily Inventory Levels. Inventory changes daily. What is the best Ontology design?",
      type: "multiple_choice",
      options: [
        "One Object Type for Products with store-level inventory as properties",
        "Three Object Types: Product, Store, and Inventory Record (linked to both Product and Store), backed by a daily-updating pipeline",
        "A single wide table with all data denormalized",
        "Use only Link Types without Object Types"
      ],
      correctAnswer: 1,
      explanation: "The junction-entity pattern is ideal. An Inventory Record Object Type linked to both Product and Store captures the many-to-many relationship with additional attributes (quantity, date). A daily pipeline keeps the backing dataset current.",
      category: "comprehensive"
    },
    {
      id: "q14-14",
      section: 14,
      question: "What is the purpose of broadcast joins in PySpark and when should they be used?",
      type: "multiple_choice",
      options: [
        "To join streaming datasets only",
        "To copy a small DataFrame to all executors, avoiding shuffling a large DataFrame; use when one join side fits in memory (typically < 100-200MB)",
        "To join more than two DataFrames at once",
        "To broadcast the join result to downstream transforms"
      ],
      correctAnswer: 1,
      explanation: "Broadcast joins copy the smaller DataFrame to every executor, eliminating the need to shuffle the larger DataFrame across the network. This converts an expensive shuffle-based join into a fast local join. Use when one side is small enough to fit in executor memory.",
      category: "comprehensive"
    },
    {
      id: "q14-15",
      section: 14,
      question: "Markings propagate through the lineage graph: if an input dataset has a 'Confidential' marking, derived datasets automatically inherit it.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Marking propagation is a critical governance feature. When a transform reads a marked dataset, the output dataset automatically inherits the marking. This ensures that derived data maintains the same access restrictions as its sources, preventing accidental exposure of sensitive data.",
      category: "comprehensive"
    },
    {
      id: "q14-16",
      section: 14,
      question: "You are building an ML model to predict customer churn. Which Foundry approach is recommended?",
      type: "multiple_choice",
      options: [
        "Export data to an external tool, train the model there, and import predictions as CSV",
        "Build feature engineering pipelines in PySpark, train the model in Code Workbook or Repository using scikit-learn, serialize the model, and deploy via batch inference pipeline",
        "Only use AIP Logic for predictions",
        "Build the model in Workshop"
      ],
      correctAnswer: 1,
      explanation: "The recommended ML workflow in Foundry is: (1) feature engineering in PySpark pipelines to create a clean feature table, (2) model training using scikit-learn or other libraries in Code Workbook/Repository, (3) model serialization with pickle/joblib, and (4) batch inference pipeline that loads the model and scores new data on a schedule.",
      category: "comprehensive"
    },
    {
      id: "q14-17",
      section: 14,
      question: "What does this Functions code do?\n\n```typescript\n@Function()\npublic getOverdueOrders(orders: ObjectSet<Order>): ObjectSet<Order> {\n  const today = Timestamp.now();\n  return orders.filter(o =>\n    o.dueDate.isBefore(today) && o.status.exactMatch('Open')\n  );\n}\n```",
      type: "multiple_choice",
      options: [
        "Returns all orders regardless of status",
        "Filters to orders that are past their due date and still have 'Open' status",
        "Deletes overdue orders",
        "Updates all orders to 'Overdue' status"
      ],
      correctAnswer: 1,
      explanation: "This Function filters an Object Set to find orders that are both past due (dueDate before today) and still open (status exactly matches 'Open'). This is a common pattern for identifying items needing attention, which could be displayed in a Workshop dashboard.",
      category: "comprehensive"
    },
    {
      id: "q14-18",
      section: 14,
      question: "When decomposing a customer's problem, an FDE should identify independent workstreams that can be delivered in parallel.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Good decomposition identifies independent components that can be built in parallel (e.g., data pipeline and Ontology model can start before the Workshop app is built). This maximizes velocity and allows team members to work simultaneously on different parts of the solution.",
      category: "comprehensive"
    },
    {
      id: "q14-19",
      section: 14,
      question: "A pipeline produces 10,000 small files per build, causing slow read performance downstream. What is the fix?",
      type: "multiple_choice",
      options: [
        "Increase Spark cluster memory",
        "Add .coalesce() or .repartition() before writing to consolidate output into fewer, larger files",
        "Switch from Parquet to CSV format",
        "Reduce the number of input files"
      ],
      correctAnswer: 1,
      explanation: "The small files problem degrades read performance because each file has metadata overhead. Use .coalesce(n) or .repartition(n) before writing to consolidate output into fewer, larger files. Target 128-256MB per Parquet file for optimal performance.",
      category: "comprehensive"
    },
    {
      id: "q14-20",
      section: 14,
      question: "OSDK-powered external applications respect the same Ontology permissions and markings as internal Foundry applications.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "OSDK enforces all Foundry security controls server-side. The authenticated user's permissions, markings, and Organization restrictions determine what data the external application can access. This ensures consistent security regardless of whether access comes from Workshop or an external OSDK client.",
      category: "comprehensive"
    },
    {
      id: "q14-21",
      section: 14,
      question: "A customer's data science team wants to experiment with different ML models before choosing one for production. Which Foundry tools should they use?",
      type: "multiple_choice",
      options: [
        "Pipeline Builder for everything",
        "Code Workbook for rapid experimentation and prototyping; then promote the chosen model to a Code Repository for production deployment with proper testing",
        "Only Code Repository from the start",
        "Workshop for model training"
      ],
      correctAnswer: 1,
      explanation: "Code Workbook's interactive environment is ideal for rapid ML experimentation: trying different algorithms, tuning hyperparameters, and visualizing results. Once the best model is selected, promote the code to a Code Repository for production with proper version control, testing, and scheduled builds.",
      category: "comprehensive"
    },
    {
      id: "q14-22",
      section: 14,
      question: "What does this PySpark code do?\n\n```python\nfrom pyspark.sql.window import Window\nw = Window.partitionBy('store_id').orderBy(F.col('sale_date').desc())\ndf = df.withColumn('rank', F.row_number().over(w))\ndf = df.filter(F.col('rank') == 1)\n```",
      type: "multiple_choice",
      options: [
        "Counts the number of sales per store",
        "Gets the most recent sale for each store by ranking sales by date descending and keeping only rank 1",
        "Deletes duplicate sales records",
        "Sorts all sales by date"
      ],
      correctAnswer: 1,
      explanation: "This is a common 'top-N per group' pattern. The window partitions by store_id and orders by sale_date descending. row_number() assigns 1 to the most recent sale per store. Filtering to rank == 1 keeps only the latest sale per store. This is useful for getting the most recent record per entity.",
      category: "comprehensive"
    },
    {
      id: "q14-23",
      section: 14,
      question: "In Foundry, dataset transactions are atomic, meaning a failed build does not partially update the output dataset.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Atomicity is a fundamental property of Foundry dataset transactions. If a build fails at any point, the transaction is not committed and the dataset retains its previous valid state. This prevents downstream consumers from reading partial or corrupt data.",
      category: "comprehensive"
    },
    {
      id: "q14-24",
      section: 14,
      question: "A healthcare organization needs different doctors to see only their own patients in a Workshop application. How should this be configured?",
      type: "multiple_choice",
      options: [
        "Build separate Workshop applications for each doctor",
        "Configure Object Type permissions with Object Set-based restrictions that filter patients by the linked doctor's user identity",
        "Use Contour filters that each doctor manually sets",
        "Export separate CSVs for each doctor"
      ],
      correctAnswer: 1,
      explanation: "Object-level security using Object Set-based restrictions is the proper approach. Configure Patient Object Type permissions so each doctor can only see Patients linked to them. This is enforced at the Ontology level, so the same Workshop app automatically shows each doctor only their patients.",
      category: "comprehensive"
    },
    {
      id: "q14-25",
      section: 14,
      question: "What is the advantage of using Interfaces when building Workshop applications for multiple business domains?",
      type: "multiple_choice",
      options: [
        "Interfaces make applications run faster",
        "A Workshop module built against an Interface can be reused across any Object Type that implements it, reducing duplication",
        "Interfaces are required for all Workshop applications",
        "Interfaces replace the need for Object Types"
      ],
      correctAnswer: 1,
      explanation: "Interfaces enable reusable Workshop modules. A module built against a 'HasLocation' Interface works for Warehouses, Offices, and Stores if they all implement it. This avoids rebuilding the same UI patterns for each Object Type and ensures consistency.",
      category: "comprehensive"
    },
    {
      id: "q14-26",
      section: 14,
      question: "The @transform decorator provides lower-level access than @transform_df, including filesystem operations for reading and writing non-tabular data.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "The @transform decorator provides TransformInput/TransformOutput objects with both .dataframe() for tabular access and .filesystem() for raw file operations. Use @transform when you need to read non-Parquet files, write multiple files, or save serialized models.",
      category: "comprehensive"
    },
    {
      id: "q14-27",
      section: 14,
      question: "A logistics company wants to optimize delivery routes. They have order data, driver data, and real-time GPS positions. Which combination of Foundry tools addresses this?",
      type: "multiple_choice",
      options: [
        "Only Contour for analysis",
        "Data Connection for GPS streaming, pipelines for route optimization logic, Ontology with Order/Driver/Route Object Types, Workshop with map widget for dispatchers, and AIP Logic for AI-assisted routing recommendations",
        "Only a Code Workbook with a static analysis",
        "Only Pipeline Builder for all logic"
      ],
      correctAnswer: 1,
      explanation: "This complex use case requires multiple Foundry capabilities: streaming ingestion for GPS data, pipelines for route calculation, an Ontology modeling Orders/Drivers/Routes, a Workshop app with maps for dispatchers to assign and monitor routes, and optionally AIP for AI-powered routing suggestions.",
      category: "comprehensive"
    },
    {
      id: "q14-28",
      section: 14,
      question: "Spark's lazy evaluation means transformations build an execution plan that is optimized before any data is processed.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Spark's lazy evaluation accumulates transformations into a logical plan without executing them. When an action (write, collect, count) is triggered, Spark's Catalyst optimizer analyzes the entire plan, applies optimizations (predicate pushdown, column pruning, join reordering), and generates an optimized physical plan before processing data.",
      category: "comprehensive"
    },
    {
      id: "q14-29",
      section: 14,
      question: "What does this OSDK TypeScript code do?\n\n```typescript\nconst result = await client.ontology.actions.CreateOrder.apply({\n  customerId: 'CUST-456',\n  productId: 'PROD-789',\n  quantity: 5\n});\n```",
      type: "multiple_choice",
      options: [
        "Reads an existing order from the Ontology",
        "Executes the CreateOrder Action on the Ontology with the specified parameters, creating a new order",
        "Deletes an order with the given IDs",
        "Queries all orders for a customer"
      ],
      correctAnswer: 1,
      explanation: "This OSDK code executes the CreateOrder Action Type, passing customer ID, product ID, and quantity as parameters. The Action's server-side validation rules are checked, and if valid, a new Order Object is created in the Ontology with the specified details.",
      category: "comprehensive"
    },
    {
      id: "q14-30",
      section: 14,
      question: "An FDE presenting to executives should focus on business outcomes and ROI rather than technical implementation details.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Executives care about business impact: time saved, costs reduced, revenue increased, risks mitigated. Technical details (Spark configurations, data models) should be translated into business terms. For example, instead of 'we built a pipeline,' say 'we automated a 4-hour manual process down to 5 minutes.'",
      category: "comprehensive"
    },
    {
      id: "q14-31",
      section: 14,
      question: "A pipeline processes 10TB of event data daily. Most downstream analyses only need the last 7 days. What optimization should you apply?",
      type: "multiple_choice",
      options: [
        "Rebuild the entire 10TB every day",
        "Use incremental builds to process only new events, and partition the output by date so downstream queries can prune old partitions",
        "Reduce the data connector sync to weekly",
        "Delete data older than 7 days from the source system"
      ],
      correctAnswer: 1,
      explanation: "Incremental builds process only new events (avoiding reprocessing 10TB daily), and date-based partitioning allows downstream queries to efficiently read only the needed 7-day window via partition pruning. This combination reduces both compute cost and read latency significantly.",
      category: "comprehensive"
    },
    {
      id: "q14-32",
      section: 14,
      question: "What is the purpose of Data Connection's Change Data Capture (CDC) sync type?",
      type: "multiple_choice",
      options: [
        "Capturing all data from a source system in a single snapshot",
        "Tracking inserts, updates, and deletes from the source system and applying them incrementally to the Foundry dataset",
        "Capturing screenshots of the source system UI",
        "Monitoring Foundry platform changes"
      ],
      correctAnswer: 1,
      explanation: "CDC captures granular changes (inserts, updates, deletes) from source systems and applies them to Foundry datasets. This enables near-real-time data freshness without full snapshot reloads, reducing sync time and source system load while keeping Foundry data current.",
      category: "comprehensive"
    },
    {
      id: "q14-33",
      section: 14,
      question: "AIP Automate workflows can monitor Ontology conditions and autonomously take Actions, but all Actions are subject to the same validation rules and permissions as human-triggered Actions.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "AIP Automate operates within Foundry's governance framework. Autonomous Actions must pass the same validation rules, permission checks, and audit logging as manually-triggered Actions. This ensures that AI-driven automation is governed and auditable.",
      category: "comprehensive"
    },
    {
      id: "q14-34",
      section: 14,
      question: "What does this pandas code do in a Code Workbook?\n\n```python\n@pandas_transform\ndef compute(df):\n    df['year_month'] = pd.to_datetime(df['date']).dt.to_period('M')\n    summary = df.groupby(['region', 'year_month']).agg(\n        total_sales=('revenue', 'sum'),\n        avg_deal_size=('revenue', 'mean'),\n        deal_count=('revenue', 'count')\n    ).reset_index()\n    return summary\n```",
      type: "multiple_choice",
      options: [
        "Deletes all sales data",
        "Creates a monthly summary by region showing total sales, average deal size, and deal count",
        "Filters sales to the current month only",
        "Joins sales with another dataset"
      ],
      correctAnswer: 1,
      explanation: "This @pandas_transform extracts year-month from dates, groups by region and month, and computes three aggregations: total sales (sum), average deal size (mean), and deal count. The result is a clean monthly summary table useful for trend analysis and reporting.",
      category: "comprehensive"
    },
    {
      id: "q14-35",
      section: 14,
      question: "Foundry Projects provide both organizational structure (grouping resources) and access control (permissions for who can access those resources).",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Projects serve a dual purpose: they organize related resources (datasets, repos, apps) into logical groups, and they define access control through role-based permissions (Viewer, Editor, Owner). Permissions cascade from parent Projects to child resources unless overridden.",
      category: "comprehensive"
    },
    {
      id: "q14-36",
      section: 14,
      question: "A customer wants to use Foundry but their source data has significant quality issues (nulls, duplicates, inconsistent formats). What should the FDE prioritize?",
      type: "multiple_choice",
      options: [
        "Build Workshop applications first and deal with data quality later",
        "Build robust data cleaning pipelines with Data Expectations first, then model the clean data in the Ontology",
        "Tell the customer to fix their source systems before using Foundry",
        "Ignore data quality and load raw data directly into the Ontology"
      ],
      correctAnswer: 1,
      explanation: "Data quality is foundational. Build pipelines that clean, validate, and standardize source data, with Data Expectations to catch issues automatically. Only then model the clean data in the Ontology. The Ontology and applications built on bad data will produce bad results.",
      category: "comprehensive"
    },
    {
      id: "q14-37",
      section: 14,
      question: "What is the correct approach to handle a join between a large fact table (100M rows) and a small dimension table (10K rows) in PySpark?",
      type: "multiple_choice",
      options: [
        "Use a standard sort-merge join",
        "Use F.broadcast() on the small dimension table to perform a broadcast join, avoiding shuffling the large fact table",
        "Convert both to pandas and use pd.merge()",
        "Load both into driver memory with collect()"
      ],
      correctAnswer: 1,
      explanation: "Broadcasting the 10K-row dimension table to all executors avoids shuffling the 100M-row fact table across the network. This is a massive performance improvement. Use F.broadcast(dim_df) to hint this optimization to Spark.",
      category: "comprehensive"
    },
    {
      id: "q14-38",
      section: 14,
      question: "Contour is best for ad-hoc analytical exploration, while Workshop is best for building operational applications that end users interact with daily.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "This tool selection principle is fundamental. Contour serves analysts who explore data interactively (filter, pivot, chart). Workshop serves operational end users who need task-focused applications with Actions, forms, and workflows built on the Ontology.",
      category: "comprehensive"
    },
    {
      id: "q14-39",
      section: 14,
      question: "A pipeline has three stages: Raw -> Clean -> Analytics. The Clean build has been failing for 2 days. What is the impact?",
      type: "multiple_choice",
      options: [
        "All three datasets are deleted",
        "Raw data continues to be ingested, but Clean and Analytics datasets are stale (showing 2-day-old data); downstream applications using these datasets show outdated information",
        "The entire Foundry platform stops working",
        "The Analytics dataset automatically builds from Raw, bypassing Clean"
      ],
      correctAnswer: 1,
      explanation: "Build failures are isolated. Raw ingestion continues normally. Clean and Analytics datasets retain their last successful build data but become stale. Applications consuming these datasets show outdated information. The FDE must diagnose the failure, fix it, and rebuild.",
      category: "comprehensive"
    },
    {
      id: "q14-40",
      section: 14,
      question: "What does this Function demonstrate?\n\n```typescript\n@Function()\npublic classifyRisk(order: Order): string {\n  if (order.amount > 100000 && order.customerRiskRating === 'High') {\n    return 'Requires Review';\n  }\n  if (order.amount > 50000) {\n    return 'Elevated';\n  }\n  return 'Standard';\n}\n```",
      type: "multiple_choice",
      options: [
        "A Function that deletes high-risk orders",
        "A Function that classifies orders into risk tiers based on amount and customer risk rating, returning a string label",
        "A Function that sends email notifications",
        "A Function that updates order amounts"
      ],
      correctAnswer: 1,
      explanation: "This Function implements business logic for risk classification. It checks order amount and customer risk rating to return a risk tier: 'Requires Review' for high-amount/high-risk orders, 'Elevated' for medium-amount orders, and 'Standard' for the rest. This could drive a Workshop display or Action validation.",
      category: "comprehensive"
    },
    {
      id: "q14-41",
      section: 14,
      question: "Responsible AI deployment in Foundry includes human-in-the-loop review for high-stakes AI-driven decisions.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "For high-stakes decisions (financial approvals, safety assessments, medical recommendations), AI should augment human judgment rather than replace it. Implement review workflows where AI provides recommendations and humans make final decisions, with full audit trails of both.",
      category: "comprehensive"
    },
    {
      id: "q14-42",
      section: 14,
      question: "A customer's Spark jobs are running out of memory. What should the FDE investigate first?",
      type: "multiple_choice",
      options: [
        "The color of the Workshop theme",
        "Whether the transforms are using collect(), toPandas(), or broadcasting very large DataFrames; also check for data skew and partition sizes",
        "The number of users logged into Foundry",
        "The version of Python being used"
      ],
      correctAnswer: 1,
      explanation: "Memory issues are usually caused by: (1) collect() or toPandas() bringing too much data to the driver, (2) broadcasting DataFrames too large for executor memory, (3) data skew creating oversized partitions, or (4) insufficient memory configuration. Investigate these causes using build logs and Spark UI.",
      category: "comprehensive"
    },
    {
      id: "q14-43",
      section: 14,
      question: "Code Workbook is better for prototyping and Code Repository is better for production because Code Repository provides version control, testing, and code review workflows.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Code Workbook's interactive notebook interface is ideal for quick iteration and experimentation. Code Repository's structured project format supports version control, unit testing with pytest, code review via branching, and modular organization, all critical for reliable production pipelines.",
      category: "comprehensive"
    },
    {
      id: "q14-44",
      section: 14,
      question: "An insurance company wants to automate claims processing. Which Foundry solution architecture would you recommend?",
      type: "multiple_choice",
      options: [
        "A single Contour dashboard showing all claims",
        "Ingest claims data via Data Connection, model Claim/Policy/Customer as Object Types, use AIP Logic to auto-classify and score claims, build a Workshop app for adjusters with Actions for approve/deny/escalate, and create Data Expectations for data quality",
        "Build everything in Slate with custom JavaScript",
        "Export claims to Excel for manual processing"
      ],
      correctAnswer: 1,
      explanation: "A comprehensive claims automation solution combines: data ingestion from claims systems, an Ontology modeling Claims/Policies/Customers, AIP Logic for intelligent claim classification and risk scoring, a Workshop application enabling adjusters to review and action claims, and Data Expectations for quality assurance.",
      category: "comprehensive"
    },
    {
      id: "q14-45",
      section: 14,
      question: "Foundry's build system uses the dependency graph (DAG) to determine transform execution order through topological sorting.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "The build system creates a DAG of all transforms and their input/output dependencies. Topological sorting determines the correct execution order: upstream transforms complete before downstream ones run. This ensures data flows correctly through the entire pipeline graph.",
      category: "comprehensive"
    },
    {
      id: "q14-46",
      section: 14,
      question: "What does this PySpark code demonstrate?\n\n```python\ndf = orders.join(\n    F.broadcast(products),\n    orders['product_id'] == products['product_id'],\n    'left'\n).join(\n    F.broadcast(categories),\n    products['category_id'] == categories['category_id'],\n    'left'\n).select(\n    orders['*'],\n    products['product_name'],\n    categories['category_name']\n)\n```",
      type: "multiple_choice",
      options: [
        "A cross join of three DataFrames",
        "A chained left join enriching orders with product name and category name, using broadcast joins for the small lookup tables",
        "Deleting records that do not match across all three tables",
        "A union of three DataFrames"
      ],
      correctAnswer: 1,
      explanation: "This chains two broadcast left joins to enrich the orders DataFrame with product_name and category_name from small lookup tables. Broadcasting the small tables avoids shuffling the large orders table. The final select picks the desired columns from each DataFrame.",
      category: "comprehensive"
    },
    {
      id: "q14-47",
      section: 14,
      question: "When presenting a trade-off to a customer (e.g., quick delivery vs. robust solution), an FDE should clearly state the pros, cons, and risks of each option to enable an informed decision.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "Clear trade-off presentation is a key FDE skill. Frame options with explicit pros, cons, risks, and effort for each. For example: 'Option A delivers in 1 week but requires rework later. Option B takes 3 weeks but is production-ready. Given your timeline, I recommend...' This empowers informed customer decisions.",
      category: "comprehensive"
    },
    {
      id: "q14-48",
      section: 14,
      question: "What is the primary purpose of Object Storage V2's geospatial indexing capability?",
      type: "multiple_choice",
      options: [
        "Storing GPS coordinates as strings",
        "Enabling efficient spatial queries like 'find all Objects within N miles of a location' for map-based applications",
        "Compressing geographic data for storage",
        "Converting addresses to coordinates"
      ],
      correctAnswer: 1,
      explanation: "OSv2's geospatial indexing enables efficient spatial queries (proximity search, containment, intersection) directly on Ontology Objects. This powers Workshop map widgets, spatial analysis in Functions, and location-based filtering without expensive full-table scans.",
      category: "comprehensive"
    },
    {
      id: "q14-49",
      section: 14,
      question: "A well-modeled Ontology is the foundation for effective Workshop applications, OSDK integrations, AIP Logic, and all application-layer functionality in Foundry.",
      type: "true_false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "The Ontology is the central semantic layer that all applications build upon. A poorly modeled Ontology leads to awkward applications, brittle integrations, and ineffective AI. Investing time in a clean, well-thought-out Ontology pays dividends across every application layer.",
      category: "comprehensive"
    },
    {
      id: "q14-50",
      section: 14,
      question: "A customer engagement is wrapping up. What should the FDE deliver for successful knowledge transfer?",
      type: "multiple_choice",
      options: [
        "Nothing; the customer should figure it out from the code",
        "Documentation of the architecture, data model, key decisions and their rationale, pipeline configurations, known limitations, and training for the customer's team",
        "Only a slide deck with screenshots",
        "Access to the FDE's personal notes"
      ],
      correctAnswer: 1,
      explanation: "Successful knowledge transfer requires: architecture documentation, data model and Ontology documentation with decision rationale, pipeline and build configurations, known limitations and workarounds, and hands-on training for the customer's team. This ensures the customer can maintain and extend the solution independently.",
      category: "comprehensive"
    }
  ]
};