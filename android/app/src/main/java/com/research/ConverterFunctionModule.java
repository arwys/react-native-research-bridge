package com.research;


import android.util.Log;
import android.widget.Toast;
import androidx.annotation.NonNull;

import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ConverterFunctionModule extends ReactContextBaseJavaModule {
    Python py = Python.getInstance();


    String TAG =  "Converter";
    ConverterFunctionModule  (ReactApplicationContext context){
        super(context);
    }
    @NonNull
    @Override

    public String getName() {
        return "ConverterFunctionModule";
    }
    @ReactMethod
    public void returnValue (){
        Log.d(TAG, "returnValue: hello from Java");
    }
    @ReactMethod
    public void returnFromNative(String params, String params2, Promise promise) {
        PyObject pyobj = py.getModule("script");
        PyObject obj = pyobj.callAttr("main", "12", "14");
        String st = obj.toString();
        Log.d(TAG, "returnFromNative: "+params+ params2);
         Toast.makeText(getReactApplicationContext(),"returnFromNative: "+params+ params2,Toast.LENGTH_SHORT).show();

        try {

            promise.resolve(st);
        } catch(Exception e) {
            promise.reject("Create Event Error", e);
        }
    }



    @ReactMethod
    public void createFunction(String name, String location) {

        Toast.makeText(getReactApplicationContext(),"Test Invoke Native "+name  +'\t'+location,Toast.LENGTH_SHORT).show();
    }

}




