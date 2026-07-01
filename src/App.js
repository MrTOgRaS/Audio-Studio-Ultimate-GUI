import { useState, useCallback, useEffect, useRef } from "react";

/* ═══ APP ICON ═══ */
const APP_ICON=(process.env.PUBLIC_URL||"")+"/icon.png";

/* ═══ TRANSLATIONS ═══ */
const LANG={
en:{
  // Nav
  nav_home:"Home",nav_encode:"Audio Encode",nav_demux:"Audio Demux",nav_fps:"FPS Conversion",nav_other:"Other Options",nav_movie:"Movie Demux",nav_settings:"Settings",nav_about:"About",
  // Common
  default_val:"Default",default_original:"Default (Original)",default_lossless:"Default (Lossless)",
  start:"Start",processing:"Processing...",cancel:"Cancel",reset:"Reset",clear:"Clear",save:"Save",saved:"Saved!",loading:"Loading...",
  drag_text:"Drag file or click",error:"Error",completed:"Completed!",
  process_running:"Processing...",process_done:"Process Complete",process_cancelled:"Process cancelled.",
  process_success:"Process completed successfully!",process_error:"Error: ",waiting:"Waiting...",
  select_all:"All",select_none:"None",
  // Home
  home_subtitle:"Audio Studio Ultimate",home_title:"Professional Audio Processing Tools",
  home_developer:"Developer: MURAT OGRAS",
  home_encode_desc:"Audio conversion",home_demux_desc:"Core audio extraction",home_fps_desc:"Frame rate conversion",
  home_other_desc:"Fix, spectrum, meta",home_movie_desc:"Video/audio/HDR split",home_settings_desc:"Tool paths",
  // Encode
  encode_title:"Audio Encode",encode_sub:"Convert audio formats — codec, bitrate, channel & engine selection",
  encode_input:"Input",encode_output:"Output",encode_format:"Format",encode_bitrate:"Bitrate",encode_channel:"Channel",encode_engine:"Engine",
  encode_start:"Start Encode",encode_auto:"Automatic",
  encode_warn_title:"Warning — Audio Loss",encode_warn_text:"Selected bitrate is lower than original bitrate. Audio quality loss will occur. Do you want to continue?",
  encode_continue:"Continue",encode_dtshd_6ch:"6 Channel (5.1)",encode_dtshd_8ch:"8 Channel (7.1)",
  encode_quality:"Quality",encode_quality_default:"Default",encode_quality_dpl2:"Dolby Pro Logic II",
  encode_mp2mode:"MP2 Mode",encode_mp2_mpeg1:"MPEG-1",encode_mp2_mpeg2:"MPEG-2",
  encode_cl:"Compression Level",encode_cl_default:"Default Compression Level",encode_cl_info_title:"FLAC Compression Levels",
  encode_cl_info:"Level 1: Fastest packaging, lowest CPU usage, largest file size.\n\nLevel 2: Fast processing, file size slightly smaller than level 1.\n\nLevel 3: Speed-priority, reasonable size savings.\n\nLevel 4: Balanced compression, standard processing speed and size.\n\nLevel 5 (Recommended): Golden ratio; the default level where speed and size are most efficient.\n\nLevel 6: High compression, slightly more CPU intensive, reduces size.\n\nLevel 7: Very high compression, longer processing time but smaller file.\n\nLevel 8: Standard limit; slowest but smallest file size (for archivists).\n\nLevel 9: Non-standard high analysis, processing time much longer, size difference minimal.\n\nLevel 10: Extremely CPU intensive deep analysis, millimetric size savings.\n\nLevel 11: Extreme forcing, ultra-slow processing, size difference nearly indistinguishable.\n\nLevel 12: Absolute limit; smallest possible file size achieved in the longest time.\n\nSmall note: Regardless of level, audio quality is 100% identical and lossless. The only thing that changes is how much the computer sweats and how much space the file takes on disk.",
  // Demux
  demux_title:"Audio Demux (Core)",demux_sub:"Core audio extraction and channel splitting",
  demux_truehd:"TrueHD Core",demux_truehd_desc:"TrueHD → AC3 Core",
  demux_dtshd:"DTS-HD MA Core",demux_dtshd_desc:"DTS-HD → DTS Core",
  demux_dtscore:"DTS Core → AC3",demux_dtscore_desc:"DTS → AC3 Core",
  demux_wav:"WAV (Stereo)",demux_wav_desc:"Single WAV file",
  demux_wavs:"WAVS (Channel)",demux_wavs_desc:"Each channel separate WAV",
  demux_mono:"Mono Channel Split",demux_mono_desc:"Mono WAV",
  demux_start:"Start Demux",demux_wavs_ch:"Channel Layout",
  // FPS
  fps_title:"Audio FPS Conversion",fps_sub:"Change audio file FPS values losslessly",
  fps_select:"Select FPS Conversion",fps_format:"Audio Format",fps_bitrate:"Bitrate",fps_convert:"Convert FPS",
  fps_lossless_warn:"lossless: WAV → FPS change → DEE packaging",
  fps_eac3_info:"E-AC3 FPS conversion is done via FFmpeg",
  fps_diff_title:"Different FrameRate Info",fps_diff_btn:"Different FrameRate Info",
  fps_qaac_not_found:"QAAC not found! Set qaac64.exe or qaac.exe path in Settings.",
  fps_step1:"STEP 1",fps_step2:"STEP 2",fps_step3:"STEP 3",fps_step4:"STEP 4",
  fps_wav_fps:"WAV + FPS",fps_channel_split:"Channel splitting",fps_dee:"DEE",
  fps_done_truehd:"TrueHD FPS completed!",fps_done_wav:"WAV FPS completed!",fps_done_dtshd:"DTS-HD FPS completed!",
  fps_done_aac_qaac:"AAC FPS completed! (QAAC)",fps_done_aac_ffmpeg:"AAC FPS completed! (FFmpeg)",
  fps_qaac_fail:"QAAC failed — continuing with FFmpeg AAC...",fps_ffmpeg_aac:"FFmpeg AAC encode",
  fps_step_fail:"Step failed",
  // Other
  other_title:"Other Options",other_sub:"Additional audio processing tools",
  other_volume:"Volume Booster",other_fix:"Fix Audio",other_atmos:"Atmos Fix",other_spectrum:"Spectrum",
  other_info:"Audio Info",other_movieinfo:"Movie Info",other_metadata:"TrueHD Metadata",
  other_vol_title:"Volume Level Booster",other_vol_light:"Light",other_vol_medium:"Medium",other_vol_strong:"Strong",other_vol_default:"Standard 10dB",
  other_fix_title:"Fix Audio",
  other_fix_clean:"Track Not Clean Fix",other_fix_clean_desc:'⚠ "This track is not clean"',
  other_fix_crc:"CRC Mismatch Fix",other_fix_crc_desc:'⚠ "frame CRC mismatch"',
  other_fix_noise:"Clean Noise",other_fix_noise_desc:"Cleans static noise",
  other_fix_reencode:"Re-Encode Audio",other_fix_reencode_desc:"Remux via mkvmerge (.mka)",
  other_fix_btn:"Fix",
  about_github:"GitHub",
  other_atmos_title:"E-AC-3 JOC Atmos 7.1 Fix",
  other_atmos_desc:"Performs channel map (channel mapping) correction in E-AC-3 JOC (Dolby Atmos) 7.1 bitstreams. CRC is rewritten, dialnorm is untouched, no re-encoding. Use only on .eac3 files.",
  other_atmos_chanmap:"Channel Map Fix",other_atmos_chanmap_desc:"Dependent frame chanmap + CRC correction",
  other_atmos_apply:"Apply Fix",
  other_atmos_warn:"This tool is only for E-AC-3 JOC (Atmos) 7.1 bitstreams. Do not use for normal AC-3, standard 5.1 E-AC-3 or different audio types.",
  other_atmos_workflow:"Workflow: Get E-AC-3 JOC / DD+ Atmos output with DME → run through this tool → use the corrected .eac3 file.",
  other_spectrum_btn:"Generate Spectrum",other_info_btn:"Show Audio Info",other_movieinfo_btn:"Show MediaInfo",
  other_meta_output:"Output Folder",other_meta_empty:"Empty=file folder",other_meta_extract:"Extract Metadata",
  meta_info_title:"Presentation Info",meta_p0_name:"Stereo",meta_p0_ch:"2 Channel",meta_p0_desc:"The most basic audio layer. Contains only Front Left and Right channels. Usually a downmix of 5.1.",meta_p1_name:"5.1 Surround",meta_p1_ch:"6 Channel",meta_p1_desc:"For standard 5.1 systems (L, R, C, LFE, Ls, Rs). Encoded as an independent stream.",meta_p2_name:"7.1 Surround",meta_p2_ch:"8 Channel",meta_p2_desc:"Contains rear channels (Lb, Rb) added on top of 5.1. No Atmos data, pure 8-channel audio.",meta_p3_name:"Atmos (JOC)",meta_p3_ch:"14+ Elements",meta_p3_desc:"This is the main event. Contains objects (metadata) layered on top of the 7.1 bed. When decoded, produces professional DAMF files.",
  other_querying:"Querying...",
  // Movie
  movie_title:"Movie Demux",movie_sub:"Movie, disc and HDR demux",
  movie_section_movie:"Movie Demux",movie_section_disc:"Disc Audio Demux",movie_section_hdr:"HDR Data Demux",
  movie_scanning:"Scanning...",movie_demux_selected:"Demux Selected",movie_track:"Track",
  movie_dvd_title:"DVD Demux",movie_dvd_folder:"DVD folder",movie_dvd_scan:"Scan DVD",movie_dvd_start:"Start DVD Demux",
  movie_vcd_title:"VCD Demux & Merge",movie_vcd_add:"+ Add CD",movie_vcd_output:"Output",
  movie_vcd_default_mp2:"Default (Original MP2)",
  movie_vcd_demux:"Demux",movie_vcd_merge_q:"Do you want to merge the files?",
  movie_vcd_merge:"Merge and Extract",movie_vcd_separate:"Extract Separately (CD1, CD2...)",
  movie_hdr_title:"HDR Data Demux",movie_hdr_dovi:"Dolby Vision RPU",movie_hdr_hdr10:"HDR10+ Metadata",movie_hdr_extract:"Extract",
  movie_chapter_extract:"Extract chapters",
  // Settings
  settings_title:"Settings",settings_sub:"Edit tool paths",settings_suite:"AudioSuite Folder",
  // About
  about_title:"About",about_developer:"Developer",about_web:"Website",about_email:"Email",
  about_license:"MIT License",about_libraries:"Libraries",
  // Console
  console_cmd_opened:"CMD window opened.",console_done:"Done!",console_error:"Error.",
  // Disc demux
  disc_dvd_demux:"DVD Demux",disc_separate:"Separate files extracted",disc_merged:"Merged",
  disc_extracting:"extracting...",disc_merging:"Merging...",
  // Atmos Suite
  nav_atmos:"Atmos Suite",home_atmos_desc:"Atmos encode, metadata & fix",
  atmos_title:"Atmos Suite",atmos_sub:"Atmos encoding, TrueHD metadata extraction & channel fix",
  atmos_tab_packing:"Atmos Metadata Encoding",atmos_tab_metadata:"TrueHD Metadata",atmos_tab_fix:"Atmos Fix",
  atmos_pack_ch:"Channel Layout",atmos_pack_bitrate:"Bitrate",atmos_pack_start:"Start Encode",
  atmos_pack_input:"Input WAV Files",atmos_pack_output:"Output Folder",
  // Atmos Audio Encode (Deezy)
  atmos_tab_audioencode:"Atmos Audio Encode",
  atmos_ae_mode:"Atmos Mode",
  atmos_ae_bluray:"Bluray Atmos (7.1 Chnls)",
  atmos_ae_streaming:"Streaming Atmos",
  atmos_ae_input_type:"Input Type",
  atmos_ae_input_mkv:"MKV (extract TrueHD inside)",
  atmos_ae_input_thd:"TrueHD (.thd)",
  atmos_ae_bitrate:"Bitrate",
  atmos_ae_engine_missing:"Cannot run without deezy.exe and truehdd.exe",
  atmos_ae_start:"Start Atmos Encode",
  atmos_ae_output_info:"Output: E-AC3 only",
  // Channel Join
  nav_join:"Audio Packing",
  join_title:"Channel Join & Encode",join_sub:"Join mono WAV files into multichannel audio and encode",
  join_mode:"Mode",join_stereo:"Stereo (2ch)",join_51:"5.1 Surround (6ch)",join_71:"7.1 Surround (8ch)",
  join_format:"Output Format",join_bitrate:"Bitrate",join_start:"Start Encode",
  join_assign:"Assign Channels",join_add_files:"Add WAV Files",
  join_L:"Left (L)",join_R:"Right (R)",join_C:"Center (C)",join_LFE:"LFE",
  join_SL:"Surround Left (Ls)",join_SR:"Surround Right (Rs)",join_BL:"Back Left (Lb)",join_BR:"Back Right (Rb)",
  // XSE
  join_xse_title:"DTS-HD MA Session Export",join_xse_desc:"Generate .xse session file for DTS-HD Master Audio Suite",
  join_xse_generate:"Generate XSE",join_xse_51:"5.1 Session",join_xse_71:"7.1 Session",
  join_xse_duration:"Duration",join_xse_framerate:"Frame Rate",join_xse_bitrate:"Bitrate (bps)",
  join_xse_output:"Output Folder",join_xse_success:"XSE session file generated!",
  // Update
  update_check:"Check for Updates",update_checking:"Checking...",
  update_available:"New version available!",update_latest:"You have the latest version.",
  update_error:"Could not check for updates.",update_current:"Current",update_new:"Latest",
  update_download:"Download",update_downloading:"Downloading...",update_install:"Install & Restart",update_downloaded:"Download complete!",
},
tr:{
  nav_home:"Anasayfa",nav_encode:"Ses Kodlama",nav_demux:"Ses Çıkarma",nav_fps:"FPS Dönüştür",nav_other:"Ek Araçlar",nav_movie:"Videoyu Ayıkla",nav_settings:"Ayarlar",nav_about:"Hakkında",
  default_val:"Varsayılan",default_original:"Varsayılan (Orijinal)",default_lossless:"Varsayılan (Kayıpsız)",
  start:"Başlat",processing:"İşleniyor...",cancel:"İptal",reset:"Sıfırla",clear:"Temizle",save:"Kaydet",saved:"Kaydedildi!",loading:"Yükleniyor...",
  drag_text:"Dosya sürükleyin veya tıklayın",error:"Hata",completed:"Tamamlandı!",
  process_running:"İşlem devam ediyor...",process_done:"İşlem Tamamlandı",process_cancelled:"İşlem iptal edildi.",
  process_success:"İşlem başarıyla tamamlandı!",process_error:"Hata: ",waiting:"Bekleniyor...",
  select_all:"Tümü",select_none:"Hiçbiri",
  home_subtitle:"Audio Studio Ultimate",home_title:"Profesyonel Ses İşleme Araçları",
  home_developer:"Geliştirici: MURAT OGRAS",
  home_encode_desc:"Ses dönüştürme",home_demux_desc:"Core ses çıkarma",home_fps_desc:"Frame rate dönüştürme",
  home_other_desc:"Fix, spektrum, meta",home_movie_desc:"Video/ses/HDR ayırma",home_settings_desc:"Araç yolları",
  encode_title:"Ses Kodlama",encode_sub:"Ses formatlarını dönüştürün — codec, bitrate, kanal ve motor seçimi",
  encode_input:"Giriş",encode_output:"Çıkış",encode_format:"Format",encode_bitrate:"Bitrate",encode_channel:"Kanal",encode_engine:"Motor",
  encode_start:"Encode Başlat",encode_auto:"Otomatik",
  encode_warn_title:"Uyarı — Ses Kaybı",encode_warn_text:"Seçilen bitrate orijinal bitraten daha düşük. Bu işlemde ses kalitesi kaybı yaşanacaktır. Devam etmek istiyor musunuz?",
  encode_continue:"Devam Et",encode_dtshd_6ch:"6 Kanal (5.1)",encode_dtshd_8ch:"8 Kanal (7.1)",
  encode_quality:"Kalite",encode_quality_default:"Varsayılan",encode_quality_dpl2:"Dolby Pro Logic II",
  encode_mp2mode:"MP2 Modu",encode_mp2_mpeg1:"MPEG-1",encode_mp2_mpeg2:"MPEG-2",
  encode_cl:"Sıkıştırma Seviyesi",encode_cl_default:"Varsayılan Sıkıştırma Seviyesi",encode_cl_info_title:"FLAC Sıkıştırma Seviyeleri",
  encode_cl_info:"Seviye 1: En hızlı paketleme, en düşük CPU kullanımı, en büyük dosya boyutu.\n\nSeviye 2: Hızlı işlem, dosya boyutu 1. seviyeye göre biraz daha küçüktür.\n\nSeviye 3: Hız öncelikli, makul seviyede boyut tasarrufu sağlar.\n\nSeviye 4: Dengeli sıkıştırma, standart işlem hızı ve boyutu.\n\nSeviye 5 (Önerilen): Altın oran; hız ve boyutun en verimli olduğu varsayılan seviye.\n\nSeviye 6: Yüksek sıkıştırma, işlemciyi biraz daha fazla yorar, boyutu küçültür.\n\nSeviye 7: Çok yüksek sıkıştırma, işlem süresi uzar ama dosya daha az yer kaplar.\n\nSeviye 8: Standart limit; en yavaş ama en küçük dosya boyutu (Arşivciler için).\n\nSeviye 9: Standart dışı yüksek analiz, işlem süresi çok uzar, boyut farkı çok azdır.\n\nSeviye 10: İşlemciyi aşırı yoran derin analiz, milimetrik boyut tasarrufu sağlar.\n\nSeviye 11: Uç seviye zorlama, aşırı yavaş işlem, boyut farkı neredeyse belirsizdir.\n\nSeviye 12: Mutlak limit; en uzun sürede ulaşılabilecek en küçük dosya boyutu.\n\nKüçük bir not: Seviye ne olursa olsun ses kalitesi %100 aynı ve kayıpsızdır. Değişen tek şey bilgisayarın ne kadar terleyeceği ve dosyanın diskte ne kadar yer kaplayacağıdır.",
  demux_title:"Ses Çıkarma (Core)",demux_sub:"Core ses çıkarma ve kanal ayırma",
  demux_truehd:"TrueHD Core",demux_truehd_desc:"TrueHD → AC3 Core",
  demux_dtshd:"DTS-HD MA Core",demux_dtshd_desc:"DTS-HD → DTS Core",
  demux_dtscore:"DTS Core → AC3",demux_dtscore_desc:"DTS → AC3 Core",
  demux_wav:"WAV (Stereo)",demux_wav_desc:"Tek WAV dosyası",
  demux_wavs:"WAVS (Kanallar)",demux_wavs_desc:"Her kanal ayrı WAV",
  demux_mono:"Mono Kanal Ayırma",demux_mono_desc:"Mono WAV",
  demux_start:"Demux Başlat",demux_wavs_ch:"Kanal Düzeni",
  fps_title:"Ses FPS Dönüşümü",fps_sub:"Ses dosyalarının FPS değerini kayıpsız değiştirin",
  fps_select:"FPS Dönüşümü Seçin",fps_format:"Ses Formatı",fps_bitrate:"Bitrate",fps_convert:"FPS Dönüştür",
  fps_lossless_warn:"kayıpsız: WAV → FPS değişimi → DEE paketleme",
  fps_eac3_info:"E-AC3 FPS dönüşümü FFmpeg ile yapılır",
  fps_diff_title:"Diğer FrameRate Bilgisi",fps_diff_btn:"Different FrameRate Bilgisi",
  fps_qaac_not_found:"QAAC bulunamadı! Ayarlar'dan qaac64.exe veya qaac.exe yolunu belirleyin.",
  fps_step1:"ADIM 1",fps_step2:"ADIM 2",fps_step3:"ADIM 3",fps_step4:"ADIM 4",
  fps_wav_fps:"WAV + FPS",fps_channel_split:"Kanal ayırma",fps_dee:"DEE",
  fps_done_truehd:"TrueHD FPS tamamlandı!",fps_done_wav:"WAV FPS tamamlandı!",fps_done_dtshd:"DTS-HD FPS tamamlandı!",
  fps_done_aac_qaac:"AAC FPS tamamlandı! (QAAC)",fps_done_aac_ffmpeg:"AAC FPS tamamlandı! (FFmpeg)",
  fps_qaac_fail:"QAAC başarısız — FFmpeg AAC ile devam ediliyor...",fps_ffmpeg_aac:"FFmpeg AAC encode",
  fps_step_fail:"Adım başarısız",
  other_title:"Ek Araçlar",other_sub:"Ek ses işleme araçları",
  other_volume:"Ses Güçlendirici",other_fix:"Sesi Tamir Et",other_atmos:"Atmos Fix",other_spectrum:"Spektrum",
  other_info:"Ses Bilgileri",other_movieinfo:"Film Bilgileri",other_metadata:"TrueHD Metadata",
  other_vol_title:"Ses Seviyesi Güçlendirici",other_vol_light:"Hafif",other_vol_medium:"Orta",other_vol_strong:"Güçlü",other_vol_default:"Standart 10dB",
  other_fix_title:"Sesi Tamir Et",
  other_fix_clean:"Track Not Clean Fix",other_fix_clean_desc:'⚠ "This track is not clean"',
  other_fix_crc:"CRC Mismatch Fix",other_fix_crc_desc:'⚠ "frame CRC mismatch"',
  other_fix_noise:"Cızırtı Temizle",other_fix_noise_desc:"Parazitleri temizler",
  other_fix_reencode:"Re-Encode Audio",other_fix_reencode_desc:"mkvmerge ile yeniden paketleme (.mka)",
  other_fix_btn:"Tamir Et",
  about_github:"GitHub",
  other_atmos_title:"E-AC-3 JOC Atmos 7.1 Fix",
  other_atmos_desc:'E-AC-3 JOC (Dolby Atmos) 7.1 bitstream\'lerde chanmap (kanal eşleme) düzeltmesi yapar. CRC yeniden yazılır, dialnorm\'a dokunulmaz, yeniden encode yapılmaz. Sadece .eac3 dosyalarında kullanın.',
  other_atmos_chanmap:"Channel Map Fix",other_atmos_chanmap_desc:"Dependent frame chanmap + CRC düzeltme",
  other_atmos_apply:"Fix Uygula",
  other_atmos_warn:"Bu araç yalnızca E-AC-3 JOC (Atmos) 7.1 bitstream'ler içindir. Normal AC-3, standart 5.1 E-AC-3 veya farklı türde sesler için kullanılmamalıdır.",
  other_atmos_workflow:"İş akışı: DME ile E-AC-3 JOC / DD+ Atmos çıktı al → bu araçtan geçir → düzeltilmiş .eac3 dosyasını kullan.",
  other_spectrum_btn:"Spektrum Oluştur",other_info_btn:"Ses Bilgileri Göster",other_movieinfo_btn:"MediaInfo Göster",
  other_meta_output:"Çıkış Klasörü",other_meta_empty:"Boş=dosya klasörü",other_meta_extract:"Metadata Çıkar",
  meta_info_title:"Presentation Bilgisi",meta_p0_name:"Stereo",meta_p0_ch:"2 Kanal",meta_p0_desc:"En temel ses katmanıdır. Sadece Ön Sol ve Sağ kanalları içerir. Genelde 5.1'in bir downmix'idir.",meta_p1_name:"5.1 Surround",meta_p1_ch:"6 Kanal",meta_p1_desc:"Standart 5.1 sistemler için (L, R, C, LFE, Ls, Rs). Bağımsız bir akış olarak kodlanmıştır.",meta_p2_name:"7.1 Surround",meta_p2_ch:"8 Kanal",meta_p2_desc:"5.1'in üzerine eklenen arka kanalları (Lb, Rb) içerir. Atmos verisi içermez, sadece saf 8 kanallı sestir.",meta_p3_name:"Atmos (JOC)",meta_p3_ch:"14+ Element",meta_p3_desc:"Asıl olay burasıdır. 7.1 yatağının üzerine binen objeleri (metadata) içerir. Decode edildiğinde profesyonel DAMF dosyalarını verir.",
  other_querying:"Sorgulanıyor...",
  movie_title:"",movie_sub:"Film, disc ve HDR demux",
  movie_section_movie:"Görüntü ve Ses Ayrıştır",movie_section_disc:"DVD & VCD Çıkarma ",movie_section_hdr:"HDR Verisi Çıkar",
  movie_scanning:"Taranıyor...",movie_demux_selected:"Seçilenleri Demux Et",movie_track:"Track",
  movie_dvd_title:"DVD Demux",movie_dvd_folder:"DVD klasörü",movie_dvd_scan:"DVD Tara",movie_dvd_start:"DVD Demux Başlat",
  movie_vcd_title:"VCD Demux & Birleştir",movie_vcd_add:"+ CD Ekle",movie_vcd_output:"Çıktı",
  movie_vcd_default_mp2:"Varsayılan (Orijinal MP2)",
  movie_vcd_demux:"Demux Et",movie_vcd_merge_q:"Dosyaları birleştirmek ister misiniz?",
  movie_vcd_merge:"Birleştir ve Çıkar",movie_vcd_separate:"Ayrı Çıkar (CD1, CD2...)",
  movie_hdr_title:"HDR Veri Çıkarma",movie_hdr_dovi:"Dolby Vision RPU",movie_hdr_hdr10:"HDR10+ Metadata",movie_hdr_extract:"Çıkar",
  movie_chapter_extract:"Chapter çıkar",
  settings_title:"Ayarlar",settings_sub:"Araç yollarını düzenleyin",settings_suite:"AudioSuite Klasörü",
  about_title:"Hakkında",about_developer:"Geliştirici",about_web:"Web Sitesi",about_email:"E-posta",
  about_license:"MIT Lisansı",about_libraries:"Kütüphaneler",
  console_cmd_opened:"CMD penceresi açıldı.",console_done:"Tamamlandı!",console_error:"Hata.",
  disc_dvd_demux:"DVD Demux",disc_separate:"Ayrı dosyalar çıkarıldı",disc_merged:"Birleştirildi",
  disc_extracting:"çıkarılıyor...",disc_merging:"Birleştiriliyor...",
  // Atmos Suite
  nav_atmos:"Atmos Suite",home_atmos_desc:"Atmos kodlama, metadata ve düzeltme",
  atmos_title:"Atmos Suite",atmos_sub:"Atmos kodlama, TrueHD metadata çıkarma ve kanal düzeltme",
  atmos_tab_packing:"Atmos Metadata Kodlama",atmos_tab_metadata:"TrueHD Metadata",atmos_tab_fix:"Atmos Fix",
  atmos_pack_ch:"Kanal Düzeni",atmos_pack_bitrate:"Bitrate",atmos_pack_start:"Kodlamayı Başlat",
  atmos_pack_input:"Giriş WAV Dosyaları",atmos_pack_output:"Çıkış Klasörü",
  // Atmos Audio Encode (Deezy)
  atmos_tab_audioencode:"Atmos Ses Kodlama",
  atmos_ae_mode:"Atmos Modu",
  atmos_ae_bluray:"Bluray Atmos (7.1 Kanal)",
  atmos_ae_streaming:"Streaming Atmos",
  atmos_ae_input_type:"Giriş Tipi",
  atmos_ae_input_mkv:"MKV (içindeki TrueHD alınır)",
  atmos_ae_input_thd:"TrueHD (.thd)",
  atmos_ae_bitrate:"Bitrate",
  atmos_ae_engine_missing:"deezy.exe ve truehdd.exe programı olmadan çalışmaz",
  atmos_ae_start:"Atmos Kodlamayı Başlat",
  atmos_ae_output_info:"Çıkış: Sadece E-AC3",
  // Channel Join
  nav_join:"Ses Paketleme",
  join_title:"Kanal Birleştir & Kodla",join_sub:"Mono WAV dosyalarını çok kanallı sese birleştir ve kodla",
  join_mode:"Mod",join_stereo:"Stereo (2 Kanal)",join_51:"5.1 Surround (6 Kanal)",join_71:"7.1 Surround (8 Kanal)",
  join_format:"Çıkış Formatı",join_bitrate:"Bitrate",join_start:"Kodlamayı Başlat",
  join_assign:"Kanalları Ata",join_add_files:"WAV Dosyaları Ekle",
  join_L:"Sol (L)",join_R:"Sağ (R)",join_C:"Merkez (C)",join_LFE:"LFE",
  join_SL:"Surround Sol (Ls)",join_SR:"Surround Sağ (Rs)",join_BL:"Arka Sol (Lb)",join_BR:"Arka Sağ (Rb)",
  // XSE
  join_xse_title:"DTS-HD MA Oturum Dışa Aktarma",join_xse_desc:"DTS-HD Master Audio Suite için .xse oturum dosyası oluştur",
  join_xse_generate:"XSE Oluştur",join_xse_51:"5.1 Oturum",join_xse_71:"7.1 Oturum",
  join_xse_duration:"Süre",join_xse_framerate:"Frame Rate",join_xse_bitrate:"Bitrate (bps)",
  join_xse_output:"Çıkış Klasörü",join_xse_success:"XSE oturum dosyası oluşturuldu!",
  // Update
  update_check:"Güncelleme Kontrol Et",update_checking:"Kontrol ediliyor...",
  update_available:"Yeni sürüm mevcut!",update_latest:"En güncel sürümü kullanıyorsunuz.",
  update_error:"Güncelleme kontrol edilemedi.",update_current:"Mevcut",update_new:"Güncel",
  update_download:"İndir",update_downloading:"İndiriliyor...",update_install:"Kur ve Yeniden Başlat",update_downloaded:"İndirme tamamlandı!",
}};


