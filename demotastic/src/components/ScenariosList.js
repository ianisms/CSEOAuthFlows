import './ScenariosList.css';

import { React, useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from '@material-ui/core';
import { Card, CardActionArea, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Modal, TextareaAutosize } from '@material-ui/core';
import { Launch } from '@material-ui/icons';

import NetFiddleViewer from './NetFiddleViewer'

const ScenariosList = () => {
    const [zoomImages, setZoomImages] = useState({});
    const [fiddles, setFiddles] = useState({});

    const authBaseUri = `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/oauth2/v2.0/`;
    const authZUri = `${authBaseUri}authorize?`
    const tokenUri = `${authBaseUri}token`;
    const deviceCodeUri = `${authBaseUri}devicecode`
    const clientId = `${process.env.REACT_APP_CLIENT_ID}`;
    const clientSecret = `${process.env.REACT_APP_CLIENT_SECRET}`;
    const implicitRedirectUri = encodeURIComponent('http://localhost:3000/?implicit');

    let hashParamIndex = window.location.hash?.indexOf('&');

    const authCode =
        window.location.hash?.indexOf('code') > -1 ?
            window.location.hash.replace('#code=', '').substring(0, hashParamIndex - '#code='.length) :
            '';

    const scenarios = [
        {
            name: 'OIDC',
            image: '/images/oidc.svg',
            authNUri: {
                uri: new URL(`${authZUri}` +
                    `client_id=${clientId}` +
                    '&redirect_uri=https%3A%2F%2Fjwt.ms' +
                    '&scope=openid User.Read' +
                    '&response_type=id_token' +
                    '&response_mode=fragment' +
                    '&state=STATEVAL' +
                    '&nonce=678910' +
                    `&login_hint=${process.env.REACT_APP_LOGIN_HINT}`),
                newTab: true
            }
        },
        {
            name: 'Implicit Flow',
            image: '/images/implicit.svg',
            description: 'Prefer the auth code flow.  With the plans for third party cookies to be removed from browsers, the implicit grant flow is no longer a suitable authentication method. The silent SSO features of the implicit flow do not work without third party cookies, causing applications to break when they attempt to get a new token. We strongly recommend that all new applications use the authorization code flow that now supports single page apps in place of the implicit flow, and that existing single page apps begin migrating to the authorization code flow as well.',
            authNUri: {
                uri: new URL(`${authZUri}` +
                    `client_id=${clientId}` +
                    `&redirect_uri=${implicitRedirectUri}` +
                    `&scope=${encodeURIComponent('openid ' + process.env.REACT_APP_API_ID + '/API.Access')}` +
                    '&response_type=id_token' +
                    '&response_mode=fragment' +
                    '&state=STATEVAL' +
                    '&nonce=678910' +
                    `&login_hint=${process.env.REACT_APP_LOGIN_HINT}`)
            },
            authZUri: {
                uri: new URL(`${authZUri}` +
                    `client_id=${clientId}` +
                    `&redirect_uri=${implicitRedirectUri}` +
                    `&scope=${encodeURIComponent(process.env.REACT_APP_API_ID + '/API.Access')}` +
                    '&response_type=token' +
                    '&response_mode=fragment' +
                    '&state=STATEVAL' +
                    '&nonce=678910' +
                    `&login_hint=${process.env.REACT_APP_LOGIN_HINT}`)
            }
        },
        {
            name: 'Auth Code Flow',
            image: '/images/authcode.svg',
            authNUri: {
                uri: new URL(`${authZUri}` +
                    `client_id=${clientId}` +
                    `&redirect_uri=${implicitRedirectUri}` +
                    `&scope=${encodeURIComponent('openid ' + process.env.REACT_APP_API_ID + '/API.Access')}` +
                    '&response_type=code' +
                    '&response_mode=fragment' +
                    '&state=STATEVAL' +
                    '&nonce=678910' +
                    `&login_hint=${process.env.REACT_APP_LOGIN_HINT}`)
            },
            authZUri: {
                uri: new URL(`${authZUri}` +
                    `client_id=${clientId}` +
                    `&client_secret=${clientSecret}` +
                    `&redirect_uri=${implicitRedirectUri}` +
                    `&scope=${encodeURIComponent(process.env.REACT_APP_API_ID + '/API.Access')}` +
                    '&response_type=token' +
                    '&grant_type=authorization_code' +
                    '&response_mode=fragment' +
                    `&code=${authCode}` +
                    '&state=STATEVAL' +
                    '&nonce=678910' +
                    `&login_hint=${process.env.REACT_APP_LOGIN_HINT}`)
            }
        },
        {
            description: 'Your friendly neighborhood auth library for the Microsoft Identity Platform.',
            image: '/images/msal.svg'
        },
        {
            name: 'Client Credentials Flow',
            image: '/images/clientcreds.svg',
            authZUri: {
                uri: new URL(tokenUri),
                body: {
                    grant_type: 'client_credentials',
                    client_id: clientId,
                    client_secret: clientSecret,
                    scope: `${process.env.REACT_APP_API_ID}/.default`
                },
                noLaunch: true,
                //fiddleSrc: 'https://dotnetfiddle.net/Widget?Languages=CSharp&CSharp_FiddleId=XrBjm2'
            }
        },
        {
            name: 'On-behalf of Flow',
            image: '/images/obo.png',
            authZUri: {
                uri: new URL(tokenUri),
                body: {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    client_id: clientId,
                    client_secret: clientSecret,
                    scope: `offline_access  ${process.env.REACT_APP_API_ID}/.default`,
                    assertion: '<USER IDENTITY TOKEN>'
                },
                noLaunch: true,
                //fiddleSrc: 'https://dotnetfiddle.net/Widget?Languages=CSharp&CSharp_FiddleId=GJZEgu'
            }
        },
        {
            name: 'Device Code Flow',
            image: '/images/devicecode.svg',
            authNUri: {
                uri: new URL(deviceCodeUri),
                body: {
                    client_id: clientId,
                    scope: `${process.env.REACT_APP_API_ID}/.default`
                },
                noLaunch: true
            },
            authZUri: {
                uri: new URL(tokenUri),
                body: {
                    client_id: clientId,
                    device_code: '<DEVICECODE>',
                    grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
                },
                noLaunch: true
            }
        },
        {
            name: 'Resource Owner Password Credentials (ROPC)',
            description: 'Microsoft recommends you do not use the ROPC flow. In most scenarios, more secure alternatives are available and recommended. This flow requires a very high degree of trust in the application, and carries risks which are not present in other flows. You should only use this flow when other more secure flows can\'t be used.',
            image: '/images/ropc.svg',
            authNUri: {
                uri: new URL(tokenUri),
                body: {
                    client_id: clientId,
                    scope: 'user.read openid profile offline_access',
                    grant_type: 'password',
                    username: '<USERNAME>',
                    password: '<PASSWORD>'
                },
                noLaunch: true
            }
        },
    ];

    const getStateValue = () => {
        let state = {
            scrollY: window.scrollY
        };

        return btoa(JSON.stringify(state));
    }

    const getIsImgZoomed = (img) => {
        return zoomImages[img]?.zoom ? true : false;
    };

    const toggleZoomImg = (img) => {
        let newZoomImages = zoomImages;
        if (!newZoomImages[img]) { newZoomImages[img] = { zoom: false } }
        newZoomImages[img].zoom = !newZoomImages[img]?.zoom;
        setZoomImages({ ...newZoomImages });
    };

    const getIsFiddleOpen = (fiddle) => {
        return fiddles[fiddle]?.open ? true : false;
    };

    const toggleViewFiddle = (fiddle) => {
        let newFiddles = fiddles;
        if (!newFiddles[fiddle]) { newFiddles[fiddle] = { open: false } }
        newFiddles[fiddle].open = !newFiddles[fiddle]?.open;
        setFiddles({ ...newFiddles });
    };

    const launchScenarioUriAsync = async (scenarioUri) => {
        if (scenarioUri.fiddleSrc) {
            toggleViewFiddle(scenarioUri.fiddleSrc)
        } else {
            let targetUri = scenarioUri.uri.toString().replace('STATEVAL', getStateValue());
            scenarioUri.newTab ? window.open(targetUri) : window.location.href = targetUri;
        }
    }

    const prettyPrintUri = (uri) => {
        let val = uri + '';
        return decodeURIComponent(val.replaceAll('?', '?\n').replaceAll('&', '\n&'))
    }

    const prettyPrintScenarioBody = (body) => {
        return JSON.stringify(body)?.replaceAll('{', '{\n  ').replaceAll('}', '\n}').replaceAll(',', ',\n  ')
    }

    useEffect(() => {    
        let params = new URLSearchParams(window.location.hash);        
        let stateVal = params?.get('state');
        if(stateVal) {
            stateVal = atob(stateVal);
            let state = JSON.parse(stateVal);
            setTimeout(() => {
                window.scrollTo(0, state.scrollY);
            }, 300);
        }
    }, []);

    return (
        <Container>
            <Grid container spacing={9}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={5}>
                        {scenarios.map((scenario) => (
                            <Grid key={scenario.name} item>
                                <Modal open={getIsImgZoomed(scenario.image)}
                                    className="scenario-modal"
                                    onClose={() => { toggleZoomImg(scenario.image); }}>
                                    <Box className="scenario-modal-box">
                                        <Typography gutterBottom variant="h5" component="h2">{scenario.name}</Typography>
                                        <img src={scenario.image} alt={scenario.name} width={1380} />
                                    </Box>
                                </Modal>
                                {scenario.authZUri?.fiddleSrc && (
                                    <Modal open={getIsFiddleOpen(scenario.authZUri.fiddleSrc)}
                                        className="scenario-modal"
                                        onClose={() => { toggleViewFiddle(scenario.authZUri.fiddleSrc); }}>
                                        <Box className="scenario-modal-box" width={1000}>
                                            <Typography gutterBottom variant="h5">{scenario.name}</Typography>
                                            <NetFiddleViewer title={scenario.name} fiddleSrc={scenario.authZUri?.fiddleSrc} height={800} />
                                        </Box>
                                    </Modal>
                                )}
                                <Card raised className="scenario-card" md={1}>
                                    <CardActionArea onClick={() => { toggleZoomImg(scenario.image); }}>
                                        <CardMedia
                                            component="img"
                                            image={scenario.image}
                                            title={scenario.name}
                                            alt={scenario.name}
                                        />
                                    </CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h4">{scenario.name}</Typography>
                                        <Typography gutterBottom variant="h5">{scenario.description}</Typography>
                                        <Box m={5}>
                                            <Table width={1024}>
                                                <TableBody>
                                                    {scenario.authNUri && !scenario.authNUri.hideUri && (
                                                        <TableRow>
                                                            <TableCell><Typography gutterBottom variant="h6">authNUri:</Typography></TableCell>
                                                            <TableCell>
                                                                <TextareaAutosize rowsMin={3} rowsMax={50} cols={90} value={prettyPrintUri(scenario.authNUri.uri)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                    {scenario.authNUri?.body && (
                                                        <TableRow>
                                                            <TableCell><Typography gutterBottom variant="h6">authN body:</Typography></TableCell>
                                                            <TableCell>
                                                                <TextareaAutosize rowsMin={3} rowsMax={50} cols={90} value={prettyPrintScenarioBody(scenario.authNUri?.body)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                    {scenario.authZUri && !scenario.authZUri.hideUri && (
                                                        <TableRow>
                                                            <TableCell><Typography gutterBottom variant="h6">authZUri:</Typography></TableCell>
                                                            <TableCell>
                                                                <TextareaAutosize rowsMin={3} rowsMax={50} cols={90} value={prettyPrintUri(scenario.authZUri.uri)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                    {scenario.authZUri?.body && (
                                                        <TableRow>
                                                            <TableCell><Typography gutterBottom variant="h6">authZ body:</Typography></TableCell>
                                                            <TableCell>
                                                                <TextareaAutosize rowsMin={3} rowsMax={50} cols={90} value={prettyPrintScenarioBody(scenario.authZUri?.body)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </CardContent>
                                    <CardActions style={{ justifyContent: 'center' }}>
                                        {scenario.authNUri && !scenario.authNUri.noLaunch && (
                                            <Button variant="contained"
                                                color="primary"
                                                startIcon={<Launch />}
                                                size="large"
                                                onClick={() => {
                                                    launchScenarioUriAsync(scenario.authNUri);
                                                }}><Typography variant="h6">AuthN</Typography></Button>
                                        )}
                                        <Box m={2} />
                                        {scenario.authZUri && (!scenario.authZUri.noLaunch || scenario.authZUri.fiddleSrc) && (
                                            <Button variant="contained"
                                                color="primary"
                                                startIcon={<Launch/>}
                                                size="large"
                                                onClick={() => {
                                                    launchScenarioUriAsync(scenario.authZUri);
                                                }}><Typography variant="h6">AuthZ</Typography></Button>
                                        )}
                                    </CardActions>
                                    <Box m={2} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ScenariosList;