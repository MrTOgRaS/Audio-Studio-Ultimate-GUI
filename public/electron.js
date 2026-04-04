const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { exec, spawn } = require("child_process");

const APP_VERSION = "1.1";
let autoUpdater;try{autoUpdater=require("electron-updater").autoUpdater;autoUpdater.autoDownload=false;autoUpdater.autoInstallOnAppQuit=true}catch(e){autoUpdater=null}
let mainWindow;
const settingsPath = path.join(app.getPath("userData"), "settings.json");
const DEFAULT_TOOLS = {TOOL_PATH:"eac3to.exe",QAAC_PATH:"qaac64.exe",FFMPEG_PATH:"ffmpeg.exe",FFPROBE_PATH:"ffprobe.exe",DEEW_PATH:"deew.exe",DEEZY_PATH:"deezy.exe",DGDEMUX_PATH:"DGDemux.exe",MKVEXTRACT_PATH:"mkvextract.exe",MKVMERGE_PATH:"mkvmerge.exe",Truehdd_PATH:"truehdd.exe",THDMerge_PATH:"thdmerge.exe",Dovi_Tool_PATH:"dovi_tool.exe",MediaInfo_PATH:"MediaInfo.exe",HDR10Plus_PATH:"hdr10plus_tool.exe",AtmosFix_PATH:"eac3_7.1_atmos_fix.exe",Tsmuxer_PATH:"tsmuxer.exe",DEE_PATH:"dee.exe",DTSEncoder_PATH:"DTSEncoder.jar",AudioSuite:"C:\\Audio Tools Suite\\Atmos\\binaries"};

// Icon: works in dev (__dirname/icon.ico) and packaged (resourcesPath/icon.ico)
function getIconPath(){
  const devIcon=path.join(__dirname,"icon.ico");
  if(fs.existsSync(devIcon))return devIcon;
  const resIcon=path.join(process.resourcesPath,"icon.ico");
  if(fs.existsSync(resIcon))return resIcon;
  return devIcon;
}

function readSettings(){try{if(fs.existsSync(settingsPath)){const s=JSON.parse(fs.readFileSync(settingsPath,"utf-8")).tools||{};return{...DEFAULT_TOOLS,...s}};}catch(e){}return{...DEFAULT_TOOLS}}
function writeSettings(tools){try{fs.writeFileSync(settingsPath,JSON.stringify({tools},null,2),"utf-8");return true}catch(e){return false}}
function findExeInDir(dir,exeName){try{if(!fs.existsSync(dir))return null;const entries=fs.readdirSync(dir,{withFileTypes:true});for(const e of entries){const fp=path.join(dir,e.name);if(e.isFile()&&e.name.toLowerCase()===exeName.toLowerCase())return fp}for(const e of entries){const fp=path.join(dir,e.name);if(e.isDirectory()){const f=findExeInDir(fp,exeName);if(f)return f}}}catch(e){}return null}
function resolveToolPath(toolKey){const tools=readSettings();const sp=tools[toolKey];if(sp&&path.isAbsolute(sp)&&fs.existsSync(sp))return sp;const as=tools.AudioSuite;if(as&&fs.existsSync(as)){const bn=path.basename(sp||toolKey.replace("_PATH","")+".exe");const f=findExeInDir(as,bn);if(f)return f}return sp||toolKey}

function createWindow(){
  mainWindow=new BrowserWindow({width:1300,height:850,minWidth:900,minHeight:600,title:`Audio Studio Ultimate GUI v${APP_VERSION}`,backgroundColor:"#0c0e1a",
    icon:getIconPath(),
    webPreferences:{nodeIntegration:false,contextIsolation:true,preload:path.join(__dirname,"preload.js")}});
  mainWindow.loadFile(path.join(__dirname,"..","build","index.html"));
  mainWindow.setMenuBarVisibility(false);
  // FIX#5: React App yerine doğru başlık
  mainWindow.on("page-title-updated",(e)=>{e.preventDefault()});
  mainWindow.setTitle(`Audio Studio Ultimate GUI v${APP_VERSION}`);
}

