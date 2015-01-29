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
           

       var client = AeroGear.UnifiedPushClient(
            "<variantID>",
            "<variantSecret>",
            "<UPS url>"
        );

        // assemble the metadata for the registration:
        var metadata = {
            deviceToken: e.regid,
            alias: "sebi"
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