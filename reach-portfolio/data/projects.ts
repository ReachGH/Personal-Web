export type ProjectSlug =
  "onboardhq" | "sabai-code" | "self-hosted-infrastructure";
export type CaseSection = {
  title: string;
  paragraphs: string[];
  points?: string[];
};
export type Project = {
  slug: ProjectSlug;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  year: string;
  status: string;
  summary: string;
  role: string;
  organisation: string;
  period: string;
  stack: string[];
  introduction: string;
  contributions: string[];
  sections: CaseSection[];
  takeaway: string;
  visualNote: string;
};

export const projects: Project[] = [
  {
    slug: "onboardhq",
    number: "01",
    name: "OnboardHQ",
    subtitle: "From scattered steps to a shared workflow.",
    category: "Full-stack · CRM integration",
    year: "2026",
    status: "Internship project · Demonstrated prototype",
    summary:
      "A client onboarding platform connecting tasks, documents and progress with an existing CRM. Built collaboratively during my Carelever internship.",
    role: "Software Development Intern",
    organisation: "Carelever",
    period: "Jul — Oct 2026",
    stack: ["React", "Angular", "Ruby on Rails", "PostgreSQL", "REST APIs"],
    introduction:
      "Client onboarding involved emails, spreadsheets and manual coordination. OnboardHQ brought the outstanding requirements into a shared workflow for clients and staff, and connected that workflow to the company’s existing CRM.",
    contributions: [
      "Client and staff onboarding interfaces",
      "Two-way task completion integration",
      "Database performance and consistency fixes",
      "API and regression testing",
    ],
    sections: [
      {
        title: "Start with the people doing the work",
        paragraphs: [
          "Clients needed to understand what to do next. Staff needed to see what was outstanding, who owned it and where the documents were. I focused primarily on OnboardHQ while a teammate worked mainly on a navigation and FAQ chatbot.",
          "I contributed a substantial portion of the application’s development, working with senior developers and business stakeholders. My responsibilities included specifying behaviour, implementing features, reviewing AI-assisted changes, testing and debugging.",
        ],
      },
      {
        title: "Make the next step clear",
        paragraphs: [
          "I worked on client-facing tasks and staff interfaces for creating and tracking onboarding cases. Task ownership, deadlines, document handling and ordered activities made the workflow easier to follow.",
          "Different brands needed different workflows. One important consideration was preserving each case’s workflow independently, so a later template change would not unexpectedly rewrite work already in progress.",
        ],
        points: [
          "Client-specific onboarding access and task confirmation",
          "Staff configuration of tasks, phases and deadlines",
          "Dependencies between onboarding activities",
          "File uploads, downloads and document visibility",
        ],
      },
      {
        title: "Connect the workflow to the CRM",
        paragraphs: [
          "Stakeholders wanted onboarding to fit into existing business processes. That meant linking cases, contacts, tasks and documents to the right company records rather than maintaining an isolated application.",
          "I helped identify the need for task completion to flow in both directions, and contributed to developing and verifying that behaviour. The engineering challenge was deciding how a change should propagate without creating repeated updates or changing unrelated records.",
        ],
      },
      {
        title: "Look beyond the happy path",
        paragraphs: [
          "I investigated concurrent document uploads and task deletion issues, using database transactions and row locking to protect data consistency. I also worked on reducing repeated database lookups through preloading and reusing loaded records.",
          "Regression tests and browser checks covered API behaviour, task changes and integration scenarios. Debugging included examining tests whose assumptions did not reflect actual application behaviour. AI-assisted coding helped produce changes; reviewing and validating those changes remained my responsibility.",
        ],
      },
      {
        title: "Demonstrate, test, refine",
        paragraphs: [
          "A working demonstration used dummy data and was shown to business stakeholders. The project evolved from a standalone application toward integration with existing business workflows.",
          "This case study describes an internship contribution and demonstration project. It does not claim a full production launch or quantified business savings.",
        ],
      },
    ],
    takeaway:
      "Real software has to fit the way people already work. Integration, reliable data and careful verification mattered as much as building the interface.",
    visualNote:
      "Conceptual interface illustration, created for this portfolio. It uses fictional content and is not a company screenshot.",
  },
  {
    slug: "sabai-code",
    number: "02",
    name: "Sabai Code",
    subtitle: "A shorter path from farm to basket.",
    category: "Mobile · Full-stack prototype",
    year: "2021 — 2022",
    status: "Investor-funded prototype · Not publicly launched",
    summary:
      "A grocery marketplace mobile prototype connecting customers with farmers. React Native development shaped by conversations with the people growing the produce.",
    role: "Full Stack Developer (Lead Developer)",
    organisation: "Sabai Code",
    period: "Jul 2021 — Jun 2022",
    stack: ["React Native", "Node.js", "Firebase"],
    introduction:
      "The idea was straightforward: help customers buy fresh produce directly from farmers and suppliers. Turning that idea into a useful mobile prototype started with understanding the people on both sides of the marketplace.",
    contributions: [
      "Led React Native mobile development",
      "Contributed to the Node.js backend",
      "Integrated Firebase services",
      "Gathered requirements with farmers and stakeholders",
    ],
    sections: [
      {
        title: "Requirements outside the office",
        paragraphs: [
          "I met farmers and business stakeholders in Cambodia to understand their day-to-day challenges. Those conversations helped inform what the application needed to do and how the marketplace concept should work.",
          "This was an early lesson in asking practical questions before committing to a feature. Understanding the user’s situation was part of the development work.",
        ],
      },
      {
        title: "Take responsibility across the stack",
        paragraphs: [
          "As the lead developer for the application’s mobile development, I built React Native interfaces and contributed to the Node.js backend. Firebase services supported the prototype.",
          "My work involved translating requirements into marketplace functionality, connecting the mobile application to backend services, and refining the prototype with stakeholder feedback. Technical ownership also meant communicating what could be built and what needed further clarification.",
        ],
      },
      {
        title: "Keep the outcome in perspective",
        paragraphs: [
          "The result was an investor-funded grocery marketplace prototype. It was not publicly launched. There are no claimed customer numbers, revenue figures or download metrics.",
          "The illustration here communicates the project concept. It is not presented as an original application screenshot or evidence of a specific historical interface.",
        ],
      },
    ],
    takeaway:
      "The most useful requirements often come from listening. Meeting farmers made the connection between an application feature and someone’s everyday work much more tangible.",
    visualNote:
      "Conceptual mobile interface designed for this portfolio, not an authentic screenshot. Product names and prices are illustrative.",
  },
  {
    slug: "self-hosted-infrastructure",
    number: "03",
    name: "Minecraft & Palworld",
    subtitle: "Self-hosted infrastructure, beyond localhost.",
    category: "Personal · Infrastructure & networking",
    year: "Personal project",
    status: "Hands-on self-hosting & troubleshooting",
    summary:
      "Two game-server setups, with different challenges: VPS-assisted Minecraft connectivity and a Docker-hosted Palworld server. A practical education in what runs underneath.",
    role: "Personal project",
    organisation: "Independent",
    period: "Ongoing learning",
    stack: ["Docker Compose", "Node.js", "VPS", "SSH", "TCP/IP", "UDP"],
    introduction:
      "Running a game server gave me a reason to learn networking, containers and remote administration through real problems. Minecraft and Palworld involved separate setups, each with its own constraints.",
    contributions: [
      "VPS-assisted access to a home-hosted Minecraft server",
      "SSH reverse tunnelling and reconnection",
      "Docker Compose administration for Palworld",
      "Networking, performance and save-data troubleshooting",
    ],
    sections: [
      {
        title: "Minecraft: make a home server reachable",
        paragraphs: [
          "I hosted Minecraft locally and configured a VPS to provide a public-facing connection through an SSH reverse tunnel. That involved working with TCP connectivity, maintaining the connection between hosts and arranging automatic tunnel reconnection.",
          "When a connection failed, the problem could sit at several layers: the game process, the tunnel, the remote host or the path between them. Troubleshooting meant checking each part instead of treating every failure as a game-server problem.",
        ],
      },
      {
        title: "Palworld: run and maintain a containerised service",
        paragraphs: [
          "Palworld ran in Docker on a personally managed Windows computer. I worked with Docker Compose, container configuration, environment variables, persistent game data and the networking required for gameplay.",
          "Maintenance included logs, updates, restarts, player management and performance investigation. Rubberbanding and lag required looking at server load and connectivity alongside container status.",
        ],
      },
      {
        title: "Know where the data lives",
        paragraphs: [
          "A save-data issue involved distinguishing the dedicated server’s world data from a player’s local map-discovery data. I investigated the client’s LocalData.sav when changing server entries.",
          "It was a useful reminder that an application can distribute state across multiple places. Preserving server files alone does not necessarily preserve every part of the player’s experience.",
        ],
      },
      {
        title: "Automate carefully",
        paragraphs: [
          "A Node.js Discord bot supported Minecraft availability monitoring and status reporting. I also explored server-readiness checks, wake-on-join behaviour and ways to reduce idle resource use.",
          "Scheduled restarts and more advanced start/stop ideas were explored or tested. They are not presented here as a completed production automation system. The two hosting environments remain distinct in the illustration below.",
        ],
      },
    ],
    takeaway:
      "A service working on my own machine is only the beginning. Making it reachable, keeping its data safe and understanding failures taught me how the pieces fit together.",
    visualNote:
      "Simplified conceptual infrastructure illustration. Minecraft uses a VPS and SSH tunnel; Palworld is separately hosted with Docker. No private addresses or configuration are shown.",
  },
];

export const otherProjects = [
  {
    name: "Minecraft status bot",
    subtitle: "Minecraft Server Monitoring Discord Bot",
    category: "Personal project",
    icon: "bot",
    description:
      "A Node.js Discord bot for checking server availability and reporting status, built alongside my self-hosting projects.",
    stack: ["Node.js", "Discord", "Monitoring"],
    href: null,
  },
  {
    name: "A little more organised",
    subtitle: "React Native To-Do Application",
    category: "Study project",
    icon: "tasks",
    description:
      "A mobile task manager with input validation, completion states, deletion and local persistence between sessions.",
    stack: ["React Native", "Expo", "AsyncStorage"],
    href: null,
  },
  {
    name: "Learning to see",
    subtitle: "CIFAR-10 Image Classification",
    category: "University coursework",
    icon: "image",
    description:
      "PyTorch experiments comparing CNN depth, learning rates and regularisation, with separate training, validation and test sets.",
    stack: ["Python", "PyTorch", "CNNs"],
    href: "https://github.com/ReachGH/CIFAR-10-Image-Classifier",
  },
];
