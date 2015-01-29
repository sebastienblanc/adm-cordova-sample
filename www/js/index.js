var container = document.getElementById("container");
var pushNotification;

document.addEventListener("deviceready", handleDeviceReady, true);

function handleDeviceReady(){

    pushNotification = window.plugins.pushNotification;
    pushNotification.register( handleSuccess, handleError, {"ecb":"handleNotification"});

}

function handleNotification(e) {

    log("**** EVENT RECEIVED: " + e.event );

    if(e.event == "registered"){
        if(e.regid.length > 0){
            log("REGISTRATION ID:  <br>" + e.regid);
            log("<a href=\"mailto:?subject=ADM%20Registration%20ID&body=" + encodeURIComponent(e.regid) + "\">Email Registration ID</a>");
             //let's register to UPS


       var client = AeroGear.UnifiedPushClient(
            "3343b745-785d-4141-9cc4-a61e46be4884",
            "7596f3ac-f275-4e94-a595-96e476d21e6f",
            "http://192.168.1.19:8080/ag-push"
        );

        // assemble the metadata for the registration:
        var metadata = {
            deviceToken: e.regid,
            alias: "sebiups"
        };

        var settings = {};

        settings.metadata = metadata;

        // perform the registration against the UnifiedPush server:
        client.registerWithPushServer( settings ).then(function() {
                        log("Registered with UnifiedPush server!");
                    })
                    .then(null, function(error) {
                        log("Error when registering with UnifiedPush server! " + error);
                    });

        }
    } else if(e.event == "message"){
        if ( e.foreground ) {
            log("FOREGROUND NOTIFICATION");
        } else {
            if ( e.coldstart )  {
                log("COLDSTART NOTIFICATION");
            } else {
                log("BACKGROUND NOTIFICATION");
            }
        }
        log("MESSAGE: " + e.payload.alert );
       
    } else if(e.event == "error"){
        log("ERROR: " + e.msg );
    }
}

function handleSuccess(result) {
    log("Plugin Success: " + result );

}

function handleError(error) {
    log("Plugin Error: " + error );
}

function log(msg){
    container.innerHTML += msg + "<br>";
    console.log(msg);
}