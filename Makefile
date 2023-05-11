all:
	JEKYLL_ENV=production jekyll build

serve:
	jekyll serve

prereq:
	bundle install
