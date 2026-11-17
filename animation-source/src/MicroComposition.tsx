import {loadFont} from "@remotion/fonts";
import {springTiming, TransitionSeries} from "@remotion/transitions";
import {slide} from "@remotion/transitions/slide";
import {wipe} from "@remotion/transitions/wipe";
import {AbsoluteFill, staticFile, useVideoConfig} from "remotion";
import {CartCtaScene} from "./micro/CartCtaScene";
import {CashQuestionScene} from "./micro/CashQuestionScene";
import {OfferScene} from "./micro/OfferScene";

await loadFont({
  family: "Inter",
  url: staticFile("assets/Inter.woff2"),
  weight: "800",
  display: "block",
});

const transitionTiming = springTiming({
  config: {damping: 18, mass: 0.55, stiffness: 230},
  durationInFrames: 15,
});

export const MicroObsBanner: React.FC = () => {
  const {width} = useVideoConfig();
  const scale = width / 360;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: width - 4 * scale,
          height: 86 * scale,
          overflow: "hidden",
          clipPath:
            "polygon(0 18%, 4% 0, 96% 0, 100% 18%, 100% 82%, 96% 100%, 4% 100%, 0 82%)",
          backgroundColor: "#070906",
          boxShadow: `0 0 ${18 * scale}px rgba(194,233,123,.25)`,
        }}
      >
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={60}>
            <CashQuestionScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={wipe({direction: "from-right"})}
            timing={transitionTiming}
          />
          <TransitionSeries.Sequence durationInFrames={60}>
            <OfferScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={slide({direction: "from-bottom"})}
            timing={transitionTiming}
          />
          <TransitionSeries.Sequence durationInFrames={60}>
            <CartCtaScene />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={wipe({direction: "from-left"})}
            timing={transitionTiming}
          />
          <TransitionSeries.Sequence durationInFrames={30}>
            <CashQuestionScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </div>
    </AbsoluteFill>
  );
};
