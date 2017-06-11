//Javascript
//channel endpoint https://api.twitch.tv/kraken/channels/
//stream endpoint https://api.twitch.tv/kraken/streams/
var nickname = "streamerhouse";

function CheckOnlineStatus()
{
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/"+nickname,
        dataType: 'json',
        headers: {
            'Client-ID': "7buzh4k369ta1n0se34wbn8aj2b7jr"
        }
    }).done(function (channel) {
        console.log(channel);
        if (channel["stream"] === null)
        {
            alert(nickname+" is not online");
        } else {
            alert(nickname+" is online!");
        }
    }).fail(function (data) {
        console.log("Error",data);
    });
}

CheckOnlineStatus();