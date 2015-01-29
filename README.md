Cordova ADM Push Sample App
===========================

This is a temporary test client for ADM Push. As soon, the client SDK will be available, the existing Quickstart and Helloworld will be updated and this sample app won't be maintened anymore.

This sample app is a fork from Amazon's Cordova ADM sample app 


# Set up

 There are several steps to set up ADM, in the end, the UPS user guide will contain complete instructions.

For now, let's point to [Amazon's instructions for Cordova](https://developer.amazon.com/public/community/post/Tx17CAREHZUWLH9/Getting-started-with-the-Cordova-Push-Notifications-Plugin-for-Amazon-Fire-OS) that contains all the information needed. 
Please follow each step carefully (Adding the platform, the ADM jar, the api_key.txt file etc ...).

## Additional instructions to integrate with UPS

### Unified Push Server
Create a new ADM variant, you will need the ClientID and the ClientSecret. Both can be retrieved by following the previous instructions.

### Cordova App

In `index.js` , please fill in the UPS url, the variantID and the variant secret. 

## Testing the app

Launch the app and use the UPS console to send a test message, that's all ! 
