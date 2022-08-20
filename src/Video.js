import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container style={{ height: "1000px", width:"1000px" }}>
      <Grid item >
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100px", width: "200px" }}
        />
      </Grid>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item >
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "100px", width: "100%" }}
                />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}
