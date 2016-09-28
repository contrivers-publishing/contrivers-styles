# Contrivers-Styles

Stylesheets for [Contrivers' Review](http://www.contrivers.org).

## Development

1. Install [nodejs](http://nodejs.org) 
    ```
    $ node --version
    ```
2. Verify that you have [NPM](https://www.npmjs.org)
    ```
    $ npm --version
    ```

5. Clone the repo.
    ```
    $ git clone https://github.com/lmergner/contrivers-styles.git
    $ cd contrivers-styles
    ```

6. Install local node dependencies (must be in working directory).
    `$ npm install `


## Sass Libraries

Note: these will change as we migrate from ruby-sass to node-sass.

- [Sass](http://sass-lang.com/)
    > Sass is the most mature, stable, and powerful professional grade CSS
    > extension language in the world.

- [Compass](http://compass-style.org/)
    > Compass is an open-source CSS Authoring Framework.

    Note that I use the vertical rhythm tools in Compass for vertical spacing.

- [Breakpoint](http://breakpoint-sass.com)
    > Breakpoint makes writing media queries in Sass super simple.

- [Susy](http://susy.oddbird.net)
    A grid framework for Sass. [Docs](http://susydocs.oddbird.net/en/latest/).

    Note that I use the gutter, etc. math in Susy for horizontal spacing.

## Javscript Libraries

- [Bigfoot.js](http://www.bigfootjs.com)
    > A jQuery plugin for empowering footnotes

- [eq.js](https://github.com/Snugug/eq.js)
    > Lightweight JavaScript powered element queries
        
    I am strongly considering dropping this library and rewriting all my
    element queries as window queries in Breakpoint. As it is, this libraries
    is only used in a few places and not well.

