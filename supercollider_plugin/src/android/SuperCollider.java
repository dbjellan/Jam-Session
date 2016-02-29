package edu.macalester.comp255.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import net.sf.supercollider.android.SCAudio;
import net.sf.supercollider.android.ScService;

public class SuperCollider extends CordovaPlugin {
    public static final String dllDirStr = "libs";
    ScAudio superCollider;

    protected void pluginInitialize() {
        // Where to find the plugin DLLs
        // Starting SuperCollider:
        superCollider = new SCAudio(dllDirStr);
        superCollider.start();
    }

    public boolean execute(String action, JSONArray args, CallbackConext callbackConext) {
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
    }
}
