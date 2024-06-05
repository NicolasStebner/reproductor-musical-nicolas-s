import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TrackItem } from "../../domain/trackItem";
import { SearchSubtitleSong, SearchTitleSong } from "../../ui/text";

export function GridSongs({ songs }: { songs: TrackItem[] }) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 300, borderSpacing: "0" }}
        aria-label="simple table"
      >
        <TableBody>
          {songs?.map((t) => (
            <TableRow
              key={t.id}
              sx={{
                backgroundColor: "var(--onyx-gray)",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{ color: "white", borderBottom: "none", paddingLeft: 0 }}
                align="left"
              >
                <Box display="flex" flexDirection={"column"}>
                  <SearchTitleSong text={t.name} />
                  <SearchSubtitleSong text={t.artists[0]?.name} />
                </Box>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="right"
              >
                {t.getDuration()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
