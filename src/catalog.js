(function () {
  "use strict";

  var marketplacePluginDefs = [
    { id: "tape", name: "Tape Warmth", short: "TAPE", engine: "tape", category: "Color" },
    { id: "crush", name: "Bit Crusher", short: "CRSH", engine: "crush", category: "Lo-Fi" },
    { id: "echo", name: "Sync Echo", short: "ECHO", engine: "echo", category: "Delay" },
    { id: "space", name: "Room Verb", short: "ROOM", engine: "space", category: "Space" },
    { id: "width", name: "Stereo Wide", short: "WIDE", engine: "width", category: "Stereo" },
    { id: "pump", name: "Pump Gate", short: "PUMP", engine: "pump", category: "Rhythm" },
    { id: "bass", name: "Bass Bloom", short: "BASS", engine: "bass", category: "Tone" },
    { id: "air", name: "Air Lift", short: "AIR", engine: "air", category: "Tone" },
    { id: "filter", name: "DJ Filter", short: "FILT", engine: "filter", category: "Filter" },
    { id: "phone", name: "Phone Box", short: "PHON", engine: "phone", category: "Filter" },
    { id: "wobble", name: "Wobble LFO", short: "WOB", engine: "wobble", category: "Motion" },
    { id: "tremolo", name: "Tremolo", short: "TREM", engine: "tremolo", category: "Motion" },
    { id: "phaser", name: "Phase Sweep", short: "PHAS", engine: "phaser", category: "Motion" },
    { id: "notch", name: "Notch Carve", short: "NOTC", engine: "notch", category: "Filter" },
    { id: "duck", name: "Auto Duck", short: "DUCK", engine: "duck", category: "Dynamics" },
    { id: "compressor", name: "Studio Compressor", short: "COMP", engine: "compressor", category: "Dynamics" },
    { id: "spark", name: "Transient Spark", short: "SPRK", engine: "spark", category: "Dynamics" },
    { id: "chorus", name: "Wide Chorus", short: "CHOR", engine: "chorus", category: "Mod" },
    { id: "vinyl", name: "Vinyl Drift", short: "VNYL", engine: "vinyl", category: "Lo-Fi" },
    { id: "gate", name: "Rhythm Gate", short: "GATE", engine: "gate", category: "Rhythm" },
    { id: "visualizer", name: "Visualizer Tap", short: "VIS", engine: "visualizer", category: "Visual" },
    { id: "glue", name: "Glue Comp", short: "GLUE", engine: "pump", category: "Dynamics" },
    { id: "limiter", name: "Brick Limit", short: "LIM", engine: "spark", category: "Dynamics" },
    { id: "softclip", name: "Soft Clip", short: "CLIP", engine: "tape", category: "Color" },
    { id: "sub", name: "Sub Forge", short: "SUB", engine: "bass", category: "Tone" },
    { id: "lowcut", name: "Low Cut", short: "LCUT", engine: "phone", category: "Filter" },
    { id: "highcut", name: "High Cut", short: "HCUT", engine: "filter", category: "Filter" },
    { id: "formant", name: "Formant Tilt", short: "FORM", engine: "phone", category: "Vocal" },
    { id: "resonator", name: "Box Resonator", short: "RESO", engine: "phaser", category: "Filter" },
    { id: "comb", name: "Comb Teeth", short: "COMB", engine: "chorus", category: "Mod" },
    { id: "shimmer", name: "Shimmer Wash", short: "SHIM", engine: "space", category: "Space" },
    { id: "reverseverb", name: "Reverse Verb", short: "RVRB", engine: "space", category: "Space" },
    { id: "slap", name: "Slap Delay", short: "SLAP", engine: "echo", category: "Delay" },
    { id: "pingpong", name: "Ping Pong", short: "PING", engine: "echo", category: "Delay" },
    { id: "granular", name: "Grain Spray", short: "GRAN", engine: "crush", category: "Texture" },
    { id: "stutter", name: "Beat Stutter", short: "STUT", engine: "gate", category: "Rhythm" },
    { id: "repeater", name: "Micro Repeat", short: "RPT", engine: "echo", category: "Rhythm" },
    { id: "freezer", name: "Freeze Frame", short: "FRZ", engine: "space", category: "Texture" },
    { id: "riser", name: "Riser Sweep", short: "RISE", engine: "wobble", category: "Motion" },
    { id: "downsampler", name: "Downsampler", short: "DSMP", engine: "crush", category: "Lo-Fi" },
    { id: "cassette", name: "Cassette Deck", short: "CASS", engine: "vinyl", category: "Lo-Fi" },
    { id: "wow", name: "Wow Drift", short: "WOW", engine: "vinyl", category: "Lo-Fi" },
    { id: "flutter", name: "Flutter Trim", short: "FLUT", engine: "chorus", category: "Lo-Fi" },
    { id: "noise", name: "Noise Floor", short: "NOIS", engine: "vinyl", category: "Texture" },
    { id: "vinylstop", name: "Vinyl Stop", short: "STOP", engine: "filter", category: "DJ" },
    { id: "sidechain", name: "Sidechain Pump", short: "SIDE", engine: "pump", category: "Dynamics" },
    { id: "transient", name: "Transient Pop", short: "TRAN", engine: "spark", category: "Dynamics" },
    { id: "stereoflip", name: "Stereo Flip", short: "FLIP", engine: "width", category: "Stereo" },
    { id: "mono", name: "Mono Maker", short: "MONO", engine: "phone", category: "Stereo" },
    { id: "widen2", name: "Mega Width", short: "MWID", engine: "width", category: "Stereo" },
    { id: "haas", name: "Haas Shift", short: "HAAS", engine: "width", category: "Stereo" },
    { id: "autopan", name: "Auto Pan", short: "PAN", engine: "tremolo", category: "Motion" },
    { id: "trem2", name: "Chop Trem", short: "CHOP", engine: "gate", category: "Motion" },
    { id: "ringmod", name: "Ring Mod", short: "RING", engine: "crush", category: "Mod" },
    { id: "freqshift", name: "Freq Shift", short: "FSFT", engine: "phaser", category: "Mod" },
    { id: "vocoder", name: "Vocoder Mask", short: "VOCO", engine: "phone", category: "Vocal" },
    { id: "robot", name: "Robot Voice", short: "ROBO", engine: "crush", category: "Vocal" },
    { id: "chorus2", name: "String Chorus", short: "STRG", engine: "chorus", category: "Mod" },
    { id: "ensemble", name: "Ensemble Stack", short: "ENS", engine: "chorus", category: "Mod" },
    { id: "flanger", name: "Jet Flanger", short: "JET", engine: "phaser", category: "Mod" },
    { id: "doubler", name: "Vocal Doubler", short: "DBL", engine: "width", category: "Vocal" },
    { id: "exciter", name: "Top Exciter", short: "EXCT", engine: "air", category: "Tone" },
    { id: "deesser", name: "De-Esser", short: "DESS", engine: "notch", category: "Vocal" },
    { id: "tilt", name: "Tilt EQ", short: "TILT", engine: "spark", category: "Tone" },
    { id: "mudcut", name: "Mud Cutter", short: "MUD", engine: "notch", category: "Tone" },
    { id: "bass2", name: "Club Low", short: "CLUB", engine: "bass", category: "Tone" },
    { id: "kicktight", name: "Kick Tight", short: "KICK", engine: "spark", category: "Drums" },
    { id: "snarepop", name: "Snare Pop", short: "SNAR", engine: "spark", category: "Drums" },
    { id: "clapwide", name: "Clap Wide", short: "CLAP", engine: "width", category: "Drums" },
    { id: "lofiglow", name: "Lo-Fi Glow", short: "GLOW", engine: "tape", category: "Lo-Fi" },
    { id: "dirt", name: "Dirt Box", short: "DIRT", engine: "tape", category: "Color" },
    { id: "fuzz", name: "Pixel Fuzz", short: "FUZZ", engine: "crush", category: "Color" },
    { id: "overdrive", name: "Overdrive", short: "ODRV", engine: "tape", category: "Color" },
    { id: "tube", name: "Tube Heat", short: "TUBE", engine: "tape", category: "Color" },
    { id: "slicer", name: "Step Slicer", short: "SLIC", engine: "gate", category: "Rhythm" },
    { id: "euclid", name: "Euclid Gate", short: "EUCL", engine: "gate", category: "Rhythm" },
    { id: "arpgate", name: "Arp Gate", short: "ARP", engine: "tremolo", category: "Rhythm" },
    { id: "meterbridge", name: "Meter Bridge", short: "MTR", engine: "visualizer", category: "Visual" },
    { id: "vectorscope", name: "Vectorscope", short: "VECT", engine: "visualizer", category: "Visual" },
    { id: "spectrograph", name: "Spectrograph", short: "SPEC", engine: "visualizer", category: "Visual" },
    { id: "beatlight", name: "Beat Light", short: "LITE", engine: "visualizer", category: "Visual" }
  ];

  var installedPluginIds = ["tape", "crush", "echo", "space", "compressor"];
  var pluginDefs = marketplacePluginDefs.filter(function (plugin) {
    return installedPluginIds.indexOf(plugin.id) >= 0;
  });

  var marketplaceThemeDefs = [
    { id: "classic", name: "Classic Rack", storeOnly: false },
    { id: "neon", name: "Neon Orchard", storeOnly: false },
    { id: "ice", name: "Ice Desk", storeOnly: false },
    { id: "amber", name: "Amber CRT", storeOnly: false },
    { id: "midnight", name: "Midnight Mixer", storeOnly: false },
    { id: "citrus", name: "Citrus Keys", storeOnly: true },
    { id: "graphite", name: "Graphite Lab", storeOnly: true },
    { id: "arcade", name: "Arcade Glow", storeOnly: true },
    { id: "candy", name: "Candy Cable", storeOnly: true },
    { id: "matrix", name: "Matrix Green", storeOnly: true },
    { id: "sunset", name: "Sunset Bus", storeOnly: true },
    { id: "ocean", name: "Ocean Console", storeOnly: true },
    { id: "berry", name: "Berry Patch", storeOnly: true },
    { id: "vapor", name: "Vapor Grid", storeOnly: true },
    { id: "terminal", name: "Terminal Grey", storeOnly: true },
    { id: "blueprint", name: "Blueprint", storeOnly: true },
    { id: "blossom", name: "Blossom EQ", storeOnly: true },
    { id: "lava", name: "Lava Lamp", storeOnly: true },
    { id: "frost", name: "Frost Byte", storeOnly: true },
    { id: "mint", name: "Mint Board", storeOnly: true },
    { id: "ultraviolet", name: "Ultraviolet", storeOnly: true },
    { id: "noir", name: "Noir Tape", storeOnly: true },
    { id: "solar", name: "Solarized", storeOnly: true },
    { id: "lagoon", name: "Lagoon", storeOnly: true },
    { id: "rosewire", name: "Rose Wire", storeOnly: true },
    { id: "cockpit", name: "Cockpit", storeOnly: true },
    { id: "chrome", name: "Chrome Rack", storeOnly: true },
    { id: "plasma", name: "Plasma", storeOnly: true },
    { id: "mono", name: "Mono LCD", storeOnly: true },
    { id: "cratewood", name: "Crate Wood", storeOnly: true }
  ];

  var installedThemeIds = ["classic", "neon", "ice", "amber", "midnight"];
  var themeDefs = marketplaceThemeDefs.filter(function (theme) {
    return installedThemeIds.indexOf(theme.id) >= 0;
  });

  function countPlugins(categories) {
    return marketplacePluginDefs.filter(function (plugin) {
      return categories.indexOf(plugin.category) >= 0;
    }).length;
  }

  var marketplaceBundleDefs = [
    { id: "all-plugins", name: "All Plugins Crate", href: "bundles/all-plugins.crate", icon: "assets/crate-icons/plugin.png", tag: marketplacePluginDefs.length + " plugins", detail: "Every current ChannelCrate market plugin in one install crate." },
    { id: "all-themes", name: "All Themes Crate", href: "bundles/all-themes.crate", icon: "assets/crate-icons/theme.png", tag: marketplaceThemeDefs.length + " themes", detail: "Every current ChannelCrate market skin in one install crate." },
    { id: "everything", name: "Everything Crate", href: "bundles/everything.crate", icon: "assets/crate-icons/bundle.png", tag: marketplacePluginDefs.length + marketplaceThemeDefs.length + " items", detail: "All plugins and all themes bundled together." },
    { id: "lofi-color-lab", name: "Lo-Fi Color Lab", href: "bundles/lofi-color-lab.crate", icon: "assets/crate-icons/plugin.png", tag: countPlugins(["Lo-Fi", "Color", "Texture"]) + " plugins", detail: "Tape, dust, drive, grain, bit-crush, and texture effects." },
    { id: "dynamics-master-pack", name: "Dynamics Master Pack", href: "bundles/dynamics-master-pack.crate", icon: "assets/crate-icons/preset.png", tag: countPlugins(["Dynamics", "Drums", "Tone"]) + " plugins", detail: "Compressors, transient tools, punch shapers, low-end and tone helpers." },
    { id: "vocal-studio-pack", name: "Vocal Studio Pack", href: "bundles/vocal-studio-pack.crate", icon: "assets/crate-icons/clip.png", tag: countPlugins(["Vocal", "Stereo"]) + " plugins", detail: "Voice shaping, de-essing, width, doubling, and formant tools." },
    { id: "motion-delay-pack", name: "Motion + Delay Pack", href: "bundles/motion-delay-pack.crate", icon: "assets/crate-icons/plugin.png", tag: countPlugins(["Motion", "Delay", "Space", "Mod", "Rhythm"]) + " plugins", detail: "Echoes, verbs, gates, modulation, movement, and performance rhythm effects." },
    { id: "visual-metering-pack", name: "Visual Metering Pack", href: "bundles/visual-metering-pack.crate", icon: "assets/crate-icons/general.png", tag: countPlugins(["Visual"]) + " plugins", detail: "Visualizer Tap, Meter Bridge, Vectorscope, Spectrograph, and Beat Light." }
  ];

  var crateTypes = [
    { id: "general", label: "General", icon: "assets/crate-icons/general.png", detail: "brand, notes, or mixed metadata", exportable: true },
    { id: "plugin", label: "Plugin", icon: "assets/crate-icons/plugin.png", detail: "effect modules and rack settings", exportable: true },
    { id: "project", label: "Project", icon: "assets/crate-icons/project.png", detail: "decks, sources, clips, playlists, and mixer state", exportable: true },
    { id: "theme", label: "Theme", icon: "assets/crate-icons/theme.png", detail: "skins installed from the web marketplace", exportable: false },
    { id: "preset", label: "Preset", icon: "assets/crate-icons/preset.png", detail: "focused deck EQ, tempo, and plugin settings", exportable: true },
    { id: "clip", label: "Clip", icon: "assets/crate-icons/clip.png", detail: "captured audio clip with waveform data", exportable: true },
    { id: "playlist", label: "Playlist", icon: "assets/crate-icons/playlist.png", detail: "ordered songs, provider links, and clips", exportable: true },
    { id: "bundle", label: "Bundle", icon: "assets/crate-icons/bundle.png", detail: "multiple crate things in one package", exportable: true }
  ];

  window.ChannelCrateCatalog = {
    pluginDefs: pluginDefs,
    marketplacePluginDefs: marketplacePluginDefs,
    installedPluginIds: installedPluginIds,
    themeDefs: themeDefs,
    marketplaceThemeDefs: marketplaceThemeDefs,
    installedThemeIds: installedThemeIds,
    marketplaceBundleDefs: marketplaceBundleDefs,
    crateTypes: crateTypes
  };
})();
