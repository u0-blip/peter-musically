import { AppBar, Button, Grid, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AccountCircleOutlined } from '@material-ui/icons';
import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom'
import Error from './Error';
import Loading from './loading';
import { GET_SELF_QUERY } from '../App';

export class Navbar extends Component {
    render() {
        let userSection;

        userSection = <Query query={GET_SELF_QUERY} fetchPolicy='cache-and-network'>
            {({ error, loading, data }) => {
                if (data) {
                    return <Link to={`/profile/${data.userself.id}`} className={classes.grow} style={{ justifyContent: 'flex-end' }}>
                        <AccountCircleOutlined />
                        <Typography variant='h5' noWrap className={classes.username}>
                            {data.userself.username}
                        </Typography>
                    </Link>
                } else {
                    return <Grid container style={{
                        width: 'auto',
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        flexGrow: 1,
                    }}>
                        <Grid item col>
                            <Link to='/login'>
                                <Button>
                                    Login
                            </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button>
                                    Signup
                            </Button>

                            </Link>
                        </Grid>
                    </Grid>
                }
            }}
        </Query>

        const classes = this.props.classes;
        return (
            <AppBar className={classes.root}>
                <Toolbar>
                    <Link to='/' className={classes.grow}>
                        <Typography variant='h5' color='secondary' noWrap>
                            Peter Muscially
                        </Typography>
                        {userSection}
                    </Link>

                </Toolbar>
            </AppBar>
        )
    }
}

const styles = theme => ({
    root: {
        position: 'static',
        flexGrow: 1,
        margin: 0,
        padding: 0
    },
    grow: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        textDecoration: "none"
    },
    logo: {
        marginRight: theme.spacing(1),
        fontSize: 45
    },
    faceIcon: {
        marginRight: theme.spacing(1),
        fontSize: 30,
        color: "white"
    },
    username: {
        color: "white",
        fontSize: 30
    }
});

export default withStyles(styles)(Navbar)
