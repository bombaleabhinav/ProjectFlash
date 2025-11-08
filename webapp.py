import webview

webview.create_window(
    "My App",
    "http://localhost:3000",
    width=1280,
    height=720,
    resizable=True,
    frameless=False,   # Set to True for no window borders
    fullscreen=False
)
webview.start()
