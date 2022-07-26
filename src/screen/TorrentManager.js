import React, {useEffect, useState} from 'react';
import {Button, Container, createTheme, CssBaseline, Stack, TextField, ThemeProvider} from "@mui/material";
import {WebTorrentGuiV2} from "webtorrent-web-gui";
import {Save} from "@mui/icons-material";
import logo from "../asset/default-nomargin.svg"

const defaultTheme = createTheme();
const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    height: "100%",
                    [defaultTheme.breakpoints.up('xs')]: {
                        paddingLeft: "0px",
                        paddingRight: "0px",
                    }
                },
            },
        },
    },
})

function TorrentManager(props) {
    const [baseUrl, setBaseUrl] = useState("");
    const [key, setKey] = useState(null);
    let path = key || process.env.REACT_APP_BASE_PATH
    useEffect(() => {
        (async () => {
            let port = new URLSearchParams(props.location.search).get("port")
            if (port) {
                let protocol = window.location.protocol;
                let domain = window.location.hostname;
                path = `${protocol}//${domain}${port ? (":" + port) : ""}` + process.env.REACT_APP_BASE_PATH
                setKey(path);
            } else {
                console.log("Custom port not defined")
            }
        })()
    }, [])

    if (!key && path != null) {
        if (path.startsWith("http")) {
            setKey(path)
        } else {
            let protocol = window.location.protocol;
            let domain = window.location.hostname;
            let port = window.location.port;
            path = `${protocol}//${domain}${port ? (":" + port) : ""}` + process.env.REACT_APP_BASE_PATH
            setKey(path);
        }
    }
    console.info("Using path: ", path)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="false">
                <Stack sx={{height: "100%"}} spacing={2} alignItems={"center"}>
                    {!path && <Stack direction={"row"} spacing={4}>
                        <TextField
                            id={"baseUrl"}
                            type="text"
                            variant={"outlined"}
                            value={baseUrl}
                            helperText={"Insert here the path of your remote instance (Es. http://localhost:3000)"}
                            onChange={(e) => {
                                setBaseUrl(e.target.value)
                            }}
                        />
                        <Button startIcon={<Save/>} onClick={() => {
                            setKey(baseUrl)
                        }}> Save </Button>
                    </Stack>}
                    {key ? <WebTorrentGuiV2 logo={logo}
                                            remote={!((path || baseUrl).includes("localhost") || (path || baseUrl).includes("127.0.0.1"))}
                                            key={key} baseUrl={path || baseUrl}/> : null}
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default TorrentManager;
