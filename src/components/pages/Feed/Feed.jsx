import React, { useState } from "react";
import styles from "./Puzzle.module.css";
import bgVideo from "./pics/tr.mp4";

// Images
import weddingImg from "./pics/Untitled1.png";
import rocksImg from "./pics/Untitled2.png";
import fallsImg from "./pics/Untitled2.png";
import parisImg from "./pics/Untitled3.png";
import natureImg from "./pics/Untitled3.png";
import mistImg from "./pics/Untitled1.png";
import underwaterImg from "./pics/Untitled2.png";
import oceanImg from "./pics/Untitled2.png";
import mountainImg from "./pics/Untitled1.png";
import item1 from "./pics/80_310.png";
import item2 from "./pics/410_190.png";

// DATA
const initialItems = [
  { id: "1", url: weddingImg, alt: "Wedding" },
  { id: "2", url: rocksImg, alt: "Rocks" },
  { id: "3", url: fallsImg, alt: "Falls" },

  { id: "obj1", url: item1, type: "movable", targetSlot: "slotA" },
  { id: "obj2", url: item2, type: "movable", targetSlot: "slotB" },

  { id: "4", url: parisImg, alt: "Paris" },
  { id: "5", url: natureImg, alt: "Nature" },
  { id: "6", url: mistImg, alt: "Mist" },
  { id: "7", url: parisImg, alt: "Paris" },

  { id: "8", url: underwaterImg, alt: "Underwater" },
  { id: "9", url: oceanImg, alt: "Ocean" },
  { id: "10", url: weddingImg, alt: "Wedding" },
  { id: "11", url: mountainImg, alt: "Mountains" },
  { id: "12", url: rocksImg, alt: "Rocks" },
  { id: "13", url: underwaterImg, alt: "Underwater" },
];

// shuffle
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// split into columns
const splitIntoColumns = (items, cols = 4) => {
  const result = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    result[i % cols].push(item);
  });
  return result;
};

export default function Gallery() {
  const [gridItems, setGridItems] = useState(() => shuffle(initialItems));

  // LIGHTBOX (ID based — FIXED)
  const [activeId, setActiveId] = useState(null);

  const openImage = (id) => {
    setActiveId(id);
  };

  const nextImage = () => {
    const idx = gridItems.findIndex((i) => i.id === activeId);
    const next = (idx + 1) % gridItems.length;
    setActiveId(gridItems[next].id);
  };

  const prevImage = () => {
    const idx = gridItems.findIndex((i) => i.id === activeId);
    const prev = (idx - 1 + gridItems.length) % gridItems.length;
    setActiveId(gridItems[prev].id);
  };

  // SLOTS
  const [slots, setSlots] = useState({
    slotA: null,
    slotB: null,
    slotC: null,
    slotD: null,
    slotE: null,
  });

  const isComplete =
    slots.slotA &&
    slots.slotB 

  const columns = splitIntoColumns(gridItems, 4);

  // DRAG
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.id);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, slotId) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("itemId");
    const item = gridItems.find((i) => i.id === itemId);

    if (!item) return;
    if (slots[slotId]) return;
    if (item.type !== "movable") return;

    if (item.targetSlot === slotId) {
      setSlots((prev) => ({
        ...prev,
        [slotId]: item,
      }));

      setGridItems((prev) =>
        prev.filter((i) => i.id !== itemId)
      );
    }
  };

  return (
    <div className={styles.pageLayout}>

      {/* GRID */}
      <div className={styles.row}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className={styles.column}>
            {column.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt={img.alt}

                /* ❌ MOVABLE ITEMS NOT CLICKABLE */
                onClick={() => {
                  if (img.type === "movable") return;
                  openImage(img.id);
                }}

                draggable={img.type === "movable"}
                onDragStart={(e) => onDragStart(e, img)}

                className={
                  img.type === "movable"
                    ? styles.movable
                    : styles.galleryImage
                }
              />
            ))}
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {activeId && (
        <div className={styles.lightbox} onClick={() => setActiveId(null)}>

          <button
            className={styles.left}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <img
            src={gridItems.find((i) => i.id === activeId)?.url}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className={styles.right}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>

        </div>
      )}

      <div className={styles.sidebar}>
           {isComplete && (
            <video
              className={styles.bgVideo}
              autoPlay
              muted
              playsInline
            >
              <source src={bgVideo} type="video/mp4" />
            </video>
          )}
          <div
            className={styles.slot1}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "slotA")}
          >
            {slots.slotA ? (
              <img src={slots.slotA.url} alt="slotA" />
            ) : (
              "Drop here A"
            )}
          </div>

          <div
            className={styles.slot2}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "slotB")}
          >
            {slots.slotB ? (
              <img src={slots.slotB.url} alt="slotB" />
            ) : (
              "Drop here B"
            )}
          </div>
          <div
            className={styles.slot3}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "slotC")}
          >
            {slots.slotC ? (
              <img src={slots.slotC.url} alt="slotC" />
            ) : (
              "Drop here C"
            )}
          </div>
          <div
            className={styles.slot4}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "slotD")}
          >
            {slots.slotD ? (
              <img src={slots.slotD.url} alt="slotD" />
            ) : (
              "Drop here D"
            )}
          </div>
          <div
            className={styles.slot5}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, "slotE")}
          >
            {slots.slotE ? (
              <img src={slots.slotE.url} alt="slotE" />
            ) : (
              "Drop here E"
            )}
          </div>
        </div>

    </div>
  );
}