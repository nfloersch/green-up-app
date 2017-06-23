package com.greenupvermont;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.List;
import java.util.Arrays;
// Required package
import io.invertase.firebase.RNFirebasePackage; // <-- Add this line
// Optional packages - add as appropriate
import io.invertase.firebase.admob.RNFirebaseAdMobPackage; //Firebase AdMob
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.crash.RNFirebaseCrashPackage; // Firebase Crash Reporting
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Messaging
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
import com.facebook.react.shell.MainReactPackage;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }


    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return null;
    }


    // @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RNFirebasePackage(),  // <-- Add this line
                // Add these packages as appropriate
                new RNFirebaseAdMobPackage(),
                new RNFirebaseAnalyticsPackage(),
                new RNFirebaseAuthPackage(),
                new RNFirebaseRemoteConfigPackage(),
                new RNFirebaseCrashPackage(),
                new RNFirebaseDatabasePackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebasePerformancePackage(),
                new RNFirebaseStoragePackage()
        );
    }

}
