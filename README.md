# Lost XTE Tag

Lost your e-reader? Readers get left on trains, in cafés and in hotel rooms. **Lost XTE Tag** puts an **"if found, please return"** banner with your contact details on the sleep screen of Xteink e-readers (X3, X4) running [CrossPoint](https://github.com/crosspoint-reader/crosspoint-reader), so whoever finds it can get it back to you.

**Try it:** https://filipkowicz.github.io/lost-xte-tag/

Enter your name, phone number(s) and email, then choose what the overlay shows:

- **Text + QR code**: a banner with your details and a QR code with your contact card (vCard).
- **Text only**: the banner without the QR code.
- **QR code only**: a compact box with just the QR code and "scan for contact", placed left, center or right.

Pick top, middle or bottom, download `sleep-overlay.png`, copy it to the SD card, and it appears on the reader's sleep screen, so whoever finds a lost reader can get it back to you.

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

## Deploying

GitHub Pages serves the `prod` branch (root folder). Work happens on `main`; to release, fast-forward `prod` to it:

```sh
git push origin main:prod
```

Pages rebuilds automatically within a minute or two.

## Credits

QR codes are generated with [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase (MIT), included in `vendor/`. "QR Code" is a registered trademark of DENSO WAVE INCORPORATED.

## License

MIT, see [LICENSE](LICENSE).