const FORMATS=["TrueHD","DTS-HD","DTS","AC3","E-AC3","AC-4","Stereo Downmix","WAV","FLAC","AAC","MP3","MP2","Opus","OGG","AIFF"];
const OUT_FORMATS=["TrueHD","DTS-HD","DTS","AC3","E-AC3","AC-4","Stereo Downmix","WAV","FLAC","AAC","MP3","MP2","Opus"];
const BITRATES_ALL_RAW=[96,128,192,224,256,320,384,448,640,768,1024,1509,1536];
const BITRATES_EAC3=[128,256,384,448,576,640,768,1024,1280,1536,1664];
const BITRATES_MP3=[32,48,56,64,80,96,112,128,160,192,224,256,320];
const BITRATES_MP2_MPEG1=[32,48,56,64,80,96,112,128,160,192,224,256,320,384];
const BITRATES_MP2_MPEG2=[8,16,24,32,40,48,56,64,80,96,112,128,144,160];
const BITRATES_OPUS=[16,24,32,48,64,80,96,112,128,160,192,224,256,320,384,448,510];
const MP3_INPUT_BY_ENGINE={lame:["WAV","FLAC","MP3","Opus","OGG","AIFF"],eac3to:["WAV","FLAC","AC3","DTS","E-AC3","TrueHD"],ffmpeg:["WAV","FLAC","MP3","Opus","OGG","AC3","DTS","AAC","E-AC3","TrueHD","AIFF"]};
const MP2_INPUT_BY_ENGINE={twolame:["WAV","FLAC","MP3","Opus","OGG","AIFF"],ffmpeg:["WAV","FLAC","MP3","Opus","OGG","AC3","DTS","AAC","E-AC3","TrueHD","AIFF"]};
const OPUS_INPUT_BY_ENGINE={opus:["WAV","FLAC","OGG","AIFF"],ffmpeg:["WAV","FLAC","MP3","Opus","OGG","AC3","DTS","AAC","E-AC3","TrueHD","AIFF"]};
const BITRATES_LOW=[192,224,256,320];
const AC4_PRESETS=[
  {auto:true,label:"Auto (detect from channels)",chLabel:"Auto",dm:2},
  {br:64,label:"AC-4 64 kbps",chLabel:"Mono",dm:2},
  {br:72,label:"AC-4 72 kbps",chLabel:"Mono or Stereo",dm:2},
  {br:112,label:"AC-4 112 kbps",chLabel:"Stereo",dm:2},
  {br:144,label:"AC-4 144 kbps",chLabel:"5.1 Surround",dm:2},
  {br:256,label:"AC-4 256 kbps",chLabel:"7.1 Atmos",dm:2},
  {br:320,label:"AC-4 320 kbps",chLabel:"7.1.4 Atmos",dm:2},
];
const CHANNELS_LIST_RAW=["1.0","2.0","5.1","7.1","7.1.4"];
const FPS_OPTIONS=[{from:"23.976",to:"24.000"},{from:"23.976",to:"25.000"},{from:"24.000",to:"23.976"},{from:"24.000",to:"25.000"},{from:"25.000",to:"23.976"},{from:"25.000",to:"24.000"}];
const FPS_FORMATS=["AC3","E-AC3","DTS","AAC","M4A","FLAC","WAV","TrueHD","DTS-HD"];
const LOSSLESS_FMTS=["TrueHD","DTS-HD","WAV"];
const VOL_PRESETS_BASE=[{key:"light",value:"5dB",filter:'dynaudnorm=f=200:g=12:n=1:p=0.6:m=12:s=10'},{key:"medium",value:"10dB",filter:'dynaudnorm=f=250:g=15:n=1:p=0.75:m=15:s=12,acompressor=threshold=-18dB:ratio=2.5:attack=10:release=80:makeup=6'},{key:"strong",value:"15dB",filter:'dynaudnorm=f=300:g=18:n=1:p=0.9:m=20:s=15,acompressor=threshold=-22dB:ratio=3.5:attack=5:release=120:makeup=8'},{key:"default",value:"10dB",filter:'volume=10dB'}];
const DEMUX_TOOLS_LIST=["MKVToolnix","Eac3to","DGDemux"];
const ENGINES_BASE=[{id:"auto",key:"encode_auto"},{id:"deew",label:"DEEW"},{id:"deezy",label:"DeeZy"},{id:"flac",label:"FLAC"},{id:"eac3to",label:"eac3to"},{id:"ffmpeg",label:"FFmpeg"},{id:"lame",label:"LAME"},{id:"twolame",label:"TwoLAME"},{id:"opus",label:"Opus"}];
const JOIN_FORMATS=["AC3","E-AC3","DTS","AAC","MP3","FLAC","PCM"];
const JOIN_BITRATES={
  AC3:{2:["128","160","192","224","256","320"],6:["384","448","640"],8:["384","448","640"]},
  "E-AC3":{2:["128","192","224","256"],6:["256","384","448","640","768","1024"],8:["640","768","1024","1536"]},
  DTS:{2:["447","768","1509"],6:["768","1509"],8:["768","1509"]},
  AAC:{2:["96","128","192","256","320"],6:["320","448","640","1024"],8:["320","448","640","1024"]},
  MP3:{2:["128","192","256","320"],6:["128","192","256","320"],8:["128","192","256","320"]},
};
const JOIN_CH_LABELS_2=["join_L","join_R"];
const JOIN_CH_LABELS_6=["join_L","join_R","join_C","join_LFE","join_SL","join_SR"];
const JOIN_CH_LABELS_8=["join_L","join_R","join_C","join_LFE","join_SL","join_SR","join_BL","join_BR"];
const XSE_FRAMERATES=["23.976","24.000","25.000","29.970"];
const NAV_KEYS=[{id:"home",icon:"⌂",key:"nav_home",color:"#818cf8"},{id:"encode",icon:"♫",key:"nav_encode",color:"#6366f1"},{id:"demux",icon:"⊕",key:"nav_demux",color:"#f59e0b"},{id:"join",icon:"⊞",key:"nav_join",color:"#06b6d4"},{id:"atmos",icon:"🌐",key:"nav_atmos",color:"#8b5cf6"},{id:"fps",icon:"⟳",key:"nav_fps",color:"#10b981"},{id:"other",icon:"◈",key:"nav_other",color:"#ef4444"},{id:"movie",icon:"▶",key:"nav_movie",color:"#ec4899"},{id:"settings",icon:"⚙",key:"nav_settings",color:"#64748b"},{id:"about",icon:"ℹ",key:"nav_about",color:"#0ea5e9"}];
const DEFAULT_TOOLS={TOOL_PATH:"eac3to.exe",QAAC_PATH:"qaac64.exe",FFMPEG_PATH:"ffmpeg.exe",FFPROBE_PATH:"ffprobe.exe",DEEW_PATH:"deew.exe",DEEZY_PATH:"deezy.exe",FLAC_PATH:"flac.exe",DGDEMUX_PATH:"DGDemux.exe",MKVEXTRACT_PATH:"mkvextract.exe",MKVMERGE_PATH:"mkvmerge.exe",Truehdd_PATH:"truehdd.exe",THDMerge_PATH:"thdmerge.exe",Dovi_Tool_PATH:"dovi_tool.exe",MediaInfo_PATH:"MediaInfo.exe",HDR10Plus_PATH:"hdr10plus_tool.exe",AtmosFix_PATH:"eac3_7.1_atmos_fix.exe",Tsmuxer_PATH:"tsmuxer.exe",DEE_PATH:"dee.exe",DTSEncoder_PATH:"DTSEncoder.jar",TWOLAME_PATH:"twolame.exe",LAME_PATH:"lame.exe",OPUSENC_PATH:"opusenc.exe",OPUSDEC_PATH:"opusdec.exe",AudioSuite:"C:\\Audio Tools Suite\\Atmos\\binaries"};
let api=typeof window!=="undefined"&&window.electronAPI?window.electronAPI:null;
const ensureApi=()=>{if(!api&&typeof window!=="undefined")api=window.electronAPI||null;return api};
let runnerCounter=0;

