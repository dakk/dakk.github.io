all:
	JEKYLL_ENV=production jekyll build

serve:
	jekyll serve

prereq:
	bundle-2.7 install
	gem install public_suffix --version 4.0.5
	gem install addressable --version 2.7.0
	gem install concurrent-ruby --version 1.1.6
	gem install http_parser.rb --version 0.6.0
	gem install em-websocket --version 0.5.1
	gem install faraday-net_http 
	gem install faraday --version 2.7.4
	gem install ffi --version 1.13.1

deploy:
	make
	git add _site

import:
	bundle-2.7 exec ruby import_feed.rb