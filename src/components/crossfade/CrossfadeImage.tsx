import { Fade } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";

type CrossfadeImageProps = {
  src: string;
  durationMillis?: number;
  delay?: number;
  parentStyle?: any;
  style?: any;
};

const defaultStyle = { maxWidth: "100%", maxHeight: "100%" };

const CrossfadeImage: FunctionComponent<CrossfadeImageProps> = (props) => {
  const [srcA, setSrcA] = useState<string>("");
  const [srcB, setSrcB] = useState<string>("");
  const [oldSrc, setOldSrc] = useState<string>("");
  const [showB, setShowB] = useState<boolean>(false);

  const handleOnLoadA = () => {
    setShowB(false);
    setOldSrc(srcB);
  };

  const handleOnLoadB = () => {
    setShowB(true);
    setOldSrc(srcA);
  };

  useEffect(() => {
    const newSrc = props.src;
    if (newSrc && newSrc !== oldSrc) {
      const firstTime = !srcA && !srcB && !oldSrc;
      if (firstTime) {
        setSrcB(newSrc);
      } else if (oldSrc === srcA) {
        setSrcA(newSrc);
      } else {
        setSrcB(newSrc);
      }
    }
  }, [props.src]); //Do not include all dependencies, will cause unwanted re-render

  return (
    <div
      style={{
        ...defaultStyle,
        ...props.parentStyle,
        ...{ position: "relative" },
      }}
    >
      <img
        style={{
          ...defaultStyle,
          ...props.style,
          ...{ position: "absolute" },
        }}
        src={srcA}
        onLoad={handleOnLoadA}
        alt=""
      />
      <Fade in={showB} timeout={!!srcA ? props.durationMillis || 2000 : 500}>
        <img
          style={{
            ...defaultStyle,
            ...props.style,
            ...{ position: "absolute" },
          }}
          src={srcB}
          onLoad={handleOnLoadB}
          alt=""
        />
      </Fade>
    </div>
  );
};

export default CrossfadeImage;
