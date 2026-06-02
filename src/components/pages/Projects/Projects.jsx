import projects from "../../../data/projects.js";
import Post from "../../molecules/ProjectPost/ProjectPost.jsx";
import styles from "./Projects.module.css";

export default function Projects() {
    return (
        <div className={styles.feed}>
            {projects.map((project) => (
                <Post
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    thumbnail={project.thumbnail}
                    shortDescription={project.shortDescription}
                    link={project.link}
                    tech_stack={project.tech_stack}
                />
            ))}
        </div>
    );
}