JAVASCRIPT=\
	ext-touch.js\
	Ext.ux.UniversalUI.js\
	index.js\
	rasp.js\
	view.js

VERSION=2

build:
	cat $(JAVASCRIPT) > temp.js
	./jsminify temp.js rasp_full.js
	rm temp.js
	cp cache.manifest.template cache.manifest
	echo "# version $(VERSION)" >> cache.manifest
	tar cvzf release_$(VERSION).tar.gz cache.manifest index.html rasp_full.js rasp.css resources/

test:
	jsl.sh $(JAVASCRIPT)
