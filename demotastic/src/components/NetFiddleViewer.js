import './NetFiddleViewer.css'

import PropTypes from 'prop-types';

import { React } from 'react';
import { Box } from '@material-ui/core';

const NetFiddleViewer = (props) => {
    return(
        <Box>
            {props.fiddleSrc && (
                <iframe title={props.title ?? 'fiddle'} width="100%" height={props.height ?? 475} src={props.fiddleSrc} frameBorder={0}></iframe>
            )}
        </Box>
    );
}

NetFiddleViewer.propTypes = {
    title: PropTypes.string,   
    fiddleSrc: PropTypes.string,    
    height: PropTypes.number
};

export default NetFiddleViewer;