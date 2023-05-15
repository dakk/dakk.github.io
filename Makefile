all:
	JEKYLL_ENV=production jekyll build

serve:
	jekyll serve

prereq:
	bundle-2.7 install

deploy:
	make
	git add _site

import:
	bundle-2.7 exec ruby-2.7 import_feed.rb