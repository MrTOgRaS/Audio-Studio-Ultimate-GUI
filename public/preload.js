const { contextBridge, ipcRenderer, webUtils } = require("electron");

// Drag-drop: preload context'te doğrudan webUtils ile path yakala
// contextBridge File objesini serialize edince native path kayboluyor
// Bu yüzden drop event'ini capture phase'de yakalayıp path'i saklıyoruz
let _dropPaths = [];
window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("drop", (e) => {
    const files = e.dataTransfer && e.dataTransfer.files;
    if (files && files.length > 0) {
      _dropPaths = [];
      for (let i = 0; i < files.length; i++) {
        try { const p = webUtils.getPathForFile(files[i]); if (p) _dropPaths.push(p); } catch(err) {}
      }
    }
  }, true);
  // Electron: dosya sürüklenince navigasyonu engelle
  document.addEventListener("dragover", (e) => e.preventDefault(), true);
});

contextBridge.exposeInMainWorld("electronAPI", {
  getDropPaths:()=>{const p=[..._dropPaths];_dropPaths=[];return p},
  getPathForFile:(file)=>{try{return webUtils.getPathForFile(file)}catch(e){return ""}},
  getSettings:()=>ipcRenderer.invoke("get-settings"),
  saveSettings:t=>ipcRenderer.invoke("save-settings",t),
  resolveTool:k=>ipcRenderer.invoke("resolve-tool",k),
  resolveAllTools:()=>ipcRenderer.invoke("resolve-all-tools"),
  selectFile:o=>ipcRenderer.invoke("select-file",o||{}),
  selectMediaFile:()=>ipcRenderer.invoke("select-media-file"),
  selectMultipleFiles:()=>ipcRenderer.invoke("select-multiple-files"),
  selectFolder:()=>ipcRenderer.invoke("select-folder"),
  runCommand:(c,d,id)=>ipcRenderer.invoke("run-command",c,d,id),
  runCommandStream:(c,d,id)=>ipcRenderer.invoke("run-command-stream",c,d,id),
  runCommandConsole:(c,d)=>ipcRenderer.invoke("run-command-console",c,d),
  cancelProcess:(id)=>ipcRenderer.invoke("cancel-process",id),
  onStreamData:(id,cb)=>{const handler=(e,msg)=>{if(!id||msg.id===id)cb(msg.data)};ipcRenderer.on("stream-data",handler);return()=>ipcRenderer.removeListener("stream-data",handler)},
  scanTracksMkvmerge:f=>ipcRenderer.invoke("scan-tracks-mkvmerge",f),
  scanTracksEac3to:f=>ipcRenderer.invoke("scan-tracks-eac3to",f),
  scanTracksDgdemux:f=>ipcRenderer.invoke("scan-tracks-dgdemux",f),
  demuxMkvextract:(f,t,o,c)=>ipcRenderer.invoke("demux-mkvextract",f,t,o,c),
  runFfprobe:f=>ipcRenderer.invoke("run-ffprobe",f),
  runMediainfo:f=>ipcRenderer.invoke("run-mediainfo",f),
  getDialnorm:f=>ipcRenderer.invoke("get-dialnorm",f),
  writeFile:(p,c)=>ipcRenderer.invoke("write-file",p,c),
  openFolder:d=>ipcRenderer.invoke("open-folder",d),
  mkdir:d=>ipcRenderer.invoke("mkdir",d),
  openTerminal:d=>ipcRenderer.invoke("open-terminal",d),
  checkUpdate:u=>ipcRenderer.invoke("check-update",u),
  checkAutoUpdate:()=>ipcRenderer.invoke("auto-update-check"),
  downloadUpdate:()=>ipcRenderer.invoke("auto-update-download"),
  installUpdate:()=>ipcRenderer.invoke("auto-update-install"),
  onUpdateStatus:(cb)=>{const h=(e,d)=>cb(d);ipcRenderer.on("auto-update-status",h);return()=>ipcRenderer.removeListener("auto-update-status",h)},
});
