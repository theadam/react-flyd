MAKEFLAGS = -j1
BIN = ./node_modules/.bin
ISTANBUL = $(BIN)/babel-istanbul --babel-stage=0 cover
MOCHA =  $(BIN)/_mocha
BABEL =  $(BIN)/babel --stage 0
UGLIFY = $(BIN)/uglifyjs

BROWSERIFY = $(BIN)/browserify
STANDALONE = $(BROWSERIFY) --standalone react-flyd $(STANDALONE_BROWSERIFY_ARGS)

#
# COMPILE
#

SOURCES = $(shell find src -not -wholename '*__tests__*' -type f)
LIBS = $(SOURCES:src/%=lib/%)

clean-lib:
	rm -rf lib

compile: $(LIBS)

$(LIBS): $(SOURCES)
	$(BABEL) src --out-dir lib
	rm -rf $(LIB_TEST_DIRS)

.PHONY: clean-lib compile

#
# BUNDLE
#

browser: dist/react-flyd.min.js

dist/react-flyd.js: compile | mkdist
	$(STANDALONE) lib/index.js > dist/react-flyd.js

dist/react-flyd.min.js: dist/react-flyd.js
	$(UGLIFY) dist/react-flyd.js > dist/react-flyd.min.js

mkdist:
	mkdir -p dist

clean-browser:
	rm -rf dist

.PHONY: browser mkdist clean-browser

#
# TEST
#

MOCHA_ARGS = --reporter spec
ISTANBUL_ARGS = --report text --report html

TEST_DIRS = $(shell find src -wholename '*__tests__' -type d)
COMPILED_TEST_DIRS = $(TEST_DIRS:__tests__=__tests__compiled__)
LIB_TEST_DIRS = $(TEST_DIRS:src/%=lib/%)

test:
	$(MOCHA) -r babel/register $(MOCHA_ARGS) $(TEST_DIRS)

compile-tests: $(COMPILED_TEST_DIRS)

$(COMPILED_TEST_DIRS): %compiled__ : %
	$(BABEL) $< --out-dir $@

clean-tests:
	rm -rf $(COMPILED_TEST_DIRS)

coverage:
	make compile-tests
	$(ISTANBUL) $(ISTANBUL_ARGS) $(MOCHA) -- $(MOCHA_ARGS) $(COMPILED_TEST_DIRS); \
	status=$$?; \
	make clean-tests; \
	exit $$status
	node scripts/open-coverage

clean-coverage:
	rm -rf coverage

.PHONY: test compile-tests clean-tests coverage clean-coverage
