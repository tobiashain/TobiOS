export interface Project {
  id: string;
  title: string;
  subTitle: string;
  context: string;
  chips: string[];
  features: string[];
  images: string[];
  website?: string;
  sourceCode?: string;
}

export const projects: Project[] = [
  {
    id: "simplefeedback",
    title: "Simplefeedback",
    subTitle: "Customer Relationship Management Platform",
    context:
      "Simplefeedback is a collaborative, ongoing project focused on building a CRM platform for the tourism industry. The goal is to help businesses collect, manage, and understand customer feedback in a structured way. In addition to analytics, the platform includes tools for communication, such as an automated email bot and a customizable HTML newsletter builder. The project emphasizes usability, scalability, and integration with modern web services.",
    chips: [
      "React",
      "JavaScript",
      "TypeScript",
      "Sass",
      "MySQL",
      "NestJS",
      "Knex.js",
      "Docker",
      "Stripe",
      "Github Actions",
      "Google Cloud Storage",
      "Google OAuth 2.0",
    ],
    features: [
      "Survey creation and management",
      "Integrated Stripe payment processing",
      "Data visualization with charts and diagrams",
      "Custom HTML email builder",
      "Newsletter creation and distribution",
    ],
    images: [
      "/TobiOS/pictures/simplefeedback/1.png",
      "/TobiOS/pictures/simplefeedback/2.png",
      "/TobiOS/pictures/simplefeedback/3.png",
      "/TobiOS/pictures/simplefeedback/4.png",
    ],
    website: "https://simplefeedback.de/",
  },
  {
    id: "tobiOS",
    title: "TobiOS",
    subTitle: "Personal Website and Portfolio",
    context:
      "TobiOS is my main portfolio website and a place where I present my projects and experiments. The interface is inspired by desktop operating systems, allowing users to interact with windows, icons, and a taskbar. The focus of this project is on creating a playful but functional user experience while keeping the codebase modular and maintainable.",
    chips: [
      "React",
      "JavaScript",
      "TypeScript",
      "Sass",
      "interact.js",
      "Github Actions",
      "Cloudflare Workers",
    ],
    features: [
      "Draggable and resizable windows",
      "Interactive desktop-style icons",
      "Taskbar-based window management",
      "Built-in mini games",
      "Cloudflare Workers API integration",
      "Responsive and smooth user interface",
      "Modular component architecture",
    ],
    images: [],
    sourceCode: "https://github.com/tobiashain/TobiOS",
  },
  {
    id: "portfolio",
    title: "Portfolio Page",
    subTitle: "Minimal Portfolio Version",
    context:
      "This is a simplified version of my portfolio, designed with a more traditional layout. It focuses on clean presentation, smooth animations, and quick access to projects. Compared to TobiOS, this version removes the desktop-style interface and prioritizes clarity and performance.",
    chips: [
      "React",
      "JavaScript",
      "TypeScript",
      "Framer Motion",
      "Sass",
      "Github Actions",
    ],
    features: [
      "Smooth UI animations",
      "Dynamic hero section",
      "Responsive layout",
      "Reusable and modular components",
    ],
    images: [],
    website: "https://tobiashain.github.io/",
    sourceCode: "https://github.com/tobiashain/",
  },
  {
    id: "kitzEdu",
    title: "Kitz-Edu@2.0",
    subTitle: "Association for Innovative Educational Projects",
    context:
      "Kitz-Edu@2.0 was developed as part of my diploma thesis. The project is a website for an educational association, providing clear information about its mission, values, and activities. It also includes contact options and a content management system to make updates easy for non-technical users.",
    chips: ["Next.js", "Strapi", "JavaScript", "Sass", "Figma"],
    features: [
      "Server-side rendering (SSR) for performance and SEO",
      "Headless CMS integration with Strapi",
      "Video-based hero section",
    ],
    images: [
      "/TobiOS/pictures/kitz-edu/1.png",
      "/TobiOS/pictures/kitz-edu/2.png",
      "/TobiOS/pictures/kitz-edu/3.png",
      "/TobiOS/pictures/kitz-edu/4.png",
    ],
    sourceCode: "https://github.com/tobiashain/Kitz-Edu-2.0",
  },
  {
    id: "betterSpotify",
    title: "Better Spotify",
    subTitle: "Music Platform Experiment",
    context:
      "Better Spotify was created as part of a school project where the goal was to build an application of our choice. This project explores the Spotify API by extending basic functionality with a custom interface and additional features. It served as a practical introduction to working with external APIs and backend-driven web applications.",
    chips: ["ASP.Net MVC", "C#", "JavaScript", "TailwindCSS", "Spotify API"],
    features: [
      "Integration with Spotify API",
      "Custom UI for browsing music",
      "Backend-driven application structure",
    ],
    images: [
      "/TobiOS/pictures/better-spotify/1.png",
      "/TobiOS/pictures/better-spotify/2.png",
      "/TobiOS/pictures/better-spotify/3.png",
    ],
    sourceCode: "https://github.com/tobiashain/BetterSpotify",
  },
  {
    id: "odin",
    title: "The Odin Project",
    subTitle: "Full Stack Curriculum",
    context:
      "This section documents my progress through The Odin Project, an open-source full-stack curriculum. It focuses on building practical skills through hands-on projects, covering both frontend and backend development. The work includes a range of applications and exercises that reflect a structured learning path in modern web development.",
    chips: [
      "JavaScript",
      "TypeScript",
      "Sass",
      "React",
      "Node.js",
      "SQL",
      "Jest",
      "Webpack",
    ],
    features: [
      "Advanced HTML, CSS, and JavaScript concepts",
      "Test-driven development (TDD)",
      "Algorithms and recursion",
      "Data structures (linked lists, hash maps, trees, queues)",
      "React development",
      "Database fundamentals",
      "Backend development with Node.js",
    ],
    images: [
      "/TobiOS/pictures/odin/1.png",
      "/TobiOS/pictures/odin/2.png",
      "/TobiOS/pictures/odin/3.png",
      "/TobiOS/pictures/odin/4.png",
    ],
    website: "https://tobiashain.github.io/Odin-Project/",
    sourceCode: "https://github.com/tobiashain/Odin-Project",
  },
  {
    id: "IMCMguide",
    title: "",
    subTitle: "",
    context: "",
    chips: ["PHP", "JavaScript", "CSS"],
    features: [],
    images: [],
  },
  {
    id: "skyfallow",
    title: "",
    subTitle: "",
    context: "",
    chips: ["Godot", "GDScript", "C#"],
    features: [],
    images: [
      "/TobiOS/pictures/skyfallow/1.png",
      "/TobiOS/pictures/skyfallow/2.png",
      "/TobiOS/pictures/skyfallow/3.png",
      "/TobiOS/pictures/skyfallow/4.png",
    ],
  },
  {
    id: "untitledPlatformer",
    title: "",
    subTitle: "",
    context: "",
    chips: ["Unity", "C#"],
    features: [],
    images: [
      "/TobiOS/pictures/untitledPlatformer/1.png",
      "/TobiOS/pictures/untitledPlatformer/2.png",
      "/TobiOS/pictures/untitledPlatformer/3.png",
      "/TobiOS/pictures/untitledPlatformer/4.png",
    ],
    sourceCode: "https://github.com/tobiashain/Untitled-3D-Platformer",
  },
  {
    id: "unserLagerhaus",
    title: "",
    subTitle: "",
    context: "",
    chips: ["C#", "MySQL", "Windows Forms"],
    features: [],
    images: [
      "/TobiOS/pictures/unserLagerhaus/1.png",
      "/TobiOS/pictures/unserLagerhaus/2.png",
      "/TobiOS/pictures/unserLagerhaus/3.png",
    ],
    sourceCode: "https://github.com/tobiashain/unserLagerhaus ",
  },
  {
    id: "minesweeper",
    title: "",
    subTitle: "",
    context: "",
    chips: ["C#", "Windows Forms"],
    features: [],
    images: [
      "/TobiOS/pictures/minesweeper/1.png",
      "/TobiOS/pictures/minesweeper/2.png",
      "/TobiOS/pictures/minesweeper/3.png",
    ],
  },
  {
    id: "snake",
    title: "",
    subTitle: "",
    context: "",
    chips: ["C#", "Raylib"],
    features: [],
    images: [],
  },
];
