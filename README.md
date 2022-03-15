# ReSi script manager

[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa] ![Version](https://img.shields.io/github/package-json/v/thekeineahnung/resi-script-manager/main?style=flat-square) [![Test build](https://github.com/TheKeineAhnung/resi-script-manager/actions/workflows/testBuild.yml/badge.svg?branch=main&style=flat-square)](https://github.com/TheKeineAhnung/resi-script-manager/actions/workflows/testBuild.yml?style=flat-square)

Script manager for the [@Rettungssimulator](https://github.com/Rettungssimulator/). Please take a look to the [licence](https://github.com/TheKeineAhnung/resi-script-manager/blob/main/LICENCE.md).

1. [Supported browsers](#supported-browsers)
1. [Setup](#setup)
   - [Commands](#commands)
   - [Development](#development)
1. [Bug reports](#bug-reports)

## Supported browsers

|      Browser      | Supported |
| :---------------: | :-------: |
|   Google Chrome   |    ✅     |
| Internet Explorer |    ❎     |
|  Microsoft Edge   |    ✅     |
|  Mozilla Firefox  |    ✅     |
|       Opera       |    ❎     |
|      Safari       |    ❎     |

## Setup

### Commands

- `npm run rollup-build`: Builds the script manager.
- `npm run gulp-build`: Builds the script manager.
- `npm run rollup-dev`: Builds the script manager for development.
- `npm run gulp-dev`: Builds the script manager for development.
- `npm run prepare`: Builds the theme.
- `npm run smui-theme-light`: Builds the light theme.
- `npm run smui-theme-dark`: Builds the dark theme.
- `npm run setup`: Prepares the script manager for development.

### Development

1. Run `npm run setup`
1. Run `npm run gulp-dev`
1. Run `npm run rollup-dev`
1. Run `npm run prepare`
1. Configurate your server to watch the build folder (For the best result use XAMPP)
1. Start your server
1. Install the script manager in your browser with the code of [`init-test.user.js`](https://github.com/TheKeineAhnung/resi-script-manager/blob/main/init-test.user.js)
1. Start developing

## Bug reports

Have you found a bug? Please open an [issue](https://github.com/TheKeineAhnung/resi-script-manager/issues/new).

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-yellow.svg?style=flat-square
