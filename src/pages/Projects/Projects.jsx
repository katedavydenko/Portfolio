import projects from "../../data/projects.js";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import styles from "./Projects.module.css";
import { useState } from "react";

export default function Projects() {
    const [selectedTag, setSelectedTag] = useState("All");

    const tags = [
        "All",
        ...new Set(
            projects.flatMap(project => project.techStack)
        )
    ];

    const filteredProjects =
        selectedTag === "All"
            ? projects
            : projects.filter(project =>
                project.techStack.includes(selectedTag)
            );

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                {tags.map(tag => (
                    <div
                        className={`${styles.tag} ${selectedTag === tag
                                ? styles.tagActive
                                : styles.tagDefault
                            }`}
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                    >
                            <span>{tag}</span>
                            <span>{tag}</span>
                    </div>
                ))}
            </div>
            <div className={styles.feed}>
                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        thumbnail={project.thumbnail}
                        shortDescription={project.shortDescription}
                        link={project.link}
                        techStack={project.techStack}
                    />
                ))}
            </div>
        </div>
    );
}