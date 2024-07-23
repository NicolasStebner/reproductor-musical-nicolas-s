import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Stack,
} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { SubtitlePlayer, TitlePlayer } from "../../ui/text";
import { serviceSpotify } from "../../services/service";
import { useEffect, useState } from "react";
import PauseIcon from "@mui/icons-material/Pause";
import { Loading } from "../loading";
import { playbackType } from "../../types/player";
import { msToMinutesWithSeconds } from "../../util/milisegundosAMinutosConSegundos";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth/AuthContext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { DelayComponent } from "../delay";

export function MusicPlayer() {
  const [playbackState, setPlaybackState] = useState<playbackType | null>(null);
  const [idArtist, setIdArtist] = useState("");
  const [idAlbum, setIdAlbum] = useState("");
  const [volume, setVolume] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(true);
  const [artist, setArtist] = useState({
    image: "",
    alt: "",
    nameSong: "",
    artistName: "",
  });
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [durationSong, setDurationSong] = useState({
    progress: 0,
    durationComplete: 0,
  });
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatState, setRepeatState] = useState<
    "off" | "context" | "track" | undefined
  >(undefined);
  /*  */

  /*  */
  const navigate = useNavigate();
  /*  */
  const { access_token } = useAuth();
  /* useEffect del componente general */
  const all = () => {
    const getPlaybackState = async () => {
      const playbackStateFetched = await serviceSpotify.getPlaybackState(
        access_token!!
      );
      setIdArtist(playbackStateFetched.item?.artists[0]?.id);
      setIdAlbum(playbackStateFetched.item?.album?.id);
      setPlaybackState(playbackStateFetched as any);
      setVolume(playbackStateFetched?.device.volume_percent!!);
      setArtist({
        image: playbackStateFetched?.item.album?.images[0]?.url as string,
        alt: playbackStateFetched?.item.artists[0].name as string,
        nameSong: playbackStateFetched?.item.name!!,
        artistName: playbackStateFetched?.item.artists[0].name!!,
      });
      setDurationSong({
        progress: playbackStateFetched.progress_ms,
        durationComplete: playbackStateFetched.item.duration_ms,
      });
      setShuffleState(playbackStateFetched.shuffle_state);
      setRepeatState(playbackStateFetched?.repeat_state);
    };

    const changeArtist = async () => {
      const lastState = await serviceSpotify.getPlaybackState(access_token!!);
      setArtist({
        image: lastState?.item.album?.images[0]?.url as string,
        alt: lastState?.item.artists[0].name as string,
        nameSong: lastState?.item.name,
        artistName: lastState?.item.artists[0].name!!,
      });
    };
    getPlaybackState();
    changeArtist();
    setLoadingArtist(false);
  };
  useEffect(() => {
    all();
  }, [loadingArtist, access_token]);

  /* Slider de los minutos de la cancion */
  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setDurationSong((prevState) => {
          if (prevState.progress >= prevState.durationComplete) {
            updateCurrentSong();
          }
          return {
            ...prevState,
            progress: prevState.progress + 1000,
          };
        });
      }, 1000);

      // Limpieza del intervalo al desmontar el componente
      return () => clearInterval(interval);
    }
  }, [playing]);

  const updateCurrentSong = async () => {
    setLoadingArtist(true);
  };

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const handlerVolume = (newVolume: number) => {
    modifyVolume(newVolume);
    setVolume(newVolume);
  };

  const handlerPreviousSong = async () => {
    await serviceSpotify.previousSong(
      playbackState?.device.id!!,
      access_token!!
    );
    updateCurrentSong();
  };

  const handlerNextSong = async () => {
    await serviceSpotify.nextSong(playbackState?.device.id!!, access_token!!);
    updateCurrentSong();
  };

  const handlerPlay = async () => {
    await serviceSpotify.play(playbackState?.device.id!!, access_token!!);
    togglePlaying();
  };

  const handlerPause = async () => {
    await serviceSpotify.pause(playbackState?.device.id!!, access_token!!);
    togglePlaying();
  };

  const modifyVolume = async (newVolume: number) => {
    await serviceSpotify.modifyVolume(
      newVolume,
      playbackState?.device.id!!,
      access_token!!
    );
  };

  const handlerShuffleMusic = async () => {
    try {
      await serviceSpotify.shuffleChange(!shuffleState, access_token!!);
      setShuffleState(!shuffleState);
    } catch (e) {
      console.error(e);
    }
  };

  const handlerRepeat = async (newState: any) => {
    try {
      await serviceSpotify.repeatModeChange(newState, access_token!!);
      setRepeatState(newState);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {playbackState?.is_playing ? (
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
            padding: "5px",
            width: "100%",
            color: "var(--font-color)",
            boxShadow: "none",
          }}
        >
          {/* Informacion del tema */}
          {loadingArtist ? (
            <Box>
              <Loading />
            </Box>
          ) : (
            <DelayComponent delay={150}>
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "space-between",
                  minWidth: "20%",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    maxHeight: "70px",
                    maxWidth: "70px",
                    borderRadius: "5px",
                  }}
                  image={artist.image}
                  alt={artist.alt}
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Box onClick={() => navigate("/album/" + idAlbum)}>
                      <TitlePlayer text={artist.nameSong} />
                    </Box>
                    <Box onClick={() => navigate("/artist/" + idArtist)}>
                      <SubtitlePlayer text={artist.artistName} />
                    </Box>
                  </CardContent>
                </Box>
              </Stack>
            </DelayComponent>
          )}
          {/* Display de reproduccion */}
          <Box
            sx={{
              display: "flex",
              minWidth: "600px",
              flexDirection: "column",
            }}
          >
            <Stack
              direction={"row"}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {shuffleState ? (
                <IconButton
                  aria-label="previous"
                  onClick={() => handlerShuffleMusic()}
                >
                  <ShuffleOnIcon
                    fontSize="small"
                    sx={{ color: "var(--spotify-color)" }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="previous"
                  onClick={() => handlerShuffleMusic()}
                >
                  <ShuffleIcon
                    fontSize="small"
                    sx={{ color: "var(--font-color)" }}
                  />
                </IconButton>
              )}
              <IconButton
                aria-label="previous"
                onClick={() => handlerPreviousSong()}
              >
                <SkipPreviousIcon
                  fontSize="small"
                  sx={{ color: "var(--font-color)" }}
                />
              </IconButton>
              {!playing ? (
                <IconButton aria-label="play/pause" onClick={handlerPlay}>
                  <PlayArrowIcon
                    fontSize="small"
                    sx={{ height: 38, width: 38, color: "var(--font-color)" }}
                  />
                </IconButton>
              ) : (
                <IconButton aria-label="play/pause" onClick={handlerPause}>
                  <PauseIcon
                    fontSize="small"
                    sx={{ height: 38, width: 38, color: "var(--font-color)" }}
                  />
                </IconButton>
              )}
              <IconButton aria-label="next" onClick={() => handlerNextSong()}>
                <SkipNextIcon
                  fontSize="small"
                  sx={{ color: "var(--font-color)" }}
                />
              </IconButton>
              <RepeatStateComponent
                repeatState={repeatState}
                handlerChange={handlerRepeat}
              />
            </Stack>
            <Box display={"flex"} alignItems={"center"} gap={2}>
              {msToMinutesWithSeconds(durationSong.progress)}
              <Slider
                aria-label="time-indicator"
                size="small"
                value={durationSong.progress}
                min={0}
                step={1000}
                max={durationSong.durationComplete}
                disabled
                sx={{
                  color: "white",
                  height: 4,
                  padding: "4px 0",
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&::before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
              {msToMinutesWithSeconds(durationSong.durationComplete)}
            </Box>
          </Box>
          {/* Volumen */}
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            width="300px"
            alignItems="center"
          >
            <VolumeDownIcon />
            <Volume volume={volume} handlerVolume={handlerVolume} />
            <VolumeUpIcon />
          </Stack>
        </Card>
      ) : (
        <Loading />
      )}
    </>
  );
}
type VolumeType = {
  volume: number;
  handlerVolume: (newValue: number) => void;
};

