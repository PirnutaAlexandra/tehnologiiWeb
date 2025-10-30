const fetch=require ('node-fetch');

function getObjectFromUrl(url){
    return new Promise(resolve => 
        fetch(url)
        .then(response => response.text())
        .then(text => resolve (JSON.parse(text)))
    );
}

function getAirplaneList() {
    return new Promise(resolve =>
        getObjectFromUrl('https://opensky-network.org/api/states/all?lamin=43.5&lomin=20.0&lamax=48.5&lomax=29.7')
            .then(object => resolve(object.states))
    );
}

function main() {
    getAirplaneList()
        .then(planes => {
            console.log(planes);
        });
}

main();