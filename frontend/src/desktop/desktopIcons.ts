export const desktopIcons: DesktopIcons[] = [
  {
    id: "wired",
    type: "wired",
    label: "The Wired",
    icon: "https://picsum.photos/60/60",
  },
  {
    id: "github",
    type: "link",
    label: "Github",
    icon: "/TobiOS/github.png",
    link: "https://github.com",
  },
  {
    id: "readme",
    type: "text",
    label: "README.txt",
    icon: "/TobiOS/readme.png",
  },
  {
    id: "lain",
    type: "video",
    label: "Let's All Love Lain",
    icon: "https://picsum.photos/60/60",
    link: "T0xCK6J1ics",
  },
  {
    id: "music",
    type: "music",
    label: "Music",
    icon: "/TobiOS/music.png",
    size: "800x500",
  },
  {
    id: "games",
    type: "folder",
    label: "Games",
    icon: "/TobiOS/folder.png",
    children: [
      {
        id: "battleShip",
        type: "iframe",
        label: "Battleship",
        icon: "/TobiOS/battleship.png",
        link: "http://localhost:8080/Battleship/",
        size: "1300x800",
      },
      {
        id: "tictactoe",
        type: "iframe",
        label: "Tic Tac Toe",
        icon: "/TobiOS/controller.png",
        link: "http://localhost:8080/Tic-Tac-Toe/",
        size: "800x800",
      },
      {
        id: "rockPaperScissor",
        type: "iframe",
        label: "Rock Paper Scissor",
        icon: "/TobiOS/controller.png",
        link: "http://localhost:8080/Rock-Paper-Scissors/",
        size: "300x300",
      },
      {
        id: "etchASketch",
        type: "iframe",
        label: "Etch A Sketch",
        icon: "/TobiOS/controller.png",
        link: "http://localhost:8080/Etch-a-Sketch/",
        size: "600x600",
      },
    ],
  },
  {
    id: "calculator",
    type: "iframe",
    label: "Calculator",
    icon: "/TobiOS/calculator.png",
    link: "http://localhost:8080/Calculator/",
    size: "600x600",
  },
  {
    id: "library",
    type: "iframe",
    label: "Library",
    icon: "/TobiOS/bookshelf.png",
    link: "http://localhost:8080/Library/",
    size: "800x900",
  },
  {
    id: "browser",
    type: "iframe",
    label: "Browser",
    icon: "/TobiOS/browser.png",
    link: "http://localhost:8080/Restaurant/",
    size: "1200x700",
  },
  {
    id: "todoList",
    type: "iframe",
    label: "Todo App",
    icon: "/TobiOS/note.png",
    link: "http://localhost:8080/Todo-List/",
    size: "fullscreen",
  },
  {
    id: "weather",
    type: "iframe",
    label: "Weather",
    icon: "/TobiOS/weather.png",
    link: "http://localhost:8080/Weather/",
    size: "400x500",
  },
  {
    id: "projects",
    type: "folder",
    label: "Projects",
    icon: "/TobiOS/folder.png",
    children: [
      {
        id: "webDevelopment",
        type: "folder",
        label: "Web Development",
        icon: "/TobiOS/folder.png",
        children: [
          {
            id: "simpleFeedback",
            type: "project",
            label: "Simple Feedback",
            icon: "/TobiOS/simplefeedback.png",
          },
          {
            id: "tobiOS",
            type: "project",
            label: "TobiOS",
            icon: "/TobiOS/windows.png",
          },
          {
            id: "kitzEdu",
            type: "project",
            label: "Kitz-Edu 2.0",
            icon: "/TobiOS/kitzedu.png",
          },
          {
            id: "betterSpotify",
            type: "project",
            label: "Better Spotify",
            icon: "/TobiOS/spotify.png",
          },
          {
            id: "todoApp",
            type: "project",
            label: "Todo App",
            icon: "/TobiOS/note.png",
          },
          {
            id: "wordpress",
            type: "project",
            label: "Wordpress",
            icon: "/TobiOS/wordpress.png",
          },
          {
            id: "smallerProjects",
            type: "folder",
            label: "Smaller Projects",
            icon: "/TobiOS/folder.png",
            children: [
              {
                id: "IMCMguide",
                type: "project",
                label: "IMCM Guide",
                icon: "/TobiOS/guidebook.png",
              },
              {
                id: "libraryProject",
                type: "project",
                label: "Library",
                icon: "/TobiOS/bookshelf.png",
              },
              {
                id: "battleShipProject",
                type: "project",
                label: "Battleship",
                icon: "/TobiOS/battleship.png",
              },
              {
                id: "weatherProject",
                type: "project",
                label: "Weather",
                icon: "/TobiOS/weather.png",
              },
              {
                id: "calculatorProject",
                type: "project",
                label: "Calculator",
                icon: "/TobiOS/calculator.png",
              },
            ],
          },
        ],
      },
      {
        id: "softwareDevelopment",
        type: "folder",
        label: "Software Development",
        icon: "/TobiOS/folder.png",
        children: [
          {
            id: "skyfallow",
            type: "project",
            label: "Skyfallow",
            icon: "/TobiOS/controller.png",
          },
          {
            id: "untitledPlatformer",
            type: "project",
            label: "Untitled 3D Platformer",
            icon: "/TobiOS/controller.png",
          },
          {
            id: "unserLagerhaus",
            type: "project",
            label: "Unser Lagerhaus",
            icon: "/TobiOS/task.png",
          },
          {
            id: "minesweeper",
            type: "project",
            label: "Minesweeper",
            icon: "/TobiOS/mine.png",
          },
          {
            id: "snake",
            type: "project",
            label: "Snake",
            icon: "/TobiOS/snake.png",
          },
        ],
      },
    ],
  },
];

export interface DesktopIcons {
  id: string;
  type: string;
  label: string;
  icon: string;
  children?: DesktopIcons[];
  link?: string;
  size?: string;
}
