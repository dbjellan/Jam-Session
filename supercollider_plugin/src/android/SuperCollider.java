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
import java.io.IOException;
import java.lang.reflect.Method;
import java.lang.reflect.Field;
import android.util.Log;
import android.content.Context;
import android.content.res.AssetManager;

public class SuperCollider extends CordovaPlugin {
    private static final String TAG = "Supercollider-Android-Plugin";
    //TODO: Make this not stupid
    public static final String dllDirStr = "/data/data/com.ionicframework.musicapp452134/lib";
    static final String dataDir = "/sdcard/supercollider/synthdefs";
    SCAudio superCollider;
    private int nextNodeId;

    private int getNextNodeID() {
        return nextNodeId++;
    }

    void copySynthDef(String synthFileName) {
        Context context = this.cordova.getActivity().getApplicationContext();
        try {
            InputStream is = context.getAssets().open(synthFileName);
            OutputStream os = new FileOutputStream("/sdcard/supercollider/synthdefs/" + synthFileName);
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

    void copySynthDefs() {
        Context context = this.cordova.getActivity().getApplicationContext();
        final AssetManager assetManager = context.getAssets();
        try {
            final String[] assets = assetManager.list("");
            Log.i(TAG, "copying assests:" + assets.toString());
            for (int i = 0; i < assets.length; i++) {
                if (assets[i].endsWith(".scsyndef")) {
                    Log.i(TAG, "copying synth def: " + assets[i]);
                    copySynthDef(assets[i]);
                }
            }
        } catch (IOException e) {
            Log.i(TAG, "error copying synth def: " + e.toString());
        }
    }

    protected void pluginInitialize() {
        nextNodeId = 999;
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
        if ("createSynth".equals(action)) {
            this.createSynth(args, callbackContext);
            return true;
        } else if("freeSynth".equals(action)) {
            this.freeSynth(args, callbackContext);
            return true;
        } else if("setArgs".equals(action)) {
            this.setArgs(args, callbackContext);
            return true;
        } else if("playNote".equals(action)) {
            this.playNote();
            callbackContext.success();
            return true;
        }
        return false;
    }

    void createSynth(JSONArray args, CallbackContext callbackContext) {
        String synthName;
        JSONObject synthArgs;
        OscMessage setMsg;
        int nodeId = getNextNodeID();
        try {
            synthName = args.getString(0);
            synthArgs = args.getJSONObject(1);
            setMsg = makeSetMessage(nodeId, synthArgs);

        } catch(JSONException e) {
            Log.w(TAG, "json error: " + e.toString());
            callbackContext.error("Invalid arguments");
            return;
        }
        OscMessage createMsg = new OscMessage( new Object[] {"/s_new", synthName, nodeId, 0, 1});
        Log.i(TAG, "send create synth message: " + createMsg);
        superCollider.sendMessage(createMsg);
        Log.i(TAG, "sending set args message:" + setMsg.toString());
        superCollider.sendMessage(setMsg);

        callbackContext.success(nodeId);
    }

    void freeSynth(JSONArray args, CallbackContext callbackContext) {
        int nodeId;
        try {
            nodeId = args.getInt(0);
        } catch(JSONException e) {
            Log.w(TAG, "json error: " + e.toString());
            callbackContext.error("Invalid arguments");
            return;
        }
        Log.i(TAG, "freeing synthdef" + nodeId);
        superCollider.sendMessage(new OscMessage( new Object[] {"/n_free", nodeId}));
        callbackContext.success();
    }

    void setArgs(JSONArray args, CallbackContext callbackContext) {
        int nodeId;
        JSONObject synthArgs;
        OscMessage setMsg;
        try {
            nodeId = args.getInt(0);
            synthArgs = args.getJSONObject(1);
            setMsg = makeSetMessage(nodeId, synthArgs);
        } catch(JSONException e) {
            Log.w(TAG, "json error: " + e.toString());
            callbackContext.error("Invalid arguments");
            return;
        }
        Log.i(TAG, "sending set args message:" + setMsg.toString());
        superCollider.sendMessage(setMsg);
        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, 0));
    }

    OscMessage makeSetMessage(int nodeId, JSONObject synthArgs) throws JSONException {
        JSONArray names = synthArgs.names();
        Object[] args = new Object[2 + names.length()*2];
        args[0] = "/n_set";
        args[1] = nodeId;
        for (int i = 0; i < names.length(); i++ ) {
            String argName = names.getString(i);
            args[2*i+2] = argName;
            args[2 * i + 3] = (float) synthArgs.getDouble(argName);
        }
        return new OscMessage(args);
    }

    void playNote() {
        superCollider.sendMessage(new OscMessage( new Object[] {"/s_new", "pianoKey", 9999, 0, 1}));
        superCollider.sendMessage(new OscMessage( new Object[]{"/n_set", 9999,
                "freq", 440f, "gate", 1f,
                "a", .4f, "d", .9f, "s", .1f, "r", .5f
        }));
        //superCollider.sendMessage(new OscMessage( new Object[] {"/n_set", 999, "amp", 1f}));
    }
}
