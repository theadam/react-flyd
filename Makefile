STANDALONE_BROWSERIFY_ARGS =
WATCHIFY = node_modules/.bin/watchify
LIVEREACTLOAD = node_modules/.bin/livereactload
EXAMPLE_DIR = $(word 2, $(MAKECMDGOALS))
ifeq ($(strip, $EXAMPLE_DIR),)
	EXAMPLE_DIR = test
endif


all: test browser vender

clean: clean-lib clean-tests clean-coverage clean-browser clean-vender

.PHONY: all clean

# include targets from babel-make
include scripts/babel-make.mk

#
# THIRD PARTY
#

mkvender:
	mkdir -p vender

vender: vender/flyd.js

vender/flyd.js: | mkvender
	$(BROWSERIFY) -r flyd --standalone flyd > vender/flyd.js

clean-vender:
	rm -rf vender

.PHONY: mkvender vender clean-vender

#
# Example
#

example:
	$(BROWSERIFY) examples/test/index.js -t [ babelify --stage 0 ] -o examples/$(EXAMPLE_DIR)/bundle.js

example-watch:
	$(WATCHIFY) examples/test/index.js -t [ babelify --stage 0 ] -d -v -o examples/$(EXAMPLE_DIR)/bundle.js

.PHONY: require-dir example example-watch
