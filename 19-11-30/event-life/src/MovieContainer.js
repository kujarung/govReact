import React, {Component, Fragment} from 'react';
import Menu from "./component/Menu";
import MovieMain from "./MovieMain";

class MovieContainer extends Component {

    render() {
        return(
            <Fragment>
                <Menu/>
                <MovieMain/>
            </Fragment>
        )
    }
}

export default MovieContainer