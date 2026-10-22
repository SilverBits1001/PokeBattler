.class public Lcom/pocketbrawl/game/PadBridge;
.super Ljava/lang/Object;
.source "PadBridge.java"

# The built-in controller's state, written by MainActivity from key and
# motion events and read by the page every frame through
# window.AndroidPad.state(): "buttons,lx,ly,rx,ry,lt,rt", where buttons is a
# bit mask in the standard gamepad order (0 A, 1 B, 2 X, 3 Y, 4 LB, 5 RB,
# 6 LT, 7 RT, 8 Select, 9 Start, 10 L3, 11 R3, 12-15 D-pad, 16 Home).

# Buttons held, from key events.
.field public volatile mask:I

# D-pad directions from a hat axis (some pads send the D-pad that way).
.field public volatile hat:I

.field public volatile lx:F
.field public volatile ly:F
.field public volatile rx:F
.field public volatile ry:F
.field public volatile lt:F
.field public volatile rt:F


.method public constructor <init>()V
    .registers 1
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V
    return-void
.end method

.method public state()Ljava/lang/String;
    .registers 5
    .annotation runtime Landroid/webkit/JavascriptInterface;
    .end annotation

    new-instance v0, Ljava/lang/StringBuilder;
    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    iget v1, p0, Lcom/pocketbrawl/game/PadBridge;->mask:I
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->hat:I
    or-int/2addr v1, v2
    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    const/16 v3, 0x2c

    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->lx:F
    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->ly:F
    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->rx:F
    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->ry:F
    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->lt:F
    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    invoke-virtual {v0, v3}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;
    iget v2, p0, Lcom/pocketbrawl/game/PadBridge;->rt:F
    invoke-virtual {v0, v2}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;
    move-result-object v0
    return-object v0
.end method
