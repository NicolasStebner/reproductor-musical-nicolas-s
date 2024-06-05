import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Album } from "../../domain/album";
import { serviceSpotify } from "../../services/service";
import { Box } from "@mui/material";
import { TrackItem } from "../../domain/trackItem";
import { GridTrackAlbum } from "../../components/grid-track-album";
import { AlbumTitle, AlbumTypeText } from "../../ui/text";
import { AvatarAlbum } from "../../ui/avatar";
import { Loading } from "../../components/loading";

export function AlbumPage() {
  const blockRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<TrackItem[]>([]);

  useEffect(() => {
    const getTracks = async () => {
      const data = await serviceSpotify.getAlbumTracks(id!);
      setTracks(data);
    };
    const getAlbum = async () => {
      const data = await serviceSpotify.getAlbum(id!);
      setAlbum(data);
    };
    scrollToTop();
    getTracks();
    getAlbum();
    setIsLoading(false);
  }, []);

  const scrollToTop = () => {
    if (blockRef.current) {
      //@ts-ignore
      blockRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5} marginBottom={10}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box ref={blockRef} display={"flex"} gap={2}>
            <AvatarAlbum
              alt={album?.artists[0].name!!}
              src={album?.images[0]?.url!!}
            />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
            >
              <AlbumTypeText text={album?.album_type!!} />
              <AlbumTitle text={album?.name!!} />
              <Box display={"flex"} gap={1}>
                <Link
                  className="link subrayado"
                  to={"/artist/" + album?.artists[0].id}
                >
                  {album?.artists[0].name}
                </Link>
                <span>•</span>
                <span>{album?.getReleaseYear()}</span>
                <span>•</span>
                <span>
                  {album?.getSongsCount()} Songs,{" "}
                  {album?.getDurationWithMinutesAndSeconds()}
                </span>
              </Box>
            </Box>
          </Box>
          <GridTrackAlbum tracks={tracks}></GridTrackAlbum>
          <Box>
            {album?.getMonthDayAndYear()}
            {album?.copyrights?.map((c) => {
              return (
                <Box key={c.type} display={"flex"} flexDirection={"column"}>
                  {c.text}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}
