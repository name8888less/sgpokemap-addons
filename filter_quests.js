var overlayGrey;

L.GridLayer.OverlayGrey = L.GridLayer.extend({
    createTile: function(e) {
        var i = document.createElement("div");
        return i.style.background = "#000000", i;
    }
});

var isOverlay = !1;
function toggleOverlay() {
    isOverlay ? (overlayGrey && map.removeLayer(overlayGrey), isOverlay = !1, $("#map").removeClass("grey")) : (isOverlay = !0,
        (overlayGrey = new L.GridLayer.OverlayGrey()).setOpacity(.6), map.addLayer(overlayGrey),
        $("#map").addClass("grey"));
}

var isFilterNearby = true;

if (typeof isFirstTime === 'undefined') {
    var isFirstTime = 1;
}
if (isFirstTime) {
    $('#filter_list_top').prepend('<div id="filter_nearby"> <input id="checkbox_nearby" type="checkbox" value="true" checked><label for="checkbox_nearby"><img src="data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTQuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCA0MzM2MykgIC0tPg0KPHN2Zw0KICAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyINCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciDQogICAgeG1sbnM6Y2M9Imh0dHA6Ly93ZWIucmVzb3VyY2Uub3JnL2NjLyINCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayINCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iDQogICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiDQogICAgeG1sbnM6bnMxPSJodHRwOi8vc296aS5iYWllcm91Z2UuZnIiDQogICAgaWQ9IkxheWVyXzEiDQogICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTYuMDY4IDEwMCINCiAgICB4bWw6c3BhY2U9InByZXNlcnZlIg0KICAgIHZpZXdCb3g9IjAgMCA1Ni4wNjggMTAwIg0KICAgIHZlcnNpb249IjEuMCINCiAgICB5PSIwcHgiDQogICAgeD0iMHB4Ig0KICA+DQo8cGF0aA0KICAgICAgZD0ibTI4LjAzNCAwYy0xNS40ODIgMC0yOC4wMzQgMTIuNTUyLTI4LjAzNCAyOC4wMzRzMjguMDM0IDcxLjk2NiAyOC4wMzQgNzEuOTY2IDI4LjAzNC01Ni40ODMgMjguMDM0LTcxLjk2Ni0xMi41NTEtMjguMDM0LTI4LjAzNC0yOC4wMzR6bTAgNDAuNDc3Yy02Ljg3MSAwLTEyLjQ0Mi01LjU3Mi0xMi40NDItMTIuNDQyIDAtNi44NzIgNS41NzEtMTIuNDQyIDEyLjQ0Mi0xMi40NDIgNi44NzIgMCAxMi40NDIgNS41NyAxMi40NDIgMTIuNDQyIDAuMDAxIDYuODctNS41NyAxMi40NDItMTIuNDQyIDEyLjQ0MnoiDQogIC8+DQo8bWV0YWRhdGENCiAgICA+PHJkZjpSREYNCiAgICAgID48Y2M6V29yaw0KICAgICAgICA+PGRjOmZvcm1hdA0KICAgICAgICAgID5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQNCiAgICAgICAgPjxkYzp0eXBlDQogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIg0KICAgICAgICAvPjxjYzpsaWNlbnNlDQogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL3B1YmxpY2RvbWFpbi8iDQogICAgICAgIC8+PGRjOnB1Ymxpc2hlcg0KICAgICAgICAgID48Y2M6QWdlbnQNCiAgICAgICAgICAgICAgcmRmOmFib3V0PSJodHRwOi8vb3BlbmNsaXBhcnQub3JnLyINCiAgICAgICAgICAgID48ZGM6dGl0bGUNCiAgICAgICAgICAgICAgPk9wZW5jbGlwYXJ0PC9kYzp0aXRsZQ0KICAgICAgICAgICAgPjwvY2M6QWdlbnQNCiAgICAgICAgICA+PC9kYzpwdWJsaXNoZXINCiAgICAgICAgPjxkYzp0aXRsZQ0KICAgICAgICAgID5Hb29nbGUgUGxhY2VzPC9kYzp0aXRsZQ0KICAgICAgICA+PGRjOmRhdGUNCiAgICAgICAgICA+MjAxMS0xMi0yN1QxMToyMjo1MzwvZGM6ZGF0ZQ0KICAgICAgICA+PGRjOmRlc2NyaXB0aW9uDQogICAgICAgIC8+PGRjOnNvdXJjZQ0KICAgICAgICAgID5odHRwczovL29wZW5jbGlwYXJ0Lm9yZy9kZXRhaWwvMTY2NjEyL2dvb2dsZS1wbGFjZXMtYnktbXJ0b3NzdW08L2RjOnNvdXJjZQ0KICAgICAgICA+PGRjOmNyZWF0b3INCiAgICAgICAgICA+PGNjOkFnZW50DQogICAgICAgICAgICA+PGRjOnRpdGxlDQogICAgICAgICAgICAgID5NclRvc3N1bTwvZGM6dGl0bGUNCiAgICAgICAgICAgID48L2NjOkFnZW50DQogICAgICAgICAgPjwvZGM6Y3JlYXRvcg0KICAgICAgICA+PGRjOnN1YmplY3QNCiAgICAgICAgICA+PHJkZjpCYWcNCiAgICAgICAgICAgID48cmRmOmxpDQogICAgICAgICAgICAgID5sb2NhdGlvbjwvcmRmOmxpDQogICAgICAgICAgICA+PHJkZjpsaQ0KICAgICAgICAgICAgICA+cGluPC9yZGY6bGkNCiAgICAgICAgICAgID48cmRmOmxpDQogICAgICAgICAgICAgID50YWc8L3JkZjpsaQ0KICAgICAgICAgICAgPjxyZGY6bGkNCiAgICAgICAgICAgICAgPm1hcDwvcmRmOmxpDQogICAgICAgICAgICA+PHJkZjpsaQ0KICAgICAgICAgICAgICA+R1VJPC9yZGY6bGkNCiAgICAgICAgICAgID48cmRmOmxpDQogICAgICAgICAgICAgID5pY29uPC9yZGY6bGkNCiAgICAgICAgICAgID48cmRmOmxpDQogICAgICAgICAgICAgID5ncmFwaGljPC9yZGY6bGkNCiAgICAgICAgICAgID48cmRmOmxpDQogICAgICAgICAgICAgID5pbnRlcmZhY2U8L3JkZjpsaQ0KICAgICAgICAgICAgPjwvcmRmOkJhZw0KICAgICAgICAgID48L2RjOnN1YmplY3QNCiAgICAgICAgPjwvY2M6V29yaw0KICAgICAgPjxjYzpMaWNlbnNlDQogICAgICAgICAgcmRmOmFib3V0PSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9wdWJsaWNkb21haW4vIg0KICAgICAgICA+PGNjOnBlcm1pdHMNCiAgICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjUmVwcm9kdWN0aW9uIg0KICAgICAgICAvPjxjYzpwZXJtaXRzDQogICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rpc3RyaWJ1dGlvbiINCiAgICAgICAgLz48Y2M6cGVybWl0cw0KICAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNEZXJpdmF0aXZlV29ya3MiDQogICAgICAgIC8+PC9jYzpMaWNlbnNlDQogICAgICA+PC9yZGY6UkRGDQogICAgPjwvbWV0YWRhdGENCiAgPjwvc3ZnDQo+DQo=" style="width:20px; height: 20px"> Nearby only</label> </div>');
    $("body").append('<style>#custom_panel{position:absolute;top:80px;left:10px;z-index:800}.custom_i{border-radius:40px;background-color:white;width:40px;height:40px;display:flex;align-items:center;justify-content:center;box-shadow:-1px 1px #999;margin-bottom:10px}#mon_filter{margin-left:10px}.pokemon_icon_img.iv_perfect{-webkit-filter:drop-shadow(3px 3px 3px red);filter:drop-shadow(3px 3px 5px red);transform:scale(1.3,1.3);transform-origin:0 0}.pokemon_icon_img.iv90{-webkit-filter:drop-shadow(3px 3px 3px blue);filter:drop-shadow(3px 3px 3px blue);transform:scale(1.3,1.3);transform-origin:0 0}.pokemon_icon_img.iv80{-webkit-filter:drop-shadow(3px 3px 3px purple);filter:drop-shadow(3px 3px 3px purple)}#map.grey .pokemon_icon_img.iv_perfect{-webkit-filter:drop-shadow(3px 3px 3px #ff1493);filter:drop-shadow(3px 3px 5px #ff1493)}#map.grey .pokemon_icon_img.iv90{-webkit-filter:drop-shadow(3px 3px 3px #00bfff);filter:drop-shadow(3px 3px 3px #00bfff)}#map.grey .pokemon_icon_img.iv80{-webkit-filter:drop-shadow(3px 3px 3px #F4D03F);filter:drop-shadow(3px 3px 3px #F4D03F)}</style> <div id="custom_panel"> <div id="filter_icon" class="custom_i"> <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#999" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg> </div> <div id="darken_icon" class="custom_i"> <svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#999" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" /></svg> </div> </div>');
    $("body").append('<style>#filter_nearby{line-height: 30px;}</style>');
    $("#close_donation_button").click(), $(".toast-close-button").click(), $("#overlay").hide(),
        $("#topbar").hide(), $(".please").hide(), $("#map").css({
        width: "100vw",
        height: "100vh",
        top: 0,
        bottom: 0
    });
    $(window).resize(function() {
        $("#map").css({
            width: "100vw",
            height: "100vh"
        });
    });
    $("#filter_settings").css("top", "10px");
    $("#locate").css("top", "10px");
    $("#filter_icon").on("click", function() {
        $("#filter_link").click();
    });
    $("#darken_icon").on("click", function() {
        toggleOverlay();
    });
    $("strong:contains('Stardust:')").before('<input id="mon_filter" type="text" placeholder="Filter"/><br/><br/>');
    $("#mon_filter").on("keyup", function() {
        var e = $(this).val();
        e.length >= 1 ? ($("#filter_list_top .filter_checkbox").hide(), $("#filter_list_top .filter_checkbox").filter(function(i, o) {
            return $(o).find("label").text().toUpperCase().indexOf(e.toUpperCase()) >= 0;
        }).show()) : e.length >= 0 && $("#filter_list_top .filter_checkbox").show();
    });
    isFirstTime = false;
}

