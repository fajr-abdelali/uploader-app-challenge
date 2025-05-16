import { Box, Button } from "@mui/material";

interface BulkActionsProps {
  selectedIds: string[];
  onDelete: (ids: string[]) => void;
  onExport: (ids: string[]) => void;
}

const BulkActions = ({ selectedIds, onDelete, onExport }:BulkActionsProps) => {
  if (selectedIds.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        bgcolor: "background.paper",
        flexWrap: "wrap", // Responsive: wrap buttons on small screens
        justifyContent: { xs: "center", sm: "flex-start" }, // Center on mobile, left-align on larger screens
      }}
    >
      <Button
        variant="contained"
        color="error"
        onClick={() => onDelete(selectedIds)}
        sx={{ minWidth: 160 }} // Ensure consistent button width
      >
        Delete Selected ({selectedIds.length})
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onExport(selectedIds)}
        sx={{ minWidth: 160 }}
      >
        Export Selected ({selectedIds.length})
      </Button>
    </Box>
  );
};

export default BulkActions;