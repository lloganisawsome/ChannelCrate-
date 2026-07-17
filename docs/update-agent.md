# ChannelCrate Update Agent

ChannelCrate checks GitHub Releases for new app versions:

```text
https://github.com/lloganisawsome/ChannelCrate-/releases/latest
```

The website download buttons can point at the four clean installer names. The in-app updater also needs every file from `releases/updater/` uploaded to the latest release: `latest.yml`, `latest-mac.yml`, blockmaps, mac zip files, and the generated Windows NSIS installer.

Unsigned macOS preview builds may still need:

```sh
xattr -dr com.apple.quarantine /Applications/ChannelCrate.app
```