ipcMain.handle("get-settings",()=>readSettings());
ipcMain.handle("save-settings",(e,t)=>writeSettings(t));
ipcMain.handle("resolve-tool",(e,k)=>resolveToolPath(k));
ipcMain.handle("resolve-all-tools",()=>{const t=readSettings();const r={};for(const k of Object.keys(t)){if(k==="AudioSuite"){r[k]=t[k];continue}r[k]=resolveToolPath(k)}return r});

ipcMain.handle("select-file",async(e,o)=>{const r=await dialog.showOpenDialog(mainWindow,{properties:o.folder?["openDirectory"]:["openFile"],filters:o.folder?[]:[{name:"Executable",extensions:["exe"]},{name:"Tüm",extensions:["*"]}]});return r.canceled?null:r.filePaths[0]});
ipcMain.handle("select-media-file",async()=>{const r=await dialog.showOpenDialog(mainWindow,{properties:["openFile"],filters:[{name:"Ses/Video",extensions:["mkv","mp4","avi","mov","ts","m2ts","mpls","ac3","ec3","eac3","dts","dtshd","thd","truehd","flac","wav","w64","aac","m4a","mp3","mp2","opus","ogg","wma","dat","vob"]},{name:"Tüm",extensions:["*"]}]});return r.canceled?null:r.filePaths[0]});
ipcMain.handle("select-folder",async()=>{const r=await dialog.showOpenDialog(mainWindow,{properties:["openDirectory"]});return r.canceled?null:r.filePaths[0]});
ipcMain.handle("select-multiple-files",async()=>{const r=await dialog.showOpenDialog(mainWindow,{properties:["openFile","multiSelections"],filters:[{name:"Ses/Video",extensions:["mkv","mp4","avi","mov","ts","m2ts","dat","ac3","ec3","dts","thd","flac","wav","mp2","mp3","vob"]},{name:"Tüm",extensions:["*"]}]});return r.canceled?null:r.filePaths});
ipcMain.handle("check-update",async(e,url)=>{try{const https=require("https");return new Promise((resolve)=>{https.get(url,{headers:{"User-Agent":"AudioStudioUltimate"}},res=>{let d="";res.on("data",c=>d+=c);res.on("end",()=>{try{resolve({success:true,data:JSON.parse(d)})}catch(e2){resolve({success:false,error:"parse error"})}})}).on("error",err=>resolve({success:false,error:err.message}))})}catch(e2){return{success:false,error:e2.message}}});

// ═══ AUTO-UPDATE (electron-updater) ═══
ipcMain.handle("auto-update-check",async()=>{if(!autoUpdater)return{error:"not available"};try{const r=await autoUpdater.checkForUpdates();return{success:true,version:r?.updateInfo?.version}}catch(e){return{error:e.message}}});
ipcMain.handle("auto-update-download",async()=>{if(!autoUpdater)return{error:"not available"};try{await autoUpdater.downloadUpdate();return{success:true}}catch(e){return{error:e.message}}});
ipcMain.handle("auto-update-install",()=>{if(autoUpdater)autoUpdater.quitAndInstall(false,true)});

// ═══ PROCESS TRACKING (İPTAL İÇİN) ═══
const activeProcesses = new Map();
function trackProcess(id, proc) { activeProcesses.set(id, proc); proc.on("close", () => activeProcesses.delete(id)); }

const UTF8_ENV={...process.env,PYTHONIOENCODING:"utf-8",PYTHONUTF8:"1",NO_COLOR:"1",TERM:"dumb"};

// KOMUT - ARKAPLANDA
ipcMain.handle("run-command",(e,cmd,cwd,trackId)=>{
  return new Promise(resolve=>{
    const child=exec(cmd,{maxBuffer:50*1024*1024,encoding:"utf-8",shell:true,windowsHide:true,cwd:cwd||undefined,env:UTF8_ENV},(error,stdout,stderr)=>{
      if(trackId)activeProcesses.delete(trackId);
      resolve({success:!error,exitCode:error?error.code:0,stdout:stdout||"",stderr:stderr||"",error:error?error.message:null});
    });
    if(trackId)trackProcess(trackId,child);
  });
});

