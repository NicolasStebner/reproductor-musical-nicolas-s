import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serviceSpotify } from "../../services/service";
import { Album } from "../../domain/album";
import { Artist } from "../../domain/artist";
import { SubtitleArtist, TitleArtist } from "../../ui/text";
import { TableTrackItem } from "../../components/trackItems-table";
import { CardAlbum } from "../../components/card-album";
import { Box, Button, Grid, Pagination } from "@mui/material";
import { GridAlbumArtists } from "../../components/grid-album-artists";
import { TopTrackItem } from "../../domain/topTrackItem";
import { useAuth } from "../../providers/auth/AuthContext";
import { DelayComponent } from "../../components/delay";

const ITEMS_PER_PAGE = 6; // Cambia esto al número de items por página que prefieras

export function ArtistPage() {
  const blockRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [pageAlbums, setPageAlbums] = useState(1);
  // @ts-ignore
  const [artist, setArtist] = useState<Artist>([]);
  const [userFollowsArtist, setUserFollowsArtist] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [topTracks, setTopTracks] = useState<TopTrackItem[]>([]);
  //
  const { toggleUserFollowedSomeone, access_token } = useAuth();
  //
  const getArtist = async () => {
    const artistData = await serviceSpotify.getArtist(id!, access_token!!);
    setArtist(artistData);
  };

  const getAlbums = async () => {
    const albumsData = await serviceSpotify.getAlbumOfAnArtist(
      id!,
      access_token!!
    );
    setAlbums(albumsData);
  };

  const getTopTracks = async () => {
    const topTracksData = await serviceSpotify.getTopTracksOfAnArtist(
      id!,
      access_token!!
    );
    setTopTracks(topTracksData);
  };

  const checkIfUserFollowsArtist = async () => {
    const rta = await serviceSpotify.checkIfUser5FollowArtist(
      id!!,
      access_token!!
    );
    setUserFollowsArtist(rta[0]);
  };

  const handlerUnfollow = async () => {
    try {
      await serviceSpotify.unfollowArtist(id!!, access_token!!);
      toggleFollow();
    } catch (e) {
      console.error(e);
    }
  };

  const handlerFollow = async () => {
    try {
      await serviceSpotify.followArtist(id!!, access_token!!);
      toggleFollow();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFollow = () => {
    setUserFollowsArtist(!userFollowsArtist);
    toggleUserFollowedSomeone();
  };

  const scrollToTop = () => {
    if (blockRef.current) {
      //@ts-ignore
      blockRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToTop();
    getArtist();
    getAlbums();
    getTopTracks();
    checkIfUserFollowsArtist();
  }, [id, access_token]);

  const handlerAlbum = (albumID: string) => {
    navigate("/album/" + albumID);
  };

  //@ts-ignore
  const handleChangePage = (event, value) => {
    setPageAlbums(value);
  };

  /* Paginacion albums */
  const leakedAlbums = albums.filter(
    (a) =>
      (a.album_type == "album" || a.album_type == "single") &&
      a.artists[0].name == artist.name
  );
  const startIndexAlbums = (pageAlbums - 1) * ITEMS_PER_PAGE;
  const paginatedAlbums = leakedAlbums.slice(
    startIndexAlbums,
    startIndexAlbums + ITEMS_PER_PAGE
  );
  const pageCountAlbums = Math.ceil(leakedAlbums.length / ITEMS_PER_PAGE);

  return (
    <Box sx={{ marginBottom: "50px" }}>
      <Box ref={blockRef}>
        {/* Block ref necesario */}
        <TitleArtist text={artist.name}></TitleArtist>
      </Box>
      <Box sx={{ marginY: "10px" }}>
        {userFollowsArtist ? (
          <ButtonFollows text="Following" handler={handlerUnfollow} />
        ) : (
          <ButtonFollows text="Follow" handler={handlerFollow} />
        )}
      </Box>
      <Box>
        <SubtitleArtist text="Popular" />
        <Box style={{ height: 800, width: "60%" }}>
          <TableTrackItem topTracks={topTracks}></TableTrackItem>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "50px" }}>
        <Box>
          <SubtitleArtist text="Discography (Albums & Singles)" />
          <Box
            sx={{
              width: "95%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <GridAlbumArtists>
              {paginatedAlbums.map((a, index) => {
                return (
                  <Grid
                    item
                    xs={2}
                    key={a.id}
                    onClick={() => handlerAlbum(a.id)}
                  >
                    <DelayComponent key={index} delay={index * 200}>
                      <CardAlbum
                        key={a.id}
                        image={a.images[0].url}
                        title={a.name}
                        description={
                          a.getReleaseYear().toString() + " • " + a.album_type
                        }
                      />
                    </DelayComponent>
                  </Grid>
                );
              })}
            </GridAlbumArtists>
            <Pagination
              sx={{
                paddingLeft: "10px",
                ul: {
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    borderColor: "var(--spotify-color)",
                  },
                },
              }}
              count={pageCountAlbums}
              page={pageAlbums}
              onChange={handleChangePage}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ButtonFollows({
  text,
  handler,
}: {
  text: string;
  handler: () => void;
}) {
  return (
    <Button
      onClick={handler}
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "white",
        borderRadius: "50px",
        "&:hover": {
          borderColor: "gray",
        },
      }}
    >
      {text}
    </Button>
  );
}
