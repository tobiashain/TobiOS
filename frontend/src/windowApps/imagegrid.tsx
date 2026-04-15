import { useState, useEffect } from "react";
import "./imageGrid.scss";

export default function ImageGrid({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const gridItems = [...images];
  while (gridItems.length < 4) gridItems.push("");

  return (
    <>
      <div className="image-grid">
        {gridItems.map((src, index) => (
          <div
            key={index}
            className={`image-grid__item ${!src ? "image-grid__item--empty" : ""}`}
            onClick={() => src && setSelected(src)}
          >
            {src && (
              <>
                <img src={src} alt={`Preview ${index + 1}`} />
                <div className="image-grid__overlay" />
              </>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="image-grid__modal" onClick={() => setSelected(null)}>
          <img
            src={selected}
            alt="Fullscreen"
            className="image-grid__modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
