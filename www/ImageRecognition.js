var ImageRecognition = function() {
};

ImageRecognition.prototype.start = function(successCallback, failureCallback) {
    if(ImageRecognition._EasyArKey && ImageRecognition._imagesList){
        cordova.exec(successCallback,failureCallback, "OpenActivity", "startDetect", [ImageRecognition._EasyArKey, getList(ImageRecognition._imagesList)]);
    }else{
        if(!ImageRecognition._EasyArKey)
            alert("EasyAr Key not set");
        else
            alert("No image to recognise");
    }
};

ImageRecognition.prototype.search = function(imagesList, successCallback, failureCallback) {
    if(ImageRecognition._EasyArKey && imagesList){
        cordova.exec(successCallback,failureCallback, "OpenActivity", "startDetect", [ImageRecognition._EasyArKey, getList(imagesList)]);
    }else{
        if(!ImageRecognition._EasyArKey)
            alert("EasyAr Key not set");
        else
            alert("No image to recognise");
    }
};

ImageRecognition.prototype.init = function(appId,imagesList) {
    ImageRecognition._EasyArKey = appId;
    if(!imagesList){
        ImageRecognition._imagesList={"images" :[]};
    }else{
        ImageRecognition._imagesList=imagesList;
    }
};

ImageRecognition.prototype.addImage = function(img,tag) {
    if(!ImageRecognition._imagesList){
        ImageRecognition._imagesList={"images" :[]};
    }
    console.log(ImageRecognition._imagesList);
    ImageRecognition._imagesList.images.push({
        "image":img,
        "name":tag
    });
};

ImageRecognition.prototype.removeImageByName = function(name) {
    if(!ImageRecognition._imagesList){
        ImageRecognition._imagesList={"images" :[]};
    }else{
        var new_list = {"images" :[]};
        for(var i=0;i<ImageRecognition._imagesList.images.length;i++)
        {
            image = ImageRecognition._imagesList.images[i];
            if(image.name != name)
                new_list.images.push(image);
        }    
        ImageRecognition._imagesList.images = new_list;
    }
};

function getList(imagesList)
{
    var _data = {"images" :[]};
    for(var i=0;i<ImageRecognition._imagesList.images.length;i++)
    {
        image = ImageRecognition._imagesList.images[i];
        image.image = "www/"+image.image
        _data.images.push(image);
    }
    return JSON.stringify(_data);
}

module.exports = new ImageRecognition();