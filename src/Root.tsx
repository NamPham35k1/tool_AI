import "./index.css";
import { Composition } from "remotion";
import { DockerExplainer } from "./DockerExplainer/DockerExplainer";
import { dockerExplainerSchema } from "./DockerExplainer/types";
import { GitRebaseVsMerge } from "./GitRebaseVsMerge/GitRebaseVsMerge";
import { gitRebaseVsMergeSchema } from "./GitRebaseVsMerge/types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 40s AI Voice Explainer: Git Rebase vs Merge */}
      <Composition
        id="GitRebaseVsMerge"
        component={GitRebaseVsMerge}
        durationInFrames={1186}
        fps={30}
        width={1080}
        height={1920}
        schema={gitRebaseVsMergeSchema}
        defaultProps={{
          title: "Git Rebase vs Merge",
          subtitle: "Khác nhau thế nào & khi nào nên dùng?",
        }}
      />

      {/* 50s AI Voice Explainer: Docker */}
      <Composition
        id="DockerExplainer"
        component={DockerExplainer}
        durationInFrames={1280}
        fps={30}
        width={1080}
        height={1920}
        schema={dockerExplainerSchema}
        defaultProps={{
          title: "Docker là gì?",
          subtitle: "Giải thích trong 50 giây",
        }}
      />
    </>
  );
};
