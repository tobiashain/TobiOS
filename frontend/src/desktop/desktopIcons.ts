export const desktopIcons: DesktopIcons[] = [
  {
    id: "wired",
    type: "wired",
    label: "The Wired",
    icon: "https://picsum.photos/60/60",
  },
  {
    id: "calculator",
    type: "calculator",
    label: "Calculator",
    icon: "https://picsum.photos/60/60",
  },
  {
    id: "myDocuments",
    type: "folder",
    label: "My Documents",
    icon: "https://picsum.photos/60/60",
    children: [
      {
        id: "link1",
        type: "link",
        label: "Link",
        icon: "https://picsum.photos/60/60",
        link: "https://simplefeedback.de",
      },
      {
        id: "myDocument2",
        type: "file",
        label: "Document 2",
        icon: "https://picsum.photos/60/60",
      },
    ],
  },
  {
    id: "github",
    type: "link",
    label: "Github",
    icon: "https://picsum.photos/60/60",
    link: "https://github.com",
  },
  {
    id: "readme",
    type: "text",
    label: "README.txt",
    icon: "https://picsum.photos/60/60",
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
    icon: "https://picsum.photos/60/60",
    size: "800x500",
  },
  {
    id: "iframe",
    type: "iframe",
    label: "Iframe",
    icon: "https://picsum.photos/60/60",
    link: "https://tobiashain.github.io/TobiOS/",
    size: "1200x700",
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
