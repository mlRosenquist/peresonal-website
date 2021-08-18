import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        
    },
    appBar: {
        
        height: "50px",
        '& .MuiToolbar-regular': {
            minHeight: "50px"
        }
    },
    homeLink: {
        textTransform: "unset",
        color: "#a5a5a5",
        margin: "0 20px",
        textDecoration: "unset",
        marginRight: theme.spacing(6),
        flexGrow: 1
    },
    link: {
        textTransform: "unset",
        color: "#a5a5a5",
        margin: "0 20px",
        textDecoration: "unset",
    },
}))
interface IHeaderProps {

}

export default function Header(props: IHeaderProps) {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Link className={classes.homeLink} to={"/"} >
                        <Typography variant="body2">
                            Home
                        </Typography>
                    </Link>

                    <Link className={classes.link} to={"/Projects"} >
                        <Typography variant="body2">
                            Projects
                        </Typography>
                    </Link>

                    <Link className={classes.link} to={"/About"} >
                        <Typography variant="body2">
                            About
                        </Typography>
                    </Link>

                    <Link className={classes.link} to={"/Contact"} >
                        <Typography variant="body2">
                            Contact
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}