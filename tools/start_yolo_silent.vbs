' ReJivan — Start YOLO Sentinel silently in the background (No terminal window)
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "python tools\yolo_edge_sentinel.py", 0, False
