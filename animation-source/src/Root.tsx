import {Composition, Folder} from "remotion";
import {AnimatedObsBanner} from "./Composition";
import {CompactObsBanner} from "./CompactComposition";

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
        id="AngelCompact720x90"
        component={CompactObsBanner}
        durationInFrames={270}
        fps={30}
        width={720}
        height={90}
      />
      <Composition
        id="AngelCompact480x60"
        component={CompactObsBanner}
        durationInFrames={270}
        fps={30}
        width={480}
        height={60}
      />
    </Folder>
  );
};
