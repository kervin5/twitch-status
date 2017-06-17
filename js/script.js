//Javascript
//channel endpoint https://api.twitch.tv/kraken/channels/
//stream endpoint https://api.twitch.tv/kraken/streams/
var channels = ["streamerhouse,syndicate"];

function displayChannel(channel) {

}

function checkOnlineStatus(channel)
{
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/"+channel,
        dataType: 'json',
        headers: {
            'Client-ID': "7buzh4k369ta1n0se34wbn8aj2b7jr"
        }
    }).done(function (channel) {
        console.log(channel);
        if (channel["stream"] === null)
        {
            alert(channel+" is not online");
            $("#channels");
        } else {
            //alert(nickname+" is online!");
        }
    }).fail(function (data) {
        console.log("Error",data);
    });
}


function getChannels(channels) {
    for(var i = 0; i < channels.length; i++){
        checkOnlineStatus(channels[i]);
    }
}