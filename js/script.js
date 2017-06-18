//Javascript
//channel endpoint https://api.twitch.tv/kraken/channels/
//stream endpoint https://api.twitch.tv/kraken/streams/
var channels = ["streamerhouse","tumbalacasasss","sodapoppin","summit1g","esltv_cs","nightblue3","imaqtpie", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

var unknownChannel = {

};

function displayChannel(channelRes) {
    var channelInfo = "<div class='channel-info'><a href='%url%'><h3>%name%</h3></a><div class='status-detail'><p>%detail%</p></div></div>";
    var channelRow = " <div class='col-xs-6 col-sm-4 col-md-3 '> <div class='channel-container' id='%id%'><img src='%img%' alt='logo' class='img-responsive'/></div> </div>";

    channelRow = channelRow.replace("%img%",channelRes.logo);
    channelRow = channelRow.replace("%id%",channelRes.display_name);

    channelInfo = channelInfo.replace("%name%",channelRes.display_name);
    channelInfo = channelInfo.replace("%url%",channelRes.url);
    channelInfo = channelInfo.replace("%detail%",channelRes.status);

    $("#channels").append(channelRow);
    $("#"+ channelRes.display_name).prepend(channelInfo);
}

function displayStatus(channelStatus, channelName) {
    var channel = $("#"+channelName);

    var onlineIcon = " <i class='fa fa-eye' aria-hidden='true'></i>";
    var offlineIcon = "<i class='fa fa-eye-slash' aria-hidden='true'></i>";

    var statusInfo = "<div class='status-icon'>%status%</div>";

    if(channelStatus === "online") {
        channel.addClass("online-channel");
        statusInfo = statusInfo.replace("%status%",onlineIcon);

    } else {
        channel.addClass("offline-channel");
        statusInfo = statusInfo.replace("%status%",offlineIcon);
    }
    channel.prepend(statusInfo);


}

function checkOnlineStatus(channelName)
{
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/"+channelName,
        dataType: 'json',
        headers: {
            'Client-ID': "7buzh4k369ta1n0se34wbn8aj2b7jr"
        }
    }).done(function (channel) {
        console.log(channel);
        if (channel["stream"] === null)
        {
            displayStatus("offline",channelName);
        } else {
           //displayChannel(channel,channelName);
            displayStatus("online",channelName);
        }
    }).fail(function (data) {
        console.log("Error",data);
    });
}

function getChannelInfo(channelName)
{
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/"+channelName,
        dataType: 'json',
        headers: {
            'Client-ID': "7buzh4k369ta1n0se34wbn8aj2b7jr"
        }
    }).done(function (channel) {
        console.log(channel);
        displayChannel(channel);
        checkOnlineStatus(channel.display_name);
    }).fail(function (data) {
        console.log("Error",data);
    });
}

function getChannels(channels) {
    for(var i = 0; i < channels.length; i++){
        getChannelInfo(channels[i]);
    }
}

getChannels(channels);


$("#online-btn").click(function (button) {
    $(".filter").removeClass("active");
    $(this).addClass("active");
    $(".online-channel").parent().show();
    $(".offline-channel").parent().hide();
});

$("#offline-btn").click(function (button) {
    $(".filter").removeClass("active");
    $(this).addClass("active");
    $(".offline-channel").parent().show();
    $(".online-channel").parent().hide();
});

$("#all-btn").click(function (button) {
    $(".filter").removeClass("active");
    $(this).addClass("active");
    $(".channel-container").parent().show();
});