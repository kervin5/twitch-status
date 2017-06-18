//Javascript
//channel endpoint https://api.twitch.tv/kraken/channels/
//stream endpoint https://api.twitch.tv/kraken/streams/
var channels = ["streamerhouse","riotgames","summit1g","esltv_cs","nightblue3","imaqtpie", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

function displayChannel(channelRes,channelName) {
    var channelInfo = "<div class='status-icon'>%status%</div><div class='channel-info'><h3>%name%</h3><div class='status-detail'><p>%detail%</p></div></div>";
    var channelRow = " <div class='col-xs-6 col-sm-4 col-md-3 '> <div class='channel-container' id='%id%'><img src='%img%' alt='logo' class='img-responsive'/></div> </div>";

    channelRow = channelRow.replace("%img%",channelRes.logo);
    channelRow = channelRow.replace("%id%",channelName);

    channelInfo = channelInfo.replace("%name%",channelName);
    channelInfo = channelInfo.replace("%detail%",channelRes.status);

    $("#channels").append(channelRow);
    $("#"+ channelName).prepend(channelInfo);
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