// KOMUT - STREAMING
ipcMain.handle("run-command-stream",(e,cmd,cwd,trackId)=>{
  return new Promise(resolve=>{
    const child=spawn(cmd,{shell:true,cwd:cwd||undefined,windowsHide:true,env:UTF8_ENV});
    if(trackId)trackProcess(trackId,child);
    let out="";
    child.stdout.on("data",d=>{const s=d.toString();out+=s;mainWindow.webContents.send("stream-data",{id:trackId,data:s})});
    child.stderr.on("data",d=>{const s=d.toString();out+=s;mainWindow.webContents.send("stream-data",{id:trackId,data:s})});
    child.on("close",code=>{if(trackId)activeProcesses.delete(trackId);resolve({success:code===0,exitCode:code,stdout:out,stderr:""})});
    child.on("error",err=>{if(trackId)activeProcesses.delete(trackId);resolve({success:false,error:err.message,stdout:out,stderr:""})});
  });
});

// KOMUT - GERÇEK KONSOL (deew/deezy)
ipcMain.handle("run-command-console",(e,cmd,cwd)=>{
  return new Promise(resolve=>{
    exec(`start /wait cmd /c "cd /d "${cwd||"."}" && ${cmd}"`,{shell:true,windowsHide:false},(error)=>{
      resolve({success:!error,exitCode:error?error.code:0});
    });
  });
});

// İPTAL - Windows'ta taskkill ile ağaç öldürme
ipcMain.handle("cancel-process",(e,trackId)=>{
  if(trackId&&activeProcesses.has(trackId)){
    const p=activeProcesses.get(trackId);
    try{exec(`taskkill /pid ${p.pid} /T /F`,{windowsHide:true})}catch(e){}
    activeProcesses.delete(trackId);
    return true;
  }
  for(const[id,p]of activeProcesses){try{exec(`taskkill /pid ${p.pid} /T /F`,{windowsHide:true})}catch(e){}activeProcesses.delete(id)}
  return true;
});

// TRACK TARAMA
ipcMain.handle("scan-tracks-mkvmerge",async(e,fp)=>{const m=resolveToolPath("MKVMERGE_PATH");return new Promise(resolve=>{exec(`"${m}" -J "${fp}"`,{maxBuffer:10*1024*1024,windowsHide:true},(err,stdout)=>{if(err)return resolve({success:false,error:err.message});try{const d=JSON.parse(stdout);const tracks=(d.tracks||[]).map(t=>({id:t.id,type:t.type,codec:t.codec,language:t.properties?.language||"und",name:t.properties?.track_name||"",channels:t.properties?.audio_channels||null,sampleRate:t.properties?.audio_sampling_frequency||null,default:t.properties?.default_track||false,forced:t.properties?.forced_track||false}));resolve({success:true,tracks,chapters:d.chapters?d.chapters.length>0:false})}catch(e){resolve({success:false,error:e.message})}})})});
ipcMain.handle("scan-tracks-eac3to",async(e,fp)=>{const t=resolveToolPath("TOOL_PATH");return new Promise(resolve=>{exec(`"${t}" "${fp}"`,{maxBuffer:10*1024*1024,windowsHide:true},(err,stdout,stderr)=>{const o=(stdout||"")+(stderr||"");const lines=o.split(/\r?\n/);const tracks=[];for(const l of lines){const m=l.match(/^\s*(\d+):\s*(.+)/);if(m){const id=parseInt(m[1]);const desc=m[2].trim();let type="other";if(/h264|h265|hevc|avc|vc-1|mpeg|video/i.test(desc))type="video";else if(/truehd|dts|ac3|aac|flac|wav|pcm|audio|mp3|opus|atmos|lpcm|mp2/i.test(desc))type="audio";else if(/subtitle|srt|pgs|sup|ass|ssa|vobsub/i.test(desc))type="subtitles";else if(/chapter/i.test(desc))type="chapters";tracks.push({id,type,desc})}}resolve({success:tracks.length>0,tracks,raw:o})})})});
ipcMain.handle("scan-tracks-dgdemux",async(e,fp)=>{const d=resolveToolPath("DGDEMUX_PATH");return new Promise(resolve=>{exec(`"${d}" -i "${fp}" -l`,{maxBuffer:10*1024*1024,windowsHide:true},(err,stdout,stderr)=>{resolve({success:true,raw:(stdout||"")+(stderr||"")})})})});

