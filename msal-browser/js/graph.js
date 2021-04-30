// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/"
};


// Helper function to call MS Graph API endpoint 
// using authorization bearer token scheme
const callMSGraph = (accessToken, callback) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch('https://graph.microsoft.com/v1.0/me/', options)
        .then(response => response.json())
        .then(response => callback(response))
        .catch(error => console.log(error));
};

const seeProfile = async () => {
    const currentAcc = msalapp.getAccountByHomeId(accountId);
    if (currentAcc) {
        const response = await getTokenRedirect(loginRequest, currentAcc).catch(error => {
            console.log(error);
        });
        callMSGraph(response.accessToken, updateUI);
    }
};