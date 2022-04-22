# EDJE Guild Scores

## Requirements

EDJE-ified. Fit one screen and resize, as needed. No scroll.

* Top 10 People (XP)
* Top XP Points by Guild

## Options

If the `Guild` class in `./src/ts/guild.ts` is initialized:

* With a zero (0) value, it will not refresh the data.
* With an optional `false` value (default = true), will start in light-mode.

## Parcel

BUILD: `$ npm run build`
SERVE: `$ npm run build`

* If errors occur on build or serve, try clearing the `.parcel-cache`. It seems to cause issues at times.
* Elements in the `assets` folder are not copied as a part of the SERVE process. They will need to be added manually or the SERVE restarted.

<a href="https://www.flaticon.com/free-icons/dark-mode" title="dark mode icons">Dark mode icons created by Freepik - Flaticon</a>
