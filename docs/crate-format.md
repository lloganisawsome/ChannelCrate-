# ChannelCrate `.crate` Format

`.crate` is the shared ChannelCrate package extension for projects, plugins, themes, presets, clips, playlists, bundles, and general packages. Theme crates install skins from Crate Market, but the app does not export themes.

The current implementation stores crates as readable JSON so creators can inspect and share them easily. The same manifest shape can later move inside a zipped archive without changing the user-facing verbs.

## Manifest

Every crate starts with:

```json
{
  "manifest": {
    "format": "channelcrate.crate",
    "formatVersion": 1,
    "app": "ChannelCrate",
    "appVersion": "0.1.0",
    "name": "Quick Crate",
    "crateType": "project",
    "createdAt": "2026-07-16T00:00:00.000Z",
    "preview": {
      "iconType": "project",
      "iconPath": "assets/crate-icons/project.png",
      "label": "Project",
      "detail": "decks, sources, clips, playlists, and mixer state"
    },
    "summary": "3 source items, 1 playlist"
  },
  "contents": {}
}
```

## Crate Types

- `general`: brand notes, stats, or mixed metadata.
- `plugin`: plugin definitions and rack states for the current 81-effect catalog.
- `project`: library, decks, mixer, provider links, clips, and playlists.
- `theme`: store-installed skins and visual preferences. This type is not exportable from the app.
- `preset`: focused deck EQ, tempo, transport controls, and plugin states.
- `clip`: selected captured clip with WAV audio when available.
- `playlist`: active playlist and its referenced local/provider/clip items.
- `bundle`: multiple crate categories together.

## Type Icons

Each crate stores `manifest.preview.iconType`. ChannelCrate maps that value to the matching crate artwork:

- `general.png`
- `plugin.png`
- `project.png`
- `theme.png`
- `preset.png`
- `clip.png`
- `playlist.png`
- `bundle.png`

Operating systems usually assign file icons by extension, so packaged installers can associate `.crate` with the general crate icon. ChannelCrate itself shows the per-type icon in Crate Locker, Crate History, and import previews.

## Portable Audio

When possible, local audio and captured clips are embedded in JSON as base64:

```json
{
  "kind": "clip",
  "name": "D1 clip 00:04-00:12",
  "audio": {
    "encoding": "base64",
    "mimeType": "audio/wav",
    "fileName": "D1-clip.wav",
    "dataBase64": "..."
  }
}
```

Provider links are stored as metadata and URLs/URIs only. Streaming-provider audio is not embedded or routed through the DSP engine.

## Safety

Crates are data packages. They install definitions, themes, presets, clips, playlists, and project metadata, but they do not execute shell scripts. Installer helper scripts live beside app downloads, not inside community crates.

## Future Archive Mode

The next format step can keep the manifest unchanged and store binary assets beside it. Theme assets can live in the marketplace install channel while exportable crate assets live in the archive:

```text
MyProject.crate
  crate.json
  preview.png
  audio/
  clips/
  plugins/
  presets/
```

That would make huge projects smaller and faster while preserving the same Uncrate/Recrate/Quick Crate workflow.
