import "./App.css";
import React from "react";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Routes, Route, HashRouter } from "react-router-dom";

import DashboardGeral from "../pages/DashboardGeral";
import Admissao from "../pages/processos/Admissao";
import Alta from "../pages/processos/Alta";

import Sidebar from "../components/sidebar/Sidebar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "250px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <>
          <HashRouter>
            <Sidebar />
            <Routes>
              {/* <Route exact path="/" element={<Login />} /> */}
              <Route
                exact
                path="/DashboardGeral"
                element={<DashboardGeral />}
              />

              <Route exact path="/add" element={<Admissao />} />
              <Route exact path="/remove" element={<Alta />} />
            </Routes>
            {/* <Footer /> */}
          </HashRouter>
        </>
      </div>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
