import {Composition, Folder} from "remotion";
import {AnimatedObsBanner} from "./Composition";
import {MicroObsBanner} from "./MicroComposition";
import {CartCtaScene} from "./micro/CartCtaScene";
import {CashQuestionScene} from "./micro/CashQuestionScene";
import {OfferScene} from "./micro/OfferScene";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Angel-ROB-RUN">
      <Composition
        id="AngelObs1920x180"
        component={AnimatedObsBanner}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={180}
      />
      <Composition
        id="AngelObs1280x120"
        component={AnimatedObsBanner}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={120}
      />
      <Composition
        id="AngelMicro360x90"
        component={MicroObsBanner}
        durationInFrames={165}
        fps={30}
        width={360}
        height={90}
      />
      <Composition
        id="AngelMicro240x60"
        component={MicroObsBanner}
        durationInFrames={165}
        fps={30}
        width={240}
        height={60}
      />
      <Folder name="Micro-scenes">
        <Composition
          id="MicroCashQuestion"
          component={CashQuestionScene}
          durationInFrames={60}
          fps={30}
          width={360}
          height={90}
        />
        <Composition
          id="MicroOffer"
          component={OfferScene}
          durationInFrames={60}
          fps={30}
          width={360}
          height={90}
        />
        <Composition
          id="MicroCartCta"
          component={CartCtaScene}
          durationInFrames={60}
          fps={30}
          width={360}
          height={90}
        />
      </Folder>
    </Folder>
  );
};
