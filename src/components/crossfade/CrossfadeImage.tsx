import { Fade } from "@mui/material"
import { FunctionComponent, useEffect, useState } from "react"

type CrossfadeImageProps = {
  src: string
  durationMillis?: number
  delay?: number
  parentStyle?: any
  style?: any
  onLoad?: (imgBuffer: ArrayBuffer) => void
}

const defaultStyle = { maxWidth: "100%", maxHeight: "100%" }

const CrossfadeImage: FunctionComponent<CrossfadeImageProps> = (props) => {
  const [srcA, setSrcA] = useState<string>("")
  const [srcB, setSrcB] = useState<string>("")
  const [oldSrc, setOldSrc] = useState<string>("")
  const [showB, setShowB] = useState<boolean>(false)

  const handleOnLoadA = () => {
    setShowB(false)
    setOldSrc(srcB)
  }

  const handleOnLoadB = () => {
    setShowB(true)
    setOldSrc(srcA)
  }

  const fetchImage = async (url: string) => {
    const imgResp = await fetch(url)
    const imgBlob = await imgResp.blob()
    const imgBuffer = await imgBlob.arrayBuffer()

    const blobUrl = URL.createObjectURL(imgBlob)

    if (props.onLoad) {
      props.onLoad(imgBuffer)
    }

    return blobUrl
  }

  useEffect(() => {
    const loadImage = async () => {
      if (props.src && props.src !== oldSrc) {
        const newSrc = await fetchImage(props.src)
        const firstTime = !srcA && !srcB && !oldSrc
        if (firstTime) {
          setSrcB(newSrc)
        } else if (oldSrc === srcA) {
          setSrcA(newSrc)
        } else {
          setSrcB(newSrc)
        }
      }
    }
    loadImage()
  }, [props.src]) //Do not include all dependencies, will cause unwanted re-render

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
  )
}

export default CrossfadeImage
