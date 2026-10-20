import Image from "next/image";
import styles from "../styles/StickerPreview.module.css";

const root = "https://raw.githubusercontent.com/ttran293/sticker-vending-machine/main/public/stickers";
const stickers = [
  { image: "hat-dog/hat-cute.png", label: "Dog in a flowered denim hat", style: styles.dog },
  { image: "buttercup/bad-hair-day.png", label: "Buttercup having a bad hair day", style: styles.buttercup },
  { image: "cat_climb_exp/p2-1.png", label: "Fall on last hold climbing cat", style: styles.cat },
];

export default function StickerPreview() {
  return (
    <span className={styles.stickers}>
      {stickers.map(({ image, label, style }) => (
        <span key={image} className={`${styles.sticker} ${style}`}>
          <Image src={`${root}/${image}`} alt={label} width={180} height={180} sizes="150px" />
        </span>
      ))}
    </span>
  );
}
