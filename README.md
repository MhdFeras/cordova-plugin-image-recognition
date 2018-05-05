#cordova-plugin-image-recognition
A fast, energy efficient, image recognition plugin for Cordova apps, for now it's only available for __Android__.

it used the amazing __EasyAR 2.1.0__ free services to recognise specified images

please read [EasyAR Terms of Use for Free Services](https://www.easyar.com/freeServices.html)

## Get Started

```bash
cordova plugin add cordova-plugin-image-recognition
```

Simply adding this plugin to the Cordova project will make the `window.ImageRecognition` global object available once the `deviceready` event propagates.

### Usage

to use this plugin you have to get EasyAR SDK License Key for each application

#### How to get EasyAR SDK License Key:

- go to https://www.easyar.com/
- __Sign in__ if you already have account or __Sign up__ for new account
- in __SDK Authorization__ section click on __Add SDK License Key__
- chosee type : __EasyAR SDK Basic: Free and no watermark__ , set your __App Name__ and __PackageName (Android)__
- click __Confirm__
- that will generate __SDK License Key__ for your application 

There are two primary steps to integrating `cordova-plugin-image-recognition`.

#### 1. Init

set EasyAR SDK License Key 

```js
window.ImageRecognition.init("EasyAR_SDK_License_Key");
```
or set EasyAR SDK License Key & specify images to recognise

```js
window.ImageRecognition.init("EasyAR_SDK_License_Key",{
    "images":[{
        "image": "test.jpg", //image path in www folder
        "name" : "test" //name that return when this image detected
    },{
        "image": "pages/page1.jpg", //image path in www folder
        "name" : "page1" //name that return when this image detected
    }]
});
```

#### 2. Start 

Later in your application, simply call the __start__ to open camera and start looking for images.

```js
function successCallback (res) { alert(res); }
function failureCallback (err) { alert(err); }
window.ImageRecognition.srart(successCallback, failureCallback);
```

when camera recognise one of the specified images, successCallback will called and it will pass the recognised image name as argument.

## API

### init

```js
window.ImageRecognition.init("EasyAR_SDK_License_Key");
```
or set EasyAR SDK License Key & specify images to recognise

```js
window.ImageRecognition.init("EasyAR_SDK_License_Key",{
    "images":[{
        "image": "test.jpg", //image path in www folder
        "name" : "test" //name that return when this image detected
    },{
        "image": "pages/page1.jpg", //image path in www folder
        "name" : "page1" //name that return when this image detected
    }]
});
```

### start

start looking for the images that specified to be recognised

```js
function successCallback (res) { alert(res); }
function failureCallback (err) { alert(err); }
window.ImageRecognition.srart(successCallback, failureCallback);
```

### addImage

to add any image from your assets "www" folder to the image list that specified to be recognised

```js
var img = "test.jpg"; //image path in www folder
var name = "test" //name that return when this image detected
window.ImageRecognition.addImage(img,name);
```

### removeImageByName

to remove every image have this name from the image list that specified to be recognised

```js
window.ImageRecognition.removeImageByName("test");
```

### search

it's the same as __start__ function but it dosen't use the image list that specified by __init__ add __addImage__ functions, insteade it uses it's own image list that passing by this function 

```js
function successCallback (res) { alert(res); }
function failureCallback (err) { alert(err); }
var imageList = {
  "images" :
  [
    {
      "image" : "pages/page1.jpg",
      "name" : "page1"
    },
    {
      "image" : "pages/page2.jpg",
      "name" : "page2"
    }
  ]
};
window.ImageRecognition.search(imageList,successCallback, failureCallback);
```