####################################################################################################
# Configuration
####################################################################################################

include .env
export

# Build configuration

BUILD = build
MAKEFILE = Makefile
OUTPUT_FILENAME = book
METADATA = metadata.yml
TOC = --toc --toc-depth 2
METADATA_ARGS = --metadata-file $(METADATA)
IMAGES = $(shell find images -type f)
TEMPLATES = $(shell find templates/ -type f)
COVER_IMAGE = images/image.png
MATH_FORMULAS = --webtex
RESOURCE_PATH = --resource-path=.:chapters

# Chapters content
CONTENT = find chapters -type f -name "*.md" ! -path "chapters/AI/*" -print0 | xargs -0 cat

$(info CONTENT=$(CONTENT))

CONTENT_FILTERS = tee # Use this to add sed filters or other piped commands

# Pages to blank

# === Configuration ===
BOOK_PDF := build/pdf/book.pdf

# Debugging

DEBUG_ARGS = --verbose

# Pandoc filtes - uncomment the following variable to enable cross references filter. For more
# information, check the "Cross references" section on the README.md file.

# FILTER_ARGS = --filter pandoc-crossref

# Per-format include fragments (use format-appropriate raw snippets)
COMPILE_DATE = $(shell date +"%Y-%m-%d")
# don't include per-file colophon; embed in templates instead
INCLUDE_AFTER_HTML =
INCLUDE_BEFORE_EPUB =
INCLUDE_BEFORE_PDF = --include-before-body=templates/colophon.tex

# Combined arguments

ARGS = $(TOC) $(MATH_FORMULAS) $(METADATA_ARGS)  #$(FILTER_ARGS) # $(DEBUG_ARGS)
	
PANDOC_COMMAND = pandoc --lua-filter=filters/verse-sections.lua

# Per-format options

DOCX_ARGS = --standalone --reference-doc templates/docx.docx
EPUB_ARGS = --epub-cover-image $(COVER_IMAGE) --css=templates/style.css --metadata compiledate=$(COMPILE_DATE)
HTML_ARGS = --template templates/html.html --standalone --to html5 --metadata compiledate=$(COMPILE_DATE)
PDF_ARGS = --pdf-engine lualatex --lua-filter=filters/page-break.lua
# --lua-filter=remove-footnotes.lua
# 	--template templates/pdf.latex


# Per-format file dependencies

BASE_DEPENDENCIES = $(MAKEFILE) $(CHAPTERS) $(METADATA) $(IMAGES) $(TEMPLATES)
DOCX_DEPENDENCIES = $(BASE_DEPENDENCIES)
EPUB_DEPENDENCIES = $(BASE_DEPENDENCIES)
HTML_DEPENDENCIES = $(BASE_DEPENDENCIES)
PDF_DEPENDENCIES = $(BASE_DEPENDENCIES)

# Detected Operating System

OS = $(shell sh -c 'uname -s 2>/dev/null || echo Unknown')

# OS specific commands

ifeq ($(OS),Darwin) # Mac OS X
	COPY_CMD = cp -P
else # Linux
	COPY_CMD = cp --parent
endif

MKDIR_CMD = mkdir -p
RMDIR_CMD = rm -r
ECHO_BUILDING = @echo "building $@...\n"
ECHO_BUILT = @echo "$@ was built\n"
ECHO_COPYING = @echo "copying $(CHAPTERS_DIR) to chapters/ \n"
CP_CHAPTERS = $(ECHO_COPYING) && cp -r $(CHAPTERS_DIR)/* chapters/
RENAME_CHAPTERS = \
	find chapters -type f -name '* *' -exec bash -c 'for f; do d=$$(dirname "$$f"); b=$$(basename "$$f"); mv -n "$$f" "$$d/$${b// /_}"; done' _ {} + && \
	find chapters -depth -type d -name '* *' -exec bash -c 'for f; do d=$$(dirname "$$f"); b=$$(basename "$$f"); mv -n "$$f" "$$d/$${b// /_}"; done' _ {} +

####################################################################################################
# Basic actions
####################################################################################################

.PHONY: all book clean copy epub html pdf docx

all:	copy book

book:	epub html pdf docx

clean:
	$(RMDIR_CMD) $(BUILD)

copy:
	$(RMDIR_CMD) -f chapters/*
	$(CP_CHAPTERS) && $(RENAME_CHAPTERS)

####################################################################################################
# File builders
####################################################################################################

epub:	$(BUILD)/epub/$(OUTPUT_FILENAME).epub

html:	$(BUILD)/html/$(OUTPUT_FILENAME).html

pdf:	$(BUILD)/pdf/$(OUTPUT_FILENAME).pdf

docx:	$(BUILD)/docx/$(OUTPUT_FILENAME).docx

$(BUILD)/epub/$(OUTPUT_FILENAME).epub:	$(EPUB_DEPENDENCIES)
	$(ECHO_BUILDING)
	$(MKDIR_CMD) $(BUILD)/epub
	$(MKDIR_CMD) $(BUILD)/tmp
	@sed 's/<!--fecha-->/'"$(COMPILE_DATE)"'/g' templates/colophon.html > $(BUILD)/tmp/colophon.html
	@awk 'BEGIN{f="$(BUILD)/tmp/colophon.html"} {print} /<!--COLPHON_MARKER-->/ {while((getline line < f)>0) print line}' templates/epub.html > $(BUILD)/tmp/epub_template.html
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) --template=$(BUILD)/tmp/epub_template.html $(ARGS) $(EPUB_ARGS) -o $@
	$(ECHO_BUILT)

$(BUILD)/html/$(OUTPUT_FILENAME).html:	$(HTML_DEPENDENCIES)
	$(ECHO_BUILDING)
	$(MKDIR_CMD) $(BUILD)/html
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) $(INCLUDE_AFTER_HTML) $(ARGS) $(HTML_ARGS) -o $@
	$(COPY_CMD) $(IMAGES) $(BUILD)/html/
	$(ECHO_BUILT)

$(BUILD)/pdf/$(OUTPUT_FILENAME).pdf:	$(PDF_DEPENDENCIES)
	$(ECHO_BUILDING)
	$(MKDIR_CMD) $(BUILD)/pdf
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) $(INCLUDE_BEFORE_PDF) $(ARGS) $(PDF_ARGS) -o $@
	$(ECHO_BUILT)

$(BUILD)/docx/$(OUTPUT_FILENAME).docx:	$(DOCX_DEPENDENCIES)
	$(ECHO_BUILDING)
	$(MKDIR_CMD) $(BUILD)/docx
	$(CONTENT) | $(CONTENT_FILTERS) | $(PANDOC_COMMAND) $(ARGS) $(DOCX_ARGS) -o $@
	$(ECHO_BUILT)
