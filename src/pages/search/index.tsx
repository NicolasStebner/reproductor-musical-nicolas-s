import { Box, Grid, Pagination, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Album } from "../../domain/album";
import { Artist } from "../../domain/artist";
import { TrackItem } from "../../domain/trackItem";
import { serviceSpotify } from "../../services/service";
import { GridAlbumArtists } from "../../components/grid-album-artists";
import { CardAlbum } from "../../components/card-album";
import { useNavigate } from "react-router-dom";
import { CardComp } from "../../components/card-artist";
import { GridSongs } from "../../components/grid-songs";
import { Loading } from "../../components/loading";
import { SearchTitle, SubtitleArtist, TextHelp } from "../../ui/text";
import { TopArtist } from "../../components/top-artist";
import { useAuth } from "../../providers/auth/AuthContext";
import { DelayComponent } from "../../components/delay";

const ITEMS_PER_PAGE = 6; // Cambia esto al número de items por página que prefieras

export function SearchPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [auxiliaryQuery, setAuxiliaryQuery] = useState("");
  const [query, setQuery] = useState(auxiliaryQuery);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTouched, setSearchTouched] = useState<boolean>(false);
  /*  */
  const [pageAlbums, setPageAlbums] = useState(1);
  const [pageRelatedArtists, setPageRelatedArtists] = useState(1);
  /*  */
  const { access_token } = useAuth();
  /*  */
  useEffect(() => {
    const getData = async () => {
      if (query != "") {
        setIsLoading(true);
        const artistsFetched = await serviceSpotify.searchByType(
          query,
          "artist",
          access_token!!
        );
        const albumsFetched = await serviceSpotify.searchByType(
          query,
          "album",
          access_token!!
        );
        var tracksFetched = await serviceSpotify.searchByType(
          query,
          "track",
          access_token!!
        );
        tracksFetched = tracksFetched.slice(0, 5);
        setAlbums(albumsFetched);
        setTracks(tracksFetched);
        setArtists(artistsFetched);
        setIsLoading(false);
      }
    };
    getData();
  }, [query, access_token]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(auxiliaryQuery);
    }, 1000);

    // Cleanup function to clear the timeout if searchTerm changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [auxiliaryQuery]);

  const handlerAlbum = (albumID: string) => {
    navigate("/album/" + albumID);
  };

  const handlerArtist = (artistID: string) => {
    navigate("/artist/" + artistID);
    setPageRelatedArtists(1);
    setPageAlbums(1);
  };

  const handlerChange = (event: any) => {
    setAuxiliaryQuery(event.target.value);
    setSearchTouched(true);
  };
  /*  */
  //@ts-ignore
  const handleChangePage = (event, value) => {
    setPageAlbums(value);
  };
  //@ts-ignore
  const handleChangePageRelatedArtists = (event, value) => {
    setPageRelatedArtists(value);
  };

  /* Paginacion albums */
  const leakedAlbums = albums.filter(
    (a) => a.album_type == "album" || a.album_type == "single"
  );
  const startIndexAlbums = (pageAlbums - 1) * ITEMS_PER_PAGE;
  const paginatedAlbums = leakedAlbums.slice(
    startIndexAlbums,
    startIndexAlbums + ITEMS_PER_PAGE
  );
  const pageCountAlbums = Math.ceil(leakedAlbums.length / ITEMS_PER_PAGE);

  /* Paginacion Artistas relacionados */
  const startIndex = (pageRelatedArtists - 1) * ITEMS_PER_PAGE;
  const paginatedArtists = artists.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const pageCount = Math.ceil(artists.length / ITEMS_PER_PAGE);
  /*  */
  return (
    <Box display={"flex"} flexDirection={"column"} gap={10}>
      <Box>
        <TextField
          size="small"
          onBlur={() => {
            setQuery("");
          }}
          value={auxiliaryQuery}
          autoFocus
          placeholder="Search Artist"
          variant="outlined"
          color="success"
          onChange={handlerChange}
          sx={{
            input: { color: "white" },
            "& .MuiInput-underline:after": {
              borderBottomColor: "var(--spotify-color)", // Color del borde después del focus (naranja)
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                backgroundColor: "var(--hover-color-gray)",
                borderRadius: 20,
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              opacity: 1,
            },
          }}
        ></TextField>
      </Box>
      {searchTouched ? (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {/* cambiar */}
              <Box display={"flex"} gap={5}>
                <Box display="flex" flexDirection={"column"} minWidth={"25%"}>
                  <Box display="flex" flexDirection={"column"}>
                    <SearchTitle text="Top Artist" />
                    <TopArtist artist={artists[0]} onClicked={handlerArtist} />
                  </Box>
                </Box>
                <Box display="flex" flexDirection={"column"} width={"100%"}>
                  <SearchTitle text="Songs" />
                  <GridSongs songs={tracks}></GridSongs>
                </Box>
              </Box>
              <Box>
                <SubtitleArtist text="Discography" />
                <GridAlbumArtists>
                  {paginatedAlbums.map((a, index) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        key={a.id}
                        onClick={() => handlerAlbum(a.id)}
                      >
                        <DelayComponent key={index} delay={index * 100}>
                          <CardAlbum
                            key={a.id}
                            image={a.images[0].url}
                            title={a.name}
                            description={
                              a.getReleaseYear().toString() +
                              " • " +
                              a.album_type
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
              <Box>
                <SubtitleArtist text="Other Artists" />
                <GridAlbumArtists>
                  {paginatedArtists.map((a, index) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        key={a.id}
                        onClick={() => handlerArtist(a.id)}
                      >
                        <DelayComponent key={index} delay={index * 100}>
                          <CardComp
                            key={a.id}
                            avatar={{
                              src: `${a.images[0]?.url}`,
                              alt: `${a.name}`,
                            }}
                            title={a.name}
                            subtitle={a.type}
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
                  count={pageCount}
                  page={pageRelatedArtists}
                  onChange={handleChangePageRelatedArtists}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </>
          )}
        </>
      ) : (
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ marginBottom: "100px", minHeight: "300px" }}
        >
          <DelayComponent delay={200}>
            <TextHelp text="Search your favourite artist."></TextHelp>
          </DelayComponent>
        </Box>
      )}
    </Box>
  );
}
