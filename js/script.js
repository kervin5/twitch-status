//Javascript
//channel endpoint https://api.twitch.tv/kraken/channels/
//stream endpoint https://api.twitch.tv/kraken/streams/
var channels = ["streamerhouse","riotgames","summit1g","esltv_cs","nightblue3","imaqtpie", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

function displayChannel(channelRes,channelName) {
    var channelInfo = "<div></div>";
    var channelRow = " <div class='col-xs-6 col-sm-3 col-md-2'> <div class='channel-container' id='%id%'><img src='%img%' alt='logo' class='img-responsive'/></div> </div>";
    channelRow = channelRow.replace("%img%",channelRes.logo);
    channelRow = channelRow.replace("%id%",channelName);
    $("#channels").append(channelRow);
}

function checkOnlineStatus(channelName)
{
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/"+channelName,
        dataType: 'json',
        headers: {
            'Client-ID': "7buzh4k369ta1n0se34wbn8aj2b7jr"
        }
    }).done(function (channel) {
        console.log(channel);
        if (channel["stream"] === null)
        {
            alert(channel+" is not online");
        } else {
            //alert(channel+" is online!");
            displayChannel(channel,channelName);
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

getChannels(channels);