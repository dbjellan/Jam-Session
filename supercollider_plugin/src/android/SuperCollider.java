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
import net.sf.supercollider.android.OscMessage;


import java.io.File;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.lang.reflect.Field;
import android.util.Log;
import android.content.Context;

public class SuperCollider extends CordovaPlugin {
    private static final String TAG = "SupercolliderPlugin";
    //TODO: Make this not stupid
    public static final String dllDirStr = "/data/data/com.ionicframework.musicapp452134/lib";
    static final String dataDir = "/sdcard/supercollider/synthdefs";
    SCAudio superCollider;

    void copySynthDefs() {
        Context context = this.cordova.getActivity().getApplicationContext();
        try {
            InputStream is = context.getAssets().open("default.scsyndef");
            OutputStream os = new FileOutputStream("/sdcard/supercollider/synthdefs/default.scsyndef");
            byte[] buf = new byte[1024];
            int bytesRead = 0;
            while (-1 != (bytesRead = is.read(buf))) {
                os.write(buf,0,bytesRead);
            }
            is.close();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void pluginInitialize() {
        try {
            File dir = new File(dataDir);
            if (!dir.exists()) {
                dir.mkdirs();
                copySynthDefs();
            }
        } catch(Exception e) {
            Log.w("creating file error", e.toString());
        }
        superCollider = new SCAudio(dllDirStr);
        superCollider.start();
        superCollider.sendMessage(new OscMessage( new Object[] {"notify", 1}));

    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        if ("playNote".equals(action)) {
            this.playNote(1.0, 2.0);
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
            return true;
        }
        return false;
    }

    void playNote(double freq, double duration) {
        superCollider.sendMessage(new OscMessage( new Object[] {"/s_new", "default", 999, 0, 1}));
        superCollider.sendMessage(new OscMessage( new Object[] {"/n_set", 999, "freq", 440f}));
        superCollider.sendMessage(new OscMessage( new Object[] {"/n_set", 999, "amp", 1f}));
    }

}
