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
import { SearchTitle, TextHelp } from "../../ui/text";
import { TopArtist } from "../../components/top-artist";
import { useAuth } from "../../providers/auth/AuthContext";

const ITEMS_PER_PAGE = 6; // Cambia esto al número de items por página que prefieras

export function SearchPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
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

  const handlerAlbum = (albumID: string) => {
    navigate("/album/" + albumID);
  };

  const handlerArtist = (artistID: string) => {
    navigate("/artist/" + artistID);
    setPageRelatedArtists(1);
    setPageAlbums(1);
  };

  const handlerChange = (event: any) => {
    setQuery(event.target.value);
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
          value={query}
          autoFocus
          placeholder="Buscar artista"
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
                <GridAlbumArtists>
                  {paginatedAlbums.map((a) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        key={a.id}
                        onClick={() => handlerAlbum(a.id)}
                      >
                        <CardAlbum
                          key={a.id}
                          image={a.images[0].url}
                          title={a.name}
                          description={
                            a.getReleaseYear().toString() + " • " + a.album_type
                          }
                        />
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
                <GridAlbumArtists>
                  {paginatedArtists.map((a) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        key={a.id}
                        onClick={() => handlerArtist(a.id)}
                      >
                        <CardComp
                          key={a.id}
                          avatar={{
                            src: `${a.images[0]?.url}`,
                            alt: `${a.name}`,
                          }}
                          title={a.name}
                          subtitle={a.type}
                        />
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
          <TextHelp text="Buscá tu artista favorito..."></TextHelp>
        </Box>
      )}
    </Box>
  );
}
