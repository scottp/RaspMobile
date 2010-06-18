JAVASCRIPT=\
	ext-touch.js\
	Ext.ux.UniversalUI.js\
	index.js\
	rasp.js

VERSION=1

build:
	cat $(JAVASCRIPT) > temp.js
	# XXX Compress javascript
	cp temp.js rasp_full.js
	cp cache.manifest.template cache.manifest
	echo "# version $(VERSION)" >> cache.manifest
