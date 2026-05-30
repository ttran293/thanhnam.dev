import "lenis/dist/lenis.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Inter, Oswald, Roboto_Mono } from "next/font/google";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-display",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono-custom",
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const { scrollToTop } = useSmoothScroll({ enabled: reduceMotion === false });

  return (
    <div
      className={`${inter.variable} ${inter.className} ${oswald.variable} ${robotoMono.variable}`}
    >
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => scrollToTop(true)}
      >
        <motion.div
          key={router.asPath}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
