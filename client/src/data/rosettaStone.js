export const rosettaStone = [
  // ============================================================
  // SECURITY CATEGORY (Section 1) — 4 entries
  // ============================================================
  {
    id: "rs-001",
    category: "security",
    serviceNow: {
      name: "ACLs (Access Control Lists)",
      description: "The primary security model in ServiceNow. ACLs control who can read, write, create, and delete records at the table, field, and row level. ACLs are evaluated in order, use conditions and scripts, and interact with roles. You've probably debugged ACLs using the 'Security: Debug ACLs' module — row-level security gets complex fast with before-query business rules and domain separation."
    },
    foundry: {
      name: "Ontology Roles + Markings",
      description: "Foundry's dual-layer security model. Roles control who can view, edit, or execute at the Object Type, property, and Action Type level. Markings provide row-level security — individual Objects can be tagged with markings (e.g., 'Confidential', 'Region: EMEA') that restrict visibility based on user group membership. Together, they enforce both schema-level and data-level access control."
    },
    notes: "Both control who can see and modify data",
    detailedComparison: "ServiceNow ACLs are a single, layered system — you create ACL rules that match on table, field, operation, and condition, and they evaluate top-to-bottom. Row-level security is achieved through ACL conditions or before-query business rules that add encoded queries. It works but can become opaque at scale. Foundry splits this into two clear layers: Roles (schema-level, like 'can this user see the Salary property on Employee?') and Markings (data-level, like 'can this user see Objects marked as Region: EMEA?'). This separation is cleaner to reason about. Markings are particularly powerful — they are applied to individual Objects and automatically filter results across the entire platform (Workshop, Quiver, OSDK). In ServiceNow, achieving similar row-level filtering often requires custom before-query business rules, which are harder to audit.",
    section: 1,
  },
  {
    id: "rs-002",
    category: "security",
    serviceNow: {
      name: "User Roles",
      description: "Roles in ServiceNow are the core mechanism for granting permissions. They are assigned to users or groups and referenced by ACLs, modules, and UI actions. Roles can inherit from other roles (e.g., itil includes itil_admin capabilities). You manage them in User Administration and assign them through groups for scalability. Elevated privileges like security_admin and admin control platform-wide access."
    },
    foundry: {
      name: "Foundry Roles + Groups",
      description: "Foundry uses project-level roles and platform-level groups to manage access. Roles like Viewer, Editor, and Owner are granted on projects, resources, and Ontology elements. Groups aggregate users and can be referenced in Marking rules. Foundry encourages role-based access control through project membership rather than individual user grants."
    },
    notes: "Both assign permissions to users through role-based systems",
    detailedComparison: "ServiceNow roles are platform-global — you define roles once and reference them everywhere (ACLs, UI actions, modules). Role hierarchy lets you build inheritance chains. Foundry roles are scoped to projects and resources — you grant someone 'Editor' on a specific project or 'Viewer' on a dataset. This means Foundry access is more granular by default. ServiceNow's approach is simpler for small instances but harder to audit at scale (who has itil? what does itil grant?). Foundry's project-scoped model makes it clearer what a user can access. Both platforms recommend group-based assignment over individual grants. The key shift: ServiceNow roles are about what you can do; Foundry roles are about what you can do within a specific scope.",
    section: 1,
  },
  {
    id: "rs-003",
    category: "security",
    serviceNow: {
      name: "Data Classification",
      description: "ServiceNow provides data classification fields and policies to label sensitive data. You might use fields like 'classification' on tables or leverage the Data Classification plugin to tag records as Public, Internal, Confidential, or Restricted. Classification drives ACL conditions and audit policies. Often used in regulated environments to ensure sensitive data is handled appropriately."
    },
    foundry: {
      name: "Markings (Security Classification)",
      description: "Markings in Foundry are first-class security labels applied to individual Objects or datasets. They enforce visibility rules — only users in groups associated with a Marking can see marked data. Markings support categories like sensitivity levels (Confidential, Secret) or organizational boundaries (Region: EMEA). They propagate automatically through the platform, filtering results everywhere."
    },
    notes: "Both label data by sensitivity to control access",
    detailedComparison: "Data classification in ServiceNow is often implemented via custom fields and ACL conditions — it requires manual wiring. You add a 'classification' field to a table, then write ACL rules that check the field value. This works but is fragile and easy to misconfigure. Foundry Markings are a built-in, platform-enforced concept — you define Marking categories (e.g., Sensitivity, Region) and apply them to Objects. The platform automatically hides marked Objects from users who lack the required group membership. No custom scripting needed. The enforcement is pervasive: Markings filter results in Workshop, Quiver, OSDK, and even in Object Set queries. This is a significant security upgrade over ServiceNow's approach, especially in multi-classification environments like defense or healthcare.",
    section: 1,
  },
  {
    id: "rs-004",
    category: "security",
    serviceNow: {
      name: "Domain Separation",
      description: "ServiceNow's multi-tenancy model for managed service providers or large enterprises. Domain Separation isolates data, configurations, and processes by domain (e.g., Subsidiary A vs Subsidiary B). Each domain has its own records, business rules, and dashboards while sharing a single instance. Configuration is complex and has many caveats around which features are domain-aware."
    },
    foundry: {
      name: "Organizations (Multi-tenancy)",
      description: "Foundry supports multi-tenancy through Organizations, which provide isolated environments within a Foundry deployment. Each Organization has its own users, groups, projects, and resources. Data sharing across Organizations requires explicit configuration. This is the primary mechanism for enterprise-scale isolation in Foundry."
    },
    notes: "Both provide data and configuration isolation for multi-tenancy",
    detailedComparison: "Domain Separation in ServiceNow is notoriously complex — it adds a domain field to every record and requires every feature to be 'domain-aware.' Many plugins and features have partial or no domain support, leading to data leakage risks. Troubleshooting domain issues is a specialized skill. Foundry Organizations provide cleaner isolation — each Organization is a distinct environment with separate user directories, projects, and resources. The isolation is more complete by default. Where ServiceNow tries to share a single database with logical separation, Foundry provides more physical separation. For scenarios where you need to share data across Organizations, Foundry uses explicit data sharing configurations, making cross-tenant data flow intentional and auditable.",
    section: 1,
  },

  // ============================================================
  // DATA CATEGORY (Section 2) — 6 entries
  // ============================================================
  {
    id: "rs-005",
    category: "data",
    serviceNow: {
      name: "Table",
      description: "The fundamental data structure in ServiceNow. Every module — incidents, changes, CIs, catalog items — is backed by a table. Tables can extend other tables (inheritance), have dictionary entries defining columns, and support ACLs, business rules, and UI policies. You interact with tables via forms, lists, and GlideRecord."
    },
    foundry: {
      name: "Dataset",
      description: "The fundamental data storage unit in Foundry. A dataset is a versioned, immutable collection of rows and columns (like a Parquet or CSV file stored in HDFS/S3). Datasets have schema, branches, and full transaction history. They are the raw material that Object Types are built on top of."
    },
    notes: "Both are the underlying data storage layer",
    detailedComparison: "A ServiceNow table is a live, mutable database table — when you update a record, the row changes in place (though audit history is tracked separately). A Foundry dataset is versioned and append-based: each transform or edit creates a new transaction, and you can always roll back. ServiceNow tables tightly couple storage with presentation (the form and list views are auto-generated from the table). Foundry datasets are purely a storage layer — presentation happens through Object Types and Workshop apps built on top. This separation gives Foundry more flexibility: you can reshape how data is presented without touching the underlying dataset.",
    section: 2,
  },
  {
    id: "rs-006",
    category: "data",
    serviceNow: {
      name: "Update Set",
      description: "ServiceNow's change management mechanism for platform configurations. An Update Set captures customizations (UI policies, business rules, table changes, etc.) and lets you move them between instances (dev -> test -> prod). You've dealt with the pain of merge conflicts, missing dependencies, and the 'retrieve and preview' workflow."
    },
    foundry: {
      name: "Branch",
      description: "Foundry's version control mechanism for datasets and resources. Branches work like Git branches — you create a branch, make changes to datasets, transforms, or ontology configurations, test them in isolation, and merge back. Branches provide full isolation: your changes do not affect production until merged."
    },
    notes: "Both manage moving changes between environments",
    detailedComparison: "Update Sets in ServiceNow are essentially XML snapshots of configuration records — they capture what changed but not the full history. The workflow is linear: commit to update set, move to next instance, preview, commit. Foundry Branches work like Git: you branch from a point in time, make changes in isolation, and merge back with conflict resolution. The critical difference is scope — Update Sets capture platform configurations (business rules, UI policies), while Foundry Branches version data, pipeline code, and ontology definitions together. Foundry also supports 'proposals' — a review workflow on top of branches similar to pull requests. For someone used to Update Sets, branches feel much more natural if you have Git experience.",
    section: 2,
  },
  {
    id: "rs-007",
    category: "data",
    serviceNow: {
      name: "System Clone / Instance Copy",
      description: "The process of copying an entire ServiceNow instance (or specific tables) from one environment to another, typically production to sub-production. Used for refreshing dev/test environments with real data. Cloning is a heavyweight operation — it takes hours, overwrites the target, and requires careful exclusion lists to preserve local configurations."
    },
    foundry: {
      name: "Dataset Branching (Proposal + Merge)",
      description: "In Foundry, you do not need to clone entire environments. Instead, you create branches on individual datasets or resources to test changes in isolation. Proposals let you review changes before merging them into the main branch. This gives you the isolation benefit of cloning without the heavyweight environment duplication."
    },
    notes: "Both provide isolated environments for testing changes",
    detailedComparison: "ServiceNow cloning copies everything — tables, data, configurations — from one instance to another. It is a blunt instrument: useful for refreshing environments but time-consuming and error-prone (you need to manage clone exclusion lists carefully or risk overwriting local dev work). Foundry's branching model is surgical: you branch specific datasets or resources, make changes, and merge back. You never need to copy an entire environment because branching provides native isolation at the resource level. The workflow is dramatically lighter — branching takes seconds, not hours. The mental model shift: ServiceNow thinks in 'instances' (whole environments), while Foundry thinks in 'branches' (isolated change sets on specific resources).",
    section: 2,
  },
  {
    id: "rs-008",
    category: "data",
    serviceNow: {
      name: "Import Set",
      description: "A staging table in ServiceNow that receives data from external sources (CSV uploads, JDBC imports, REST integrations). Data lands in the import set first, then Transform Maps clean and map it to the target table. Import sets are temporary holding areas — you typically clean them up after processing. The workflow is: source -> import set -> transform map -> target table."
    },
    foundry: {
      name: "Data Connection Sync",
      description: "Data Connection in Foundry syncs data from external sources (databases, APIs, file systems) directly into raw datasets. There is no separate staging table concept — data lands in a dataset and is then cleaned through pipeline transforms. Sync schedules control how frequently data is refreshed, and each sync creates a new versioned transaction."
    },
    notes: "Both ingest external data into the platform",
    detailedComparison: "ServiceNow's import set pattern is a two-step staging process: data lands in a temporary table, then a transform map moves it to the final destination. This adds complexity but gives you a chance to inspect and clean data before it hits production tables. Foundry's approach is more streamlined: Data Connection syncs land directly into raw datasets, which are then cleaned through pipeline transforms. The 'staging' concept still exists but it is just another dataset in your pipeline — no special import set machinery. Foundry's approach is more scalable (import sets can choke on large volumes) and more auditable (every sync is a versioned transaction). The trade-off: ServiceNow's import sets give you a preview step before committing; Foundry relies on pipeline transforms and Data Expectations to catch issues.",
    section: 2,
  },
  {
    id: "rs-009",
    category: "data",
    serviceNow: {
      name: "MID Server",
      description: "A Java application installed on a server within your network that acts as a secure relay between your ServiceNow instance (cloud) and your internal systems. MID Servers handle Discovery, Orchestration, JDBC imports, and Integration Hub connections to on-premise systems. You've probably managed MID Server clusters, dealt with upgrades, and debugged ECC queue issues."
    },
    foundry: {
      name: "Data Connection Agent",
      description: "A lightweight agent installed within your network that securely relays data between Foundry (cloud or on-prem) and your internal data sources. The agent handles connectivity to databases, file systems, and APIs behind firewalls. It establishes an outbound connection to Foundry, so no inbound firewall rules are needed."
    },
    notes: "Both are on-premise relay agents connecting cloud to internal systems",
    detailedComparison: "MID Server and Data Connection Agent solve the same fundamental problem: securely connecting a cloud platform to on-premise resources. MID Servers are heavier — they run a full Java process, handle multiple functions (Discovery, Orchestration, imports), and communicate via the ECC queue. Data Connection Agents are purpose-built for data ingestion — they are lighter, focused on moving data from internal sources to Foundry. Both use outbound connections to avoid inbound firewall changes. The operational experience is similar: you install the agent, configure credentials, and monitor health. MID Servers have more management overhead (Java heap tuning, ECC queue monitoring, cluster management), while Data Connection Agents are more of a 'set and forget' deployment focused purely on data connectivity.",
    section: 2,
  },
  {
    id: "rs-010",
    category: "data",
    serviceNow: {
      name: "Attachment",
      description: "Files attached to ServiceNow records — PDFs, images, logs, spreadsheets. Stored in the sys_attachment and sys_attachment_doc tables. Attachments are tied to individual records via table name and sys_id. You've dealt with attachment size limits, storage quotas, and the occasional base64-encoded attachment in REST integrations."
    },
    foundry: {
      name: "Media Set",
      description: "Foundry's storage mechanism for unstructured files — images, PDFs, videos, documents. Media Sets are special datasets optimized for binary file storage. Each file is a row with metadata and a binary payload. Media Sets integrate with the Ontology (Objects can reference media files) and with Workshop (for displaying images or documents in apps)."
    },
    notes: "Both store unstructured files attached to platform entities",
    detailedComparison: "ServiceNow attachments are record-level — each file is tied to a specific record on a specific table. Storage is in platform tables (sys_attachment), and there are size limits per file and instance-wide quotas. The model is simple but does not scale well for large volumes of media. Foundry Media Sets are dataset-level — they store large collections of files with metadata, optimized for bulk operations. Media Sets can hold millions of files and are designed for use cases like satellite imagery, medical scans, or document archives. The integration model differs: ServiceNow attachments appear on forms; Foundry Media Sets are referenced by Objects and displayed through Workshop widgets. For a ServiceNow admin, think of Media Sets as a dedicated, scalable attachment table with built-in pipeline integration.",
    section: 2,
  },
  {
    id: "rs-011",
    category: "data",
    serviceNow: {
      name: "System Properties (Configuration)",
      description: "Key-value configuration settings that control platform behavior in ServiceNow. Found in sys_properties, they govern everything from email settings to performance tuning to feature flags. You access them via System Properties modules or gs.getProperty() in scripts. Changes take effect immediately or after cache flush."
    },
    foundry: {
      name: "Resource Configuration",
      description: "Foundry uses resource-level configuration for controlling behavior of pipelines, transforms, and applications. Configuration is typically defined within project settings, transform parameters, or environment-specific variables. Unlike a single global config store, Foundry distributes configuration closer to the resources that consume it."
    },
    notes: "Both manage platform and application configuration settings",
    detailedComparison: "ServiceNow System Properties are a centralized, global key-value store — any script can read any property, and changes propagate instance-wide. This is convenient but can create hidden dependencies (a property change in one module breaks another). Foundry takes a more distributed approach: configuration lives within the resources that use it (pipeline parameters, transform inputs, project settings). There is no single 'system properties' table. This makes configuration more explicit and scoped — you know exactly what a setting affects. The trade-off: ServiceNow's approach is faster for quick changes (just update a property), while Foundry's approach requires you to find and update the specific resource configuration. Both support environment-specific values for dev/test/prod workflows.",
    section: 2,
  },

  // ============================================================
  // ONTOLOGY CATEGORY (Section 3) — 10 entries
  // ============================================================
  {
    id: "rs-012",
    category: "ontology",
    serviceNow: {
      name: "CMDB CI Class",
      description: "Defines the schema for a category of Configuration Items in the CMDB. Each CI Class specifies attributes (fields), relationships, and business rules. Examples: Server, Application, Network Gear. You extend cmdb_ci to create your own classes (e.g., cmdb_ci_server), inheriting fields from parent classes."
    },
    foundry: {
      name: "Object Type",
      description: "Defines the schema for a category of real-world entities in the Ontology. Each Object Type specifies properties (fields), link types (relationships), and action types (allowed modifications). Examples: Employee, Flight, Customer Order. Defined in the Ontology Manager and backed by one or more datasets."
    },
    notes: "Both define the schema for real-world entities",
    detailedComparison: "In ServiceNow, a CI Class is a table definition in the CMDB hierarchy. Each class inherits from parent classes (like cmdb_ci -> cmdb_ci_server -> cmdb_ci_win_server). You manage them through the CI Class Manager and they tightly couple schema to the platform's table structure. In Foundry, Object Types are defined in the Ontology Manager and backed by datasets. They are more flexible — properties can come from multiple datasets via the Object Data Funnel, and you can reshape the schema without migrating underlying data. Think of Object Types as a logical view layer over your data, whereas CI Classes are the data table itself.",
    section: 3,
  },
  {
    id: "rs-013",
    category: "ontology",
    serviceNow: {
      name: "CI (Configuration Item)",
      description: "A single record (row) in a CI Class table. Represents one tracked entity — one specific server, one application instance, one router. Each CI has a unique sys_id and can participate in relationships with other CIs. You interact with CIs through forms, lists, and GlideRecord queries."
    },
    foundry: {
      name: "Object",
      description: "A single instance of an Object Type. Represents one real-world entity — one specific employee, one flight, one customer order. Each Object has a primary key (its unique identifier) and can be linked to other Objects via Link Types. You interact with Objects through Workshop apps, Object Explorer, or the OSDK."
    },
    notes: "Both represent a single tracked entity or record",
    detailedComparison: "A CI in ServiceNow is fundamentally a row in a database table — it lives in a MySQL/MariaDB row and you query it with GlideRecord. A Foundry Object is a richer abstraction: it is backed by a row in a dataset, but the Ontology layer adds link resolution, action enforcement, and security markings on top. In ServiceNow, a CI's identity is its sys_id; in Foundry, you define the primary key (often a business key like employee_id). The biggest practical difference is that Foundry Objects are designed for cross-domain linking — connecting an Employee to a Flight to a Maintenance Task — whereas CMDB CIs are primarily scoped to IT infrastructure relationships.",
    section: 3,
  },
  {
    id: "rs-014",
    category: "ontology",
    serviceNow: {
      name: "CMDB Relationship",
      description: "Defines how two CIs are connected — e.g., 'Runs on', 'Depends on', 'Managed by'. Stored in the cmdb_rel_ci table with parent/child references and a relationship type. You build dependency maps and impact analysis by traversing these relationships."
    },
    foundry: {
      name: "Link Type",
      description: "Defines how two Object Types are connected — e.g., an Employee 'assigned to' a Project, a Truck 'located at' a Distribution Center. Link Types have cardinality (one-to-one, one-to-many, many-to-many) and are backed by foreign keys or link datasets. They enable traversal across the Ontology graph."
    },
    notes: "Both define typed connections between entities",
    detailedComparison: "ServiceNow CMDB Relationships are stored in a dedicated junction table (cmdb_rel_ci) with a type field from cmdb_rel_type. They are primarily used for dependency mapping and impact analysis — you traverse them to answer 'what breaks if this server goes down?' In Foundry, Link Types are first-class citizens in the Ontology. They can be backed by a foreign key column on one dataset or by a separate link dataset for many-to-many relationships. The key difference: Foundry Link Types are enforced and visible throughout the platform — Workshop widgets, Object Explorer, and OSDK queries all natively traverse links. In ServiceNow, relationship traversal typically requires scripting or the Dependency Map view.",
    section: 3,
  },
  {
    id: "rs-015",
    category: "ontology",
    serviceNow: {
      name: "Business Rule",
      description: "Server-side JavaScript that runs when a record is inserted, updated, deleted, or queried. Business Rules can run 'before', 'after', or 'async' relative to the database operation. They enforce business logic — auto-populating fields, validating data, triggering downstream actions. You've probably spent hours debugging the order in which Business Rules fire."
    },
    foundry: {
      name: "Action Type",
      description: "Defines a structured mutation that users or systems can perform on Objects. Each Action Type has typed parameters, validation rules (via Functions), and side effects. Examples: 'Assign Driver to Truck', 'Approve Route Change'. Actions run server-side Functions and enforce business logic at the Ontology layer."
    },
    notes: "Both enforce business logic around data changes",
    detailedComparison: "Business Rules in ServiceNow are imperative scripts attached to table events — they fire based on insert/update/delete and can cascade unpredictably when multiple rules interact. Action Types in Foundry are declarative and explicit: each one defines its parameters, validation logic, and side effects upfront. The biggest shift is that Foundry Action Types are user-facing — they appear as buttons in Workshop apps — while Business Rules are invisible backend logic. In Foundry, the 'what users can do' is modeled explicitly as Action Types, whereas in ServiceNow, mutations happen through form submissions and the Business Rules react to them. This makes Foundry's approach more auditable and easier to reason about at scale.",
    section: 3,
  },
  {
    id: "rs-016",
    category: "ontology",
    serviceNow: {
      name: "Table Hierarchy (task -> incident)",
      description: "ServiceNow's table inheritance model where child tables extend parent tables. The classic example: task is the base table, and incident, change_request, and problem all extend it, inheriting fields like state, priority, and assignment_group. You add fields at any level and they propagate down. This is how ServiceNow shares structure across related record types."
    },
    foundry: {
      name: "Interface (Shared Contract)",
      description: "Foundry Interfaces define a shared set of properties and links that multiple Object Types can implement. For example, an 'Assignable' interface might define properties like assignee, status, and priority — and Object Types like Ticket, Task, and Work Order can all implement it. Interfaces enable generic Workshop widgets and Functions that work across any implementing type."
    },
    notes: "Both share common fields/properties across related entity types",
    detailedComparison: "ServiceNow table inheritance is structural — child tables physically inherit columns from parent tables, and you can query the parent table to search across all children (querying 'task' returns incidents, changes, and problems). This is powerful for cross-type reporting but creates tight coupling — changing a parent field affects all children. Foundry Interfaces are contractual rather than structural — Object Types opt in to implementing an Interface by mapping their properties to the Interface's definition. There is no physical inheritance. This is more flexible: Object Types backed by completely different datasets can implement the same Interface. The practical benefit: you can build a Workshop widget that displays 'all Assignable items' regardless of whether they are Tickets, Tasks, or Work Orders, similar to querying the task table in ServiceNow.",
    section: 3,
  },
  {
    id: "rs-017",
    category: "ontology",
    serviceNow: {
      name: "sys_dictionary (Field Definition)",
      description: "The system table that defines every field on every table in ServiceNow. Each record in sys_dictionary specifies a column name, type (string, integer, reference, choice), max length, default value, and display properties. When you add a field to a table via the form designer or table definition, you are creating a sys_dictionary record."
    },
    foundry: {
      name: "Property Configuration",
      description: "In Foundry, Object Type properties are configured in the Ontology Manager. Each property has a name, type (string, integer, timestamp, geohash, etc.), a backing dataset column, and display settings. Properties can also be derived (computed from other properties or Functions) rather than directly backed by a column. Configuration is done through the Ontology Manager UI."
    },
    notes: "Both define individual fields/properties and their types on entity schemas",
    detailedComparison: "In ServiceNow, sys_dictionary is the source of truth for every field on every table — it is a metadata table you can query, export, and manipulate. This is powerful for bulk schema management (you can script changes to sys_dictionary records). In Foundry, property configuration happens through the Ontology Manager UI and is stored as part of the Ontology definition. A key difference: Foundry properties do not have to map 1:1 to dataset columns — you can create derived properties computed by Functions, or map properties from multiple backing datasets using the Object Data Funnel. ServiceNow fields are always 1:1 with database columns. Another difference: Foundry properties have richer type support including geohash, geoshape, and media reference types designed for spatial and unstructured data use cases.",
    section: 3,
  },
  {
    id: "rs-018",
    category: "ontology",
    serviceNow: {
      name: "Reference Field",
      description: "A field type in ServiceNow that creates a foreign key relationship to another table. When you add a reference field to a table (e.g., 'caller_id' referencing sys_user), ServiceNow stores the sys_id of the referenced record and provides auto-complete, display values, and dot-walking. Reference fields are the primary mechanism for relating records across tables."
    },
    foundry: {
      name: "Link Type (Foreign Key)",
      description: "Link Types in Foundry define relationships between Object Types and are often backed by a foreign key column in the underlying dataset. For example, if an Order dataset has a customer_id column, you define a Link Type from Order to Customer backed by that column. Link Types support one-to-one, one-to-many, and many-to-many cardinalities."
    },
    notes: "Both create navigable relationships between entity types via foreign keys",
    detailedComparison: "ServiceNow reference fields and Foundry Link Types both create navigable relationships backed by foreign keys. In ServiceNow, a reference field stores a sys_id and provides dot-walking (incident.caller_id.email), display values, and reference qualifiers for filtering valid targets. In Foundry, a Link Type backed by a foreign key column enables traversal across the Ontology — you can navigate from an Order to its Customer in Workshop, Object Explorer, or OSDK. The key differences: ServiceNow reference fields are always one-to-one from the referencing record's perspective (one field, one target), while Foundry Link Types natively support many-to-many via link datasets. Also, Foundry Link Types are bidirectional by default — if Order links to Customer, you can traverse from Customer to its Orders without a separate field.",
    section: 3,
  },
  {
    id: "rs-019",
    category: "ontology",
    serviceNow: {
      name: "Record Producer / Catalog Item",
      description: "The primary way end users request services or create records in ServiceNow. Catalog Items present a form (with variables) that users fill out; submission triggers a workflow or flow. Record Producers are catalog items that directly create records on target tables. Used for everything from laptop requests to onboarding processes."
    },
    foundry: {
      name: "Action Type (with Parameters/Form)",
      description: "In Foundry, user-facing forms are implemented as Action Types surfaced in Workshop. The Action Type defines parameters (like catalog variables), validation rules, and the logic that executes on submission. Workshop provides form widgets that bind to Action Type parameters, creating a seamless request, validate, execute flow."
    },
    notes: "Both present forms to users and trigger backend logic on submission",
    detailedComparison: "Catalog Items in ServiceNow are self-contained request forms with a lifecycle — they live in the Service Catalog, have variables (form fields), workflows for fulfillment, and approval rules. In Foundry, this pattern is decomposed: the form is a Workshop module with input widgets, the backend logic is an Action Type with a Function, and approval is handled by additional Action logic or a separate approval Action. ServiceNow's approach is more turnkey — you configure a catalog item and it handles the full lifecycle. Foundry's approach is more composable — you build each piece separately, which gives more flexibility but requires more deliberate design. The trade-off: Foundry's version is more powerful for complex workflows, but ServiceNow's catalog is faster to set up for standard requests.",
    section: 3,
  },
  {
    id: "rs-020",
    category: "ontology",
    serviceNow: {
      name: "GlideRecord Query",
      description: "The core server-side API for querying and manipulating records in ServiceNow. GlideRecord provides methods to query tables (addQuery, addEncodedQuery), iterate results (next()), and modify records (setValue, insert, update, deleteRecord). Every ServiceNow developer lives in GlideRecord — it is the SQL you never write directly."
    },
    foundry: {
      name: "Object Set Filtering",
      description: "The Ontology-native way to query Objects in Foundry. Object Sets are filtered, sorted, and aggregated collections of Objects. You define them declaratively using filters (where, intersect, union), and they resolve in real-time against Object Storage. Used in Workshop widgets, Functions, and OSDK calls."
    },
    notes: "Both are the primary way to query data programmatically",
    detailedComparison: "GlideRecord is imperative — you build a query step by step (addQuery, addOrCondition, orderBy), execute it, and iterate rows. Object Set queries are declarative — you define filter conditions and the platform resolves them. The experience is similar to the difference between writing raw SQL versus using an ORM. In ServiceNow, GlideRecord gives you full control but requires careful performance tuning (always use addQuery over client-side filtering, limit fields with setLimit, etc.). In Foundry, Object Set queries are optimized by the platform — you define what you want, and Object Storage figures out how to execute it efficiently. Object Sets also compose: you can intersect, union, and chain them, whereas GlideRecord queries are harder to compose dynamically.",
    section: 3,
  },
  {
    id: "rs-021",
    category: "ontology",
    serviceNow: {
      name: "CMDB Health / Data Quality Rules",
      description: "ServiceNow's built-in dashboard for monitoring CMDB data quality. Tracks metrics like completeness (are required fields populated?), compliance (do CIs follow defined standards?), correctness (is the data accurate?), and staleness (when was this CI last updated?). Health scores help you prioritize data remediation efforts."
    },
    foundry: {
      name: "Data Expectations + Ontology Health",
      description: "Foundry's approach to data quality combines Data Expectations (validation rules on datasets — null checks, uniqueness, ranges, row counts) with Ontology Health monitoring that tracks Object Type completeness, link integrity, and staleness. Pipeline monitoring provides visibility into whether data is flowing correctly and on schedule."
    },
    notes: "Both monitor and report on data quality health",
    detailedComparison: "CMDB Health in ServiceNow is a purpose-built dashboard for the CMDB — it measures completeness, compliance, correctness, and relationship health using pre-defined KPIs. It is opinionated about what 'healthy' means for configuration data. Foundry's approach is more general and composable: Data Expectations let you define custom validation rules on any dataset, and Pipeline Monitoring tracks whether pipelines are running successfully and data is fresh. You build your own 'health dashboard' by combining these tools. The trade-off: CMDB Health gives you an instant, opinionated quality score out of the box; Foundry requires you to define what 'healthy' means for your data. However, Foundry's approach scales to any data domain, not just configuration management.",
    section: 3,
  },

  // ============================================================
  // PIPELINE CATEGORY (Section 4) — 6 entries
  // ============================================================
  {
    id: "rs-022",
    category: "pipeline",
    serviceNow: {
      name: "Flow Designer",
      description: "A low-code automation tool for building workflows without scripting. You chain triggers, actions, and flow logic (if/else, loops, wait) to automate processes like approvals, notifications, and record updates. Replaced much of the old Workflow Editor. Integrates with Integration Hub for external connectors."
    },
    foundry: {
      name: "Pipeline Builder",
      description: "A visual tool for building data transformation pipelines. You chain data sources, transforms, and output datasets into a directed acyclic graph (DAG). Pipeline Builder handles scheduling, dependency resolution, and incremental computation. Used for both batch and streaming data processing."
    },
    notes: "Both provide visual workflow/pipeline orchestration",
    detailedComparison: "Flow Designer and Pipeline Builder serve fundamentally different purposes despite both being 'visual builders.' Flow Designer orchestrates business process automation — approvals, notifications, record updates triggered by events. Pipeline Builder orchestrates data transformation — taking raw inputs, cleaning, joining, and producing curated datasets. The mental model shift: in ServiceNow, a Flow responds to an event and takes actions; in Foundry, a Pipeline takes data inputs and produces data outputs. Flow Designer is event-driven and stateful (flows have running instances); Pipeline Builder is schedule-driven and stateless (each run produces a new dataset transaction). If you need event-driven logic in Foundry, that is handled by Action Types and webhooks, not Pipelines.",
    section: 4,
  },
  {
    id: "rs-023",
    category: "pipeline",
    serviceNow: {
      name: "Transform Map",
      description: "Maps columns from an import set (staging table) to a target table. Used during data imports to rename fields, coerce types, apply defaults, and run transform scripts. You've used these with scheduled imports — CSV files land in an import set, transform maps clean and map the data, and records land in the target table."
    },
    foundry: {
      name: "Transform",
      description: "A computation step within a Pipeline that takes one or more input datasets and produces an output dataset. Transforms can be written in Python (PySpark), SQL, or Java, or configured using the visual Transform Board. Transforms handle filtering, joining, aggregating, and reshaping data."
    },
    notes: "Both convert raw imported data into structured records",
    detailedComparison: "ServiceNow Transform Maps are tightly scoped — they map columns from a staging import set to a destination table, with optional scripting for complex mappings. Foundry Transforms are far more general: they are arbitrary computations that can join multiple datasets, perform aggregations, apply ML models, or any other data operation. The ServiceNow flow is: file -> import set -> transform map -> target table. The Foundry flow is: raw dataset -> transform -> clean dataset -> (optionally more transforms) -> final dataset -> Object Type. Foundry's approach is more composable — you can chain transforms, branch pipelines, and reuse intermediate datasets. Also, Foundry transforms are versioned and reproducible, whereas ServiceNow transform maps execute and the staging data is typically cleaned up.",
    section: 4,
  },
  {
    id: "rs-024",
    category: "pipeline",
    serviceNow: {
      name: "Scheduled Job",
      description: "A server-side script that runs on a defined schedule (daily, weekly, or cron expression). Used for batch operations like data cleanup, report generation, integration syncs, and SLA calculations. You configure them in 'System Definition > Scheduled Jobs' and they run as the system user unless configured otherwise."
    },
    foundry: {
      name: "Pipeline Schedule",
      description: "A schedule attached to a Pipeline or individual transform that controls when it runs. Supports cron expressions, event-triggered runs, and dependency-based scheduling (run after upstream pipeline completes). Pipeline Schedules ensure data stays fresh — e.g., ingest new GPS data every 15 minutes, run the full ETL daily at 2 AM."
    },
    notes: "Both execute recurring automated processes on a schedule",
    detailedComparison: "Scheduled Jobs in ServiceNow are general-purpose — they can run any server-side script on a cron schedule. They are used for everything from data cleanup to integration polling to report generation. Pipeline Schedules in Foundry are specifically about data processing — they control when pipelines run and how data flows through the system. The key difference is that Foundry Pipeline Schedules understand data dependencies: you can configure a downstream pipeline to trigger automatically when its upstream input dataset completes. ServiceNow Scheduled Jobs are independent — if Job A produces data that Job B needs, you manually coordinate the timing or use events. For non-data automation in Foundry, Action Types with webhook triggers or time-based triggers serve a similar purpose to ServiceNow's general Scheduled Jobs.",
    section: 4,
  },
  {
    id: "rs-025",
    category: "pipeline",
    serviceNow: {
      name: "ATF (Automated Test Framework)",
      description: "ServiceNow's testing framework for validating platform configurations. You build test suites with steps that impersonate users, fill out forms, trigger flows, and assert expected outcomes. Covers server-side logic, client-side behavior, and Flow Designer flows. Essential for validating update sets before promotion."
    },
    foundry: {
      name: "Data Expectations",
      description: "Foundry's data quality validation framework. You define expectations on datasets — null checks, uniqueness constraints, range validations, row count thresholds, schema conformance. Expectations run as part of pipelines and flag or block bad data before it reaches the Ontology. Think of them as automated data quality gates."
    },
    notes: "Both validate quality and correctness before production",
    detailedComparison: "ATF and Data Expectations solve different testing problems. ATF tests platform behavior — 'when a user submits this form, does the business rule fire correctly?' It is functional testing for configurations. Data Expectations test data quality — 'does this column have nulls? Is this ID unique? Did we get at least 1000 rows?' They are data validation gates in pipelines. There is no direct 1:1 mapping here, but the conceptual similarity is that both are automated quality checks that run before something goes to production. In ServiceNow, you test configurations before promoting update sets. In Foundry, you validate data quality before it flows into the Ontology. Foundry does not have a direct equivalent of ATF for testing app behavior — that is typically handled by branch-based testing and manual QA.",
    section: 4,
  },
  {
    id: "rs-026",
    category: "pipeline",
    serviceNow: {
      name: "System Logs / Debug Logs",
      description: "ServiceNow provides extensive logging via System Logs (syslog), Transaction Logs, Debug Business Rules, and Script Log Statements. You use gs.info(), gs.debug(), and session debug modules to trace execution. Debugging often involves enabling debug for a session, reproducing the issue, and reading through log output."
    },
    foundry: {
      name: "Pipeline Monitoring + Build History",
      description: "Foundry provides detailed monitoring for every pipeline and transform execution. Build history shows each run's status, duration, input/output row counts, and error logs. Pipeline monitoring dashboards track health, build frequency, and failures across your entire data ecosystem. Spark UI is available for deep-diving into PySpark execution details."
    },
    notes: "Both provide logging and monitoring for debugging execution issues",
    detailedComparison: "In ServiceNow, debugging is session-based — you enable debug for your session, reproduce the issue, and read syslog entries. It is reactive and often requires reproducing the problem. Foundry's pipeline monitoring is persistent — every build is logged with full history, so you can investigate failures after the fact. Build history shows exactly what happened: which transforms ran, how many rows were processed, and where errors occurred. The experience is more like reviewing CI/CD build logs than ServiceNow's session debugging. Foundry also provides Spark UI for deep-diving into PySpark execution, which has no ServiceNow equivalent. The paradigm shift: ServiceNow debugging is about tracing code execution; Foundry monitoring is about tracking data flow through pipelines.",
    section: 4,
  },
  {
    id: "rs-027",
    category: "pipeline",
    serviceNow: {
      name: "Workflow / Flow Stages",
      description: "In ServiceNow, both the legacy Workflow Editor and modern Flow Designer support multi-stage processes with branching, parallel paths, approvals, and wait conditions. Stages represent phases in a process (e.g., Requested -> Approved -> Fulfilled). Each stage can have sub-steps and transitions driven by conditions."
    },
    foundry: {
      name: "Pipeline DAG Nodes",
      description: "In Foundry Pipeline Builder, each transform is a node in a directed acyclic graph (DAG). Nodes have explicit input and output dependencies — a transform only runs when its input datasets are ready. The DAG structure ensures correct execution order, enables parallel execution of independent branches, and provides clear lineage from raw data to final outputs."
    },
    notes: "Both define multi-step processes with dependencies and branching",
    detailedComparison: "ServiceNow Workflow stages model business process flow — they are about the lifecycle of a request or task, with human decision points, approvals, and time-based triggers. Pipeline DAG nodes model data flow — they are about the lineage of data from raw to curated, with each node being a deterministic transformation. The structural similarity is that both use directed graphs with dependencies. The key difference: Workflow stages are stateful and long-running (a workflow instance can be paused for days waiting on an approval), while Pipeline DAG executions are stateless and typically complete in minutes or hours. In ServiceNow, you think about 'what happens next in the process'; in Foundry, you think about 'what data feeds into this computation.'",
    section: 4,
  },

  // ============================================================
  // PYSPARK CATEGORY (Section 5) — 6 entries
  // ============================================================
  {
    id: "rs-028",
    category: "pyspark",
    serviceNow: {
      name: "Background Script (Server-side JS)",
      description: "A one-off server-side JavaScript execution environment in ServiceNow. Found under System Definition > Scripts - Background. Used for ad-hoc data queries, bulk updates, testing script logic, and debugging. Runs with elevated privileges and directly executes GlideRecord operations against the database. Every ServiceNow admin's best friend and worst enemy."
    },
    foundry: {
      name: "Code Repository Transform (Python/PySpark)",
      description: "In Foundry, custom data transformations are written as Python or PySpark code in Code Repositories (or directly in Pipeline Builder's code transform). You write a function that takes input DataFrames and returns an output DataFrame. The code runs on Spark, giving you distributed processing for large datasets. Code Repositories provide version control, testing, and CI/CD for transform logic."
    },
    notes: "Both allow writing custom code to query and transform platform data",
    detailedComparison: "Background Scripts in ServiceNow are imperative, single-threaded, and run against a traditional database — you write GlideRecord loops to process records one at a time. Foundry Code Repository transforms are declarative DataFrame operations that run on a distributed Spark cluster — you describe transformations and Spark parallelizes them across the dataset. The scale difference is dramatic: a Background Script processing 100K records might run for minutes; a PySpark transform processing 100M rows completes in similar time due to distributed execution. The development experience also differs: Background Scripts are throwaway (no version control, no testing), while Code Repositories provide Git-based version control, unit testing, and CI/CD. Think of Code Repositories as the 'real' development environment that Background Scripts never were.",
    section: 5,
  },
  {
    id: "rs-029",
    category: "pyspark",
    serviceNow: {
      name: "Script Include (Reusable Logic)",
      description: "A server-side JavaScript class in ServiceNow that encapsulates reusable logic. Script Includes are called from Business Rules, Flows, Scheduled Jobs, and other Script Includes. They provide a way to organize and share server-side code. Examples: utility functions for date manipulation, custom GlideRecord helpers, integration logic. You define a class with methods and instantiate it where needed."
    },
    foundry: {
      name: "Transform Library / Shared Code Module",
      description: "In Foundry Code Repositories, you can create shared Python modules and libraries that are imported across multiple transforms. Common patterns include utility functions for data cleaning, custom PySpark UDFs (User Defined Functions), and shared business logic. Libraries are versioned and published, and transforms declare them as dependencies."
    },
    notes: "Both provide reusable code modules shared across the platform",
    detailedComparison: "Script Includes in ServiceNow are platform-global — any server-side script can instantiate any Script Include (subject to scope). They are essentially a class library with no formal dependency management. Foundry's shared code modules live in Code Repositories with explicit versioning and dependency declarations. When you publish a library, transforms that depend on it declare the dependency explicitly. This is closer to how Python packages work with pip/PyPI. The key advantage: Foundry's approach avoids the 'Script Include spaghetti' problem where changing one Script Include can break unknown callers. Dependencies are explicit and versioned, so you know exactly what depends on what.",
    section: 5,
  },
  {
    id: "rs-030",
    category: "pyspark",
    serviceNow: {
      name: "GlideRecord Operations",
      description: "The bread and butter of ServiceNow development. GlideRecord provides methods for CRUD operations: addQuery() and next() for reading, setValue() and update() for modifying, insert() for creating, and deleteRecord() for removing. You build queries incrementally, iterate results in while loops, and process records one at a time."
    },
    foundry: {
      name: "PySpark DataFrame Operations",
      description: "PySpark DataFrames are the core API for data manipulation in Foundry transforms. Operations include select(), filter()/where() for querying, join() for combining datasets, groupBy().agg() for aggregation, withColumn() for adding/modifying columns, and orderBy() for sorting. Operations are lazy — they build an execution plan that Spark optimizes and parallelizes."
    },
    notes: "Both are the primary API for querying and transforming data",
    detailedComparison: "GlideRecord and PySpark DataFrames are both 'how you work with data,' but the paradigms are fundamentally different. GlideRecord is row-by-row: you query, iterate with next(), and process each record individually. PySpark is set-based: you describe transformations on entire columns or datasets, and Spark parallelizes the execution. This means operations like 'update all records where state=1' that require a GlideRecord loop in ServiceNow are a single filter().withColumn() chain in PySpark. The performance implications are massive — PySpark scales linearly with cluster size, while GlideRecord is bounded by single-thread performance. The learning curve for a ServiceNow developer is moving from 'loop over records' to 'describe transformations on datasets.'",
    section: 5,
  },
  {
    id: "rs-031",
    category: "pyspark",
    serviceNow: {
      name: "Fix Script",
      description: "A server-side JavaScript script in ServiceNow designed to run once for data remediation or backfill operations. Fix Scripts are used for one-time bulk updates — fixing bad data, backfilling new fields, migrating data between tables. They are tracked in the sys_fix_script table and marked as completed after execution to prevent accidental re-runs."
    },
    foundry: {
      name: "One-time Transform (Data Backfill)",
      description: "In Foundry, one-time data operations are typically implemented as transforms that run once and produce a corrected dataset. You can write a PySpark transform that reads the current data, applies corrections, and outputs the fixed version. The transform is then either archived or converted into the regular pipeline. Dataset branching lets you test the fix before applying it to production."
    },
    notes: "Both handle one-time data correction and backfill operations",
    detailedComparison: "Fix Scripts in ServiceNow are imperative, one-shot scripts that modify records in place — you run them once, they update the database, and you mark them done. They are risky because they directly mutate production data with no easy rollback. Foundry's approach is inherently safer: a one-time transform creates a new version of the dataset, and the original data is preserved in the transaction history. You can test the fix on a branch first, review the results, and merge to production. If something goes wrong, you roll back the dataset to the previous transaction. The key cultural difference: ServiceNow fixes are 'modify in place and hope for the best'; Foundry fixes are 'create a new version and verify before committing.'",
    section: 5,
  },
  {
    id: "rs-032",
    category: "pyspark",
    serviceNow: {
      name: "Scheduled Script Execution",
      description: "Combines Scheduled Jobs with Script Includes to run recurring server-side logic on a cron schedule. Common patterns include nightly data cleanup, periodic report generation, integration polling, and SLA recalculation. You configure the schedule and point it at a Script Include method or inline script."
    },
    foundry: {
      name: "Scheduled Transform Build",
      description: "In Foundry, transforms can be scheduled to build on a cron-like schedule or triggered by upstream data changes. A scheduled build re-executes the transform code against the latest input data and produces a new output transaction. Schedules are configured per-transform or per-pipeline, with options for dependency-based triggering."
    },
    notes: "Both execute recurring automated data processing on a schedule",
    detailedComparison: "Scheduled Script Execution in ServiceNow and Scheduled Transform Builds in Foundry both automate recurring processing. The difference is in what they process: ServiceNow scripts typically query and modify records in place (GlideRecord loops), while Foundry transforms read input datasets and produce new output dataset versions. Foundry's scheduling is data-aware — you can trigger a transform when its input data changes, not just on a time schedule. This means downstream transforms automatically run when upstream data is refreshed, creating a reactive data pipeline. In ServiceNow, coordinating dependent scheduled jobs requires manual timing or event-based triggers. Foundry's dependency-based scheduling eliminates the 'did Job A finish before Job B started?' problem entirely.",
    section: 5,
  },
  {
    id: "rs-033",
    category: "pyspark",
    serviceNow: {
      name: "Server-side Scripting (Rhino JS Engine)",
      description: "All server-side scripting in ServiceNow runs on the Mozilla Rhino JavaScript engine — a Java-based JS interpreter. This includes Business Rules, Script Includes, Scheduled Jobs, Fix Scripts, and Background Scripts. The API surface is ServiceNow-specific: GlideRecord, GlideSystem (gs), GlideDateTime, GlideAggregate. The language is JavaScript but the runtime and APIs are unique to the platform."
    },
    foundry: {
      name: "Python in Foundry (PySpark + Libraries)",
      description: "Foundry's primary programming language for data transforms is Python, running on Apache Spark (PySpark). You have access to the full Python ecosystem — pandas, numpy, scikit-learn, and any pip-installable library. Foundry-specific APIs include the transforms library (@transform decorator, Input/Output) and the Ontology SDK. Code runs distributed on Spark clusters."
    },
    notes: "Both are the primary server-side programming environments on their platforms",
    detailedComparison: "The shift from ServiceNow's Rhino JS to Foundry's Python is one of the biggest transitions for a ServiceNow developer. Rhino JS is a constrained, single-threaded environment with a platform-specific API — you cannot import external libraries or use modern JavaScript features. Foundry's Python environment is open and powerful — you can use any Python library, run on distributed Spark clusters, and leverage the massive Python data science ecosystem. The learning curve is not just a new language (Python vs JavaScript), but a new paradigm: from imperative record-by-record processing (GlideRecord loops) to declarative, set-based DataFrame operations. The payoff is significant: what takes 100 lines of GlideRecord code often takes 5 lines of PySpark, and it runs orders of magnitude faster on large datasets.",
    section: 5,
  },

  // ============================================================
  // WORKSHOP CATEGORY (Section 9) — 5 entries
  // ============================================================
  {
    id: "rs-034",
    category: "workshop",
    serviceNow: {
      name: "Service Portal",
      description: "A framework for building customer-facing and employee-facing web portals. Uses Angular.js (yes, AngularJS 1.x) with widgets, pages, and themes. Widgets are self-contained components with HTML, CSS, client script, and server script. You've probably built portal pages for service catalogs, knowledge bases, and dashboards."
    },
    foundry: {
      name: "Workshop",
      description: "Foundry's application builder for creating operational applications. Drag-and-drop widgets connected to Ontology Objects, Actions, and Functions. Workshop apps are real-time, reactive, and automatically enforce Ontology permissions. Used to build dashboards, operational tools, and decision-making interfaces."
    },
    notes: "Both are the primary app-building framework on their platforms",
    detailedComparison: "Service Portal and Workshop are both the 'build apps for end users' tool on their respective platforms, but the architecture is fundamentally different. Service Portal widgets require you to write HTML templates, CSS, client-side JavaScript, and server-side JavaScript — it is essentially web development inside ServiceNow. Workshop is entirely declarative: you drag widgets onto a canvas and configure them to bind to Ontology data. There is no custom HTML or CSS. The trade-off: Workshop is much faster to build with and inherently more maintainable, but you have less pixel-perfect control. Workshop's killer feature is native Ontology integration — every widget automatically knows about Object Types, Links, and Actions, so you never write a GlideRecord equivalent.",
    section: 9,
  },
  {
    id: "rs-035",
    category: "workshop",
    serviceNow: {
      name: "Performance Analytics",
      description: "The reporting and dashboarding engine in ServiceNow. Provides indicators, breakdowns, scores, and time series tracking. You build dashboards with widgets showing KPIs, trends, and drill-downs. Also includes benchmarking and predictive capabilities. Often used by managers for incident trends, SLA compliance, and capacity reporting."
    },
    foundry: {
      name: "Quiver",
      description: "Foundry's analytics and dashboarding tool. Build interactive charts, tables, and visualizations backed by datasets or Ontology queries. Supports filtering, pivoting, drill-downs, and real-time data. Quiver dashboards can be embedded in Workshop apps or shared standalone."
    },
    notes: "Both provide analytics dashboards and reporting",
    detailedComparison: "Performance Analytics in ServiceNow is tightly coupled to the platform's data model — you define indicators on tables, choose breakdowns, and the system computes scores on a schedule. It is powerful but somewhat rigid — custom metrics often require scripted indicators. Quiver in Foundry is more like a general-purpose BI tool: you point it at any dataset or Object Type and build visualizations interactively. Quiver is more flexible for ad-hoc exploration, while Performance Analytics excels at structured KPI tracking. The integration model also differs: PA dashboards live in the ServiceNow dashboard framework, while Quiver charts can be embedded directly into Workshop apps as widgets, creating a seamless operational + analytical experience.",
    section: 9,
  },
  {
    id: "rs-036",
    category: "workshop",
    serviceNow: {
      name: "UI Policy / Client Script",
      description: "Client-side logic that controls form behavior in ServiceNow. UI Policies declaratively show/hide fields, make them mandatory, or set values based on conditions. Client Scripts (onChange, onLoad, onSubmit) provide imperative JavaScript for more complex interactions. Together they make forms dynamic and context-aware."
    },
    foundry: {
      name: "Workshop Events + Variables",
      description: "The event system in Workshop that makes apps interactive and reactive. Events fire when users interact with widgets (click a row, select a filter, press a button). Events can trigger Actions, update variables, navigate to other modules, or chain to other events. Combined with variables, they create dynamic, stateful applications."
    },
    notes: "Both control dynamic UI behavior based on user interaction",
    detailedComparison: "UI Policies and Client Scripts in ServiceNow are scoped to individual form fields — you react to a field changing and modify other fields in response. Workshop Events are scoped to widget interactions and application-level state. The paradigm shift: ServiceNow's client-side logic is about form manipulation (show/hide fields, set values), while Workshop Events are about application orchestration (select an object, filter a list, trigger an action, navigate). Workshop uses a reactive variable system — widgets bind to variables, events update variables, and the UI automatically re-renders. This is conceptually similar to modern frontend frameworks (React/Vue) versus ServiceNow's jQuery-era DOM manipulation.",
    section: 9,
  },
  {
    id: "rs-037",
    category: "workshop",
    serviceNow: {
      name: "Service Portal Widget",
      description: "A self-contained UI component in Service Portal with four parts: HTML template (AngularJS), CSS, client controller (JavaScript), and server script (GlideRecord queries). Widgets are reusable across portal pages. You build custom widgets for everything from custom tables to interactive dashboards. The sp_widget table stores their definitions."
    },
    foundry: {
      name: "Workshop Widget",
      description: "A pre-built UI component in Workshop that you configure through properties and data bindings. Workshop provides a library of widgets: tables, charts, maps, forms, filters, buttons, and more. Each widget connects to Ontology data through configuration — no code required. Custom Workshop plugins can extend the widget library with bespoke components."
    },
    notes: "Both are the building blocks for creating application interfaces",
    detailedComparison: "Service Portal widgets and Workshop widgets are both the building blocks of apps, but the development model is inverted. Service Portal widgets are code-first: you write HTML, CSS, client JS, and server JS to create each component. This gives maximum control but requires web development skills and significant maintenance effort. Workshop widgets are configuration-first: you select a widget type (table, chart, map) and configure it to bind to Ontology data. No coding needed for standard use cases. When you need custom behavior beyond what built-in widgets offer, Workshop supports custom plugins developed externally and imported. The trade-off: ServiceNow gives you a blank canvas for each widget; Workshop gives you a rich library of pre-built, Ontology-aware components.",
    section: 9,
  },
  {
    id: "rs-038",
    category: "workshop",
    serviceNow: {
      name: "Portal Page (Multi-widget Layout)",
      description: "A page in Service Portal that arranges multiple widgets into a layout using rows and columns. Pages are URL-routable and can accept parameters. You build multi-page portal experiences by linking pages together. The portal itself is a container with a theme, header, and footer that wraps all pages."
    },
    foundry: {
      name: "Workshop Module (Multi-page App)",
      description: "A Workshop Module is a single page within a Workshop application that arranges widgets into a layout. Workshop apps can contain multiple Modules linked by navigation and parameterized routing. Modules support tabs, sections, and responsive layouts. The Workshop application wraps all Modules with shared navigation and configuration."
    },
    notes: "Both define multi-widget page layouts within an application shell",
    detailedComparison: "Service Portal pages and Workshop Modules serve the same purpose: composing widgets into usable screens. Both support parameterized routing (passing IDs or filters via URL), multi-page navigation, and layout configuration. The key difference is in how they are built: Service Portal pages use a drag-and-drop layout of containers and rows, with widgets placed into slots and configured with options. Workshop Modules use a similar canvas-based layout but with native Ontology integration — widgets automatically share context through variables and events, so selecting a row in one widget can filter another widget without scripting. In Service Portal, cross-widget communication requires custom event handling via $broadcast/$emit or shared services. Workshop's variable system makes cross-widget communication declarative and visual.",
    section: 9,
  },

  // ============================================================
  // ANALYTICS CATEGORY (Section 10) — 4 entries
  // ============================================================
  {
    id: "rs-039",
    category: "analytics",
    serviceNow: {
      name: "Service Portal (Custom HTML/CSS/JS)",
      description: "When standard Service Portal widgets are not enough, you build fully custom widgets with hand-written HTML, CSS, and JavaScript. This is ServiceNow's escape hatch for pixel-perfect or highly interactive UIs — maps, custom charts, drag-and-drop interfaces. You have full control over the DOM but must manage data fetching, security, and performance yourself."
    },
    foundry: {
      name: "Slate (Custom Web App)",
      description: "Slate is Foundry's tool for building fully custom web applications on top of Foundry data. You write HTML, CSS, and JavaScript with access to Foundry APIs for data fetching and Ontology queries. Slate provides an IDE-like editor within Foundry and handles authentication and permissions. Used when Workshop's declarative approach is not flexible enough."
    },
    notes: "Both provide a code-first approach for fully custom UIs",
    detailedComparison: "Custom Service Portal widgets and Slate apps both exist for the same reason: when the declarative tools are not flexible enough. In ServiceNow, you drop into custom widget development within the Service Portal framework (AngularJS, sp_widget). In Foundry, you use Slate to write custom HTML/CSS/JS with Foundry API access. Both give you a full web development canvas. The key difference: Slate is a standalone application builder with its own editor and deployment model, while Service Portal widgets live inside the portal framework. Slate applications can use modern JavaScript frameworks and have direct access to Foundry's Ontology APIs for real-time data. Both are powerful but should be used sparingly — most use cases are better served by Workshop (Foundry) or standard Portal widgets (ServiceNow).",
    section: 10,
  },
  {
    id: "rs-040",
    category: "analytics",
    serviceNow: {
      name: "Dashboards / Homepage",
      description: "ServiceNow's dashboard framework for creating at-a-glance views of platform data. Dashboards contain widgets showing lists, charts, and reports. The Homepage is the first screen users see after login and is customizable per role. You configure dashboards through System UI > Dashboards and add Performance Analytics widgets, list widgets, and custom content."
    },
    foundry: {
      name: "Quiver Dashboard",
      description: "Quiver dashboards in Foundry combine multiple visualizations (charts, tables, maps, KPI cards) into a single interactive view. Dashboards support cross-filtering — selecting a value in one chart automatically filters others. They can be backed by raw datasets or Ontology queries. Quiver dashboards can be shared standalone or embedded in Workshop apps."
    },
    notes: "Both provide at-a-glance views combining multiple visualizations",
    detailedComparison: "ServiceNow dashboards and Quiver dashboards both serve the 'executive overview' use case, but their data integration models differ. ServiceNow dashboards pull from tables and Performance Analytics indicators — they are tightly coupled to the platform's data model. Quiver dashboards connect to any Foundry dataset or Ontology Object Type, making them useful for data from any source. Cross-filtering in Quiver is native — clicking a bar in a chart automatically filters all other widgets. In ServiceNow, dashboard-level filtering is more limited (you typically use separate reports with drill-down). Quiver also supports more sophisticated analytics: pivot tables, cohort analysis, and statistical functions that go beyond ServiceNow's standard reporting capabilities.",
    section: 10,
  },
  {
    id: "rs-041",
    category: "analytics",
    serviceNow: {
      name: "Report",
      description: "ServiceNow's built-in reporting module for creating charts, lists, and pivot tables from table data. Reports support bar charts, pie charts, time series, and tabular views. You configure data sources, group-by fields, filters, and drill-down behavior. Reports can be scheduled for email delivery and embedded in dashboards and homepages."
    },
    foundry: {
      name: "Contour Analysis",
      description: "Contour is Foundry's spreadsheet-like analysis tool for exploring and analyzing datasets. It provides a familiar pivot table and charting interface for ad-hoc data exploration. Users can filter, group, aggregate, and visualize data without writing code. Contour analyses can be saved, shared, and their results can feed into other Foundry workflows."
    },
    notes: "Both provide ad-hoc data exploration and visualization",
    detailedComparison: "ServiceNow Reports and Contour both enable non-technical users to explore data visually, but their scope differs significantly. ServiceNow Reports are scoped to a single table with conditions — you pick a table, add filters, choose a chart type. Contour operates on datasets and supports multi-step analysis: filter, join, pivot, and chart in a sequence of steps, similar to a spreadsheet workflow. Contour is more powerful for complex analysis because it supports intermediate steps — you can filter a dataset, group it, compute aggregates, and then visualize the result. ServiceNow Reports are single-step: configure and render. Contour is closer to Excel PivotTables with a visual builder, while ServiceNow Reports are closer to a simple chart wizard.",
    section: 10,
  },
  {
    id: "rs-042",
    category: "analytics",
    serviceNow: {
      name: "Performance Analytics KPIs",
      description: "Structured KPI tracking in ServiceNow with indicators, targets, breakdowns, and trending. You define what to measure (e.g., mean time to resolution), set targets, and track scores over time with automatic snapshots. Breakdowns let you slice KPIs by category, priority, assignment group, etc. PA provides benchmarking and goal tracking for operational excellence."
    },
    foundry: {
      name: "Quiver KPI Cards + Metrics",
      description: "In Foundry, KPI tracking is built using Quiver's metric cards and time series visualizations. You define metrics as aggregations over datasets or Object Type properties, configure thresholds and targets, and display them in dashboards. Quiver supports trend analysis, comparison views, and drill-down from KPI to underlying data."
    },
    notes: "Both track and display key performance indicators over time",
    detailedComparison: "Performance Analytics KPIs in ServiceNow are a first-class feature with dedicated infrastructure — indicators, scores, snapshots, and breakdowns are all managed by the PA engine. The system automatically collects scores on a schedule and maintains historical data. In Foundry, KPI tracking is assembled from general-purpose components: Quiver metric cards compute aggregations in real-time against datasets. There is no dedicated 'KPI engine.' The trade-off: ServiceNow PA is more turnkey for standard KPI tracking (define an indicator and it just works), while Foundry's approach is more flexible (you can compute any metric from any data source). Foundry's advantage is that KPIs can span across multiple data sources and domains, not just ServiceNow tables. The visual experience is comparable — both support trend lines, targets, and threshold coloring.",
    section: 10,
  },

  // ============================================================
  // INTEGRATION CATEGORY (Section 11) — 5 entries
  // ============================================================
  {
    id: "rs-043",
    category: "integration",
    serviceNow: {
      name: "Scripted REST API",
      description: "Custom API endpoints you build in ServiceNow for external integrations. You define a resource path, HTTP method, and write server-side JavaScript to handle requests and responses. Used when you need to expose ServiceNow data or logic to external systems — mobile apps, third-party tools, or custom frontends."
    },
    foundry: {
      name: "Functions / OSDK",
      description: "Functions are server-side TypeScript/Python logic registered in the Ontology (used in Actions, queries, and automation). OSDK (Ontology Software Development Kit) is the external API layer — a generated, type-safe SDK that lets external applications query Objects, execute Actions, and subscribe to changes. OSDK replaces the need for hand-written REST APIs."
    },
    notes: "Both expose platform logic to external consumers",
    detailedComparison: "Scripted REST APIs in ServiceNow require you to manually define endpoints, parse request parameters, write GlideRecord queries, format JSON responses, and handle errors. It is essentially building a bespoke REST API for every integration. Foundry's OSDK flips this: the Ontology automatically generates a type-safe SDK that external applications can consume. You do not hand-write endpoints — the OSDK provides methods like Employee.where(...) or assignDriver.apply(...) that map directly to your Ontology. Functions provide the custom logic layer (like Business Rules for APIs), and OSDK is the delivery mechanism. The result is dramatically less boilerplate and a consistent API surface that evolves automatically as your Ontology changes.",
    section: 11,
  },
  {
    id: "rs-044",
    category: "integration",
    serviceNow: {
      name: "Outbound REST Message",
      description: "ServiceNow's mechanism for calling external REST APIs. You configure a REST Message with the endpoint URL, authentication, and HTTP method, then define HTTP Methods with request body templates and variable substitutions. Called from server-side scripts via RESTMessageV2 API. Used for pushing data out, triggering external systems, and real-time integrations."
    },
    foundry: {
      name: "Webhook / External API Call",
      description: "In Foundry, outbound API calls are made through Functions (within Action Types) or through webhook integrations. Functions can use standard HTTP libraries to call external services as part of Action execution. Webhooks enable Foundry to notify external systems when events occur. The outbound integration pattern is: Action fires -> Function runs -> Function calls external API."
    },
    notes: "Both enable the platform to call external REST APIs",
    detailedComparison: "Outbound REST Messages in ServiceNow are configured declaratively — you define the endpoint, auth, and request template in the platform, then call them from scripts. This is convenient for standard integrations. In Foundry, outbound calls are made programmatically within Functions — you use standard HTTP libraries (like fetch or requests) within your Function code. This is more flexible but requires more coding. The key difference: ServiceNow centralizes outbound API configuration in REST Message records, making it easy to manage credentials and endpoints. Foundry embeds outbound calls in Function code, giving you more control over error handling and retry logic but requiring you to manage the implementation. Both platforms support OAuth, API key, and basic auth for outbound calls.",
    section: 11,
  },
  {
    id: "rs-045",
    category: "integration",
    serviceNow: {
      name: "IntegrationHub Spoke",
      description: "Pre-built connectors in IntegrationHub for popular services — Jira, Slack, AWS, Azure, Salesforce, and more. Spokes provide ready-made actions (create a Jira issue, send a Slack message) that you can use in Flow Designer without writing code. Custom spokes can be built using the Spoke Generator for internal APIs."
    },
    foundry: {
      name: "OSDK Integration / Marketplace Connectors",
      description: "Foundry provides marketplace connectors for common data sources and the OSDK for building custom integrations. OSDK enables external applications to interact with the Foundry Ontology programmatically. For data ingestion, Data Connection provides pre-built connectors for databases, file systems, and SaaS APIs. The integration model is data-first: bring data in, model it in the Ontology, then expose it via OSDK."
    },
    notes: "Both provide pre-built connectors for common external services",
    detailedComparison: "IntegrationHub Spokes in ServiceNow are bidirectional — they both pull data and push actions. A Jira spoke can create issues (outbound) and sync issue updates (inbound). Foundry's integration model separates these concerns: Data Connection handles inbound data ingestion from external sources, while OSDK handles outbound data exposure and action execution. There are no direct 'spoke' equivalents in Foundry that bundle inbound and outbound into one package. Instead, you compose the integration: Data Connection for ingestion, pipeline transforms for data processing, Ontology for modeling, and OSDK/Functions for outbound actions. This is more work to set up but gives you finer control over each layer of the integration.",
    section: 11,
  },
  {
    id: "rs-046",
    category: "integration",
    serviceNow: {
      name: "OAuth Provider / OAuth Setup",
      description: "ServiceNow's configuration for OAuth 2.0 authentication — both as a provider (exposing OAuth endpoints for external apps) and as a consumer (using OAuth tokens to call external APIs). You configure OAuth Application records, token endpoints, grant types, and scopes. Used for securing REST APIs, SSO integrations, and third-party service connections."
    },
    foundry: {
      name: "Foundry OAuth / Multipass",
      description: "Foundry uses OAuth 2.0 for API authentication and Multipass as its identity federation layer. Third-party applications authenticate via OAuth to access the OSDK. Multipass federates identity from external IdPs (SAML, OIDC) into Foundry's user system. Together, they handle both inbound authentication (external apps calling Foundry) and outbound identity (Foundry users authenticated by external IdPs)."
    },
    notes: "Both handle OAuth-based authentication and identity federation",
    detailedComparison: "ServiceNow's OAuth setup is table-driven — you create OAuth Application records and configure endpoints, scopes, and grant types through the platform UI. It supports both provider and consumer roles. Foundry's approach separates authentication (OAuth 2.0 for API access) from identity federation (Multipass for user identity). Multipass is a dedicated service for connecting external identity providers to Foundry — it handles SAML, OIDC, and other protocols. For OSDK integrations, third-party apps obtain OAuth tokens from Foundry to make API calls. The experience is conceptually similar but operationally different: ServiceNow's OAuth config is self-contained within the platform; Foundry's Multipass is a separate service that may require infrastructure coordination.",
    section: 11,
  },
  {
    id: "rs-047",
    category: "integration",
    serviceNow: {
      name: "MID Server REST (On-prem API Access)",
      description: "Using a MID Server to make REST calls to on-premise APIs that are not reachable from the cloud ServiceNow instance. The MID Server acts as a proxy — your script sends the REST request, the ECC queue routes it to the MID Server, and the MID Server makes the actual HTTP call within your network. Essential for integrating with internal systems behind firewalls."
    },
    foundry: {
      name: "foundry-dev-tools / S3 API / Agent API",
      description: "For on-premise or external tool integration with Foundry, options include foundry-dev-tools (a Python library for programmatic Foundry access), S3-compatible APIs for direct dataset access, and Data Connection Agents for bridging network boundaries. These tools let external systems push data to Foundry or pull data from it programmatically."
    },
    notes: "Both enable external or on-premise systems to interact with the platform",
    detailedComparison: "MID Server REST in ServiceNow is about reaching internal APIs from a cloud platform — the MID Server acts as a network bridge. Foundry's approach depends on the direction: for bringing data in from on-premise sources, Data Connection Agents serve the same bridging role. For external systems pushing data to Foundry, foundry-dev-tools provides a Python API for uploading datasets, and S3-compatible APIs allow direct file access. The key difference: ServiceNow's MID Server is a general-purpose proxy (REST calls, discovery, orchestration), while Foundry's tools are more specialized — each tool serves a specific integration pattern. For a ServiceNow admin used to routing everything through MID Servers, Foundry's approach requires learning which tool fits which use case.",
    section: 11,
  },

  // ============================================================
  // AIP CATEGORY (Section 12) — 4 entries
  // ============================================================
  {
    id: "rs-048",
    category: "aip",
    serviceNow: {
      name: "Virtual Agent",
      description: "ServiceNow's conversational AI chatbot. Provides pre-built topic conversations for common IT tasks (password reset, incident creation, knowledge lookup). You design conversation flows with NLU intents, entities, and scripted responses. Deployed in Service Portal or mobile app. Improved significantly with GenAI capabilities in recent releases."
    },
    foundry: {
      name: "AIP Assist",
      description: "Foundry's AI-powered natural language interface to the Ontology. Users ask questions in plain language and AIP translates them into Ontology queries, visualizations, and actions. AIP Assist is grounded in your actual data model — it knows about your Object Types, Links, and Actions. Used for ad-hoc exploration, operational questions, and triggering actions conversationally."
    },
    notes: "Both provide AI-powered conversational interfaces",
    detailedComparison: "Virtual Agent in ServiceNow is a structured chatbot — you define conversation topics, train NLU models, and script branching logic. It is powerful for well-defined IT support flows but brittle for open-ended questions. AIP Assist in Foundry is fundamentally different: it is an LLM-powered interface grounded in the Ontology. Users can ask natural language questions ('show me all trucks overdue for maintenance in Texas') and AIP translates them into Ontology queries and actions. The key difference: Virtual Agent requires you to anticipate and build every conversation path; AIP Assist dynamically understands intent based on the Ontology structure and available data. AIP Assist is more flexible for exploratory use, while Virtual Agent excels at guided, structured workflows.",
    section: 12,
  },
  {
    id: "rs-049",
    category: "aip",
    serviceNow: {
      name: "Predictive Intelligence",
      description: "ServiceNow's built-in ML framework. Provides classification (predict category, assignment group), similarity (find related incidents), clustering, and regression. You train models on historical data from ServiceNow tables and apply predictions to incoming records. Configuration is low-code — you select a table, target field, and training features."
    },
    foundry: {
      name: "ML Objectives / Models",
      description: "Foundry's machine learning platform. ML Objectives define a business goal (e.g., predict equipment failure). Models are trained using Foundry's modeling toolkit — Python notebooks, auto-ML, or custom frameworks. Models are versioned, deployed as live endpoints, and integrated into the Ontology as properties or Function inputs."
    },
    notes: "Both provide built-in machine learning capabilities",
    detailedComparison: "Predictive Intelligence in ServiceNow is a pre-packaged, narrow ML toolkit — it excels at classification and similarity on ServiceNow table data with minimal configuration. Foundry's ML platform is a full-spectrum data science environment: you can use any Python library, train custom models, deploy them as live endpoints, and integrate predictions directly into the Ontology. The scope difference is massive — ServiceNow ML is designed for IT service management predictions (categorize this incident, who should this be assigned to), while Foundry ML handles any domain (predict equipment failure, optimize supply chain routes, detect fraud). In Foundry, ML model outputs can become Object properties, so a 'predicted failure date' appears right alongside the equipment's other attributes in Workshop.",
    section: 12,
  },
  {
    id: "rs-050",
    category: "aip",
    serviceNow: {
      name: "Agent Assist (NLU Copilot)",
      description: "ServiceNow's AI-powered assistance for agents working incidents and cases. Agent Assist suggests knowledge articles, recommends resolution steps, auto-fills fields, and provides similar incident lookup — all within the agent workspace. Uses NLU and ML models trained on historical ticket data to accelerate agent productivity."
    },
    foundry: {
      name: "AIP Logic (LLM-powered Workflows)",
      description: "AIP Logic enables you to embed LLM reasoning directly into Foundry workflows, Actions, and pipelines. You can define AI-powered logic steps that summarize text, classify documents, extract entities, generate recommendations, or make decisions based on natural language reasoning. AIP Logic integrates with the Ontology, so it can read Object data and trigger Actions based on AI outputs."
    },
    notes: "Both embed AI intelligence into operational workflows",
    detailedComparison: "ServiceNow's Agent Assist is a pre-built AI experience embedded in the agent workspace — it surfaces recommendations, similar records, and suggested actions to help agents resolve tickets faster. It is tightly scoped to the service management use case. AIP Logic in Foundry is a general-purpose AI building block — you can embed LLM reasoning into any workflow, pipeline, or Action. Examples include summarizing inspection reports, classifying incoming documents, or generating recommended actions for field operators. The scope difference is significant: Agent Assist is a finished product for service desk agents; AIP Logic is a toolkit for building AI-powered workflows in any domain. AIP Logic gives you more power and flexibility but requires deliberate design to create the AI experience.",
    section: 12,
  },
  {
    id: "rs-051",
    category: "aip",
    serviceNow: {
      name: "Knowledge Base",
      description: "A structured repository for articles, FAQs, and documentation. Organized by knowledge bases and categories, with article lifecycle management (draft, review, published, retired). Supports versioning, feedback ratings, and search. Integrated with Virtual Agent for deflecting tickets to relevant articles."
    },
    foundry: {
      name: "Custom Documentation for AIP Grounding",
      description: "Foundry does not have a single 'knowledge base' feature. Instead, documentation lives in project-level READMEs, Notepad documents, and the Help Center. AIP Assist can be configured with custom documentation and Ontology context to answer user questions — effectively creating an AI-powered knowledge base grounded in your actual data and processes."
    },
    notes: "Both provide self-service documentation and answers",
    detailedComparison: "ServiceNow Knowledge Management is a mature, structured system — articles go through workflows, have ownership, support multiple knowledge bases, and integrate with search and Virtual Agent. Foundry takes a different approach: there is no central 'knowledge base' module. Documentation is distributed across project READMEs and Notepad documents within the platform. However, AIP Assist compensates by providing intelligent, context-aware answers grounded in the Ontology — instead of searching for an article about 'how to check truck maintenance status,' a user can simply ask AIP and it will query the actual data. The paradigm shift: ServiceNow knowledge is human-authored articles; Foundry knowledge is AI-generated answers from live data and documentation.",
    section: 12,
  },
];
