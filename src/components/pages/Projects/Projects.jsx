import projects from "../../../data/projects.js";
import Post from "../../../components/ProjectPost/ProjectPost.jsx";
import styles from "./Projects.module.css";
import { useState } from "react";

export default function Projects() {
    const [selectedTag, setSelectedTag] = useState("All");

    const tags = [
        "All",
        ...new Set(
            projects.flatMap(project => project.tech_stack)
        )
    ];

    const filteredProjects =
        selectedTag === "All"
            ? projects
            : projects.filter(project =>
                project.tech_stack.includes(selectedTag)
            );

    return (
        <>
            <div className={styles.filters}>
                {tags.map(tag => (
                    <button
                        className={
                            selectedTag === tag
                                ? styles.active
                                : styles.tag
                        }
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className={styles.feed}>
                {filteredProjects.map((project) => (
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
        </>
    );
}