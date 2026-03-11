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
    subTitle: "Customer-Relationship-Management Platform",
    context:
      "This project is part of a collaborative effort and remains a work in progress. Its goal is to create a CRM website that enables the tourism industry to efficiently collect and analyze customer feedback, while maintaining communication through an integrated email bot and HTML newsletter builder.",
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
      "Create Surveys",
      "Stripe payment processing integration",
      "Data visualization via Diagrams",
      "HTML Email Builder",
      "Send Newsletters",
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
      "This website you are currently viewing serves as the central hub for all past, present, and future projects. Its design draws inspiration from the Vinesauce website, featuring an operating system–style interface.",
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
      "Open, move, and resize windows",
      "Interactive desktop icons",
      "Taskbar window management",
      "Mini-games on the desktop",
      "Cloudflare Workers API integration",
      "Responsive and smooth UI",
      "Modular React components",
    ],
    images: [],
    website: "https://example.com/",
    sourceCode: "https://example.com/",
  },
  {
    id: "kitzEdu",
    title: "Kitz-Edu@2.0",
    subTitle: "Association for Innovative Educational Projects",
    context:
      "This project was developed as part of the diploma thesis. The function of this project is to give informations about the associations, their values and contact options.",
    chips: ["Next.js", "Strapi", "JavaScript", "Sass", "Figma"],
    features: [
      "Server Side Rendering (SSR)",
      "Headless Content Management System (Strapi)",
      "Video Hero Section",
    ],
    images: [
      "/TobiOS/pictures/kitz-edu/1.png",
      "/TobiOS/pictures/kitz-edu/2.png",
      "/TobiOS/pictures/kitz-edu/3.png",
      "/TobiOS/pictures/kitz-edu/4.png",
    ],
    sourceCode: "https://example.com/",
  },
  {
    id: "betterSpotify",
    title: "Better Spotify",
    subTitle: "",
    context:
      "This project is part of a school year project and we were allowed to develop what we wanted. ",
    chips: ["ASP.Net MVC", "C#", "JavaScript", "TailwindCSS", "Spotify API"],
    features: [],
    images: [
      "/TobiOS/pictures/better-spotify/1.png",
      "/TobiOS/pictures/better-spotify/2.png",
      "/TobiOS/pictures/better-spotify/3.png",
      "/TobiOS/pictures/better-spotify/4.png",
    ],
    sourceCode: "https://example.com/",
  },
  {
    id: "odin",
    title: "The Odin Project",
    subTitle: "Full Stack Curriculum",
    context:
      "The Odin Project is a free, open-source curriculum that teaches full-stack web development through structured lessons and hands-on projects. It focuses on practical skills such as HTML, CSS, JavaScript, React, Git, and backend technologies while guiding learners to build real applications and use developer tools.",
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
      "Advanced HTML, CSS and JavaScript",
      "Test Driven Development",
      "Algorithms and Recursions",
      "Linked Lists, HashMaps, Binary Search Trees, Queues",
      "React Course",
      "Database Course",
      "NodeJS Course",
    ],
    images: [
      "/TobiOS/pictures/odin/1.png",
      "/TobiOS/pictures/odin/2.png",
      "/TobiOS/pictures/odin/3.png",
      "/TobiOS/pictures/odin/4.png",
    ],
    website: "https://example.com/",
    sourceCode: "https://example.com/",
  },
  {
    id: "wordpress",
    title: "",
    subTitle: "",
    context: "",
    chips: ["Wordpress", "Elementor"],
    features: [],
    images: [],
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
    images: [],
  },
  {
    id: "untitledPlatformer",
    title: "",
    subTitle: "",
    context: "",
    chips: ["Unity", "C#"],
    features: [],
    images: [],
  },
  {
    id: "unserLagerhaus",
    title: "",
    subTitle: "",
    context: "",
    chips: ["C#", "MySQL", "Windows Forms"],
    features: [],
    images: [],
  },
  {
    id: "minesweeper",
    title: "",
    subTitle: "",
    context: "",
    chips: ["C#", "Windows Forms"],
    features: [],
    images: [],
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
