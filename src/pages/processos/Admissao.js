import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

import Notification from "../../components/Notification";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import CrentesForm from "./AdmissaoForm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  progress: {
    position: "absolute",
    right: "750px",
  },
}));

const headCells = [
  { id: "id", label: "Codigo do Crente" },
  { id: "fullName", label: "Name Completo" },
  { id: "gender", label: "Genero" },
  { id: "mobile", label: "Contacto " },
  { id: "churchId", label: "Igreja " },
  { id: "NeighborhoodId", label: "Bairro " },
  { id: "hireDate", label: "Data do Registo" },
  { id: "actions", label: "acções", disableSorting: true },
];

export default function Crentes() {
  const [loading, setLoading] = React.useState(false);

  const [records, setRecords] = useState([]);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    getList();
  }, []);
  async function getList() {
    let result = await fetch("http://localhost:8000/api/listCrentes");
    result = await result.json();
    setRecords(result);
    setLoading(true);
  }
  async function onDelete(id) {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    let result = await fetch("http://localhost:8000/api/deleteCrente/" + id, {
      method: "DELETE",
    });
    result = await result.json();
    console.warn(result);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
    getList();
  }
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (crente, resetForm) => {
    if (crente.id == 0) {
      fetch("http://localhost:8000/api/storeCrente", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(crente),
      }).then(() => {
        console.log("entrada adicionada!");
        getList();
      });
    } else {
      fetch(
        "http://localhost:8000/api/updateCrente/" + crente.id + "?_method=PUT",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(crente),
        }
      ).then(() => {
        console.log("updated!");
        getList();
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <>
      <PageHeader
        title="Crentes"
        subTitle="Gestão de Crentes"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label=" Pesquisar Crentes"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Adicionar Crente"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        {loading ? (
          <TblContainer>
            <TblHead />

            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.fullName}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.churchId}</TableCell>
                  <TableCell>{item.NeighborhoodId}</TableCell>
                  <TableCell>{item.hireDate}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="primary"
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="secondary"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {
                            onDelete(item.id);
                          },
                        });
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        ) : (
          <Box className={classes.progress}>
            <CircularProgress />
          </Box>
        )}
        <TblPagination />
      </Paper>
      <Popup
        title="Registo/Atualização de Crentes"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CrentesForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
