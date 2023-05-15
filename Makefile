all:
	rm _posts/*.html
	JEKYLL_ENV=production jekyll build

serve:
	jekyll serve

prereq:
	bundle-2.7 install

deploy:
	make
	git add _site

import:
	jekyll import medium --username dakk --canonical_link