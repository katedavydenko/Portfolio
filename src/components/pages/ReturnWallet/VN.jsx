import { useState } from "react";
import styles from "./ReturnWallet.module.css";
import { Link } from 'react-router-dom';

const scenes = [
    {
        img: "VN/vn1.png",
        text: "You: i found your wallet",
    },
    {
        img: "VN/vn2.1.png",
        text: "thank you very much! i've been looking for it every-",

    },
    {
        img: "VN/vn3.1.png",
        text: " . . .",
    },
    {
        img: "VN/vn4.1.png",
        text: "em ... did you eat my snack?",
    },
    {
        img: "VN/vn5.1.png",
        text: " ... apple!",
    },
    {
        img: "VN/vn6.1.png",
        text: "*flap - flap*",
    },
    {
        img: "VN/vn7.1.png",
        text: "fifty years of bad breath!",
    },
    {
        img: "VN/vn8.1.png",
        text: "*flap - flap*",
    },
    {
        text: "BAD ENDING: and also bad breath",
    },

];


export default function VN() {
    const [sceneIndex, setSceneIndex] = useState(0);

    const scene = scenes[sceneIndex];

    function nextScene() {
        if (sceneIndex < scenes.length - 1) {
            setSceneIndex(sceneIndex + 1);
        }
    }

    return (
        <div className={styles.vnContainer}>
            {scene.img && (
                <img
                    className={styles.vnImg}
                    src={scene.img}
                    alt=""
                />
            )}

            <div className={styles.vnText}>
                <p>{scene.text}</p>

                <div className={styles.vnChoices}>
                    {sceneIndex < scenes.length - 1 ? (
                        <button className = {styles.vnButton} onClick={nextScene}>
                            NEXT
                        </button>
                    ) : (
                        <Link to={`/profile`}  className = {styles.vnButton} onClick={() => setSceneIndex(0)}>
                            TRY AGAin
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}