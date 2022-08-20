import { useState } from "react";
import { useClient } from "./settings";
import { Grid, Button } from "@mui/material";
import {BsCameraVideoOff, BsCameraVideo} from 'react-icons/bs';
import {MdOutlineExitToApp} from 'react-icons/md';
import {AiOutlineAudioMuted, AiOutlineAudio} from 'react-icons/ai';

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => mute("video")}
        >
          {trackState.video ? 
          <BsCameraVideo /> : 
          <BsCameraVideoOff />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => leaveChannel()}
        >
          Leave
          <MdOutlineExitToApp />
        </Button>
      </Grid>
    </Grid>
  );
}
