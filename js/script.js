//Javascript

var nickname = "noobs2ninjas";

function CheckOnlineStatus()
{
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/"+nickname,
        dataType: 'json',
        headers: {
            'Client-ID': "7buzh4k369ta1n0se34wbn8aj2b7jr"
        },
        success: function(channel)
        {
            if (channel["stream"] === null)
            {
                alert(nickname+" is not online");
            } else {
                alert(nickname+" is online!");
            }
        },error: function (data) {
            console.log(data);
        }
    });
}

CheckOnlineStatus();