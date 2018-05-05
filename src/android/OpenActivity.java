package cordova.plugin.image.recognition;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.os.Bundle;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class OpenActivity extends CordovaPlugin {

    CallbackContext _callbackContext;
    String key;
    String imagesList;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context = cordova.getActivity().getApplicationContext();
        if (action.equals("startDetect")) {
            _callbackContext = callbackContext; 
            key = args.getString(0);
            imagesList = args.getString(1);
            try{
                PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
                r.setKeepCallback(true);
                _callbackContext.sendPluginResult(r);

                this.openNewActivity(context);
                return true;
            }catch(Exception e){
                _callbackContext.error(e.getMessage());
            }
        }
        return false;
    }

    private void openNewActivity(Context context) {
        Intent intent = new Intent(context, cordova.plugin.image.recognition.ArActivity.class);
        intent.putExtra("key", key);
        intent.putExtra("imagesList", imagesList);
        this.cordova.startActivityForResult((CordovaPlugin) this, intent, 90);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if(requestCode == 90) {
            if (resultCode == this.cordova.getActivity().RESULT_OK) {
                Bundle res = intent.getExtras();
                String result = res.getString("results");
                _callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, result.toString()));
            } else {
                _callbackContext.error("Error: No result");
            }
        }
    }
}
