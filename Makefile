#
# Makefile
# lmergner, 2014-11-23 18:17
#
PHONY: cp clean

cp: 
	rm -rf ../contrivers/static/css
	cp -R stylesheets/ ../contrivers/static/css

clean: 
	rm -rf ./styleguide/
	rm -rf ./stylesheets/

# vim:ft=make
#
