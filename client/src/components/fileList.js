import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const FileList = () => {
  const user = useSelector((state) => state.user);
  const searchParam = useSelector((state) => state.searchParam);
  const navigate = useNavigate();

  const rows =
    user.files.length > 0
      ? user.files
          .map((file, index) => {
            const lastModifiedDate = new Date(file.lastModified);
            const day = String(lastModifiedDate.getDate());
            const month = String(lastModifiedDate.getMonth() + 1);
            const year = String(lastModifiedDate.getFullYear());
            const hours = String(lastModifiedDate.getHours());
            const minutes = String(lastModifiedDate.getMinutes());
            const seconds = String(lastModifiedDate.getSeconds());
            const lastModifiedString = `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;

            return {
              id: index + 1,
              reference: file.reference,
              name: file.name,
              tags: file.tags,
              lastModified: lastModifiedString,
            };
          })
          .filter((row) => {
            const searchKey = searchParam === null ? "" : searchParam;
            const nameMatch = row.name.includes(searchKey);
            const tagsMatch = row.tags.some((tag) => tag.includes(searchKey));
            const lastModifiedMatch = row.lastModified.includes(searchKey);
            return nameMatch || tagsMatch || lastModifiedMatch;
          })
          .reverse()
      : [];

  return (
    <Paper
      sx={{
        mt: "20px",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={rows}
        getRowHeight={() => 'auto'}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        disableRowSelectionOnClick
        columns={[
          {
            field: "edit",
            headerName: "Edit",
            width: 60,
            renderCell: (params) => {
              return (
                <IconButton
                  onClick={() => navigate(`/edit/${params.row.reference}?isOptimized=true`)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              );
            },
          },
          {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
          },
          {
            field: "tags",
            headerName: "Tags",
            minWidth: 200,
            flex: 1.5,
            renderCell: (params) => {
              return (
                <Box>
                    {params.row.tags.map((tag, key) => (
                        <Chip label={tag} key={key} sx={{ margin: "2px" }}/>
                    ))}
                </Box>
              );
            },
          },
          {
            field: "lastModified",
            headerName: "Last Modified",
            width: 160,
          },
        ]}
        slots={{ toolbar: GridToolbar }}
      />
    </Paper>
  );
};

export default FileList;
