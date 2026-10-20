import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cardDataUrl, CARD_SIZE } from "./artwork";
import { CARD_RECIPES } from "./recipes";
import styles from "./RecipeStack.module.css";

function CardFallback() {
  return <div className={styles.wrap}><Image className={styles.fallback} src={cardDataUrl(CARD_RECIPES[0], "front")} width={CARD_SIZE.width} height={CARD_SIZE.height} unoptimized alt="Jelly’s Lab matcha latte recipe card" /></div>;
}

const RecipeStack = dynamic(() => import("./RecipeStack"), { ssr: false, loading: CardFallback });

export default function RecipeStackPreview({ onInteract }: { onInteract: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} style={{ width: "100%", height: "100%" }}>{visible ? <RecipeStack onInteract={onInteract} /> : <CardFallback />}</div>;
}