// DEMUX (chapters düzeltildi)
ipcMain.handle("demux-mkvextract",async(e,fp,trackIds,outDir,chapFmt)=>{
  const m=resolveToolPath("MKVEXTRACT_PATH");
  if(!fs.existsSync(outDir))fs.mkdirSync(outDir,{recursive:true});
  const bn=path.parse(fp).name;
  // Tracks
  const args=trackIds.map(t=>`${t.id}:"${path.join(outDir,`${bn}_track${t.id}.${t.ext}`)}"`).join(" ");
  let cmds=[`"${m}" tracks "${fp}" ${args}`];
  // Chapters (ayrı komut)
  if(chapFmt){
    const chapFile=path.join(outDir,bn+"_chapters."+(chapFmt==="txt"?"txt":"xml"));
    if(chapFmt==="txt"){
      cmds.push(`"${m}" chapters "${fp}" --simple > "${chapFile}"`);
    } else {
      cmds.push(`"${m}" chapters "${fp}" > "${chapFile}"`);
    }
  }
  const cmd=cmds.join(" && ");
  return new Promise(resolve=>{exec(cmd,{maxBuffer:50*1024*1024,windowsHide:true,shell:true},(err,stdout,stderr)=>{resolve({success:!err,stdout:stdout||"",stderr:stderr||"",error:err?err.message:null,outputDir:outDir})})});
});

// INFO
ipcMain.handle("run-ffprobe",async(e,fp)=>{const p=resolveToolPath("FFPROBE_PATH");return new Promise(resolve=>{exec(`"${p}" -v error -show_format -show_streams -of json "${fp}"`,{maxBuffer:10*1024*1024,windowsHide:true},(err,stdout)=>{if(err)return resolve({success:false,error:err.message});try{resolve({success:true,data:JSON.parse(stdout)})}catch(e){resolve({success:false,error:e.message})}})})});
ipcMain.handle("run-mediainfo",async(e,fp)=>{const m=resolveToolPath("MediaInfo_PATH");return new Promise(resolve=>{exec(`"${m}" --Full "${fp}"`,{maxBuffer:10*1024*1024,windowsHide:true},(err,stdout)=>{resolve({success:!err,output:stdout||""})})})});
ipcMain.handle("get-dialnorm",async(e,fp)=>{const t=resolveToolPath("TOOL_PATH");return new Promise(resolve=>{exec(`"${t}" "${fp}" -check`,{maxBuffer:10*1024*1024,windowsHide:true},(e2,s2,sr2)=>{const out=(s2||"")+(sr2||"");const dm=out.match(/dialnorm:\s*(-?\d+)/i);const fps=out.match(/(\d+\.\d+)\s*fps/i);resolve({dialnorm:dm?dm[1]:"Bilinmiyor",fps:fps?fps[1]:null,raw:out})})})});

// UTILS
ipcMain.handle("write-file",(e,fp,content)=>{try{const dir=path.dirname(fp);if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(fp,content,"utf-8");return true}catch(e){return false}});
ipcMain.handle("open-folder",(e,fp)=>{require("electron").shell.openPath(fp)});
ipcMain.handle("mkdir",(e,fp)=>{try{if(!fs.existsSync(fp))fs.mkdirSync(fp,{recursive:true});return true}catch(e){return false}});
ipcMain.handle("open-terminal",(e,cwd)=>{exec(`start cmd /k "cd /d "${cwd}""`,{shell:true})});

// Single instance lock — only one window at a time
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) { app.quit(); } else {
  app.on("second-instance", () => { if (mainWindow) { if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus(); } });
  app.whenReady().then(()=>{createWindow();if(autoUpdater){autoUpdater.on("update-available",info=>{if(mainWindow)mainWindow.webContents.send("auto-update-status",{status:"available",version:info.version})});autoUpdater.on("update-not-available",()=>{if(mainWindow)mainWindow.webContents.send("auto-update-status",{status:"latest"})});autoUpdater.on("download-progress",p=>{if(mainWindow)mainWindow.webContents.send("auto-update-status",{status:"downloading",percent:Math.round(p.percent)})});autoUpdater.on("update-downloaded",()=>{if(mainWindow)mainWindow.webContents.send("auto-update-status",{status:"downloaded"})});autoUpdater.on("error",err=>{if(mainWindow)mainWindow.webContents.send("auto-update-status",{status:"error",error:err.message})})}});
  app.on("window-all-closed",()=>app.quit());
  app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
}
