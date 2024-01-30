/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Player = ({ src }: { src: string }) => {
  return <AudioPlayer src={src} onPlay={(e) => console.log("onPlay", e)} />;
};
export default qwikify$(Player);
