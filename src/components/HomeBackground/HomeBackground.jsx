import { useEffect, useState } from "react";
import styles from "./HomeBackground.module.css";


const HomeBackground = ({ currentIndex }) => {
    const [isLight, setIsLight] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        document.body.setAttribute(
            "data-theme",
            isLight ? "light" : "dark"
        );
    }, [isLight]);

    useEffect(() => {
        const handleMove = (e) => {
            const x =
                (e.clientX / window.innerWidth - 0.5) * 2;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 2;

            setPos({ x, y });
        };

        window.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMove
            );
        };
    }, []);
    useEffect(() => {

        const handleTouch = (e) => {
            const touch = e.touches[0];

            const x = (touch.clientX / window.innerWidth - 0.5) * 2;
            const y = (touch.clientY / window.innerHeight - 0.5) * 2;

            setPos({ x, y });
        };

        window.addEventListener("touchmove", handleTouch);

        return () => {
            window.removeEventListener("touchmove", handleTouch);
        };
    }, []);

    const toggleTheme = () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setIsLight((prev) => !prev);
            });
        } else {
            setIsLight((prev) => !prev);
        }
    };

    return (
        <div className={styles.bgContainer}
            style={{
                "--x": pos.x,
                "--y": pos.y
            }}>
            <div
                className={styles.bg}

            />
            <div
                className={styles.stars}

            />
            <div
                className={styles.layer1}

            />

            <div
                className={styles.moon}
                onClick={toggleTheme}
            />
            <div
                className={styles.clouds}

            />
            <div
                className={styles.layer2}

            />
            <div
                className={styles.layer3}

            />
            <div
                className={styles.layer4}

            />

        </div>
    );
};

export default HomeBackground;