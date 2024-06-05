import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TopTrackItem } from "../../domain/topTrackItem";

export function TableTrackItem({ topTracks }: { topTracks: TopTrackItem[] }) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 300, borderSpacing: "0" }}
        aria-label="simple table"
      >
        <TableBody>
          {topTracks.map((t, index) => (
            <TableRow
              key={t.id}
              sx={{
                backgroundColor: "var(--onyx-gray)",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                component="th"
                scope="row"
              >
                {index + 1}
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="left"
              >
                <Avatar src={t.album.images[0].url}></Avatar>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottom: "none" }}
                align="left"
              >
                {t.name}
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
