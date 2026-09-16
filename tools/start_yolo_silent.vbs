' ReJivan — Start YOLO Sentinel silently in the background (No terminal window)
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
rootDir = fso.GetParentFolderName(scriptDir)
WshShell.CurrentDirectory = rootDir
WshShell.Run "python tools\yolo_edge_sentinel.py", 0, False
