
VERSION=0.14
PKG=AdvancedVolumeMixer2@kaipee@kaipee.co.uk
JSON=metadata.json
JS=extension.js  lib.js  mixer.js  panel.js  prefs.js  settings.js  widget.js
SCHEMA_COMP=schemas/gschemas.compiled
GSCHEMA=schemas/org.gnome.shell.extensions.AdvancedVolumeMixer2.gschema.xml

deploy: AdvancedVolumeMixer2-$(VERSION).zip

$(SCHEMA_COMP): $(GSCHEMA)
	glib-compile-schemas --targetdir=schemas schemas

AdvancedVolumeMixer2-$(VERSION).zip: $(JSON) $(JS) stylesheet.css $(SCHEMA_COMP) $(GSCHEMA)
	zip AdvancedVolumeMixer2-$(VERSION).zip $(JSON) $(JS) stylesheet.css $(SCHEMA_COMP) $(GSCHEMA)