const Volume = ({ volume, handlerVolume }: VolumeType) => {
  return (
    <Slider
      aria-label="Volume"
      min={0}
      max={100}
      value={volume}
      step={10}
      //@ts-ignore
      onChange={(event, newValue) => {
        handlerVolume(newValue as number);
      }}
      sx={{
        color: "var(--spotify-color)",
        "& .MuiSlider-track": {
          border: "none",
        },
        "& .MuiSlider-thumb": {
          width: 12,
          height: 12,
          backgroundColor: "var(--spotify-color)",
          "&::before": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
          },
          "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "none",
          },
        },
      }}
    />
  );
};

const repeatConfig = {
  off: {
    icon: RepeatIcon,
    color: "var(--font-color)",
  },
  context: {
    icon: RepeatIcon,
    color: "var(--spotify-color)",
  },
  track: {
    icon: RepeatOneIcon,
    color: "var(--spotify-color)",
  },
};

const nextRepeatState = {
  off: "context",
  context: "track",
  track: "off",
};

type repeatStateComponentType = {
  repeatState: "off" | "context" | "track" | undefined;
  handlerChange: (newState: string) => void;
};

const RepeatStateComponent = ({
  repeatState,
  handlerChange,
}: repeatStateComponentType) => {
  const [repeatStateIntern, setRepeatState] = useState<
    "off" | "context" | "track" | undefined
  >(repeatState);

  const handleNextSong = () => {
    //@ts-ignore
    handlerChange(nextRepeatState[repeatStateIntern]);
    //@ts-ignore
    setRepeatState(nextRepeatState[repeatStateIntern]);
  };
  //@ts-ignore
  const { icon: Icon, color } = repeatConfig[repeatState];

  return (
    <IconButton aria-label="next" onClick={handleNextSong}>
      <Icon fontSize="small" sx={{ color: color }} />
    </IconButton>
  );
};
