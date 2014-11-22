# Require any additional compass plugins here.

require "susy"
require "sass-globbing"
require "sassy-maps"
require "bourbon"
require "breakpoint"

output_style = :expanded   # :expanded or :nested or :compact or :compressed
line_comments = true
preferred_syntax = :scss

sass_dir = 'sass'
css_dir = 'stylesheets'
fonts_dir = 'fonts'

# Invoke from command line: compass watch -e development --force
if environment == :development
    line_comments = true
    sass_options = { :debug_info => true }
    sass_options = {:sourcemap => true}
end