/* ── UI Components ── */
function Select({label,value,onChange,options,disabled}){return(<div style={{display:"flex",flexDirection:"column",gap:4,flex:1,minWidth:0,opacity:disabled?0.45:1}}>{label&&<label style={{fontSize:11,color:"#8a8fa6",textTransform:"uppercase",letterSpacing:1}}>{label}</label>}<select disabled={disabled} value={value} onChange={e=>onChange(e.target.value)} style={{background:"#1a1d2e",border:"1px solid #2d3148",borderRadius:8,padding:"10px 12px",color:"#e2e4ed",fontSize:13,outline:"none",cursor:disabled?"not-allowed":"pointer",appearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236b70a0'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>{options.map((o,i)=>{const v=typeof o==="object"?o.value:o;const l=typeof o==="object"?o.label:o;return<option key={i} value={v}>{l}</option>})}</select></div>)}
function Btn({children,onClick,primary,small,danger,disabled,style:sx,...r}){const base={border:"none",borderRadius:8,cursor:disabled?"not-allowed":"pointer",fontWeight:600,transition:"all .2s",display:"inline-flex",alignItems:"center",gap:6,opacity:disabled?.45:1};const size=small?{padding:"6px 14px",fontSize:12}:{padding:"10px 22px",fontSize:13};const theme=primary?{background:"linear-gradient(135deg,#6366f1,#818cf8)",color:"#fff",boxShadow:"0 2px 12px #6366f144"}:danger?{background:"#dc2626",color:"#fff"}:{background:"#1e2235",color:"#c5c9e0",border:"1px solid #2d3148"};return<button onClick={onClick} disabled={disabled} style={{...base,...size,...theme,...sx}} {...r}>{children}</button>}
function Card({children,style,...r}){return<div style={{background:"#13152180",backdropFilter:"blur(12px)",border:"1px solid #1e2240",borderRadius:14,padding:22,...style}} {...r}>{children}</div>}
function Badge({children,color="#6366f1"}){return<span style={{background:color+"22",color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{children}</span>}
function Popup({open,onClose,title,children}){if(!open)return null;return(<div style={{position:"fixed",inset:0,background:"#000c",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={onClose}><div onClick={e=>e.stopPropagation()} style={{background:"#181b2e",border:"1px solid #2d3148",borderRadius:16,padding:28,maxWidth:560,width:"90%",boxShadow:"0 20px 60px #0008",maxHeight:"80vh",overflow:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><h3 style={{margin:0,fontSize:17,color:"#e2e4ed"}}>{title}</h3><button onClick={onClose} style={{background:"none",border:"none",color:"#6b70a0",fontSize:20,cursor:"pointer"}}>✕</button></div>{children}</div></div>)}
function Toggle({checked,onChange,label}){return(<label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:"#c5c9e0"}}><div onClick={e=>{e.preventDefault();onChange(!checked)}} style={{width:40,height:22,borderRadius:11,background:checked?"#6366f1":"#2d3148",transition:"all .2s",position:"relative",cursor:"pointer",flexShrink:0}}><div style={{width:16,height:16,borderRadius:8,background:"#fff",position:"absolute",top:3,left:checked?21:3,transition:"all .2s"}}/></div>{label}</label>)}
function SectionTitle({children,sub}){return(<div style={{marginBottom:18}}><h2 style={{margin:0,fontSize:20,fontWeight:700,color:"#e2e4ed",letterSpacing:-.3}}>{children}</h2>{sub&&<p style={{margin:"4px 0 0",fontSize:12,color:"#6b70a0"}}>{sub}</p>}</div>)}
function FileDropZone({file,setFile,t,folder}){const[drag,setDrag]=useState(false);const sel=useRef(false);const justDropped=useRef(false);const click=async()=>{if(justDropped.current){justDropped.current=false;return}if(!ensureApi()||sel.current)return;sel.current=true;try{const p=folder?await api.selectFolder():await api.selectMediaFile();if(p)setFile(p)}finally{sel.current=false}};
  const handleDrop=async e=>{e.preventDefault();e.stopPropagation();setDrag(false);justDropped.current=true;setTimeout(()=>{justDropped.current=false},500);
    if(ensureApi()&&api.getDropPaths){const paths=api.getDropPaths();if(paths&&paths.length>0){setFile(paths[0]);return}}
    const f=e.dataTransfer.files[0];if(!f)return;let p=f.path;
    if(!p&&ensureApi()&&api.getPathForFile)try{p=api.getPathForFile(f)}catch(e){}
    if(!p||(!p.includes("\\")&&!p.includes("/")))if(ensureApi())try{p=folder?await api.selectFolder():await api.selectMediaFile()}catch(e){}
    if(p)setFile(p)};
  return(<div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={handleDrop} style={{border:`2px dashed ${drag?"#818cf8":"#2d3148"}`,borderRadius:12,padding:"24px 20px",textAlign:"center",transition:"all .25s",background:drag?"#6366f108":"transparent",cursor:"pointer"}} onClick={click}><div style={{fontSize:24,marginBottom:4}}>{file?"📄":"📁"}</div><div style={{color:file?"#e2e4ed":"#6b70a0",fontSize:13,fontWeight:file?600:400}}>{file?"":t("drag_text")}</div>{file&&<div style={{color:"#6366f1",fontSize:11,marginTop:4}}>{file.length>70?"..."+file.slice(-67):file}</div>}</div>)}

function Terminal({output,running,percent,done,onClear,t}){const ref=useRef();useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight},[output]);if(!output&&!running&&!done)return null;return(<Card style={{marginTop:14,padding:0,overflow:"hidden"}}><div style={{padding:"10px 16px",borderBottom:"1px solid #1e2240",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:8}}>{running&&<div style={{width:8,height:8,borderRadius:4,background:"#10b981",animation:"pulse 1s infinite"}}/>}<span style={{fontSize:12,color:running?"#10b981":done?"#818cf8":"#6b70a0",fontWeight:600}}>{running?`${t("process_running")} ${percent>=0?percent+"%":""}`:done?`✅ ${t("process_done")}`:""}</span></div>{done&&onClear&&<Btn small onClick={onClear}>{t("clear")}</Btn>}</div>{(running||done)&&percent>=0&&<div style={{width:"100%",height:8,background:"#1e2240"}}><div style={{height:"100%",borderRadius:4,background:done?"#10b981":"linear-gradient(90deg,#6366f1,#818cf8)",transition:"width .4s",width:percent+"%"}}/></div>}<pre ref={ref} style={{margin:0,padding:14,fontSize:11,color:"#a5b4c8",background:"#0a0c16",maxHeight:300,overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",lineHeight:1.5,fontFamily:"Consolas,monospace"}}>{output||t("waiting")}</pre></Card>)}

function ActionButtons({t:runner,file,setFile,running,onRun,runLabel,i18n,extraButton}){return(<div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"}}><Btn primary onClick={onRun} disabled={!file||running}>{running?i18n("processing"):runLabel||i18n("start")}</Btn>{running&&<Btn danger onClick={runner.cancel}>⛔ {i18n("cancel")}</Btn>}{!running&&(file||runner.done)&&<Btn onClick={()=>{if(setFile)setFile(null);runner.reset()}}>🔄 {i18n("reset")}</Btn>}{extraButton}</div>)}


// Runner hook - unchanged logic, translated console messages
function useRunner(name,t){
  const id=useRef(name+"_"+(++runnerCounter));
  const[output,setOutput]=useState("");const[running,setRunning]=useState(false);const[pct,setPct]=useState(-1);const[done,setDone]=useState(false);
  const buf=useRef("");const cancelled=useRef(false);
  const clear=()=>{if(ensureApi()&&api.cancelProcess)api.cancelProcess(id.current).catch(()=>{});buf.current="";setOutput("");setPct(-1);setDone(false);setRunning(false);cancelled.current=false};
  const reset=clear;
  const append=(s)=>{if(cancelled.current)return;buf.current+=s;setOutput(buf.current)};

  const cancel=async()=>{
    cancelled.current=true;
    if(ensureApi())await api.cancelProcess(id.current);
    buf.current+="\n\n⛔ "+t("process_cancelled");setOutput(buf.current);
    setPct(-1);setRunning(false);setDone(true);
  };

  const stream=async(cmd,cwd)=>{
    clear();cancelled.current=false;setRunning(true);setPct(0);buf.current="$ "+cmd+"\n\n";setOutput(buf.current);
    if(!ensureApi())return{success:false};
    const unsub=api.onStreamData(id.current,chunk=>{
      if(cancelled.current){unsub();return}
      buf.current+=chunk;setOutput(buf.current);
      const m1=chunk.match(/(\d+)%/);if(m1)setPct(parseInt(m1[1]));
    });
    const res=await api.runCommandStream(cmd,cwd,id.current);unsub();
    if(!cancelled.current){
      buf.current+=(res.success?"\n\n✅ "+t("process_success"):"\n\n❌ "+t("process_error")+(res.error||"Exit code: "+res.exitCode));
      setOutput(buf.current);setPct(res.success?100:-1);setRunning(false);setDone(true);
    }
    return res;
  };

  const console_=async(cmd,cwd)=>{
    clear();setRunning(true);setPct(0);buf.current="$ "+cmd+"\n\n⏳ "+t("console_cmd_opened")+"\n";setOutput(buf.current);
    if(!ensureApi())return{success:false};
    const res=await api.runCommandConsole(cmd,cwd);
    if(!cancelled.current){buf.current+=(res.success?"\n✅ "+t("console_done"):"\n❌ "+t("console_error"));setOutput(buf.current);setPct(res.success?100:-1);setRunning(false);setDone(true)}
    return res;
  };

  const silent=async(cmd,cwd)=>{
    clear();setRunning(true);buf.current="$ "+cmd+"\n\n";setOutput(buf.current);
    if(!ensureApi())return{success:false};
    const res=await api.runCommand(cmd,cwd,id.current);
    if(!cancelled.current){buf.current+=res.stdout+"\n"+res.stderr+(res.success?"\n\n✅ "+t("console_done"):"\n\n❌ "+(res.error||""));setOutput(buf.current);setPct(res.success?100:-1);setRunning(false);setDone(true)}
    return res;
  };

  return{output,running,pct,done,clear,reset,cancel,append,setRunning,setPct,setDone,setOutput,stream,console:console_,silent};
}

/* ═══ PAGES ═══ */
function HomePage({setPage,t}){const stats=[{id:"encode",icon:"♫",label:t("nav_encode"),desc:t("home_encode_desc"),color:"#6366f1"},{id:"join",icon:"⊞",label:t("nav_join"),desc:t("join_sub"),color:"#06b6d4"},{id:"atmos",icon:"🌐",label:t("nav_atmos"),desc:t("home_atmos_desc"),color:"#8b5cf6"},{id:"demux",icon:"⊕",label:t("nav_demux"),desc:t("home_demux_desc"),color:"#f59e0b"},{id:"fps",icon:"⟳",label:t("nav_fps"),desc:t("home_fps_desc"),color:"#10b981"},{id:"other",icon:"◈",label:t("nav_other"),desc:t("home_other_desc"),color:"#ef4444"},{id:"movie",icon:"▶",label:t("nav_movie"),desc:t("home_movie_desc"),color:"#ec4899"},{id:"settings",icon:"⚙",label:t("nav_settings"),desc:t("home_settings_desc"),color:"#64748b"},{id:"about",icon:"ℹ",label:t("nav_about"),desc:t("about_developer"),color:"#0ea5e9"}];return(<div><div style={{textAlign:"center",padding:"30px 0 36px"}}><img src={APP_ICON} alt="Logo" style={{width:56,height:56,borderRadius:14,margin:"0 auto 12px",display:"block"}} /><div style={{fontSize:11,letterSpacing:3,color:"#6366f1",fontWeight:700,textTransform:"uppercase",marginBottom:8}}>{t("home_subtitle")}</div><h1 style={{margin:0,fontSize:32,fontWeight:800,background:"linear-gradient(135deg,#e2e4ed,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t("home_title")}</h1><p style={{color:"#6b70a0",fontSize:13,marginTop:8}}>v1.2</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>{stats.map((s,i)=>(<Card key={i} style={{textAlign:"center",padding:20,cursor:"pointer",border:`1px solid ${s.color}18`}} onClick={()=>setPage(s.id)}><div style={{fontSize:28,marginBottom:8,color:s.color,textShadow:`0 0 12px ${s.color}88`}}>{s.icon}</div><div style={{fontSize:14,fontWeight:700,color:"#e2e4ed",marginBottom:4}}>{s.label}</div><div style={{fontSize:11,color:"#6b70a0"}}>{s.desc}</div></Card>))}</div></div>)}

/* ── AUDIO ENCODE ── */
function AudioEncodePage({t}){
  const[inFmt,setInFmt]=useState("TrueHD");const[outFmt,setOutFmt]=useState("E-AC3");const[bitrate,setBitrate]=useState("Default");const[channel,setChannel]=useState("Default");const[file,setFile]=useState(null);const[warnPopup,setWarnPopup]=useState(false);const[engine,setEngine]=useState("auto");const[dtshdCh,setDtshdCh]=useState(6);const[ac4Idx,setAc4Idx]=useState(0);const[dmQuality,setDmQuality]=useState("default");const[flacCl,setFlacCl]=useState("Default");const[flacInfoOpen,setFlacInfoOpen]=useState(false);const[mp2Mode,setMp2Mode]=useState("mpeg1");
  const runner=useRunner("encode",t);
  const engineFilter=useCallback((e)=>{
    if(outFmt==="AC-4")return e.id==="deew";
    if(outFmt==="E-AC3")return e.id!=="eac3to";
    if(outFmt==="TrueHD")return e.id!=="eac3to";
    if(["DTS","DTS-HD"].includes(outFmt))return["auto","eac3to","ffmpeg"].includes(e.id);
    if(outFmt==="MP3")return["ffmpeg","eac3to","lame"].includes(e.id);
    if(outFmt==="MP2")return["ffmpeg","twolame"].includes(e.id);
    if(outFmt==="Opus")return["ffmpeg","opus"].includes(e.id);
    if(outFmt==="WAV")return["eac3to","deezy","ffmpeg"].includes(e.id);
    if(outFmt==="FLAC")return["flac","ffmpeg","eac3to"].includes(e.id);
    return !["lame","twolame","opus"].includes(e.id);
  },[outFmt]);
  const effEngine=engine!=="auto"?engine:outFmt==="TrueHD"?"deezy":["E-AC3","AC3","AC-4"].includes(outFmt)?"deew":outFmt==="MP3"?"lame":outFmt==="MP2"?"twolame":outFmt==="Opus"?"opus":"eac3to";
  useEffect(()=>{
    const allowed=ENGINES_BASE.filter(engineFilter);
    if(!allowed.some(e=>e.id===engine))setEngine(allowed[0]?.id||"auto");
    const rawBase=outFmt==="E-AC3"?BITRATES_EAC3:outFmt==="AC3"?BITRATES_ALL_RAW.filter(b=>b<=640):outFmt==="MP3"?BITRATES_MP3:outFmt==="MP2"?(mp2Mode==="mpeg2"?BITRATES_MP2_MPEG2:BITRATES_MP2_MPEG1):outFmt==="Opus"?BITRATES_OPUS:BITRATES_ALL_RAW;
    const list=outFmt==="E-AC3"&&inFmt==="DTS-HD"?[rawBase[0],192,...rawBase.slice(1)]:rawBase;
    if(bitrate!=="Default"&&!list.includes(parseInt(bitrate)))setBitrate("Default");
    if(outFmt!=="Stereo Downmix"&&dmQuality!=="default")setDmQuality("default");
    if(outFmt==="Stereo Downmix"&&dmQuality==="dpl2"&&channel!=="Default"&&channel!=="2.0")setChannel("Default");
    if(outFmt==="FLAC"){
      if(effEngine==="eac3to"&&flacCl!=="Default")setFlacCl("Default");
      else if(effEngine!=="eac3to"&&flacCl==="Default")setFlacCl("5");
      else if((effEngine==="deezy"||effEngine==="flac")&&flacCl!=="Default"&&parseInt(flacCl)>8)setFlacCl("5");
    }
    if(outFmt==="MP3"&&MP3_INPUT_BY_ENGINE[effEngine]&&!MP3_INPUT_BY_ENGINE[effEngine].includes(inFmt))setInFmt(MP3_INPUT_BY_ENGINE[effEngine][0]);
    if(outFmt==="MP2"&&MP2_INPUT_BY_ENGINE[effEngine]&&!MP2_INPUT_BY_ENGINE[effEngine].includes(inFmt))setInFmt(MP2_INPUT_BY_ENGINE[effEngine][0]);
    if(outFmt==="Opus"&&OPUS_INPUT_BY_ENGINE[effEngine]&&!OPUS_INPUT_BY_ENGINE[effEngine].includes(inFmt))setInFmt(OPUS_INPUT_BY_ENGINE[effEngine][0]);
  },[outFmt,inFmt,engine,engineFilter,bitrate,dmQuality,channel,effEngine,flacCl,mp2Mode]);
  const pickEngine=()=>effEngine;
  const runEncode=async(force)=>{
    if(!ensureApi()||!file)return;if(!force&&outFmt!=="AC-4"&&bitrate!=="Default"&&parseInt(bitrate)<256){setWarnPopup(true);return}
    const name=file.replace(/^.*[\\/]/,"").replace(/\.[^.]+$/,"");const dir=file.replace(/\\[^\\]+$/,"");
    const eng=pickEngine();
    let br,ch;
    if(outFmt==="AC-4"){const p=AC4_PRESETS[ac4Idx];if(p.auto){const pr=await api.runFfprobe(file);const c=pr?.data?.streams?.find(s=>s.codec_type==="audio")?.channels||2;br=String(c<=1?64:c===2?112:c<=6?144:c<=8?256:320)}else br=String(p.br);ch=p.dm}
    else{br=bitrate==="Default"?null:bitrate;ch=channel==="Default"?null:channel==="5.1"?6:channel==="7.1"?8:channel==="2.0"?2:channel==="1.0"?1:null}
    let cmd="";
    if(eng==="deew"){const tp=await api.resolveTool("DEEW_PATH");const fmt=outFmt==="AC3"?"dd":outFmt==="AC-4"?"ac4":outFmt==="TrueHD"?"thd":outFmt==="FLAC"?"flac":"ddp";cmd=`"${tp}" -f ${fmt}`;if(br&&fmt!=="flac")cmd+=` -b ${br}`;if(outFmt==="FLAC"&&flacCl!=="Default")cmd+=` -cl ${flacCl}`;if(outFmt==="FLAC"&&!ch)cmd+=` -dm 2`;else if(ch&&outFmt!=="AC-4")cmd+=` -dm ${ch}`;if(outFmt==="Stereo Downmix"&&dmQuality==="dpl2")cmd+=` --dmt dpl2`;cmd+=` -np -i "${file}"`;await runner.console(cmd,dir)}
    else if(eng==="deezy"&&outFmt==="TrueHD"){const ff=await api.resolveTool("FFMPEG_PATH");const dw=await api.resolveTool("DEEW_PATH");const tmp=`${dir}\\${name}_temp.wav`;cmd=`"${ff}" -y -i "${file}" "${tmp}" && "${dw}" -f thd -i "${tmp}"`;await runner.console(cmd,dir)}
    else if(eng==="deezy"&&(outFmt==="AC3"||outFmt==="E-AC3")){const tp=await api.resolveTool("DEEZY_PATH");const fmt=outFmt==="AC3"?"dd":"ddp";cmd=`"${tp}" encode ${fmt}`;if(ch)cmd+=` --channels ${ch}`;if(br)cmd+=` --bitrate ${br}`;cmd+=` "${file}"`;await runner.console(cmd,dir)}
    else if(eng==="deezy"&&outFmt==="Stereo Downmix"){const tp=await api.resolveTool("DEEZY_PATH");cmd=`"${tp}" encode ddp --channels 2`;if(br)cmd+=` --bitrate ${br}`;else cmd+=` --bitrate 224`;if(dmQuality==="dpl2")cmd+=` --stereo-down-mix dpl2`;cmd+=` "${file}"`;await runner.console(cmd,dir)}
    else if(eng==="deezy"&&outFmt==="WAV"){const tp=await api.resolveTool("DEEZY_PATH");cmd=`"${tp}" encode wav`;if(ch)cmd+=` --channels ${ch}`;cmd+=` "${file}"`;await runner.console(cmd,dir)}
    else if(eng==="deezy"&&outFmt==="FLAC"){const tp=await api.resolveTool("DEEZY_PATH");cmd=`"${tp}" encode flac`;if(flacCl!=="Default")cmd+=` --compression-level ${flacCl}`;cmd+=` --channels ${ch||2}`;cmd+=` "${file}"`;await runner.console(cmd,dir)}
    else if(eng==="flac"){
      const tp=await api.resolveTool("FLAC_PATH");
      const ff=await api.resolveTool("FFMPEG_PATH");
      const clVal=flacCl==="Default"?"5":String(flacCl);
      const outFlac=`"${dir}\\${name}_encoded.flac"`;
      const isWav=/\.(wav|w64)$/i.test(file);
      if(isWav){
        cmd=`"${tp}" -${clVal} -f "${file}" -o ${outFlac}`;
        await runner.stream(cmd);
      } else {
        const tmpW64=`"${dir}\\${name}_flac_temp.w64"`;
        cmd=`"${ff}" -y -i "${file}" -f w64 ${tmpW64} && "${tp}" -${clVal} -f ${tmpW64} -o ${outFlac} && del ${tmpW64}`;
        await runner.stream(cmd);
      }
    }
    else if(eng==="lame"&&outFmt==="MP3"){const tp=await api.resolveTool("LAME_PATH");cmd=`"${tp}"`;if(br)cmd+=` -b ${br}`;if(ch===1)cmd+=` -m m`;else if(ch===2)cmd+=` -m s`;cmd+=` "${file}" "${dir}\\${name}_encoded.mp3"`;await runner.stream(cmd)}
    else if(eng==="twolame"&&outFmt==="MP2"){const tp=await api.resolveTool("TWOLAME_PATH");cmd=`"${tp}"`;if(br)cmd+=` -b ${br}`;cmd+=` -P 4`;if(ch===1)cmd+=` -m m`;else if(ch===2)cmd+=` -m s`;cmd+=` "${file}" "${dir}\\${name}_encoded.mp2"`;await runner.stream(cmd)}
    else if(eng==="opus"&&outFmt==="Opus"){const tp=await api.resolveTool("OPUSENC_PATH");cmd=`"${tp}"`;if(br)cmd+=` --bitrate ${br}`;cmd+=` "${file}" "${dir}\\${name}_encoded.opus"`;await runner.stream(cmd)}
    else if(eng==="ffmpeg"||eng==="deezy"||(outFmt==="MP2"&&eng!=="twolame")||(outFmt==="Opus"&&eng!=="opus")||(outFmt==="MP3"&&eng!=="eac3to")){
      const tp=await api.resolveTool("FFMPEG_PATH");
      const ext=outFmt==="AC3"?".ac3":outFmt==="E-AC3"?".ec3":outFmt==="DTS"?".dts":outFmt==="DTS-HD"?".dtshd":outFmt==="TrueHD"?".thd":outFmt==="FLAC"?".flac":outFmt==="WAV"?".wav":outFmt==="AAC"?".m4a":outFmt==="MP3"?".mp3":outFmt==="MP2"?".mp2":outFmt==="Opus"?".opus":".ac3";
      const codec=outFmt==="AC3"?"ac3":outFmt==="E-AC3"?"eac3":outFmt==="DTS"?"dca":outFmt==="TrueHD"?"truehd":outFmt==="FLAC"?"flac":outFmt==="WAV"?"":outFmt==="AAC"?"aac":outFmt==="MP3"?"libmp3lame":outFmt==="MP2"?"mp2":outFmt==="Opus"?"libopus":"ac3";
      let bitrateArg="";
      if(codec&&codec!=="truehd"&&codec!=="flac"){
        if(br){const kv=codec==="dca"&&parseInt(br)<768?1536:parseInt(br);bitrateArg=` -b:a ${kv}k`}
        else if(codec==="dca"){bitrateArg=` -b:a 1536k`}
        else{const probe=await api.runFfprobe(file);if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a&&a.bit_rate)bitrateArg=` -b:a ${a.bit_rate}`}}
      }
      cmd=`"${tp}" -y -i "${file}" -strict -2`;
      if(codec)cmd+=` -c:a ${codec}${bitrateArg}`;
      if(ch)cmd+=` -ac ${ch}`;else if(outFmt==="Stereo Downmix"||outFmt==="FLAC")cmd+=` -ac 2`;
      if(outFmt==="Stereo Downmix"&&dmQuality==="dpl2")cmd+=` -af "aresample=matrix_encoding=dplii"`;
      if(outFmt==="FLAC")cmd+=` -compression_level `+(flacCl==="Default"?"5":String(flacCl));
      cmd+=` "${dir}\\${name}_encoded${ext}"`;
      await runner.stream(cmd)}
    else{
      const tp=await api.resolveTool("TOOL_PATH");
      const ext=outFmt==="E-AC3"?".ec3":outFmt==="DTS"?".dts":outFmt==="DTS-HD"?".dtshd":outFmt==="FLAC"?".flac":outFmt==="WAV"?".wav":outFmt==="AAC"?".aac":outFmt==="Stereo Downmix"?".ac3":outFmt==="MP3"?".mp3":".ac3";
      const of2=`"${dir}\\${name}_encoded${ext}"`;
      const eacAcceptsBr=["AC3","E-AC3","DTS","Stereo Downmix","MP3"].includes(outFmt);
      const brFlag=(eacAcceptsBr&&br)?("-"+br):"";
      let downFlag="";
      if(outFmt==="Stereo Downmix"||channel==="2.0")downFlag=" -down2";
      else if(channel==="5.1")downFlag=" -down6";
      cmd=`"${tp}" "${file}" ${of2} ${brFlag}${downFlag}`;
      cmd=cmd.replace(/\s+/g," ").trim();await runner.stream(cmd)}};
  const runDtshdEncode=async()=>{
    if(!ensureApi()||!file)return;
    runner.clear();runner.setRunning(true);runner.setPct(0);
    const dir=file.replace(/\\[^\\]+$/,"");const name=file.replace(/^.*[\\/]/,"").replace(/\.[^.]+$/,"");
    const tempDir=dir+"\\DTS_Temp";await api.mkdir(tempDir);
    // Step 1: MediaInfo — Duration & FPS
    runner.append("=== STEP 1: MediaInfo ===\n");
    const mi=await api.resolveTool("MediaInfo_PATH");
    const durRes=await api.runCommand(`"${mi}" --Inform="Audio;%Duration/String3%" "${file}"`);
    const fpsRes=await api.runCommand(`"${mi}" --Inform="Video;%FrameRate%" "${file}"`);
    const rawDur=(durRes.stdout||"").trim();const rawFps=(fpsRes.stdout||"").trim()||"23.976";
    let duration=rawDur;const durM=rawDur.match(/(\d{2}):(\d{2}):(\d{2})\.(\d+)/);
    if(durM){const ms=parseInt(durM[4].padEnd(3,"0").slice(0,3));const fr=Math.round(ms*parseFloat(rawFps)/1000);duration=`${durM[1]}:${durM[2]}:${durM[3]}:${String(fr).padStart(2,"0")}`}
    runner.append(`Duration: ${duration}\nFPS: ${rawFps}\n\n`);runner.setPct(10);
    // Step 2: eac3to channel split to WAVs
    runner.append("=== STEP 2: eac3to → WAVS ===\n");
    const eac=await api.resolveTool("TOOL_PATH");
    const wavCmd=`"${eac}" "${file}" "${tempDir}\\kanal.wavs"`;
    runner.append("$ "+wavCmd+"\n");
    const wavId="wavs_"+Date.now();
    const unsub2=api.onStreamData(wavId,chunk=>{runner.append(chunk);const m=chunk.match(/(\d+)%/);if(m)runner.setPct(10+Math.round(parseInt(m[1])*0.25))});
    const wavRes=await api.runCommandStream(wavCmd,null,wavId);unsub2();
    if(!wavRes.success){runner.append("\n❌ eac3to WAVS failed\n");runner.setPct(-1);runner.setRunning(false);runner.setDone(true);return}
    runner.setPct(35);
    // Step 3: Generate XSE session file
    runner.append("\n=== STEP 3: XSE Template ===\n");
    const ch=dtshdCh;const layout=ch===8?"7.1 - L, R, C, LFE, Lss, Rss, Lsr, Rsr":"5.1 - L, R, C, LFE, Lss, Rss";
    const wavNames6=["L","R","C","LFE","SL","SR"];const wavNames8=["L","R","C","LFE","SL","SR","BL","BR"];
    const xseNames6=["L","R","C","LFE","Lss","Rss"];const xseNames8=["L","R","C","LFE","Lss","Rss","Lsr","Rsr"];
    const wavN=ch===8?wavNames8:wavNames6;const xseN=ch===8?xseNames8:xseNames6;
    let xml='<?xml version="1.0" encoding="UTF-8"?>\n<DTSHD_Master_Audio_Suite_Session Version="2.6">\n  <Config>\n    <DestinationFormat>Blu-ray Disc (.dtshd)</DestinationFormat>\n    <ChannelLayout>'+layout+'</ChannelLayout>\n    <SampleRate>48000</SampleRate>\n    <TCFrameRate>'+rawFps+'</TCFrameRate>\n    <Duration>'+duration+'</Duration>\n    <Bitrate>1509000</Bitrate>\n  </Config>\n  <InputFiles>\n';
    for(let i=0;i<ch;i++)xml+=`    <File Channel="${xseN[i]}">${tempDir}\\kanal.${wavN[i]}.wav</File>\n`;
    xml+='  </InputFiles>\n  <Output>\n    <File>'+tempDir+'\\cikti.dtshd</File>\n  </Output>\n</DTSHD_Master_Audio_Suite_Session>';
    const xsePath=tempDir+"\\gecici_gorev.xse";
    await api.writeFile(xsePath,xml);
    runner.append("XSE → "+xsePath+"\n\n");runner.setPct(45);
    // Step 4: DTSEncoder.jar
    runner.append("=== STEP 4: DTS Encoder ===\n");
    const jar=await api.resolveTool("DTSEncoder_PATH");const jarDir=jar.replace(/\\[^\\]+$/,"");
    const encCmd=`cd /d "${jarDir}" && java -Djava.library.path="." -jar "DTSEncoder.jar" -encode "${xsePath}"`;
    runner.append("$ "+encCmd+"\n");
    const encId="dtshd_"+Date.now();
    const unsub4=api.onStreamData(encId,chunk=>{runner.append(chunk);const m=chunk.match(/(\d+)%/);if(m)runner.setPct(45+Math.round(parseInt(m[1])*0.4))});
    const encRes=await api.runCommandStream(encCmd,jarDir,encId);unsub4();
    if(!encRes.success){runner.append("\n❌ DTS Encoder failed\n");runner.setPct(-1);runner.setRunning(false);runner.setDone(true);return}
    runner.setPct(85);
    // Step 5: Move output
    runner.append("\n=== STEP 5: Move Output ===\n");
    const finalName=`${dir}\\${name}_DTSHD.dtshd`;
    const mvCmd=`move /y "${tempDir}\\cikti.dtshd" "${finalName}"`;
    runner.append("$ "+mvCmd+"\n");
    const mvRes=await api.runCommand(mvCmd);
    runner.append(mvRes.success?`\n✅ Output: ${finalName}\n`:"\n❌ Move failed\n");
    runner.setPct(mvRes.success?100:-1);runner.setRunning(false);runner.setDone(true)};
  const bitrateRawBase=outFmt==="E-AC3"?BITRATES_EAC3:outFmt==="AC3"?BITRATES_ALL_RAW.filter(b=>b<=640):outFmt==="MP3"?BITRATES_MP3:outFmt==="MP2"?(mp2Mode==="mpeg2"?BITRATES_MP2_MPEG2:BITRATES_MP2_MPEG1):outFmt==="Opus"?BITRATES_OPUS:BITRATES_ALL_RAW;
  const bitrateRaw=outFmt==="E-AC3"&&inFmt==="DTS-HD"?[bitrateRawBase[0],192,...bitrateRawBase.slice(1)]:bitrateRawBase;
  const bitrateDisabled=outFmt==="WAV";
  const bitrateOpts=[{value:"Default",label:t("default_original")},...bitrateRaw.map(b=>({value:String(b),label:`${b} kbps`}))];
  const channelOpts=[{value:"Default",label:t("default_original")},...CHANNELS_LIST_RAW.filter(c=>outFmt==="Stereo Downmix"&&dmQuality==="dpl2"?c==="2.0":true).map(c=>({value:c,label:c}))];
  const engineOpts=ENGINES_BASE.filter(engineFilter).map(e=>({value:e.id,label:e.key?t(e.key):e.label}));
  const qualityOpts=[{value:"default",label:t("encode_quality_default")},{value:"dpl2",label:t("encode_quality_dpl2")}];
  const mp2ModeOpts=[{value:"mpeg1",label:t("encode_mp2_mpeg1")},{value:"mpeg2",label:t("encode_mp2_mpeg2")}];
  const flacClOpts=effEngine==="eac3to"?[{value:"Default",label:t("encode_cl_default")}]:(effEngine==="deezy"||effEngine==="flac")?Array.from({length:8},(_,i)=>({value:String(i+1),label:`${t("encode_cl")} ${i+1}`})):Array.from({length:12},(_,i)=>({value:String(i+1),label:`${t("encode_cl")} ${i+1}`}));
  return(<div><SectionTitle sub={t("encode_sub")}>{t("encode_title")}</SectionTitle><FileDropZone file={file} setFile={setFile} t={t}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:16}}><Card><div style={{fontSize:12,fontWeight:700,color:"#6366f1",marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>{t("encode_input")}</div><Select label={t("encode_format")} value={inFmt} onChange={setInFmt} options={outFmt==="MP3"&&MP3_INPUT_BY_ENGINE[effEngine]?MP3_INPUT_BY_ENGINE[effEngine]:outFmt==="MP2"&&MP2_INPUT_BY_ENGINE[effEngine]?MP2_INPUT_BY_ENGINE[effEngine]:outFmt==="Opus"&&OPUS_INPUT_BY_ENGINE[effEngine]?OPUS_INPUT_BY_ENGINE[effEngine]:FORMATS}/></Card><Card><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>{t("encode_output")}</div><Select label={t("encode_format")} value={outFmt} onChange={v=>setOutFmt(v)} options={OUT_FORMATS}/></Card></div>
    {outFmt==="DTS-HD"?<Card style={{marginTop:14}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>DTS-HD MA — Channel</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[[6,"encode_dtshd_6ch"],[8,"encode_dtshd_8ch"]].map(([n,k])=>(<div key={n} onClick={()=>setDtshdCh(n)} style={{padding:14,borderRadius:10,cursor:"pointer",textAlign:"center",background:dtshdCh===n?"#6366f118":"#0d0f1a",border:`1px solid ${dtshdCh===n?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:dtshdCh===n?"#818cf8":"#8a8fa6"}}>{t(k)}</div></div>))}</div></Card>
      :outFmt==="AC-4"?<Card style={{marginTop:14}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>AC-4 — Preset</div><div style={{display:"grid",gap:8}}>{AC4_PRESETS.map((p,i)=>(<div key={i} onClick={()=>setAc4Idx(i)} style={{padding:"14px 18px",borderRadius:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:ac4Idx===i?"#6366f118":"#0d0f1a",border:`1px solid ${ac4Idx===i?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:ac4Idx===i?"#818cf8":"#e2e4ed"}}>{p.label}</div><Badge color={ac4Idx===i?"#818cf8":"#8a8fa6"}>{p.chLabel}</Badge></div>))}</div></Card>
      :<div style={{display:"grid",gridTemplateColumns:(outFmt==="Stereo Downmix"||outFmt==="MP2")?"1fr 1fr 1fr 1fr":"1fr 1fr 1fr",gap:14,marginTop:14}}>{outFmt==="FLAC"?<Select label={t("encode_cl")} value={flacCl} onChange={setFlacCl} options={flacClOpts}/>:<Select label={t("encode_bitrate")} value={bitrate} onChange={setBitrate} options={bitrateOpts} disabled={bitrateDisabled}/>}<Select label={t("encode_channel")} value={channel} onChange={setChannel} options={channelOpts}/>{outFmt==="Stereo Downmix"&&<Select label={t("encode_quality")} value={dmQuality} onChange={setDmQuality} options={qualityOpts}/>}{outFmt==="MP2"&&<Select label={t("encode_mp2mode")} value={mp2Mode} onChange={setMp2Mode} options={mp2ModeOpts}/>}<Select label={t("encode_engine")} value={engine} onChange={setEngine} options={engineOpts}/></div>}
    <ActionButtons t={runner} file={file} setFile={setFile} running={runner.running} onRun={outFmt==="DTS-HD"?runDtshdEncode:()=>runEncode(false)} runLabel={t("encode_start")} i18n={t} extraButton={outFmt==="FLAC"?<Btn onClick={()=>setFlacInfoOpen(true)} style={{width:38,padding:"10px 0",justifyContent:"center",fontWeight:700}}>ℹ</Btn>:null}/>
    <Terminal output={runner.output} running={runner.running} percent={runner.pct} done={runner.done} onClear={runner.clear} t={t}/>
    <Popup open={warnPopup} onClose={()=>setWarnPopup(false)} title={"⚠ "+t("encode_warn_title")}><p style={{color:"#f59e0b",fontSize:13,lineHeight:1.7}}>{t("encode_warn_text")}</p><div style={{display:"flex",gap:10,marginTop:16}}><Btn primary onClick={()=>{setWarnPopup(false);runEncode(true)}}>{t("encode_continue")}</Btn><Btn onClick={()=>setWarnPopup(false)}>{t("cancel")}</Btn></div></Popup>
    <Popup open={flacInfoOpen} onClose={()=>setFlacInfoOpen(false)} title={t("encode_cl_info_title")}><div style={{color:"#c5c9e0",fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{t("encode_cl_info")}</div></Popup>
  </div>)}

/* ── CHANNEL JOIN & ENCODE ── */
function ChannelJoinPage({t}){
  const[mode,setMode]=useState(6);const[fmt,setFmt]=useState("AC3");const[bitrate,setBitrate]=useState("");
  const[files,setFiles]=useState(Array(8).fill(null));
  const runner=useRunner("join",t);
  const chLabels=mode===2?JOIN_CH_LABELS_2:mode===6?JOIN_CH_LABELS_6:JOIN_CH_LABELS_8;
  const modeLabel=mode===2?"Stereo":mode===6?"5.1 Surround":"7.1 Surround";
  const isLossless=fmt==="FLAC"||fmt==="PCM";
  const brList=isLossless?[]:(JOIN_BITRATES[fmt]&&JOIN_BITRATES[fmt][mode])||[];
  useEffect(()=>{if(brList.length>0&&!brList.includes(bitrate))setBitrate(brList[0]);if(isLossless)setBitrate("")},[fmt,mode]);// eslint-disable-line
  const setChFile=async(idx)=>{if(!ensureApi())return;const p=await api.selectMediaFile();if(p){const nf=[...files];nf[idx]=p;setFiles(nf)}};
  const clearFiles=()=>setFiles(Array(8).fill(null));
  const addMultiple=async()=>{if(!ensureApi())return;const ps=await api.selectMultipleFiles();if(ps&&ps.length>0){const nf=[...files];
    const chMap=mode===2?["L","R"]:mode===6?["L","R","C","LFE","SL","SR"]:["L","R","C","LFE","SL","SR","BL","BR"];
    const getName=p=>(p.match(/[^\\/]+$/)||[""])[0].toUpperCase();
    const matched=Array(mode).fill(null);const used=new Set();
    const aliases={L:["L","FL","LEFT"],R:["R","FR","RIGHT"],C:["C","FC","CENTER"],LFE:["LFE"],SL:["SL","LS","SURROUND LEFT"],SR:["SR","RS","SURROUND RIGHT"],BL:["BL","LB","BACK LEFT"],BR:["BR","RB","BACK RIGHT"]};
    for(let i=0;i<chMap.length;i++){const ch=chMap[i];const alts=aliases[ch]||[ch];const idx=ps.findIndex((p,j)=>{if(used.has(j))return false;const nm=getName(p);const dot=nm.lastIndexOf(".");const base=dot>0?nm.slice(0,dot):nm;for(const alt of alts){if(alt.includes(" ")){if(base.includes(alt))return true}else{const parts=base.split(/[_.\-\s]+/);if(parts[parts.length-1]===alt)return true}}return false});if(idx>=0){matched[i]=ps[idx];used.add(idx)}}
    let slot=0;for(let j=0;j<ps.length;j++){if(used.has(j))continue;while(slot<mode&&matched[slot]!==null)slot++;if(slot<mode){matched[slot]=ps[j];slot++}}
    for(let i=0;i<mode;i++)if(matched[i])nf[i]=matched[i];setFiles(nf)}};
  const activeFiles=files.slice(0,mode);
  const allFilled=activeFiles.every(Boolean);

  const runJoin=async()=>{
    if(!ensureApi()||!allFilled)return;
    const ff=await api.resolveTool("FFMPEG_PATH");const dir=files[0].replace(/\\[^\\]+$/,"");
    const layout=mode===2?"stereo":mode===6?"5.1":"7.1";
    const chMap=mode===2?"0.0-FL|1.0-FR":mode===6?"0.0-FL|1.0-FR|2.0-FC|3.0-LFE|4.0-BL|5.0-BR":"0.0-FL|1.0-FR|2.0-FC|3.0-LFE|4.0-BL|5.0-BR|6.0-SL|7.0-SR";
    const inputs=activeFiles.map(f=>`-i "${f}"`).join(" ");
    const codec=fmt==="AC3"?"ac3":fmt==="E-AC3"?"eac3":fmt==="DTS"?"dca":fmt==="AAC"?"aac":fmt==="MP3"?"libmp3lame":fmt==="FLAC"?"flac":"pcm_s24le";
    const ext=fmt==="AC3"?"ac3":fmt==="E-AC3"?"eac3":fmt==="DTS"?"dts":fmt==="AAC"?"m4a":fmt==="MP3"?"mp3":fmt==="FLAC"?"flac":"wav";
    const brTag=isLossless?(fmt==="FLAC"?"Lossless":"Uncompressed"):(bitrate+"k");
    const outName=`Encode_${brTag}_${fmt}.${ext}`;
    let filterExtra="";let syncVal="0.00533";let brParam=isLossless?"":`-b:a ${bitrate}k`;
    if(fmt==="MP3"){filterExtra=",aresample=async=1,pan=stereo|c0=c0|c1=c1";syncVal="0"}
    if(fmt==="DTS"&&mode>=6){const cl=mode===6?"5.1":"7.1";filterExtra=`,channelmap=channel_layout=${cl}`;syncVal="0.012"}
    if(fmt==="FLAC"||fmt==="PCM")syncVal="0";
    const cmd=`"${ff}" ${inputs} -filter_complex "join=inputs=${mode}:channel_layout=${layout}:map=${chMap}${filterExtra},aresample=async=1" -c:a ${codec} ${brParam} -strict -2 -ar 48000 -ss ${syncVal} -fflags +genpts -avoid_negative_ts make_zero "${dir}\\${outName}"`;
    await runner.stream(cmd)};

  return(<div><SectionTitle sub={t("join_sub")}>{t("join_title")}</SectionTitle>
    <Card style={{marginBottom:16}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("join_mode")}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>{[[2,"join_stereo"],[6,"join_51"],[8,"join_71"]].map(([n,k])=>(<div key={n} onClick={()=>{setMode(n);clearFiles()}} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:mode===n?"#6366f118":"#0d0f1a",border:`1px solid ${mode===n?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:mode===n?"#818cf8":"#8a8fa6"}}>{t(k)}</div></div>))}</div></Card>
    <Card style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{fontSize:12,fontWeight:700,color:"#f59e0b",textTransform:"uppercase",letterSpacing:1}}>{t("join_assign")} — {modeLabel}</span><Btn small onClick={addMultiple}>{t("join_add_files")}</Btn></div>
      <div style={{display:"grid",gap:6}}>{chLabels.map((lk,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderRadius:8,background:files[i]?"#10b98110":"#0d0f1a",border:`1px solid ${files[i]?"#10b98133":"#1e2240"}`}}><span style={{fontSize:12,color:"#818cf8",fontWeight:700,width:140}}>{t(lk)}</span><span style={{flex:1,fontSize:11,color:"#6b70a0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{files[i]?files[i].replace(/^.*[\\/]/,""):"—"}</span><Btn small onClick={()=>setChFile(i)}>📂</Btn></div>))}</div></Card>
    <Card><div style={{display:"grid",gridTemplateColumns:isLossless?"1fr":"1fr 1fr",gap:14}}>
      <Select label={t("join_format")} value={fmt} onChange={v=>{setFmt(v);setBitrate("")}} options={JOIN_FORMATS}/>
      {!isLossless&&<Select label={t("join_bitrate")} value={bitrate} onChange={setBitrate} options={brList.map(b=>({value:b,label:`${b} kbps`}))}/>}</div>
      {fmt==="MP3"&&mode>2&&<div style={{marginTop:10,fontSize:11,color:"#f59e0b"}}>⚠ MP3: Stereo Downmix</div>}
      <ActionButtons t={runner} file={allFilled?"ok":null} setFile={()=>clearFiles()} running={runner.running} onRun={runJoin} runLabel={t("join_start")} i18n={t}/></Card>
    <Terminal output={runner.output} running={runner.running} percent={runner.pct} done={runner.done} onClear={runner.clear} t={t}/>
  </div>)}

/* ── AUDIO DEMUX ── */
function AudioDemuxPage({t}){const[file,setFile]=useState(null);const[mode,setMode]=useState("truehd");const[wavsCh,setWavsCh]=useState(6);const runner=useRunner("demux",t);
  const modes=[
    {id:"truehd",label:t("demux_truehd"),desc:t("demux_truehd_desc"),suffix:"~Core.ac3",args:"-core"},
    {id:"dtshd",label:t("demux_dtshd"),desc:t("demux_dtshd_desc"),suffix:"~Core.dts",args:"-core"},
    {id:"dtscore",label:t("demux_dtscore"),desc:t("demux_dtscore_desc"),suffix:"~Core.ac3",args:"-core"},
    {id:"wav",label:t("demux_wav"),desc:t("demux_wav_desc"),suffix:".wav",args:""},
    {id:"wavs",label:t("demux_wavs"),desc:t("demux_wavs_desc"),suffix:".wavs",args:""},
    {id:"mono",label:t("demux_mono"),desc:t("demux_mono_desc"),suffix:"_mono.wav",args:"-mono"},
  ];
  const cur=modes.find(m=>m.id===mode);
  const run=async()=>{
    if(!ensureApi()||!file)return;
    const n=file.replace(/\.[^.]+$/,"");
    if(mode==="wavs"){
      const ff=await api.resolveTool("FFMPEG_PATH");
      if(wavsCh===8){
        const cmd=`"${ff}" -y -i "${file}" -filter_complex "channelsplit=channel_layout=7.1[FL][FR][FC][LFE][SL][SR][BL][BR]" -map "[FL]" "${n}_L.wav" -map "[FR]" "${n}_R.wav" -map "[FC]" "${n}_C.wav" -map "[LFE]" "${n}_LFE.wav" -map "[SL]" "${n}_SL.wav" -map "[SR]" "${n}_SR.wav" -map "[BL]" "${n}_BL.wav" -map "[BR]" "${n}_BR.wav"`;
        await runner.stream(cmd);
      }else{
        const cmd=`"${ff}" -y -i "${file}" -filter_complex "channelsplit=channel_layout=5.1[FL][FR][FC][LFE][BL][BR]" -map "[FL]" "${n}_L.wav" -map "[FR]" "${n}_R.wav" -map "[FC]" "${n}_C.wav" -map "[LFE]" "${n}_LFE.wav" -map "[BL]" "${n}_SL.wav" -map "[BR]" "${n}_SR.wav"`;
        await runner.stream(cmd);
      }
      return;
    }
    const tp=await api.resolveTool("TOOL_PATH");
    const cmd=`"${tp}" "${file}" "${n}${cur.suffix}" ${cur.args}`.trim();
    await runner.stream(cmd);
  };
  return(<div><SectionTitle sub={t("demux_sub")}>{t("demux_title")}</SectionTitle><FileDropZone file={file} setFile={setFile} t={t}/><div style={{display:"grid",gap:8,marginTop:16}}>{modes.map(m=>(<div key={m.id} onClick={()=>setMode(m.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:10,cursor:"pointer",background:mode===m.id?"#6366f112":"#13152140",border:`1px solid ${mode===m.id?"#6366f144":"#1e2240"}`}}><div style={{width:18,height:18,borderRadius:9,border:`2px solid ${mode===m.id?"#6366f1":"#3d4166"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{mode===m.id&&<div style={{width:10,height:10,borderRadius:5,background:"#6366f1"}}/>}</div><div><div style={{fontSize:14,fontWeight:600,color:"#e2e4ed"}}>{m.label}</div><div style={{fontSize:11,color:"#6b70a0"}}>{m.desc}</div></div></div>))}</div>
    {mode==="wavs"&&<Card style={{marginTop:12}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:10,textTransform:"uppercase",letterSpacing:1}}>{t("demux_wavs_ch")}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[[6,"encode_dtshd_6ch"],[8,"encode_dtshd_8ch"]].map(([n,k])=>(<div key={n} onClick={()=>setWavsCh(n)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:wavsCh===n?"#6366f118":"#0d0f1a",border:`1px solid ${wavsCh===n?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:wavsCh===n?"#818cf8":"#8a8fa6"}}>{t(k)}</div></div>))}</div></Card>}
    <ActionButtons t={runner} file={file} setFile={setFile} running={runner.running} onRun={run} runLabel={t("demux_start")} i18n={t}/><Terminal output={runner.output} running={runner.running} percent={runner.pct} done={runner.done} onClear={runner.clear} t={t}/></div>)}


/* ── FPS CONVERSION ── */
function FPSConversionPage({t}){const[file,setFile]=useState(null);const[fpsIdx,setFpsIdx]=useState(0);const[fmt,setFmt]=useState("AC3");const[bitrate,setBitrate]=useState("Default");const[diffPopup,setDiffPopup]=useState(false);const runner=useRunner("fps",t);
  const isLossless=LOSSLESS_FMTS.includes(fmt);const fps=FPS_OPTIONS[fpsIdx];const targetShort=fps.to.startsWith("23")?"23":fps.to.startsWith("24")?"24":"25";const ext=fmt==="AC3"?".ac3":fmt==="E-AC3"?".ec3":fmt==="DTS"?".dts":fmt==="FLAC"?".flac":fmt==="WAV"?".wav":fmt==="AAC"?".aac":fmt==="M4A"?".m4a":fmt==="TrueHD"?".thd":fmt==="DTS-HD"?".dtshd":".ac3";
  useEffect(()=>{if(isLossless)setBitrate("Default")},[isLossless]);
  const run=async()=>{if(!ensureApi()||!file)return;const tp=await api.resolveTool("TOOL_PATH");const name=file.replace(/\.[^.]+$/,"");const dir=file.replace(/\\[^\\]+$/,"");const br=bitrate==="Default"?"":` -${bitrate}`;const outName=`${name}.${targetShort}Fps${ext}`;
    if(isLossless){
      runner.clear();runner.setRunning(true);runner.setPct(0);
      const wd=dir+"\\fps_temp";await api.mkdir(wd);
      const outBase=name.replace(/^.*[\\/]/,"")+`.${targetShort}Fps`;
      const c1=`"${tp}" "${file}" "${wd}\\temp_all.wav" -${fps.from} -changeTo${fps.to}`;
      runner.append(`=== ${t("fps_step1")}: ${t("fps_wav_fps")} ===\n$ ${c1}\n\n`);
      const r1=await api.runCommand(c1);runner.append(r1.stdout+"\n"+r1.stderr+"\n");
      if(!r1.success){runner.append("❌ "+t("fps_step_fail"));runner.setRunning(false);runner.setDone(true);return}
      runner.setPct(40);
      if(fmt==="DTS-HD"){
        const outPath=`${dir}\\${outBase}.dtshd`;
        const c2=`"${tp}" "${wd}\\temp_all.wav" "${outPath}"`;
        runner.append(`\n=== ${t("fps_step2")}: eac3to WAV → DTS-HD ===\n$ ${c2}\n\n`);
        const r2=await api.runCommand(c2);runner.append(r2.stdout+"\n"+r2.stderr+"\n");
        runner.append(r2.success?"\n✅ "+t("fps_done_dtshd")+"\nOutput: "+outPath:"\n❌ "+t("error"));
        runner.setPct(r2.success?100:-1);runner.setRunning(false);runner.setDone(true);return;
      }
      if(fmt==="WAV"){
        const outPath=`${dir}\\${outBase}.wav`;
        await api.runCommand(`move /y "${wd}\\temp_all.wav" "${outPath}"`);
        runner.append("\n✅ "+t("fps_done_wav")+"\nOutput: "+outPath);
        runner.setPct(100);runner.setRunning(false);runner.setDone(true);return;
      }
      // TrueHD: channelsplit + DEE
      const ff=await api.resolveTool("FFMPEG_PATH");
      const c2=`"${ff}" -y -i "${wd}\\temp_all.wav" -filter_complex "channelsplit=channel_layout=5.1[FL][FR][FC][LFE][BL][BR]" -map "[FL]" "${wd}\\L.wav" -map "[FR]" "${wd}\\R.wav" -map "[FC]" "${wd}\\C.wav" -map "[LFE]" "${wd}\\LFE.wav" -map "[BL]" "${wd}\\Ls.wav" -map "[BR]" "${wd}\\Rs.wav"`;
      runner.append(`\n=== ${t("fps_step2")}: ${t("fps_channel_split")} ===\n$ ${c2}\n\n`);
      const r2=await api.runCommand(c2);runner.append(r2.stdout+"\n"+r2.stderr+"\n");
      if(!r2.success){runner.append("❌ "+t("fps_step_fail"));runner.setRunning(false);runner.setDone(true);return}
      runner.setPct(55);
      runner.append(`\n=== ${t("fps_step3")}: job.xml ===\n`);
      const xmlLines=['<?xml version="1.0"?>','<job_config>','  <input>','    <audio>','      <wav>','        <file_name>L.wav</file_name>','        <file_name>R.wav</file_name>','        <file_name>C.wav</file_name>','        <file_name>LFE.wav</file_name>','        <file_name>Ls.wav</file_name>','        <file_name>Rs.wav</file_name>','      </wav>','      <channel_layout>L R C LFE Ls Rs</channel_layout>','    </audio>','  </input>','  <filter>','    <audio>','      <pcm_to_truehd>','        <bit_depth>24</bit_depth>','      </pcm_to_truehd>','    </audio>','  </filter>','  <o>','    <audio>','      <truehd>',`        <file_name>${outBase}.thd</file_name>`,'      </truehd>','    </audio>','  </o>','</job_config>'];
      const xml=xmlLines.join("\r\n");
      await api.writeFile(wd+"\\job.xml",xml);runner.append("OK\n");runner.setPct(60);
      runner.append(`\n=== ${t("fps_step4")}: ${t("fps_dee")} ===\n`);
      const dee=await api.resolveTool("DEE_PATH");
      const c3=`"${dee}" -x "${wd}\\job.xml"`;
      runner.append("$ "+c3+"\n\n");
      const r3=await api.runCommandConsole(c3,wd);
      runner.append(r3.success?"\n✅ "+t("fps_done_truehd"):"\n❌ DEE error");
      runner.setPct(100);runner.setRunning(false);runner.setDone(true);return}
    // E-AC3, FLAC: ffmpeg
    if(fmt==="E-AC3"||fmt==="FLAC"){const ff=await api.resolveTool("FFMPEG_PATH");const ratio=parseFloat(fps.to)/parseFloat(fps.from);
      const fmtCodec=fmt==="E-AC3"?"eac3":"flac";
      let fmtBr="";if(fmt==="E-AC3"){if(bitrate!=="Default"){fmtBr=` -b:a ${bitrate}k`}else{const probe=await api.runFfprobe(file);if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a&&a.bit_rate)fmtBr=` -b:a ${a.bit_rate}`}}}
      await runner.stream(`"${ff}" -y -i "${file}" -af "atempo=${ratio.toFixed(6)}" -c:a ${fmtCodec}${fmtBr} "${outName}"`);return}
    if(fmt==="M4A"){const ff=await api.resolveTool("FFMPEG_PATH");const ratio=parseFloat(fps.to)/parseFloat(fps.from);
      let fmtBr="";if(bitrate!=="Default"){fmtBr=` -b:a ${bitrate}k`}else{const probe=await api.runFfprobe(file);if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a&&a.bit_rate)fmtBr=` -b:a ${a.bit_rate}`}}
      await runner.stream(`"${ff}" -y -i "${file}" -af "atempo=${ratio.toFixed(6)}" -c:a aac${fmtBr} "${outName}"`);return}
    // AAC: ffmpeg decode → temp WAV → QAAC encode
    if(fmt==="AAC"){const ff=await api.resolveTool("FFMPEG_PATH");const ratio=parseFloat(fps.to)/parseFloat(fps.from);
      let qa;try{qa=await api.resolveTool("QAAC_PATH")}catch(e){}
      if(!qa)try{qa=await api.resolveTool("QAAC64_PATH")}catch(e){}
      if(!qa){const tryPaths=["qaac64.exe","qaac.exe"];for(const tp2 of tryPaths){const chk=await api.runCommand(`where "${tp2}" 2>nul`);if(chk.success&&chk.stdout.trim()){qa=chk.stdout.trim().split(/\r?\n/)[0];break}}}
      if(!qa){runner.clear();runner.append("❌ "+t("fps_qaac_not_found"));runner.setDone(true);return}
      let qaBr="";if(bitrate!=="Default"){qaBr=` --abr ${bitrate}`}else{const probe=await api.runFfprobe(file);if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a&&a.bit_rate)qaBr=` --abr ${Math.round(a.bit_rate/1000)}`}}
      const tempWav=`${name}_fps_temp.wav`;
      runner.clear();runner.setRunning(true);runner.setPct(0);runner.append(`=== ${t("fps_step1")}: FFmpeg decode + FPS ===\n`);
      const c1=`"${ff}" -y -i "${file}" -af "atempo=${ratio.toFixed(6)}" "${tempWav}"`;runner.append("$ "+c1+"\n\n");
      const r1=await api.runCommand(c1);runner.append((r1.stdout||"")+(r1.stderr||"")+"\n");
      if(!r1.success){runner.append("\n❌ FFmpeg error");runner.setPct(-1);runner.setRunning(false);runner.setDone(true);return}
      runner.setPct(50);runner.append(`\n=== ${t("fps_step2")}: QAAC encode ===\n`);
      const c2=`"${qa}" --no-delay${qaBr} "${tempWav}" -o "${outName}"`;runner.append("$ "+c2+"\n\n");
      const r2=await api.runCommand(c2);runner.append((r2.stdout||"")+(r2.stderr||"")+"\n");
      if(!r2.success){
        runner.append("\n⚠ "+t("fps_qaac_fail")+`\n\n=== ${t("fps_step2")}B: ${t("fps_ffmpeg_aac")} ===\n`);runner.setPct(60);
        let ffBr="";if(bitrate!=="Default"){ffBr=` -b:a ${bitrate}k`}else{const probe=await api.runFfprobe(file);if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a&&a.bit_rate)ffBr=` -b:a ${a.bit_rate}`}}
        const c3=`"${ff}" -y -i "${tempWav}" -c:a aac${ffBr} "${outName}"`;runner.append("$ "+c3+"\n\n");
        const r3=await api.runCommand(c3);runner.append((r3.stdout||"")+(r3.stderr||"")+"\n");
        await api.runCommand(`del "${tempWav}" 2>nul`);
        runner.append(r3.success?"\n✅ "+t("fps_done_aac_ffmpeg"):"\n❌ FFmpeg AAC error");runner.setPct(r3.success?100:-1);runner.setRunning(false);runner.setDone(true);return}
      await api.runCommand(`del "${tempWav}" 2>nul`);
      runner.append("\n✅ "+t("fps_done_aac_qaac"));runner.setPct(100);runner.setRunning(false);runner.setDone(true);return}
    // Normal eac3to
    let fpsRateBr=br;
    if(!fpsRateBr){const probe=await api.runFfprobe(file);if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a&&a.bit_rate)fpsRateBr=` -${Math.round(a.bit_rate/1000)}`}}
    await runner.stream(`"${tp}" "${file}" "${outName}"${fpsRateBr} -${fps.from} -changeTo${fps.to}`)};
  const bitrateOpts=isLossless?[{value:"Default",label:t("default_lossless")}]:[{value:"Default",label:t("default_original")},...BITRATES_ALL_RAW.map(b=>({value:String(b),label:`${b} kbps`}))];
  return(<div><SectionTitle sub={t("fps_sub")}>{t("fps_title")}</SectionTitle><FileDropZone file={file} setFile={setFile} t={t}/>
    <Card style={{marginTop:16}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("fps_select")}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8}}>{FPS_OPTIONS.map((f,i)=>(<div key={i} onClick={()=>setFpsIdx(i)} style={{padding:"12px 16px",borderRadius:10,cursor:"pointer",textAlign:"center",fontSize:14,fontWeight:600,background:fpsIdx===i?"#6366f118":"#0d0f1a",border:`1px solid ${fpsIdx===i?"#6366f1":"#1e2240"}`,color:fpsIdx===i?"#818cf8":"#8a8fa6"}}>{f.from} <span style={{color:"#10b981"}}>→</span> {f.to}</div>))}</div></Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:14}}><Select label={t("fps_format")} value={fmt} onChange={setFmt} options={FPS_FORMATS}/><Select label={t("fps_bitrate")} value={bitrate} onChange={setBitrate} options={bitrateOpts}/></div>
    {isLossless&&<Card style={{marginTop:10,padding:12}}><div style={{fontSize:11,color:"#f59e0b"}}>⚠ {fmt} {t("fps_lossless_warn")}</div></Card>}
    {fmt==="E-AC3"&&<Card style={{marginTop:10,padding:12}}><div style={{fontSize:11,color:"#818cf8"}}>ℹ {t("fps_eac3_info")}</div></Card>}
    <div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"}}><Btn primary disabled={!file||runner.running} onClick={run}>{runner.running?t("processing"):t("fps_convert")}</Btn><Btn onClick={()=>setDiffPopup(true)}>{t("fps_diff_btn")}</Btn>{runner.running&&<Btn danger onClick={runner.cancel}>⛔ {t("cancel")}</Btn>}{!runner.running&&(file||runner.done)&&<Btn onClick={()=>{setFile(null);runner.reset()}}>🔄 {t("reset")}</Btn>}</div>
    <Terminal output={runner.output} running={runner.running} percent={runner.pct} done={runner.done} onClear={runner.clear} t={t}/>
    <Popup open={diffPopup} onClose={()=>setDiffPopup(false)} title={t("fps_diff_title")}><div style={{color:"#c5c9e0",fontSize:13,lineHeight:1.8}}><div style={{padding:"12px 16px",background:"#0d0f1a",borderRadius:8,marginBottom:10}}><span style={{color:"#f59e0b",fontWeight:700}}>59.940 fps</span> video → <span style={{color:"#10b981",fontWeight:700}}>23.976 fps</span> audio</div><div style={{padding:"12px 16px",background:"#0d0f1a",borderRadius:8}}><span style={{color:"#f59e0b",fontWeight:700}}>60.000 fps</span> video → <span style={{color:"#10b981",fontWeight:700}}>24.000 fps</span> audio</div></div></Popup>
  </div>)}


/* ── DOLBY ATMOS ── */
const ATMOS_BR_51=[768,1024];const ATMOS_BR_71=[1024,1536];
const AE_BR_BLURAY=[1152,1280,1408,1536,1664];const AE_BR_STREAMING=[384,448,576,640,768,1024];
function DolbyAtmosPage({t}){const[tab,setTab]=useState("audioencode");const[file,setFile]=useState(null);
  const[atmosCh,setAtmosCh]=useState(6);const[atmosBr,setAtmosBr]=useState(768);const[atmosOut,setAtmosOut]=useState("");
  const[metaPath,setMetaPath]=useState("");const[presentation,setPresentation]=useState("3");const[metaInfoPopup,setMetaInfoPopup]=useState(false);
  const[aeMode,setAeMode]=useState("bluray");const[aeBr,setAeBr]=useState(1536);const[aeInputType,setAeInputType]=useState("mkv");const[aeMissing,setAeMissing]=useState(false);
  const tp=useRunner("atmos_pack",t);const tt=useRunner("atmos_meta",t);const ta=useRunner("atmos_fix",t);const ae=useRunner("atmos_audioencode",t);
  const ct=tab==="packing"?tp:tab==="metadata"?tt:tab==="audioencode"?ae:ta;
  const brOpts=atmosCh===6?ATMOS_BR_51:ATMOS_BR_71;
  const aeBrOpts=aeMode==="bluray"?AE_BR_BLURAY:AE_BR_STREAMING;
  useEffect(()=>{if(!brOpts.includes(atmosBr))setAtmosBr(brOpts[0])},[atmosCh]);// eslint-disable-line
  useEffect(()=>{if(!aeBrOpts.includes(aeBr))setAeBr(aeMode==="bluray"?1536:768)},[aeMode]);// eslint-disable-line
  useEffect(()=>{(async()=>{if(!ensureApi())return;const dz=await api.resolveTool("DEEZY_PATH");const th=await api.resolveTool("Truehdd_PATH");const isAbs=p=>/^([A-Za-z]:[\\\/]|[\\\/])/.test(p||"");setAeMissing(!isAbs(dz)||!isAbs(th))})()},[]);// eslint-disable-line
  const tabs=[{id:"audioencode",label:t("atmos_tab_audioencode"),icon:"🎚"},{id:"fix",label:t("atmos_tab_fix"),icon:"🔧"},{id:"metadata",label:t("atmos_tab_metadata"),icon:"📋"},{id:"packing",label:t("atmos_tab_packing"),icon:"📦"}];
  const PRES_FOLDERS={0:"stereo_ses",1:"surround51_ses",2:"surround71_ses",3:"atmos_ses"};
  const runAtmosPack=async()=>{if(!ensureApi()||!file)return;const dee=await api.resolveTool("DEE_PATH");const dir=atmosOut||file.replace(/\\[^\\]+$/,"");const n=file.replace(/^.*[\\/]/,"").replace(/\.[^.]+$/,"");
    const xmlPath=dir+"\\atmos_profile.xml";
    const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<job_config>\n  <input>\n    <audio>\n      <atmos_mezz version="1">\n        <file_name>${file.replace(/^.*[\\/]/,"")}</file_name>\n        <storage>\n          <local>\n            <path>${file.replace(/\\[^\\]+$/,"")}</path>\n          </local>\n        </storage>\n      </atmos_mezz>\n    </audio>\n  </input>\n  <filter>\n    <audio>\n      <atmos_mezz_to_atmos_ddp version="3">\n        <data_rate>${atmosBr}</data_rate>\n      </atmos_mezz_to_atmos_ddp>\n    </audio>\n  </filter>\n  <output>\n    <ec3 version="1">\n      <file_name>${n}_atmos.ec3</file_name>\n      <storage>\n        <local>\n          <path>${dir}</path>\n        </local>\n      </storage>\n    </ec3>\n  </output>\n</job_config>`;
    await api.writeFile(xmlPath,xml);
    tp.clear();tp.setRunning(true);tp.setPct(0);tp.append("=== Dolby Encoding Engine ===\n");
    tp.append("XML → "+xmlPath+"\n\n");
    await tp.stream(`"${dee}" --xml "${xmlPath}"`)};
  const runMetadata=async()=>{if(!ensureApi()||!file)return;const tr2=await api.resolveTool("Truehdd_PATH");const baseDir=metaPath||file.replace(/\\[^\\]+$/,"");const op=baseDir+"\\"+PRES_FOLDERS[presentation];await tt.stream(`"${tr2}" decode --presentation ${presentation} --output-path "${op}" "${file}"`)};
  const runAtmosFix=async()=>{if(!ensureApi()||!file)return;const af=await api.resolveTool("AtmosFix_PATH");const n=file.replace(/\.[^.]+$/,"");await ta.stream(`"${af}" -input "${file}" -output "${n}_fixed.eac3"`)};
  const runAtmosAudioEncode=async()=>{if(!ensureApi()||!file||aeMissing)return;const dz=await api.resolveTool("DEEZY_PATH");await ae.stream(`"${dz}" encode atmos --atmos-mode ${aeMode} --bitrate ${aeBr} "${file}"`)};
  return(<div><SectionTitle sub={t("atmos_sub")}>{t("atmos_title")}</SectionTitle>
    <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>{tabs.map(tb=>(<button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${tab===tb.id?"#6366f1":"#2d3148"}`,background:tab===tb.id?"#6366f118":"transparent",color:tab===tb.id?"#818cf8":"#6b70a0",cursor:"pointer",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>{tb.icon} {tb.label}</button>))}</div>
    <FileDropZone file={file} setFile={setFile} t={t}/>
    {tab==="packing"&&<div>
      <Card style={{marginTop:16}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("atmos_pack_ch")}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[[6,"encode_dtshd_6ch"],[8,"encode_dtshd_8ch"]].map(([n,k])=>(<div key={n} onClick={()=>setAtmosCh(n)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:atmosCh===n?"#6366f118":"#0d0f1a",border:`1px solid ${atmosCh===n?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:atmosCh===n?"#818cf8":"#8a8fa6"}}>{t(k)}</div></div>))}</div></Card>
      <Card style={{marginTop:12}}><div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("atmos_pack_bitrate")}</div><div style={{display:"grid",gridTemplateColumns:`repeat(${brOpts.length},1fr)`,gap:8}}>{brOpts.map(br=>(<div key={br} onClick={()=>setAtmosBr(br)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:atmosBr===br?"#6366f118":"#0d0f1a",border:`1px solid ${atmosBr===br?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:atmosBr===br?"#818cf8":"#8a8fa6"}}>{br} kbps</div></div>))}</div></Card>
      <Card style={{marginTop:12}}><div><label style={{fontSize:11,color:"#8a8fa6"}}>{t("atmos_pack_output")}</label><div style={{display:"flex",gap:8,marginTop:4}}><input value={atmosOut} onChange={e=>setAtmosOut(e.target.value)} placeholder={t("other_meta_empty")} style={{flex:1,background:"#1a1d2e",border:"1px solid #2d3148",borderRadius:8,padding:"10px 12px",color:"#e2e4ed",fontSize:13,outline:"none"}}/><Btn small onClick={async()=>{if(ensureApi()){const p=await api.selectFolder();if(p)setAtmosOut(p)}}}>📂</Btn></div></div></Card>
      <ActionButtons t={tp} file={file} setFile={setFile} running={tp.running} onRun={runAtmosPack} runLabel={t("atmos_pack_start")} i18n={t}/>
    </div>}
    {tab==="metadata"&&<Card style={{marginTop:16}}><div style={{display:"flex",flexDirection:"column",gap:10}}><div><label style={{fontSize:11,color:"#8a8fa6"}}>{t("other_meta_output")}</label><div style={{display:"flex",gap:8,marginTop:4}}><input value={metaPath} onChange={e=>setMetaPath(e.target.value)} placeholder={t("other_meta_empty")} style={{flex:1,background:"#1a1d2e",border:"1px solid #2d3148",borderRadius:8,padding:"10px 12px",color:"#e2e4ed",fontSize:13,outline:"none"}}/><Btn small onClick={async()=>{if(ensureApi()){const p=await api.selectFolder();if(p)setMetaPath(p)}}}>📂</Btn></div></div><Select label="Presentation" value={presentation} onChange={setPresentation} options={[{value:"0",label:"Presentation 0 (Stereo)"},{value:"1",label:"Presentation 1 (5.1 Surround)"},{value:"2",label:"Presentation 2 (7.1 Surround)"},{value:"3",label:"Presentation 3 (Atmos)"}]}/></div><Btn primary style={{marginTop:12}} disabled={!file||tt.running} onClick={runMetadata}>{tt.running?t("processing"):t("other_meta_extract")}</Btn></Card>}
    {tab==="audioencode"&&<div>
      {aeMissing&&<Card style={{marginTop:16,padding:14,border:"1px solid #ef444466",background:"#ef444412"}}><div style={{fontSize:12,color:"#ef4444",fontWeight:700}}>⚠ {t("atmos_ae_engine_missing")}</div></Card>}
      <Card style={{marginTop:16}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("atmos_ae_mode")}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[["bluray","atmos_ae_bluray"],["streaming","atmos_ae_streaming"]].map(([m,k])=>(<div key={m} onClick={()=>setAeMode(m)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:aeMode===m?"#6366f118":"#0d0f1a",border:`1px solid ${aeMode===m?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:aeMode===m?"#818cf8":"#8a8fa6"}}>{t(k)}</div></div>))}</div></Card>
      <Card style={{marginTop:12}}><div style={{fontSize:12,fontWeight:700,color:"#f59e0b",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("atmos_ae_bitrate")}</div><div style={{display:"grid",gridTemplateColumns:`repeat(${aeBrOpts.length},1fr)`,gap:8}}>{aeBrOpts.map(br=>(<div key={br} onClick={()=>setAeBr(br)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:aeBr===br?"#6366f118":"#0d0f1a",border:`1px solid ${aeBr===br?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:aeBr===br?"#818cf8":"#8a8fa6"}}>{br} kbps</div></div>))}</div></Card>
      <Card style={{marginTop:12}}><div style={{fontSize:12,fontWeight:700,color:"#06b6d4",marginBottom:14,textTransform:"uppercase",letterSpacing:1}}>{t("atmos_ae_input_type")}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>{[["mkv","atmos_ae_input_mkv"],["thd","atmos_ae_input_thd"]].map(([m,k])=>(<div key={m} onClick={()=>setAeInputType(m)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:aeInputType===m?"#6366f118":"#0d0f1a",border:`1px solid ${aeInputType===m?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:aeInputType===m?"#818cf8":"#8a8fa6"}}>{t(k)}</div></div>))}</div><div style={{marginTop:10,fontSize:11,color:"#6b70a0"}}>ℹ {t("atmos_ae_output_info")}</div></Card>
      <ActionButtons t={ae} file={aeMissing?null:file} setFile={setFile} running={ae.running} onRun={runAtmosAudioEncode} runLabel={t("atmos_ae_start")} i18n={t}/>
    </div>}
    {tab==="fix"&&<Card style={{marginTop:16}}><div style={{fontSize:13,fontWeight:700,color:"#e2e4ed",marginBottom:14}}>🌐 {t("other_atmos_title")}</div><p style={{fontSize:12,color:"#6b70a0",lineHeight:1.7,marginBottom:14}}>{t("other_atmos_desc")}</p><div style={{display:"grid",gap:10}}><div style={{padding:"14px 18px",borderRadius:10,background:"#0d0f1a",border:"1px solid #1e2240"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:14,fontWeight:600,color:"#e2e4ed"}}>{t("other_atmos_chanmap")}</div><div style={{fontSize:11,color:"#8b5cf6",marginTop:2}}>{t("other_atmos_chanmap_desc")}</div></div><Btn small primary disabled={!file||ta.running} onClick={runAtmosFix}>{t("other_atmos_apply")}</Btn></div></div></div><div style={{marginTop:14,padding:12,background:"#0d0f1a",borderRadius:8,fontSize:11,color:"#6b70a0",lineHeight:1.7}}><strong style={{color:"#f59e0b"}}>⚠</strong> {t("other_atmos_warn")}<br/><br/><strong style={{color:"#818cf8"}}>→</strong> {t("other_atmos_workflow")}</div></Card>}
    {ct.running&&<div style={{marginTop:12}}><Btn danger onClick={ct.cancel}>⛔ {t("cancel")}</Btn></div>}
    {!ct.running&&(file||ct.done)&&<div style={{display:"flex",gap:8,marginTop:12}}><Btn onClick={()=>{setFile(null);ct.reset()}}>🔄 {t("reset")}</Btn>{tab==="metadata"&&<Btn onClick={()=>setMetaInfoPopup(true)}>ℹ Presentations</Btn>}</div>}
    <Terminal output={ct.output} running={ct.running} percent={ct.pct} done={ct.done} onClear={ct.clear} t={t}/>
    <Popup open={metaInfoPopup} onClose={()=>setMetaInfoPopup(false)} title={t("meta_info_title")}><div style={{display:"grid",gap:12}}>{[{p:"0",name:t("meta_p0_name"),ch:t("meta_p0_ch"),desc:t("meta_p0_desc"),color:"#10b981"},{p:"1",name:t("meta_p1_name"),ch:t("meta_p1_ch"),desc:t("meta_p1_desc"),color:"#6366f1"},{p:"2",name:t("meta_p2_name"),ch:t("meta_p2_ch"),desc:t("meta_p2_desc"),color:"#f59e0b"},{p:"3",name:t("meta_p3_name"),ch:t("meta_p3_ch"),desc:t("meta_p3_desc"),color:"#ef4444"}].map(pr=>(<div key={pr.p} style={{padding:"14px 18px",borderRadius:10,background:"#0d0f1a",border:`1px solid ${pr.color}33`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:14,fontWeight:700,color:pr.color}}>Presentation {pr.p}</span><span style={{fontSize:12,color:"#e2e4ed",fontWeight:600}}>— {pr.name}</span><Badge color={pr.color}>{pr.ch}</Badge></div><div style={{fontSize:12,color:"#8a8fa6",lineHeight:1.7}}>{pr.desc}</div></div>))}</div></Popup>
  </div>)}


/* ── OTHER OPTIONS ── */
function OtherOptionsPage({t}){const[tab,setTab]=useState("volume");const[file,setFile]=useState(null);const[volPreset,setVolPreset]=useState(3);
  const tv=useRunner("other_vol",t);const tf=useRunner("other_fix",t);const ts=useRunner("other_spec",t);const ti=useRunner("other_info",t);const tm=useRunner("other_minfo",t);
  const ct=tab==="volume"?tv:tab==="fix"?tf:tab==="spectrum"?ts:tab==="info"?ti:tm;
  const volLabels=[t("other_vol_light"),t("other_vol_medium"),t("other_vol_strong"),t("other_vol_default")];
  const tabs=[{id:"volume",label:t("other_volume"),icon:"🔊"},{id:"fix",label:t("other_fix"),icon:"🔧"},{id:"spectrum",label:t("other_spectrum"),icon:"📊"},{id:"info",label:t("other_info"),icon:"ℹ"},{id:"movieinfo",label:t("other_movieinfo"),icon:"🎬"}];
  const runVolume=async()=>{if(!ensureApi()||!file)return;const ff=await api.resolveTool("FFMPEG_PATH");const n=file.replace(/\.[^.]+$/,"");await tv.stream(`"${ff}" -y -i "${file}" -af "${VOL_PRESETS_BASE[volPreset].filter}" "${n}_boosted.ac3"`)};
  const runFix=async(m)=>{if(!ensureApi()||!file)return;const ext2=(file.match(/\.([^.\\]+)$/)||[])[1]||"ac3";const n=file.replace(/\.[^.]+$/,"");
    if(m===1){const tp=await api.resolveTool("TOOL_PATH");await tf.stream(`"${tp}" "${file}" "${n}_fixed.${ext2}" -fix -silence -progressnumbers`)}
    else if(m===2){const ff=await api.resolveTool("FFMPEG_PATH");await tf.stream(`"${ff}" -y -err_detect ignore_err -i "${file}" -c copy "${n}_crc_fixed.${ext2}"`)}
    else if(m===3){const ff=await api.resolveTool("FFMPEG_PATH");const probe=await api.runFfprobe(file);let codec="aac",brArg="";if(probe.success){const a=(probe.data.streams||[]).find(s=>s.codec_type==="audio");if(a){codec=a.codec_name==="ac3"?"ac3":a.codec_name==="eac3"?"eac3":a.codec_name==="dts"?"dca":a.codec_name==="mp2"?"mp2":a.codec_name==="aac"?"aac":a.codec_name||"aac";if(a.bit_rate)brArg=` -b:a ${a.bit_rate}`}}await tf.stream(`"${ff}" -y -i "${file}" -af "anlmdn=s=7:p=0.002:r=0.015:m=15:o=o" -c:a ${codec}${brArg} "${n}_denoised.${ext2}"`)}
    else if(m===4){const mk=await api.resolveTool("MKVMERGE_PATH");await tf.stream(`"${mk}" -o "${n}_reencode.mka" "${file}"`)}};
  const runSpectrum=async()=>{if(!ensureApi()||!file)return;const ff=await api.resolveTool("FFMPEG_PATH");const n=file.replace(/\.[^.]+$/,"");await ts.stream(`"${ff}" -y -i "${file}" -lavfi showspectrumpic=s=1024x512 "${n}_spectrum.png"`)};
  const runInfo=async()=>{if(!ensureApi()||!file)return;ti.clear();ti.setRunning(true);ti.append(t("other_querying")+"...\n\n");const[res,dn]=await Promise.all([api.runFfprobe(file),api.getDialnorm(file)]);let txt="";if(res.success){const d=res.data;if(d.format)txt+=`Format: ${d.format.format_long_name}\nDuration: ${parseFloat(d.format.duration||0).toFixed(2)}s\nBitrate: ${Math.round((d.format.bit_rate||0)/1000)} kbps\n\n`;(d.streams||[]).forEach((s,i)=>{txt+=`--- Stream #${i} (${s.codec_type}) ---\nCodec: ${s.codec_long_name||s.codec_name}\n`;if(s.codec_type==="audio")txt+=`Channels: ${s.channels}\nSample Rate: ${s.sample_rate} Hz\nBitrate: ${Math.round((s.bit_rate||0)/1000)} kbps\n`;txt+="\n"})}txt+=`\n══ Dialnorm: ${dn.dialnorm} dB ══\n`;if(dn.fps)txt+=`FPS: ${dn.fps}\n`;txt+="\n"+dn.raw;ti.setOutput(txt);ti.setRunning(false);ti.setDone(true)};
  const runMovieInfo=async()=>{if(!ensureApi()||!file)return;tm.clear();tm.setRunning(true);tm.append("MediaInfo...\n");const r=await api.runMediainfo(file);tm.setOutput(r.success?r.output:"❌ "+r.error);tm.setRunning(false);tm.setDone(true)};
  return(<div><SectionTitle sub={t("other_sub")}>{t("other_title")}</SectionTitle>
    <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>{tabs.map(tb=>(<button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${tab===tb.id?"#6366f1":"#2d3148"}`,background:tab===tb.id?"#6366f118":"transparent",color:tab===tb.id?"#818cf8":"#6b70a0",cursor:"pointer",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>{tb.icon} {tb.label}</button>))}</div>
    <FileDropZone file={file} setFile={setFile} t={t}/>
    {tab==="volume"&&<Card style={{marginTop:16}}><div style={{fontSize:13,fontWeight:700,color:"#e2e4ed",marginBottom:14}}>{t("other_vol_title")}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8}}>{VOL_PRESETS_BASE.map((p,i)=>(<div key={i} onClick={()=>setVolPreset(i)} style={{padding:"14px",borderRadius:10,cursor:"pointer",textAlign:"center",background:volPreset===i?"#6366f115":"#0d0f1a",border:`1px solid ${volPreset===i?"#6366f1":"#1e2240"}`}}><div style={{fontSize:14,fontWeight:700,color:volPreset===i?"#818cf8":"#e2e4ed"}}>{volLabels[i]}</div><div style={{marginTop:6}}><Badge color="#10b981">{p.value}</Badge></div></div>))}</div><ActionButtons t={tv} file={file} setFile={setFile} running={tv.running} onRun={runVolume} runLabel={t("start")} i18n={t}/></Card>}
    {tab==="fix"&&<Card style={{marginTop:16}}><div style={{fontSize:13,fontWeight:700,color:"#e2e4ed",marginBottom:14}}>🔧 {t("other_fix_title")}</div><div style={{display:"grid",gap:8}}>{[{id:1,label:t("other_fix_clean"),desc:t("other_fix_clean_desc"),color:"#f59e0b"},{id:2,label:t("other_fix_crc"),desc:t("other_fix_crc_desc"),color:"#ef4444"},{id:3,label:t("other_fix_noise"),desc:t("other_fix_noise_desc"),color:"#10b981"},{id:4,label:t("other_fix_reencode"),desc:t("other_fix_reencode_desc"),color:"#818cf8"}].map(f=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderRadius:10,background:"#0d0f1a",border:"1px solid #1e2240"}}><div><div style={{fontSize:14,fontWeight:600,color:"#e2e4ed"}}>{f.label}</div><div style={{fontSize:11,color:f.color,marginTop:2}}>{f.desc}</div></div><Btn small primary disabled={!file||tf.running} onClick={()=>runFix(f.id)}>{t("other_fix_btn")}</Btn></div>))}</div></Card>}
    {tab==="spectrum"&&<Card style={{marginTop:16}}><Btn primary disabled={!file||ts.running} onClick={runSpectrum}>{ts.running?t("processing"):t("other_spectrum_btn")}</Btn></Card>}
    {tab==="info"&&<Card style={{marginTop:16}}><Btn primary disabled={!file||ti.running} onClick={runInfo}>{ti.running?t("other_querying"):t("other_info_btn")}</Btn></Card>}
    {tab==="movieinfo"&&<Card style={{marginTop:16}}><Btn primary disabled={!file||tm.running} onClick={runMovieInfo}>{tm.running?t("other_querying"):t("other_movieinfo_btn")}</Btn></Card>}
    {ct.running&&<div style={{marginTop:12}}><Btn danger onClick={ct.cancel}>⛔ {t("cancel")}</Btn></div>}
    {!ct.running&&(file||ct.done)&&<div style={{display:"flex",gap:8,marginTop:12}}><Btn onClick={()=>{setFile(null);ct.reset()}}>🔄 {t("reset")}</Btn></div>}
    <Terminal output={ct.output} running={ct.running} percent={ct.pct} done={ct.done} onClear={ct.clear} t={t}/>
  </div>)}


/* ── MOVIE DEMUX ── */
function MovieDemuxPage({t}){
  const[section,setSection]=useState("movie");const[tool,setTool]=useState("MKVToolnix");const[file,setFile]=useState(null);
  const[tracks,setTracks]=useState([]);const[selected,setSelected]=useState({});const[hasChapters,setHasChapters]=useState(false);const[chapterSel,setChapterSel]=useState(false);const[chapterFmt,setChapterFmt]=useState("xml");
  const[scanning,setScanning]=useState(false);const[rawOutput,setRawOutput]=useState("");
  const tm2=useRunner("movie_demux",t);const td=useRunner("disc_demux",t);const th=useRunner("hdr_demux",t);
  const[dvdFolder,setDvdFolder]=useState(null);const[dvdTracks,setDvdTracks]=useState([]);const[dvdSelected,setDvdSelected]=useState({});
  const[vcdSlots,setVcdSlots]=useState([null,null]);const[vcdOutFmt,setVcdOutFmt]=useState("Default");const[vcdBitrate,setVcdBitrate]=useState(192);const[vcdMergePopup,setVcdMergePopup]=useState(false);const[hdrFile,setHdrFile]=useState(null);

  const dgResolveMpls=useCallback(async(fp)=>{if(/\.mpls$/i.test(fp))return{mpls:fp,root:fp.replace(/[\\\/]BDMV[\\\/]PLAYLIST[\\\/][^\\\/]+$/i,"")};
    const dgRoot=fp.replace(/([\\\/]BDMV([\\\/]+(PLAYLIST|STREAM))?|[\\\/](PLAYLIST|STREAM))[\\\/]*$/i,"");
    const pl=dgRoot+"\\BDMV\\PLAYLIST";const r=await api.runCommand(`dir "${pl}\\*.mpls" /b /o-s 2>nul`);
    const files=(r.stdout||"").split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    return{mpls:files[0]?pl+"\\"+files[0]:null,root:dgRoot}},[]);
  const scanFile=useCallback(async(fp,st)=>{if(!ensureApi()||!fp)return;setScanning(true);setTracks([]);setSelected({});setRawOutput("");
    if(st==="MKVToolnix"){const r=await api.scanTracksMkvmerge(fp);if(r.success){setTracks(r.tracks);setHasChapters(r.chapters);const s={};r.tracks.forEach(tk=>s[tk.id]=true);setSelected(s)}}
    else if(st==="Eac3to"){const r=await api.scanTracksEac3to(fp);if(r.success){setTracks(r.tracks.map(tk=>({...tk,codec:tk.desc,language:"",name:tk.desc})));const s={};r.tracks.forEach(tk=>s[tk.id]=true);setSelected(s)}setRawOutput(r.raw||"")}
    else{const{mpls}=await dgResolveMpls(fp);if(!mpls){setRawOutput("❌ No .mpls found under BDMV\\PLAYLIST");setScanning(false);return}const r=await api.scanTracksDgdemux(mpls);setRawOutput((r.raw||"")+"\n\n📄 Playlist: "+mpls)}setScanning(false)},[dgResolveMpls]);
  useEffect(()=>{if(file&&section==="movie")scanFile(file,tool)},[file,tool,scanFile,section]);

  const toggleTrack=(id,sel,setSel)=>{setSel(p=>({...p,[id]:!p[id]}))};
  const typeIcon=tp=>tp==="video"?"🎬":tp==="audio"?"🔊":tp==="subtitles"?"💬":"📄";
  const typeColor=tp=>tp==="video"?"#6366f1":tp==="audio"?"#10b981":tp==="subtitles"?"#f59e0b":"#8a8fa6";
  const guessExt=tk=>tk.type==="video"?(/hevc|h\.265/i.test(tk.codec)?"hevc":"h264"):tk.type==="audio"?(/ac-3|ac3/i.test(tk.codec)?"ac3":/dts/i.test(tk.codec)?"dts":/truehd/i.test(tk.codec)?"thd":/aac/i.test(tk.codec)?"aac":/flac/i.test(tk.codec)?"flac":/mp2/i.test(tk.codec)?"mp2":"mka"):tk.type==="subtitles"?(/pgs|hdmv/i.test(tk.codec)?"sup":/ass|ssa/i.test(tk.codec)?"ass":"srt"):"bin";

  const runDemux=async()=>{if(!ensureApi()||!file)return;const dir=file.replace(/\\[^\\]+$/,"")+"\\demux_output";
    if(tool==="MKVToolnix"){const sel2=tracks.filter(tk=>selected[tk.id]).map(tk=>({id:tk.id,ext:guessExt(tk)}));if(!sel2.length&&!chapterSel)return;tm2.clear();tm2.setRunning(true);tm2.setPct(0);tm2.append("MKVExtract...\n");const r=await api.demuxMkvextract(file,sel2,dir,chapterSel?chapterFmt:null);tm2.append(r.stdout+"\n"+r.stderr+(r.success?`\n✅ → ${r.outputDir}`:"\n❌ "+r.error));tm2.setPct(r.success?100:-1);tm2.setRunning(false);tm2.setDone(true);if(r.success)api.openFolder(r.outputDir)}
    else if(tool==="Eac3to"){const sel2=tracks.filter(tk=>selected[tk.id]);const e=await api.resolveTool("TOOL_PATH");const bn=file.replace(/^.*[\\/]/,"").replace(/\.[^.]+$/,"");const args=sel2.map(tk=>`${tk.id}:"${dir}\\${bn}_${tk.id}.${guessExt(tk)}"`).join(" ");await tm2.stream(`mkdir "${dir}" 2>nul & "${e}" "${file}" ${args}`)}
    else{const d=await api.resolveTool("DGDEMUX_PATH");const{mpls,root:dgRoot}=await dgResolveMpls(file);if(!mpls){tm2.clear();tm2.append("❌ No .mpls found under BDMV\\PLAYLIST\n");tm2.setDone(true);return}const dgDir=dgRoot+"\\demux_output";await tm2.stream(`mkdir "${dgDir}" 2>nul & "${d}" -i "${mpls}" -o "${dgDir}"`)}};

  // DVD
  const getDvdVts=f=>{let v=f;if(!v.toLowerCase().endsWith("video_ts"))v+="\\VIDEO_TS";return v};
  const scanDvd=async()=>{if(!ensureApi()||!dvdFolder)return;const vts=getDvdVts(dvdFolder);setScanning(true);setDvdTracks([]);setDvdSelected({});const dirRes=await api.runCommand(`dir "${vts}\\VTS_*_*.VOB" /b /o-s 2>nul`);const vobs=(dirRes.stdout||"").split(/\r?\n/).filter(f2=>f2.trim()&&/VTS_\d+_[1-9]\d*\.VOB/i.test(f2.trim()));if(!vobs.length){setScanning(false);return}const res=await api.runFfprobe(vts+"\\"+vobs[0].trim());if(res.success&&res.data){const trks=(res.data.streams||[]).map((s,i)=>({id:i,type:s.codec_type==="video"?"video":s.codec_type==="audio"?"audio":"subtitles",codec:s.codec_long_name||s.codec_name,desc:`${s.codec_name} ${s.channels?s.channels+"ch":""} ${s.tags?.language||""}`.trim()}));setDvdTracks(trks);const s={};trks.forEach(tk=>s[tk.id]=true);setDvdSelected(s)}setScanning(false)};
  const runDvdDemux=async()=>{if(!ensureApi()||!dvdFolder)return;const ff=await api.resolveTool("FFMPEG_PATH");const vts=getDvdVts(dvdFolder);const dirRes=await api.runCommand(`dir "${vts}\\VTS_*_*.VOB" /b /on 2>nul`);const vobs=(dirRes.stdout||"").split(/\r?\n/).filter(f2=>f2.trim()&&/VTS_\d+_[1-9]\d*\.VOB/i.test(f2.trim()));if(!vobs.length)return;const concat="concat:"+vobs.map(v=>vts+"\\"+v.trim()).join("|");const dir=dvdFolder+"\\demux_output";const sel2=dvdTracks.filter(tk=>dvdSelected[tk.id]);if(!sel2.length)return;td.clear();td.setRunning(true);td.setPct(0);td.append(t("disc_dvd_demux")+"...\n\n");for(let i=0;i<sel2.length;i++){const tk=sel2[i];const ext2=tk.type==="video"?"mpg":tk.type==="audio"?(/ac3/i.test(tk.codec)?"ac3":/mp2/i.test(tk.codec)?"mp2":"mka"):"sub";const cmd=`mkdir "${dir}" 2>nul & "${ff}" -y -i "${concat}" -map 0:${tk.id} -c copy "${dir}\\track_${tk.id}.${ext2}"`;td.append(`Track #${tk.id}...\n`);const r=await api.runCommand(cmd);td.append(r.success?"✅\n":"❌\n");td.setPct(Math.round((i+1)/sel2.length*100))}td.append(`\n✅ ${t("disc_dvd_demux")} → ${dir}`);td.setRunning(false);td.setDone(true);api.openFolder(dir)};

  // VCD
  const addVcdSlot=()=>setVcdSlots(p=>[...p,null]);const removeVcdSlot=idx=>{if(vcdSlots.length<=1)return;setVcdSlots(p=>p.filter((_,i)=>i!==idx))};
  const runVcd=async(merge)=>{if(!ensureApi())return;setVcdMergePopup(false);const files=vcdSlots.filter(Boolean);if(!files.length)return;const ff=await api.resolveTool("FFMPEG_PATH");const dir=files[0].replace(/\\[^\\]+$/,"");td.clear();td.setRunning(true);td.setPct(0);td.append("VCD Demux...\n\n");const isOrig=vcdOutFmt==="Default";
    if(!merge){for(let i=0;i<files.length;i++){const outExt=isOrig?"mp2":vcdOutFmt;const out=`${dir}\\cd${i+1}.${outExt}`;td.append(`CD${i+1} ${t("disc_extracting")}\n`);const cmd=isOrig?`"${ff}" -y -i "${files[i]}" -vn -c:a copy "${out}"`:`"${ff}" -y -i "${files[i]}" -vn -b:a ${vcdBitrate}k "${out}"`;await api.runCommand(cmd);td.setPct(Math.round((i+1)/files.length*100))}td.append(`\n✅ ${t("disc_separate")} → ${dir}`);td.setRunning(false);td.setDone(true);return}
    const mp2s=[];for(let i=0;i<files.length;i++){const out=`${dir}\\cd${i+1}_temp.mp2`;mp2s.push(out);td.append(`CD${i+1} ${t("disc_extracting")}\n`);await api.runCommand(`"${ff}" -y -i "${files[i]}" -vn -c:a copy "${out}"`);td.setPct(Math.round((i+1)/files.length*50))}
    const list=mp2s.map(f2=>`file '${f2.replace(/\\/g,"/")}'`).join("\n");await api.writeFile(dir+"\\concat.txt",list);const finalExt=isOrig?"mp2":vcdOutFmt;const final=`${dir}\\vcd_merged.${finalExt}`;td.append(t("disc_merging")+"\n");td.setPct(75);
    const cmd=isOrig?`"${ff}" -y -f concat -safe 0 -i "${dir}\\concat.txt" -c:a copy "${final}"`:`"${ff}" -y -f concat -safe 0 -i "${dir}\\concat.txt" -b:a ${vcdBitrate}k "${final}"`;const r=await api.runCommand(cmd);
    for(const f2 of mp2s)await api.runCommand(`del "${f2}" 2>nul`);await api.runCommand(`del "${dir}\\concat.txt" 2>nul`);
    td.append(r.success?`\n✅ ${t("disc_merged")} → ${final}`:"\n❌ "+r.error);td.setPct(100);td.setRunning(false);td.setDone(true)};

  // HDR
  const runDoVi=async()=>{if(!ensureApi()||!hdrFile)return;const dt=await api.resolveTool("Dovi_Tool_PATH");const ff=await api.resolveTool("FFMPEG_PATH");const n=hdrFile.replace(/\.[^.]+$/,"");await th.stream(`"${ff}" -i "${hdrFile}" -c:v copy -bsf:v hevc_mp4toannexb -f hevc - | "${dt}" extract-rpu -o "${n}_RPU.bin" -`)};
  const runHdr10Plus=async()=>{if(!ensureApi()||!hdrFile)return;const ff=await api.resolveTool("FFMPEG_PATH");const hp=await api.resolveTool("HDR10Plus_PATH");const n=hdrFile.replace(/\.[^.]+$/,"");await th.stream(`"${ff}" -i "${hdrFile}" -c:v copy -bsf:v hevc_mp4toannexb -f hevc - | "${hp}" extract -o "${n}_hdr10plus.json" -`)};

  const sections=[{id:"movie",label:t("movie_section_movie"),icon:"🎬"},{id:"disc",label:t("movie_section_disc"),icon:"💿"},{id:"hdr",label:t("movie_section_hdr"),icon:"🌈"}];
  const TrackList=({trks,sel,setSel})=>(<Card style={{marginTop:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><span style={{fontSize:12,fontWeight:700,color:"#10b981"}}>{trks.length} {t("movie_track")}</span><div style={{display:"flex",gap:6}}><Btn small onClick={()=>{const s={};trks.forEach(tk=>s[tk.id]=true);setSel(s)}}>{t("select_all")}</Btn><Btn small onClick={()=>setSel({})}>{t("select_none")}</Btn></div></div><div style={{display:"grid",gap:6,maxHeight:350,overflow:"auto"}}>{trks.map(tk=>(<div key={tk.id} onClick={()=>toggleTrack(tk.id,sel,setSel)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:8,cursor:"pointer",background:sel[tk.id]?"#6366f110":"transparent",border:`1px solid ${sel[tk.id]?"#6366f133":"#1e2240"}`}}><input type="checkbox" checked={!!sel[tk.id]} readOnly style={{accentColor:"#6366f1",width:16,height:16}}/><span style={{fontSize:16}}>{typeIcon(tk.type)}</span><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8}}><Badge color={typeColor(tk.type)}>{tk.type}</Badge><span style={{fontSize:13,fontWeight:600,color:"#e2e4ed"}}>#{tk.id}</span>{tk.language&&tk.language!=="und"&&<Badge>{tk.language}</Badge>}</div><div style={{fontSize:11,color:"#6b70a0",marginTop:3}}>{tk.codec||tk.desc}{tk.channels?` • ${tk.channels}ch`:""}</div></div></div>))}</div>{hasChapters&&section==="movie"&&<div style={{marginTop:12,display:"flex",alignItems:"center",gap:14}}><Toggle checked={chapterSel} onChange={setChapterSel} label={t("movie_chapter_extract")}/>{chapterSel&&<div style={{display:"flex",gap:6}}>{["xml","txt"].map(f2=>(<button key={f2} onClick={()=>setChapterFmt(f2)} style={{padding:"4px 12px",borderRadius:6,border:`1px solid ${chapterFmt===f2?"#6366f1":"#2d3148"}`,background:chapterFmt===f2?"#6366f118":"transparent",color:chapterFmt===f2?"#818cf8":"#6b70a0",cursor:"pointer",fontSize:11,fontWeight:600}}>{f2.toUpperCase()}</button>))}</div>}</div>}</Card>);

  return(<div><SectionTitle sub={t("movie_sub")}>{t("movie_title")}</SectionTitle>
    <div style={{display:"flex",gap:6,marginBottom:18}}>{sections.map(s=>(<button key={s.id} onClick={()=>setSection(s.id)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${section===s.id?"#6366f1":"#2d3148"}`,background:section===s.id?"#6366f118":"transparent",color:section===s.id?"#818cf8":"#6b70a0",cursor:"pointer",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:6}}>{s.icon} {s.label}</button>))}</div>

    {section==="movie"&&<div><FileDropZone file={file} setFile={setFile} t={t} folder={tool==="DGDemux"}/>
      <Card style={{marginTop:16}}><div style={{display:"flex",gap:8}}>{DEMUX_TOOLS_LIST.map(tl=>(<button key={tl} onClick={()=>{setTool(tl);setFile(null);setTracks([]);setRawOutput("")}} style={{flex:1,padding:"14px",borderRadius:10,border:`1px solid ${tool===tl?"#6366f1":"#2d3148"}`,background:tool===tl?"#6366f118":"#0d0f1a",color:tool===tl?"#818cf8":"#8a8fa6",cursor:"pointer",fontSize:14,fontWeight:700}}>{tl}</button>))}</div></Card>
      {scanning&&<Card style={{marginTop:14,padding:18,textAlign:"center"}}><div style={{color:"#818cf8"}}>🔍 {t("movie_scanning")}</div></Card>}
      {tracks.length>0&&!scanning&&<TrackList trks={tracks} sel={selected} setSel={setSelected}/>}
      {rawOutput&&!tracks.length&&<pre style={{marginTop:14,padding:14,fontSize:11,color:"#a5b4c8",background:"#0a0c16",borderRadius:8,maxHeight:300,overflow:"auto",whiteSpace:"pre-wrap"}}>{rawOutput}</pre>}
      <ActionButtons t={tm2} file={file} setFile={f2=>{setFile(f2);setTracks([])}} running={tm2.running} onRun={runDemux} runLabel={t("movie_demux_selected")} i18n={t}/>
      <Terminal output={tm2.output} running={tm2.running} percent={tm2.pct} done={tm2.done} onClear={tm2.clear} t={t}/>
    </div>}

    {section==="disc"&&<div>
      <Card><div style={{fontSize:13,fontWeight:700,color:"#e2e4ed",marginBottom:14}}>💿 {t("movie_dvd_title")}</div>
        <div style={{display:"flex",gap:8}}><input value={dvdFolder||""} readOnly placeholder={t("movie_dvd_folder")} style={{flex:1,background:"#1a1d2e",border:"1px solid #2d3148",borderRadius:8,padding:"10px 12px",color:"#e2e4ed",fontSize:13,outline:"none"}}/><Btn onClick={async()=>{if(ensureApi()){const p=await api.selectFolder();if(p){setDvdFolder(p);setDvdTracks([])}}}}> 📂</Btn></div>
        {dvdFolder&&<Btn primary small style={{marginTop:10}} onClick={scanDvd} disabled={scanning}>{scanning?t("movie_scanning"):t("movie_dvd_scan")}</Btn>}
        {dvdTracks.length>0&&<div style={{marginTop:14}}><div style={{display:"grid",gap:6,maxHeight:250,overflow:"auto"}}>{dvdTracks.map(tk=>(<div key={tk.id} onClick={()=>toggleTrack(tk.id,dvdSelected,setDvdSelected)} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 14px",borderRadius:8,cursor:"pointer",background:dvdSelected[tk.id]?"#6366f110":"transparent",border:`1px solid ${dvdSelected[tk.id]?"#6366f133":"#1e2240"}`}}><input type="checkbox" checked={!!dvdSelected[tk.id]} readOnly style={{accentColor:"#6366f1"}}/><span style={{fontSize:13,color:"#e2e4ed"}}>#{tk.id} — {tk.desc||tk.codec}</span></div>))}</div><Btn primary style={{marginTop:10}} disabled={td.running} onClick={runDvdDemux}>{t("movie_dvd_start")}</Btn></div>}
      </Card>
      <Card style={{marginTop:16}}><div style={{fontSize:13,fontWeight:700,color:"#e2e4ed",marginBottom:14}}>💿 {t("movie_vcd_title")}</div>
        <div style={{display:"grid",gap:8}}>{vcdSlots.map((f2,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,color:"#818cf8",fontWeight:700,width:40}}>CD{i+1}</span><input value={f2?f2.replace(/^.*[\\/]/,""):""} readOnly placeholder={`CD${i+1}`} style={{flex:1,background:"#1a1d2e",border:"1px solid #2d3148",borderRadius:8,padding:"8px 12px",color:"#e2e4ed",fontSize:12,outline:"none"}}/><Btn small onClick={async()=>{if(ensureApi()){const p=await api.selectMediaFile();if(p){const s=[...vcdSlots];s[i]=p;setVcdSlots(s)}}}}>📂</Btn>{vcdSlots.length>1&&<Btn small danger onClick={()=>removeVcdSlot(i)}>✕</Btn>}</div>))}</div>
        <Btn small style={{marginTop:8}} onClick={addVcdSlot}>{t("movie_vcd_add")}</Btn>
        <div style={{display:"grid",gridTemplateColumns:vcdOutFmt==="Default"?"1fr":"1fr 1fr",gap:10,marginTop:12}}><Select label={t("movie_vcd_output")} value={vcdOutFmt} onChange={setVcdOutFmt} options={[{value:"Default",label:t("movie_vcd_default_mp2")},{value:"ac3",label:"AC3"},{value:"mp3",label:"MP3"}]}/>{vcdOutFmt!=="Default"&&<Select label={t("encode_bitrate")} value={vcdBitrate} onChange={v=>setVcdBitrate(Number(v))} options={BITRATES_LOW.map(b=>({value:b,label:`${b} kbps`}))}/>}</div>
        <Btn primary style={{marginTop:12}} disabled={!vcdSlots.some(Boolean)||td.running} onClick={()=>setVcdMergePopup(true)}>{t("movie_vcd_demux")}</Btn>
        <Popup open={vcdMergePopup} onClose={()=>setVcdMergePopup(false)} title="VCD Demux"><p style={{color:"#c5c9e0",fontSize:13,lineHeight:1.7,marginBottom:16}}>{t("movie_vcd_merge_q")}</p><div style={{display:"flex",gap:10}}><Btn primary onClick={()=>runVcd(true)}>{t("movie_vcd_merge")}</Btn><Btn onClick={()=>runVcd(false)}>{t("movie_vcd_separate")}</Btn></div></Popup>
      </Card>
      <ActionButtons t={td} file={dvdFolder} setFile={f2=>{setDvdFolder(f2);setDvdTracks([])}} running={td.running} onRun={()=>{}} runLabel="" i18n={t}/>
      <Terminal output={td.output} running={td.running} percent={td.pct} done={td.done} onClear={td.clear} t={t}/>
    </div>}

    {section==="hdr"&&<div><FileDropZone file={hdrFile} setFile={setHdrFile} t={t}/>
      <Card style={{marginTop:16}}><div style={{fontSize:13,fontWeight:700,color:"#e2e4ed",marginBottom:14}}>🌈 {t("movie_hdr_title")}</div>
        <div style={{display:"grid",gap:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderRadius:10,background:"#0d0f1a",border:"1px solid #1e2240"}}><div><div style={{fontSize:14,fontWeight:600,color:"#e2e4ed"}}>{t("movie_hdr_dovi")}</div><div style={{fontSize:11,color:"#8b5cf6",marginTop:2}}>dovi_tool → RPU.bin</div></div><Btn small primary disabled={!hdrFile||th.running} onClick={runDoVi}>{t("movie_hdr_extract")}</Btn></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderRadius:10,background:"#0d0f1a",border:"1px solid #1e2240"}}><div><div style={{fontSize:14,fontWeight:600,color:"#e2e4ed"}}>{t("movie_hdr_hdr10")}</div><div style={{fontSize:11,color:"#f59e0b",marginTop:2}}>hdr10plus_tool → JSON</div></div><Btn small primary disabled={!hdrFile||th.running} onClick={runHdr10Plus}>{t("movie_hdr_extract")}</Btn></div>
        </div>
      </Card>
      <ActionButtons t={th} file={hdrFile} setFile={setHdrFile} running={th.running} onRun={()=>{}} runLabel="" i18n={t}/>
      <Terminal output={th.output} running={th.running} percent={th.pct} done={th.done} onClear={th.clear} t={t}/>
    </div>}
  </div>)}


/* ── SETTINGS ── */
function SettingsPage({t}){const[tools,setTools]=useState(DEFAULT_TOOLS);const[resolved,setResolved]=useState({});const[loaded,setLoaded]=useState(false);const[saved,setSaved]=useState(false);
  useEffect(()=>{if(ensureApi()){api.getSettings().then(s=>{if(s)setTools(s);setLoaded(true)});api.resolveAllTools().then(r=>setResolved(r))}else setLoaded(true)},[]);
  const updateTool=(k,v)=>{setTools(p=>({...p,[k]:v}));setSaved(false)};const handleSave=async()=>{if(ensureApi()){await api.saveSettings(tools);setResolved(await api.resolveAllTools())}setSaved(true);setTimeout(()=>setSaved(false),3000)};const handleBrowse=async k=>{if(!ensureApi())return;const p=k==="AudioSuite"?await api.selectFolder():await api.selectFile({folder:false});if(p)updateTool(k,p)};
  const labels={TOOL_PATH:"eac3to",QAAC_PATH:"QAAC64",FFMPEG_PATH:"FFmpeg",FFPROBE_PATH:"FFprobe",DEEW_PATH:"DEEW",DEEZY_PATH:"DeeZy",FLAC_PATH:"FLAC",DGDEMUX_PATH:"DGDemux",MKVEXTRACT_PATH:"MKVExtract",MKVMERGE_PATH:"MKVMerge",Truehdd_PATH:"Truehdd",THDMerge_PATH:"THD Merge",Dovi_Tool_PATH:"Dovi Tool",MediaInfo_PATH:"MediaInfo",HDR10Plus_PATH:"HDR10+ Tool",AtmosFix_PATH:"Atmos Fix",Tsmuxer_PATH:"Tsmuxer",DEE_PATH:"DEE Engine",DTSEncoder_PATH:"DTS Encoder",AudioSuite:t("settings_suite")};
  if(!loaded)return<div style={{color:"#6b70a0",textAlign:"center",padding:40}}>{t("loading")}</div>;
  return(<div><SectionTitle sub={t("settings_sub")}>{t("settings_title")}</SectionTitle>
    <Card><div style={{display:"grid",gap:10}}>{Object.entries(tools).map(([k,v])=>(<div key={k}><div style={{display:"flex",alignItems:"center",gap:10}}><label style={{fontSize:12,color:"#8a8fa6",width:120,flexShrink:0,textAlign:"right"}}>{labels[k]||k}</label><input value={v} onChange={e=>updateTool(k,e.target.value)} style={{flex:1,background:"#1a1d2e",border:"1px solid #2d3148",borderRadius:8,padding:"9px 12px",color:"#e2e4ed",fontSize:12,outline:"none",fontFamily:"monospace"}}/><Btn small onClick={()=>handleBrowse(k)}>📂</Btn></div>{k!=="AudioSuite"&&resolved[k]&&<div style={{marginLeft:130,fontSize:10,color:resolved[k].includes(":\\")||resolved[k].includes("/")?"#10b981":"#f59e0b",marginTop:2}}>→ {resolved[k]}</div>}</div>))}</div></Card>
    <div style={{display:"flex",gap:10,marginTop:16,alignItems:"center"}}><Btn primary onClick={handleSave}>💾 {t("save")}</Btn><Btn onClick={()=>{setTools(DEFAULT_TOOLS);setSaved(false)}}>{t("reset")}</Btn>{saved&&<span style={{color:"#10b981",fontSize:12,fontWeight:600,marginLeft:8}}>✓ {t("saved")}</span>}</div>
  </div>)}

/* ── ABOUT ── */
function AboutPage({t}){
  const[updateStatus,setUpdateStatus]=useState(null);const[checking,setChecking]=useState(false);const[latestVer,setLatestVer]=useState("");const[downloadPct,setDownloadPct]=useState(0);
  const APP_VERSION="1.2";
  const UPDATE_URL="https://api.github.com/repos/MrTOgRaS/Audio-Studio-Ultimate-GUI/releases/latest";
  const compareVer=(a,b)=>{const pa=a.split(".").map(Number),pb=b.split(".").map(Number);for(let i=0;i<Math.max(pa.length,pb.length);i++){if((pa[i]||0)>(pb[i]||0))return 1;if((pa[i]||0)<(pb[i]||0))return-1}return 0};
  useEffect(()=>{if(ensureApi()&&api.onUpdateStatus){const unsub=api.onUpdateStatus(d=>{if(d.status==="available"){setLatestVer(d.version||"");setUpdateStatus("available");setChecking(false)}else if(d.status==="latest"){setUpdateStatus("latest");setChecking(false)}else if(d.status==="downloading"){setUpdateStatus("downloading");setDownloadPct(d.percent||0)}else if(d.status==="downloaded"){setUpdateStatus("downloaded")}else if(d.status==="error"){setUpdateStatus("error");setChecking(false)}});return unsub}},[]);
  const checkUpdate=async()=>{setChecking(true);setUpdateStatus(null);try{if(ensureApi()&&api.checkAutoUpdate){const r=await api.checkAutoUpdate();if(!r.error)return}if(ensureApi()&&api.checkUpdate){const res=await api.checkUpdate(UPDATE_URL);if(res.success){const latest=(res.data.tag_name||"").replace(/^v/,"");setLatestVer(latest);setUpdateStatus(latest&&compareVer(latest,APP_VERSION)>0?"available":"latest")}else{setUpdateStatus("error")}}else{const res=await fetch(UPDATE_URL);if(!res.ok)throw new Error("fetch fail");const data=await res.json();const latest=(data.tag_name||"").replace(/^v/,"");setLatestVer(latest);setUpdateStatus(latest&&compareVer(latest,APP_VERSION)>0?"available":"latest")}}catch(e){setUpdateStatus("error")}finally{setChecking(false)}};
  const startDownload=async()=>{if(ensureApi()&&api.downloadUpdate){setUpdateStatus("downloading");setDownloadPct(0);await api.downloadUpdate()}};
  const installNow=()=>{if(ensureApi()&&api.installUpdate)api.installUpdate()};
  const openUrl=(url)=>{if(ensureApi()&&api.runCommand)api.runCommand(`start "" "${url}"`);else window.open(url,"_blank")};
  return(<div><SectionTitle>{t("about_title")}</SectionTitle>
  <Card style={{textAlign:"center",padding:30}}><img src={APP_ICON} alt="Logo" style={{width:64,height:64,borderRadius:16,margin:"0 auto 16px",display:"block"}} /><h2 style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:"#e2e4ed"}}>Audio Studio Ultimate</h2><p style={{color:"#6b70a0",fontSize:13}}>v{APP_VERSION}</p><div style={{marginTop:20,display:"grid",gap:8,textAlign:"left",maxWidth:350,margin:"20px auto 0"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #1e2240"}}><span style={{color:"#8a8fa6",fontSize:12}}>{t("about_developer")}</span><span style={{color:"#818cf8",fontSize:12,fontWeight:600}}>MURAT OGRAS</span></div>
    <div style={{display:"flex",gap:10,justifyContent:"center",padding:"12px 0"}}><button onClick={()=>openUrl("https://www.mrtogras.com")} style={{flex:1,background:"#6366f118",border:"1px solid #6366f144",borderRadius:8,padding:"8px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#818cf8",fontSize:12,fontWeight:600}}>🌐 {t("about_web")}</button><button onClick={()=>openUrl("mailto:destek@mrtogras.com")} style={{flex:1,background:"#10b98118",border:"1px solid #10b98144",borderRadius:8,padding:"8px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#10b981",fontSize:12,fontWeight:600}}>📧 {t("about_email")}</button><button onClick={()=>openUrl("https://github.com/MrTOgRaS/Audio-Studio-Ultimate-GUI")} style={{flex:1,background:"#8b5cf618",border:"1px solid #8b5cf644",borderRadius:8,padding:"8px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,color:"#8b5cf6",fontSize:12,fontWeight:600}}>🐙 GitHub</button></div>
    </div></Card>
  <Card style={{marginTop:16,textAlign:"center"}}><div style={{fontSize:12,fontWeight:700,color:"#10b981",marginBottom:12}}>🔄 {t("update_check")}</div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,flexWrap:"wrap"}}><Btn primary small disabled={checking} onClick={checkUpdate}>{checking?t("update_checking"):t("update_check")}</Btn>
      {updateStatus==="available"&&<div style={{fontSize:12,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}><span style={{color:"#f59e0b",fontWeight:700}}>⚠ {t("update_available")}</span><span style={{color:"#6b70a0"}}>{t("update_current")}: v{APP_VERSION} → {t("update_new")}: v{latestVer}</span><Btn primary small onClick={startDownload}>⬇ {t("update_download")}</Btn><Btn small onClick={()=>openUrl("https://github.com/MrTOgRaS/Audio-Studio-Ultimate-GUI/releases/latest")}>🐙 GitHub</Btn></div>}
      {updateStatus==="downloading"&&<div style={{fontSize:12,display:"flex",alignItems:"center",gap:10,flex:1}}><span style={{color:"#818cf8",fontWeight:600}}>{t("update_downloading")} {downloadPct}%</span><div style={{flex:1,height:6,background:"#1e2240",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg,#6366f1,#818cf8)",borderRadius:3,transition:"width .3s",width:downloadPct+"%"}}/></div></div>}
      {updateStatus==="downloaded"&&<div style={{fontSize:12,display:"flex",alignItems:"center",gap:10}}><span style={{color:"#10b981",fontWeight:700}}>✅ {t("update_downloaded")}</span><Btn primary small onClick={installNow}>🔄 {t("update_install")}</Btn></div>}
      {updateStatus==="latest"&&<span style={{color:"#10b981",fontSize:12,fontWeight:600}}>✅ {t("update_latest")}</span>}
      {updateStatus==="error"&&<span style={{color:"#ef4444",fontSize:12}}>{t("update_error")}</span>}
    </div></Card>
  <Card style={{marginTop:16}}><div style={{fontSize:12,fontWeight:700,color:"#6366f1",marginBottom:12}}>{t("about_license")}</div><div style={{maxHeight:180,overflow:"auto",background:"#0a0c16",borderRadius:8,padding:14,fontSize:11,color:"#8a8fa6",lineHeight:1.7,fontFamily:"monospace"}}>MIT License{"\n\n"}Copyright (c) 2026 MURAT OGRAS{"\n\n"}Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:{"\n\n"}The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.{"\n\n"}THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.</div></Card>
  <Card style={{marginTop:16}}><div style={{fontSize:12,fontWeight:700,color:"#6366f1",marginBottom:12}}>{t("about_libraries")}</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>{["React 19","Electron 41","eac3to","FFmpeg","FFprobe","FLAC","DEEW","DeeZy","DGDemux","MKVToolnix","truehdd","thdmerge","dovi_tool","hdr10plus_tool","DEE","DTSEncoder","MediaInfo","tsMuxeR","QAAC","AtmosFix","LAME","TwoLAME","opusenc","opusdec"].map(lib=>(<div key={lib} style={{padding:"10px 14px",borderRadius:8,background:"#0d0f1a",border:"1px solid #1e2240",fontSize:12,color:"#e2e4ed",fontWeight:600,textAlign:"center"}}>{lib}</div>))}</div></Card>
</div>)}

/* ══ MAIN APP ══ */
export default function App(){const[page,setPage]=useState("home");const[collapsed,setCollapsed]=useState(false);const[lang,setLang]=useState("en");
  const t=(key)=>LANG[lang][key]||LANG.en[key]||key;
  return(<div style={{display:"flex",height:"100vh",background:"#0c0e1a",color:"#e2e4ed",fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"hidden"}}>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    <aside style={{width:collapsed?62:220,background:"linear-gradient(180deg,#10122000,#10122088)",borderRight:"1px solid #1a1d30",display:"flex",flexDirection:"column",transition:"width .3s",flexShrink:0,overflow:"hidden"}}>
      <div style={{padding:collapsed?"16px 10px":"20px 18px",borderBottom:"1px solid #1a1d30",display:"flex",alignItems:"center",gap:10,cursor:"pointer",minHeight:64}} onClick={()=>setCollapsed(c=>!c)}><img src={APP_ICON} alt="Logo" style={{width:32,height:32,borderRadius:10,flexShrink:0}} />{!collapsed&&<div><div style={{fontSize:14,fontWeight:800,letterSpacing:-.3}}>Audio Studio</div><div style={{fontSize:10,color:"#6b70a0"}}>Ultimate GUI v1.2</div></div>}</div>
      <nav style={{flex:1,padding:"12px 8px",display:"flex",flexDirection:"column",gap:2}}>{NAV_KEYS.map(n=>(<button key={n.id} onClick={()=>setPage(n.id)} style={{display:"flex",alignItems:"center",gap:12,padding:collapsed?"10px":"10px 14px",borderRadius:10,border:"none",cursor:"pointer",transition:"all .2s",textAlign:"left",background:page===n.id?n.color+"15":"transparent",color:page===n.id?n.color:"#6b70a0",fontSize:13,fontWeight:page===n.id?700:500,justifyContent:collapsed?"center":"flex-start"}}><span style={{fontSize:16,flexShrink:0,width:20,textAlign:"center",color:n.color,textShadow:page===n.id?`0 0 8px ${n.color}88`:""}}>{n.icon}</span>{!collapsed&&<span style={{whiteSpace:"nowrap"}}>{t(n.key)}</span>}</button>))}</nav>
      {!collapsed&&<div>
        <div style={{display:"flex",justifyContent:"center",gap:6,padding:"10px 18px"}}>
          <button onClick={()=>setLang("en")} style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${lang==="en"?"#6366f1":"#2d3148"}`,background:lang==="en"?"#6366f118":"transparent",cursor:"pointer",fontSize:12,fontWeight:lang==="en"?700:500,color:lang==="en"?"#e2e4ed":"#6b70a0",display:"flex",alignItems:"center",gap:6}} title="English"><svg width="18" height="12" viewBox="0 0 60 40" style={{flexShrink:0,borderRadius:2}}><rect width="60" height="40" fill="#012169"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4"/><rect x="25" width="10" height="40" fill="#fff"/><rect y="15" width="60" height="10" fill="#fff"/><rect x="27" width="6" height="40" fill="#C8102E"/><rect y="17" width="60" height="6" fill="#C8102E"/></svg> ENG</button>
          <button onClick={()=>setLang("tr")} style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${lang==="tr"?"#6366f1":"#2d3148"}`,background:lang==="tr"?"#6366f118":"transparent",cursor:"pointer",fontSize:12,fontWeight:lang==="tr"?700:500,color:lang==="tr"?"#e2e4ed":"#6b70a0",display:"flex",alignItems:"center",gap:6}} title="Türkçe"><svg width="18" height="12" viewBox="0 0 60 40" style={{flexShrink:0,borderRadius:2}}><rect width="60" height="40" fill="#E30A17"/><circle cx="22" cy="20" r="8" fill="#fff"/><circle cx="25" cy="20" r="6.4" fill="#E30A17"/><polygon points="32,16.2 33,18.6 35.6,18.8 33.6,20.5 34.2,23.1 32,21.7 29.8,23.1 30.4,20.5 28.4,18.8 31,18.6" fill="#fff"/></svg> TR</button>
        </div>
        <div style={{borderTop:"1px solid #1a1d30",padding:"8px 18px 14px",fontSize:10,color:"#3d4166",lineHeight:1.6,textAlign:"center"}}>Powered By MrTOgRaS</div>
      </div>}
    </aside>
    <main style={{flex:1,overflow:"auto",padding:"28px 32px"}}><div style={{maxWidth:820,margin:"0 auto"}}>
      <div style={{display:page==="home"?"block":"none"}}><HomePage setPage={setPage} t={t}/></div>
      <div style={{display:page==="encode"?"block":"none"}}><AudioEncodePage t={t}/></div>
      <div style={{display:page==="join"?"block":"none"}}><ChannelJoinPage t={t}/></div>
      <div style={{display:page==="demux"?"block":"none"}}><AudioDemuxPage t={t}/></div>
      <div style={{display:page==="atmos"?"block":"none"}}><DolbyAtmosPage t={t}/></div>
      <div style={{display:page==="fps"?"block":"none"}}><FPSConversionPage t={t}/></div>
      <div style={{display:page==="other"?"block":"none"}}><OtherOptionsPage t={t}/></div>
      <div style={{display:page==="movie"?"block":"none"}}><MovieDemuxPage t={t}/></div>
      <div style={{display:page==="settings"?"block":"none"}}><SettingsPage t={t}/></div>
      <div style={{display:page==="about"?"block":"none"}}><AboutPage t={t}/></div>
    </div></main>
  </div>)}
