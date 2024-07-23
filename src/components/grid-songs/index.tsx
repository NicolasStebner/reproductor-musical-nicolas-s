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
import { DelayComponent } from "../delay";

export function GridSongs({ songs }: { songs: TrackItem[] }) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 300, borderSpacing: "0" }}
        aria-label="simple table"
      >
        <TableBody>
          {songs?.map((t, index) => (
            <TableRow
              key={t.id}
              sx={{
                backgroundColor: "var(--onyx-gray)",
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "var(--hover-color-gray)",
                },
              }}
            >
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="left"
              >
                <DelayComponent key={index} delay={index * 200}>
                  <Box display="flex" flexDirection={"column"}>
                    <SearchTitleSong text={t.name} />
                    <SearchSubtitleSong text={t.artists[0]?.name} />
                  </Box>
                </DelayComponent>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="right"
              >
                <DelayComponent key={index} delay={index * 200}>
                  {t.getDuration()}
                </DelayComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
