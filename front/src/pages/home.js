import { Grid } from '@material-ui/core';
import React, { Component } from 'react'
import SearchBar from '../tracks/searchBar';
import Track from '../tracks/readTrack';
import CreateTrack from '../tracks/createTrack';
import { gql, useQuery } from '@apollo/client';
import { Query } from "react-apollo";
import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';

const Home = ({ classes, props }) => {
    return (
        <div style={{ marginTop: '3rem' }}>
            <SearchBar />
            <Query query={GET_TRACKS_QUERY}>
                {({ data, loading, error }) => {
                    if (loading) return <div>loading...</div>;
                    if (error) return <Error error={error} />;
                    const music = data.music;
                    return <Grid container>
                        {loading && <div> Loading... </div>}
                        {music.map((track) => <Track key={track.id} track={track} />)}
                    </Grid>
                }}
            </Query>
            <CreateTrack />
        </div>
    )
}

export default Home
