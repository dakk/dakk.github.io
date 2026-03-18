all:
	rm -f _posts/*.html
	JEKYLL_ENV=production ~/bin/jekyll build

serve:
	~/bin/jekyll serve

prereq:
	bundle-2.7 install

deploy:
	make
	git add _site

import:
	~/bin/jekyll import medium --username dakk --canonical_link