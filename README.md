# If-found overlay maker

A small web page that makes an **"if found, please return"** sleep-screen overlay for Xteink e-readers (X3, X4) running [CrossPoint](https://github.com/crosspoint-reader/crosspoint-reader).

Enter your name, phone number(s) and email, choose whether to include a QR code with your contact card (vCard), and where the banner goes (top, middle or bottom). Download `sleep-overlay.png`, copy it to the SD card, and the banner appears on the reader's sleep screen, so whoever finds a lost reader can get it back to you.

There is also a **QR code only** mode that makes just the contact QR code as a PNG.

## Privacy

Everything runs in your browser. There is no server, no analytics and no storage: nothing you type leaves the page.

## Output

- Transparent PNG at the exact screen size (X3: 528×792, X4: 480×800).
- Pure black, white and transparent pixels only. Grey anti-aliasing would turn into dithering noise on the e-ink panel.
- The QR code keeps a 4-module quiet zone inside the white banner and uses whole-pixel modules, so it stays sharp and scannable.

## Installing the overlay

1. Copy `sleep-overlay.png` to the root of the SD card (or several PNGs into a `.sleep-overlay` folder to pick one at random).
2. In CrossPoint: **Settings → Display → Sleep Screen Overlay** on.
3. Choose any sleep screen, for example **Cover** (book cover with the banner) or **Current Screen** (the page you were reading).

The overlay toggle is being proposed to CrossPoint; on builds without it, use the **Transparent** sleep screen, which draws the same overlay over the current screen.

## Running locally

It is a static page with no build step. Serve the folder with any static server, for example:

```sh
python3 -m http.server 8000
```

and open http://localhost:8000. (Opening `index.html` straight from disk does not work, because browsers block ES modules on `file://`.)

## Credits

QR codes are generated with [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase (MIT), included in `vendor/`. "QR Code" is a registered trademark of DENSO WAVE INCORPORATED.

## License

MIT, see [LICENSE](LICENSE).
