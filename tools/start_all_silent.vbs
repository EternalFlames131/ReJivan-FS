' ReJivan - Start YOLO Sentinel and Web Server silently in background (Zero Windows)
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
rootDir = fso.GetParentFolderName(scriptDir)
WshShell.CurrentDirectory = rootDir

pythonExe = "pythonw.exe"
If fso.FileExists("C:\Program Files\Python312\pythonw.exe") Then
    pythonExe = """C:\Program Files\Python312\pythonw.exe"""
ElseIf fso.FileExists("C:\Program Files\Python312\python.exe") Then
    pythonExe = """C:\Program Files\Python312\python.exe"""
End If

nodeExe = "node.exe"
If fso.FileExists("C:\Program Files\nodejs\node.exe") Then
    nodeExe = """C:\Program Files\nodejs\node.exe"""
End If

' 1. Start YOLO Edge Sentinel Daemon (Port 5050)
WshShell.Run pythonExe & " """ & rootDir & "\tools\yolo_edge_sentinel.py""", 0, False

' 2. Wait 1 second then start ReJivan Web Server (Port 8080)
WScript.Sleep 1000
WshShell.Run nodeExe & " """ & rootDir & "\prototype\server.js""", 0, False

