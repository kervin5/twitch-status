function displayChannel(n){var e="<div class='channel-info'><a href='%url%'><h3>%name%</h3></a><div class='status-detail'><p>%detail%</p></div></div>",a=" <div class='col-xs-6 col-sm-4 col-md-3 '> <div class='channel-container' id='%id%'><img src='%img%' alt='logo' class='img-responsive'/></div> </div>";a=n.logo?a.replace("%img%",n.logo):a.replace("%img%",unknownChannel.logo),a=a.replace("%id%",n.display_name),e=e.replace("%name%",n.display_name),e=e.replace("%url%",n.url),e=n.status?e.replace("%detail%",n.status):e.replace("%detail%","This channel doesn't have a description"),$("#channels").append(a),$("#"+n.display_name).prepend(e),n.url||$("#"+n.display_name).find("a").hide()}function displayStatus(n,e){var a=$("#"+e),l=" <i class='fa fa-eye' aria-hidden='true'></i>",s="<i class='fa fa-eye-slash' aria-hidden='true'></i>",t="<div class='status-icon'>%status%</div>";"online"===n?(a.addClass("online-channel"),t=t.replace("%status%",l)):(a.addClass("offline-channel"),t=t.replace("%status%",s)),a.prepend(t)}function checkOnlineStatus(n){$.ajax({url:"https://api.twitch.tv/kraken/streams/"+n,dataType:"json",headers:{"Client-ID":"7buzh4k369ta1n0se34wbn8aj2b7jr"}}).done(function(e){console.log(e),null===e.stream?displayStatus("offline",n):displayStatus("online",n)}).fail(function(n){console.log("Error",n)})}function getChannelInfo(n){$.ajax({url:"https://api.twitch.tv/kraken/channels/"+n,dataType:"json",headers:{"Client-ID":"7buzh4k369ta1n0se34wbn8aj2b7jr"}}).done(function(n){console.log(n),displayChannel(n),checkOnlineStatus(n.display_name)}).fail(function(e){unknownChannel.display_name=n,displayChannel(unknownChannel),checkOnlineStatus(unknownChannel.display_name),console.log("Error",e)})}function getChannels(n){for(var e=0;e<n.length;e++)getChannelInfo(n[e])}var channels=["streamerhouse","Nicaragua505","sodapoppin","summit1g","esltv_cs","nightblue3","imaqtpie","OgamingSC2","cretetion","freecodecamp","habathcx","RobotCaleb","noobs2ninjas","freecoderails"],unknownChannel={logo:"images/404channel.png",display_name:"Unknown",url:"",status:"This channel doesn't exist please try another one"};$("#online-btn").click(function(n){$(".filter").removeClass("active"),$(this).addClass("active"),$(".online-channel").parent().show(),$(".offline-channel").parent().hide()}),$("#offline-btn").click(function(n){$(".filter").removeClass("active"),$(this).addClass("active"),$(".offline-channel").parent().show(),$(".online-channel").parent().hide()}),$("#all-btn").click(function(n){$(".filter").removeClass("active"),$(this).addClass("active"),$(".channel-container").parent().show()}),$("#search-form").submit(function(n){channel=[];var e=$("#srch-term").val();channel.push(e),$("#channels").empty(),$(".search-btn").toggleClass("hidden-btn"),$(".clear-btn").toggleClass("hidden-btn"),getChannels(channel),console.log(e),n.preventDefault()}),$(".clear-btn").click(function(){$("#srch-term").val(""),$("#channels").empty(),$(".search-btn").toggleClass("hidden-btn"),$(".clear-btn").toggleClass("hidden-btn"),getChannels(channels)}),getChannels(channels);