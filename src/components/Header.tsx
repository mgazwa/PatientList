import React from "react";
import {AppBar, Container, Toolbar, Typography} from "@material-ui/core";


export const Header = () => {
    return(
        <AppBar position='static'>
            <Toolbar>
                <Container maxWidth={'md'}>
                    <Typography variant={'h2'}>
                        Gabinet Lekarski
                    </Typography>
                </Container>
            </Toolbar>
        </AppBar>
    )
}