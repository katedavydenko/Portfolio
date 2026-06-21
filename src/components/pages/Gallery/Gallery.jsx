import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";
import galleryData from "../../../data/galleryData.js";
import { assets } from "../../../data/assets";
import useLocalStorage from "../../../hooks/useLocalStorage";

// DATA
const initialItems = galleryData.items.map(item => ({
  ...item,
  url: assets[item.image],
  isVideo: assets[item.image]?.endsWith(".mp4")
}));


// Keep photos ordered, randomize movable positions
const randomizeMovablePositions = (items) => {
  const photos = items.filter(item => item.type !== "movable");

  const movables = items
    .filter(item => item.type === "movable")
    .sort(() => Math.random() - 0.5);

  const result = [...photos];

  movables.forEach(movable => {
    const randomIndex = Math.floor(
      Math.random() * (result.length + 1)
    );

    result.splice(randomIndex, 0, movable);
  });

  return result;
};

export default function Gallery() {
  const [gridItems, setGridItems] = useState(() =>
    randomizeMovablePositions(initialItems)
  );

  const [activeId, setActiveId] = useState(null);
  const [openPuzzle, setOpenPuzzle] = useState(
    window.innerWidth > 950
  );
  const [collectedItems, setCollectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const openImage = (id) => {
    setActiveId(id);
  };
  const collectItem = (item) => {
    if (item.type !== "movable") return;

    setCollectedItems(prev => [...prev, item]);

    setGridItems(prev =>
      prev.filter(i => i.id !== item.id)
    );
  };

  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= 950
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 950;

      setIsSmallScreen(isMobile);

      // Auto-open on desktop, auto-close on mobile
      setOpenPuzzle(!isMobile);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextImage = () => {
    // 1. Filter out movable objects so we only have photos
    const photosOnly = gridItems.filter(item => item.type !== "movable");

    // 2. Find the index within that filtered list
    const idx = photosOnly.findIndex((i) => i.id === activeId);

    // 3. Move to next (or loop to start)
    const nextIdx = (idx + 1) % photosOnly.length;
    setActiveId(photosOnly[nextIdx].id);
  };

  const prevImage = () => {
    // 1. Filter out movable objects
    const photosOnly = gridItems.filter(item => item.type !== "movable");

    // 2. Find the index
    const idx = photosOnly.findIndex((i) => i.id === activeId);

    // 3. Move to previous (or loop to end)
    const prevIdx = (idx - 1 + photosOnly.length) % photosOnly.length;
    setActiveId(photosOnly[prevIdx].id);
  };
  // SLOTS
  const [slots, setSlots] = useState({
    slotA: null,
    slotB: null,
    slotC: null,
    slotD: null,
  });

  const isComplete =
    slots.slotA &&
    slots.slotB &&
    slots.slotC &&
    slots.slotD


  // DRAG
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.id);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, slotId) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("itemId");
    const item =
      gridItems.find(i => i.id === itemId) ||
      collectedItems.find(i => i.id === itemId);

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
      setCollectedItems((prev) =>
        prev.filter(i => i.id !== itemId)
      );
    }
  };
  const handleItemClick = (item) => {
    if (item.type !== "movable") return;
    console.log("clicked", item.id);
    if (isSmallScreen) {
      setSelectedItem(item);
      return;
    }
    setSelectedItem(prev =>
      prev?.id === item.id ? null : item
    );

    openImage(item.id);
  };
  const handleSlotClick = (slotId) => {
    if (!selectedItem) return;
    if (slots[slotId]) return;
    if (selectedItem.targetSlot !== slotId) return;

    setSlots(prev => ({
      ...prev,
      [slotId]: selectedItem
    }));

    setGridItems(prev =>
      prev.filter(i => i.id !== selectedItem.id)
    );

    setCollectedItems(prev =>
      prev.filter(i => i.id !== selectedItem.id)
    );

    setSelectedItem(null);
  };
  const activeItem = gridItems.find(
    item => item.id === activeId
  );
  const [hidden, setHidden] = useState(false);
  const [hidden2, setHidden2] = useState(false);
  const [icon, setIcon] = useState(":i)");

  useEffect(() => {
    const id = setInterval(() => {
      setIcon(prev => (prev === ":i)" ? ":i0" : ":i)"));
    }, 300);

    return () => clearInterval(id);
  }, []);

  const [bgVideo, setBgVideo] = useState(assets.bgVideo_d);
  const [theme] = useLocalStorage("theme", "light");

  useEffect(() => {
    if (theme === "dark") {
      setBgVideo(assets.bgVideo_n);
    } else {
      setBgVideo(assets.bgVideo_d);
    }
  }, [theme]);

  return (
    <div className={styles.pageLayout}>
      <div className={styles.infoSmallScreen}
        style={{ display: hidden ? "none" : "" }}>
        <div className={styles.infoIcon}> {icon}</div>
        <p>you can find puzzle pieces in the gallery, click to collect them, and complete the puzzle at the bottom of the gallery
        </p>
        <div className={styles.crossBtn} onClick={() => setHidden(true)}>&#9747;</div>


      </div>
      <div className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {gridItems.map((img) => (
            img.isVideo ? (
              <div key={img.id} className={styles.videoWrapper}>
                <video
                  className={styles.galleryVideo}
                  preload="metadata"
                  muted
                  playsInline
                  onClick={() => openImage(img.id)}
                >
                  <source src={img.url} type="video/mp4" />
                </video>
              </div>
            ) : (
              <img
                key={img.id}
                src={img.url}
                alt={img.alt}
                onClick={() => {
                  if (img.type === "movable") {
                    if (isSmallScreen) {
                      collectItem(img);
                    }
                    return;
                  }

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
            )
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
              &#9668;
            </button>

            {activeItem?.isVideo ? (
              <video
                className={styles.lightboxVideo}
                controls
                autoPlay
                playsInline
                onClick={(e) => e.stopPropagation()}
              >
                <source src={activeItem.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={activeItem?.url}
                className={styles.lightboxImg}
                onClick={(e) => e.stopPropagation()}
              />
            )}

            <button
              className={styles.right}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              &#9658;
            </button>

          </div>
        )}
      </div>
      <div className={styles.sidebar}>
        <div className={styles.info} ></div>
        <div className={styles.revealBtn} onClick={() => setOpenPuzzle(prev => !prev)}>{openPuzzle ? <div className={styles.revealBtnText}><div>CLOSE PUZZLE </div> <div>&#8675;</div></div> : <div className={styles.revealBtnText}> <div>OPEN PUZZLE</div> <div>&#8673;</div></div>}</div>

        {openPuzzle && <>
          <div className={styles.infoSmallScreenPuzzle}
            style={{ display: hidden2 ? "none" : "" }}>
            <p>click on a bone to select it, then click its correct location to place it</p>
            <div className={styles.crossBtn} onClick={() => setHidden2(true)}>&#9747;</div>

          </div>
          <div className={styles.collectedItemsWrapper}>
            <div className={styles.collectedItems}>
              {collectedItems.map(item => (
                <img
                  key={item.id}
                  src={item.url}
                  alt={item.alt || item.id}
                  draggable
                  onClick={() => handleItemClick(item)}
                  className={`${styles.collectedItem} ${selectedItem?.id === item.id ? styles.selected : ""
                    }`}
                />
              ))}
            </div>
          </div>

          <div className={styles.puzzle}>
            {isComplete && (
              <video
                className={styles.bgVideo}
                autoPlay
                muted
                playsInline
              >
                <source src={bgVideo} />
              </video>
            )}
            <div
              className={styles.slot1}
              onClick={() => handleSlotClick("slotA")}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "slotA")}
            >
              {slots.slotA ? (
                <img src={slots.slotA.url} alt="slotA" />
              ) : (
                ""
              )}
            </div>

            <div
              className={styles.slot2}
              onClick={() => handleSlotClick("slotB")}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "slotB")}
            >
              {slots.slotB ? (
                <img src={slots.slotB.url} alt="slotB" />
              ) : (
                ""
              )}
            </div>
            <div
              className={styles.slot3}
              onClick={() => handleSlotClick("slotC")}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "slotC")}
            >
              {slots.slotC ? (
                <img src={slots.slotC.url} alt="slotC" />
              ) : (
                ""
              )}
            </div>
            <div
              className={styles.slot4}
              onClick={() => handleSlotClick("slotD")}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "slotD")}
            >
              {slots.slotD ? (
                <img src={slots.slotD.url} alt="slotD" />
              ) : (
                ""
              )}
            </div>
          </div>
        </>
        }


      </div>
    </div>
  );
}