// mrt
$("#checkbox_nearby").on("change", function(){
    isFilterNearby  = $(this).prop("checked") ? true : false;
});

function getDistanceFromLatLonInKm(l, t, a, n) {
    var d = deg2rad(a - l);
    var c = deg2rad(n - t);
    var g =   Math.sin(d/2) * Math.sin(d/2) +
        Math.cos(deg2rad(l)) * Math.cos(deg2rad(a)) *
        Math.sin(c/2) * Math.sin(c/2)
    return 6371 * (2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g)))
}

function deg2rad(l) {
    return l * (Math.PI / 180)
}


function refreshQuests() {
    if (!shouldUpdate) {
      return; //don't update when map is moving
    }
    
    var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;
    
    for (var i = 0; i < quests.length; ++i) {
      var currentQuest = quests[i];
      var marker = markers[i];
      var shouldRemove = false;
      
      if (currentUnixTime > currentQuest.expiration) {
        shouldRemove = true;
      }

      if (isFilterNearby){
        shouldRemove = true;
        if (locationMarker !== null) {
            var latlng = locationMarker.getLatLng();
            var radiusKm = 2;
            var dist = getDistanceFromLatLonInKm(currentQuest.lat, currentQuest.lng, latlng.lat, latlng.lng);
            if (dist < radiusKm) {
                shouldRemove = false;
            } 
    
        }
      }
      if (shouldRemove) {
        removeMarker(marker);
      }
      else {
        addMarker(marker);
      }
    }
  }

