import webview

# Create a window showing your local website
webview.create_window(
    title="My Localhost App",
    url="http://localhost:3000",
    width=1200,
    height=800,
    resizable=True
)

# Start the app
webview.start()
