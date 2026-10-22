.class public Lcom/pocketbrawl/game/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

# Pocket Brawl for Android: one full-screen WebView running the game from
# the APK's assets (file:///android_asset/index.html), offline. The built-in
# controller is read here, from key and motion events, and handed to the
# page through PadBridge ("AndroidPad"); the page's shim turns that into a
# standard gamepad for the game's own controller support. Back pauses.

.field private web:Landroid/webkit/WebView;
.field private pad:Lcom/pocketbrawl/game/PadBridge;


.method public constructor <init>()V
    .registers 1
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V
    return-void
.end method


.method protected onCreate(Landroid/os/Bundle;)V
    .registers 6

    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    # Keep the screen on; full screen.
    invoke-virtual {p0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;
    move-result-object v0
    const/16 v1, 0x480
    invoke-virtual {v0, v1}, Landroid/view/Window;->addFlags(I)V

    new-instance v0, Landroid/webkit/WebView;
    invoke-direct {v0, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/pocketbrawl/game/MainActivity;->web:Landroid/webkit/WebView;

    invoke-virtual {v0}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v1
    const/4 v2, 0x1
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setAllowFileAccess(Z)V
    const/4 v3, 0x0
    # Music and sound start without a tap.
    invoke-virtual {v1, v3}, Landroid/webkit/WebSettings;->setMediaPlaybackRequiresUserGesture(Z)V

    new-instance v1, Lcom/pocketbrawl/game/PadBridge;
    invoke-direct {v1}, Lcom/pocketbrawl/game/PadBridge;-><init>()V
    iput-object v1, p0, Lcom/pocketbrawl/game/MainActivity;->pad:Lcom/pocketbrawl/game/PadBridge;
    const-string v2, "AndroidPad"
    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->addJavascriptInterface(Ljava/lang/Object;Ljava/lang/String;)V

    new-instance v1, Landroid/webkit/WebChromeClient;
    invoke-direct {v1}, Landroid/webkit/WebChromeClient;-><init>()V
    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setWebChromeClient(Landroid/webkit/WebChromeClient;)V

    const/high16 v1, -0x1000000
    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setBackgroundColor(I)V

    invoke-virtual {p0, v0}, Landroid/app/Activity;->setContentView(Landroid/view/View;)V
    invoke-direct {p0}, Lcom/pocketbrawl/game/MainActivity;->hideBars()V

    invoke-virtual {v0}, Landroid/webkit/WebView;->requestFocus()Z

    const-string v1, "file:///android_asset/index.html"
    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V
    return-void
.end method


# Immersive: hide the status and navigation bars (they come back on a swipe).
.method private hideBars()V
    .registers 3
    invoke-virtual {p0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;
    move-result-object v0
    invoke-virtual {v0}, Landroid/view/Window;->getDecorView()Landroid/view/View;
    move-result-object v0
    const/16 v1, 0x1706
    invoke-virtual {v0, v1}, Landroid/view/View;->setSystemUiVisibility(I)V
    return-void
.end method


.method public onWindowFocusChanged(Z)V
    .registers 2
    invoke-super {p0, p1}, Landroid/app/Activity;->onWindowFocusChanged(Z)V
    if-eqz p1, :done
    invoke-direct {p0}, Lcom/pocketbrawl/game/MainActivity;->hideBars()V
    :done
    return-void
.end method


# Paused in the background: no music or game ticking while away.
.method protected onPause()V
    .registers 2
    invoke-super {p0}, Landroid/app/Activity;->onPause()V
    iget-object v0, p0, Lcom/pocketbrawl/game/MainActivity;->web:Landroid/webkit/WebView;
    if-eqz v0, :done
    invoke-virtual {v0}, Landroid/webkit/WebView;->onPause()V
    invoke-virtual {v0}, Landroid/webkit/WebView;->pauseTimers()V
    :done
    return-void
.end method

.method protected onResume()V
    .registers 2
    invoke-super {p0}, Landroid/app/Activity;->onResume()V
    iget-object v0, p0, Lcom/pocketbrawl/game/MainActivity;->web:Landroid/webkit/WebView;
    if-eqz v0, :done
    invoke-virtual {v0}, Landroid/webkit/WebView;->onResume()V
    invoke-virtual {v0}, Landroid/webkit/WebView;->resumeTimers()V
    invoke-direct {p0}, Lcom/pocketbrawl/game/MainActivity;->hideBars()V
    :done
    return-void
.end method

.method protected onDestroy()V
    .registers 2
    iget-object v0, p0, Lcom/pocketbrawl/game/MainActivity;->web:Landroid/webkit/WebView;
    if-eqz v0, :done
    invoke-virtual {v0}, Landroid/webkit/WebView;->destroy()V
    :done
    invoke-super {p0}, Landroid/app/Activity;->onDestroy()V
    return-void
.end method


# Android key code -> standard gamepad button index, or -1.
.method private static bitFor(I)I
    .registers 2

    sparse-switch p0, :keys

    const/4 v0, -0x1
    return v0

    :b0
    const/4 v0, 0x0
    return v0
    :b1
    const/4 v0, 0x1
    return v0
    :b2
    const/4 v0, 0x2
    return v0
    :b3
    const/4 v0, 0x3
    return v0
    :b4
    const/4 v0, 0x4
    return v0
    :b5
    const/4 v0, 0x5
    return v0
    :b6
    const/4 v0, 0x6
    return v0
    :b7
    const/4 v0, 0x7
    return v0
    :b8
    const/16 v0, 0x8
    return v0
    :b9
    const/16 v0, 0x9
    return v0
    :b10
    const/16 v0, 0xa
    return v0
    :b11
    const/16 v0, 0xb
    return v0
    :b12
    const/16 v0, 0xc
    return v0
    :b13
    const/16 v0, 0xd
    return v0
    :b14
    const/16 v0, 0xe
    return v0
    :b15
    const/16 v0, 0xf
    return v0
    :b16
    const/16 v0, 0x10
    return v0

    :keys
    .sparse-switch
        0x13 -> :b12
        0x14 -> :b13
        0x15 -> :b14
        0x16 -> :b15
        0x17 -> :b0
        0x60 -> :b0
        0x61 -> :b1
        0x63 -> :b2
        0x64 -> :b3
        0x66 -> :b4
        0x67 -> :b5
        0x68 -> :b6
        0x69 -> :b7
        0x6a -> :b10
        0x6b -> :b11
        0x6c -> :b9
        0x6d -> :b8
        0x6e -> :b16
    .end sparse-switch
.end method


# Controller buttons go to PadBridge (not to the page as keys); Back is
# Escape (pause/back in the game). Everything else, a keyboard included,
# reaches the page as usual.
.method public dispatchKeyEvent(Landroid/view/KeyEvent;)Z
    .registers 8

    invoke-virtual {p1}, Landroid/view/KeyEvent;->getKeyCode()I
    move-result v0

    const/4 v1, 0x4
    if-ne v0, v1, :notBack
    invoke-virtual {p1}, Landroid/view/KeyEvent;->getAction()I
    move-result v1
    if-nez v1, :backDone
    invoke-virtual {p1}, Landroid/view/KeyEvent;->getRepeatCount()I
    move-result v1
    if-nez v1, :backDone
    iget-object v1, p0, Lcom/pocketbrawl/game/MainActivity;->web:Landroid/webkit/WebView;
    const-string v2, "(function(){var o={code:\'Escape\',key:\'Escape\',bubbles:true};window.dispatchEvent(new KeyboardEvent(\'keydown\',o));setTimeout(function(){window.dispatchEvent(new KeyboardEvent(\'keyup\',o))},80)})()"
    const/4 v3, 0x0
    invoke-virtual {v1, v2, v3}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V
    :backDone
    const/4 v0, 0x1
    return v0

    :notBack
    invoke-static {v0}, Lcom/pocketbrawl/game/MainActivity;->bitFor(I)I
    move-result v1
    if-ltz v1, :pass

    const/4 v2, 0x1
    shl-int v2, v2, v1
    iget-object v3, p0, Lcom/pocketbrawl/game/MainActivity;->pad:Lcom/pocketbrawl/game/PadBridge;
    iget v4, v3, Lcom/pocketbrawl/game/PadBridge;->mask:I
    invoke-virtual {p1}, Landroid/view/KeyEvent;->getAction()I
    move-result v5
    if-nez v5, :release
    or-int/2addr v4, v2
    goto :store
    :release
    not-int v2, v2
    and-int/2addr v4, v2
    :store
    iput v4, v3, Lcom/pocketbrawl/game/PadBridge;->mask:I
    const/4 v0, 0x1
    return v0

    :pass
    invoke-super {p0, p1}, Landroid/app/Activity;->dispatchKeyEvent(Landroid/view/KeyEvent;)Z
    move-result v0
    return v0
.end method


# Sticks, analog triggers and a hat D-pad.
.method public dispatchGenericMotionEvent(Landroid/view/MotionEvent;)Z
    .registers 10

    invoke-virtual {p1}, Landroid/view/MotionEvent;->getSource()I
    move-result v0
    const v1, 0x1000010
    and-int v2, v0, v1
    if-ne v2, v1, :pass
    invoke-virtual {p1}, Landroid/view/MotionEvent;->getAction()I
    move-result v0
    const/4 v1, 0x2
    if-ne v0, v1, :pass

    iget-object v7, p0, Lcom/pocketbrawl/game/MainActivity;->pad:Lcom/pocketbrawl/game/PadBridge;

    # Left stick: X, Y.
    const/4 v0, 0x0
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    iput v1, v7, Lcom/pocketbrawl/game/PadBridge;->lx:F
    const/4 v0, 0x1
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    iput v1, v7, Lcom/pocketbrawl/game/PadBridge;->ly:F

    # Right stick: Z / RZ on most pads, RX / RY on some; take whichever moved.
    const/16 v0, 0xb
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    const/16 v0, 0xc
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v2
    invoke-static {v1}, Ljava/lang/Math;->abs(F)F
    move-result v3
    invoke-static {v2}, Ljava/lang/Math;->abs(F)F
    move-result v4
    cmpl-float v5, v3, v4
    if-gez v5, :keepZ
    move v1, v2
    :keepZ
    iput v1, v7, Lcom/pocketbrawl/game/PadBridge;->rx:F

    const/16 v0, 0xe
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    const/16 v0, 0xd
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v2
    invoke-static {v1}, Ljava/lang/Math;->abs(F)F
    move-result v3
    invoke-static {v2}, Ljava/lang/Math;->abs(F)F
    move-result v4
    cmpl-float v5, v3, v4
    if-gez v5, :keepRZ
    move v1, v2
    :keepRZ
    iput v1, v7, Lcom/pocketbrawl/game/PadBridge;->ry:F

    # Triggers: LTRIGGER / BRAKE and RTRIGGER / GAS.
    const/16 v0, 0x11
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    const/16 v0, 0x17
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v2
    invoke-static {v1, v2}, Ljava/lang/Math;->max(FF)F
    move-result v1
    iput v1, v7, Lcom/pocketbrawl/game/PadBridge;->lt:F

    const/16 v0, 0x12
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    const/16 v0, 0x16
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v2
    invoke-static {v1, v2}, Ljava/lang/Math;->max(FF)F
    move-result v1
    iput v1, v7, Lcom/pocketbrawl/game/PadBridge;->rt:F

    # Hat D-pad: HAT_X, HAT_Y -> bits 14/15 (left/right), 12/13 (up/down).
    const/4 v6, 0x0
    const/16 v0, 0xf
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    const/high16 v2, -0x41000000
    cmpg-float v3, v1, v2
    if-gez v3, :notLeft
    or-int/lit16 v6, v6, 0x4000
    :notLeft
    const/high16 v2, 0x3f000000
    cmpl-float v3, v1, v2
    if-lez v3, :hatY
    const v4, 0x8000
    or-int/2addr v6, v4
    :hatY
    const/16 v0, 0x10
    invoke-virtual {p1, v0}, Landroid/view/MotionEvent;->getAxisValue(I)F
    move-result v1
    const/high16 v2, -0x41000000
    cmpg-float v3, v1, v2
    if-gez v3, :notUp
    or-int/lit16 v6, v6, 0x1000
    :notUp
    const/high16 v2, 0x3f000000
    cmpl-float v3, v1, v2
    if-lez v3, :hatDone
    or-int/lit16 v6, v6, 0x2000
    :hatDone
    iput v6, v7, Lcom/pocketbrawl/game/PadBridge;->hat:I

    const/4 v0, 0x1
    return v0

    :pass
    invoke-super {p0, p1}, Landroid/app/Activity;->dispatchGenericMotionEvent(Landroid/view/MotionEvent;)Z
    move-result v0
    return v0
.end method
