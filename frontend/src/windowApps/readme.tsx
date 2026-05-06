import "./readme.scss";
import Chip from "../shared/chip";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faStar,
  faCode,
  faBriefcase,
  faUser,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const advanced = [
  { text: "Javascript", image: "javascript.png" },
  { text: "Typescript", image: "typescript.png" },
  { text: "React", image: "react.png" },
  { text: "Node.js", image: "nodejs.png" },
  { text: "MySQL", image: "mysql.png" },
  { text: "C#", image: "csharp.png" },
  { text: "Sass", image: "sass.png" },
  { text: "Git", image: "git.png" },
];

const basic = [
  { text: "PHP", image: "php.png" },
  { text: "Wordpress", image: "wordpress.png" },
  { text: "Tailwind CSS", image: "tailwindcss.png" },
  { text: "Nest.js", image: "nestjs.png" },
  { text: "Docker", image: "docker.png" },
  { text: "GDScript", image: "godot.png" },
];

export default function Readme() {
  return (
    <div className="readme">
      <motion.div
        className="readme__document"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className="readme__header">
          <div className="readme__icon">
            <FontAwesomeIcon icon={faFileLines} />
          </div>
          <div>
            <h1 className="readme__title">README.txt</h1>
            <p className="readme__meta">
              Last updated: 2026‑06‑05 &nbsp;·&nbsp; TobiOS v2.1
            </p>
          </div>
        </header>

        <section className="readme__section">
          <h2>
            <FontAwesomeIcon icon={faUser} className="readme__section-icon" />
            Welcome to TobiOS
          </h2>
          <p>
            Hey, I’m Tobias — a full‑stack developer who turned a portfolio into
            a working browser‑based OS. This environment runs real windows, a
            file system, a taskbar, and apps I built from scratch. It’s not a
            mockup: everything is real, written in React, TypeScript, and SCSS.
          </p>
          <p>
            Use the desktop icons to explore projects, peek into my career
            timeline, or check out the skills that power these windows. The OS
            itself is one of my proudest projects.
          </p>
        </section>
        <section className="readme__section">
          <h2>
            <FontAwesomeIcon icon={faStar} className="readme__section-icon" />
            Highlights
          </h2>
          <ul className="readme__list">
            <li>
              <strong>Simplefeedback</strong> – Full‑stack feedback tool with a
              minimal mode and an immersive OS‑style showcase.
            </li>
            <li>
              <strong>Skyfallow</strong> – Farming simulator built in Godot
              (GDScript), my first bigger game‑engine project.
            </li>
            <li>
              <strong>The Odin Project</strong> – Completed the entire
              full‑stack curriculum independently, beyond school.
            </li>
          </ul>
        </section>
        <section className="readme__section">
          <h2>
            <FontAwesomeIcon icon={faCode} className="readme__section-icon" />
            Tech Stack
          </h2>
          <div className="skill-group">
            <motion.div
              className="group-label"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="label-dot advanced" />
              Proficient
            </motion.div>
            <div className="chips">
              {advanced.map((skill, i) => (
                <motion.div
                  key={skill.text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                >
                  <Chip
                    text={skill.text}
                    image={`tech/${skill.image}`}
                    variant="advanced"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="skill-group" style={{ marginTop: "1.5rem" }}>
            <motion.div
              className="group-label"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="label-dot familiar" />
              Familiar
            </motion.div>
            <div className="chips">
              {basic.map((skill, i) => (
                <motion.div
                  key={skill.text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.05 }}
                >
                  <Chip
                    text={skill.text}
                    image={`tech/${skill.image}`}
                    variant="familiar"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="readme__section">
          <h2>
            <FontAwesomeIcon
              icon={faBriefcase}
              className="readme__section-icon"
            />
            Quick Links
          </h2>
          <div className="readme__links">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // tell the OS to open a specific window – implement this via your WindowManager
                console.log("Open Career window");
              }}
              className="readme__link"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Career
              Timeline
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log("Open Skills window");
              }}
              className="readme__link"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Tech Stack
              Details
            </a>
            <a
              href="https://github.com/tobiashain"
              target="_blank"
              rel="noopener noreferrer"
              className="readme__link"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> GitHub
            </a>
          </div>
        </section>

        <footer className="readme__footer">
          <p>
            Drag this window, resize it, or close it — it behaves exactly like a
            real OS window.
          </p>
          <p>Built with ❤️ and a lot of late nights.</p>
        </footer>
      </motion.div>
    </div>
  );
}
