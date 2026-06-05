import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export type SketchDrawing = {
  id: string;
  src: string;
  alt: string;
};

type SketchImageModalProps = {
  drawing: SketchDrawing | null;
  onClose: () => void;
};

export default function SketchImageModal({
  drawing,
  onClose,
}: SketchImageModalProps) {
  return (
    <AnimatePresence>
      {drawing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-5 py-6 backdrop-blur-sm"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--page-bg) 86%, transparent)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={drawing.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative z-10 max-h-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={drawing.src}
              alt={drawing.alt}
              width={1200}
              height={1600}
              className="max-h-[82vh] w-auto max-w-full border border-neutral-900 object-contain shadow-[0_18px_64px_rgba(23,39,232,0.12)]"
              priority
            />
            <button
              type="button"
              onClick={onClose}
              className="interactive-link absolute right-0 top-0 -translate-y-full bg-transparent px-0 pb-3 pt-0 font-mono text-xs uppercase"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
