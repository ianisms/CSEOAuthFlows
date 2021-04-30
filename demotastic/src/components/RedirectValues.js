import './RedirectValues.css'

import { React, useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { TextareaAutosize } from '@material-ui/core';

const RedirectValues = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    let hashParamIndex = window.location.hash?.indexOf('&');

    const idToken =
        window.location.hash?.indexOf('id_token') > -1 ?
            window.location.hash.replace('#id_token=', '').substring(0, hashParamIndex - '#id_token='.length) :
            '';

    const accessToken =
        window.location.hash?.indexOf('access_token') > -1 ?
            window.location.hash.replace('#access_token=', '').substring(0, hashParamIndex - '#access_token='.length) :
            '';

    const authCode =
        window.location.hash?.indexOf('code') > -1 ?
            window.location.hash.replace('#code=', '').substring(0, hashParamIndex - '#code='.length) :
            '';

    useEffect(() => {
        setIsDetailsOpen(idToken || accessToken || authCode ? true : false);
    }, [idToken, accessToken, authCode]);

    return (
        <Box>
            <Modal open={isDetailsOpen}
                className="details-zoom"
                onClose={() => { setIsDetailsOpen(false) }}>
                <Box className="details-zoom-box">
                    <Table>
                        <TableBody>
                            {idToken && (
                                <TableRow>
                                    <TableCell width={130}>
                                        <Typography gutterBottom variant="h5">Identity Token:</Typography>
                                    </TableCell>
                                    <TableCell align="left"><TextareaAutosize rowsMin={20} rowsMax={20} cols={125} value={idToken} /></TableCell>
                                </TableRow>
                            )}
                            {accessToken && (
                                <TableRow>
                                    <TableCell>
                                        <Typography gutterBottom variant="h5">Access Token:</Typography>
                                    </TableCell>
                                    <TableCell align="left"><TextareaAutosize rowsMin={20} rowsMax={20} cols={125}value={accessToken} /></TableCell>
                                </TableRow>
                            )}
                            {authCode && (
                                <TableRow>
                                    <TableCell>
                                        <Typography gutterBottom variant="h5">Auth Code:</Typography>
                                    </TableCell>
                                    <TableCell align="left"><TextareaAutosize rowsMin={20} rowsMax={20} cols={125} value={authCode} /></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </Modal>
        </Box>
    );
}

export default RedirectValues;