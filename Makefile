PODMAN_RUN = podman run --rm \
	--volume="$(shell pwd):/srv/jekyll:Z" \
	--volume="jekyll-gems:/usr/local/bundle" \
	-p 4000:4000 \
	-it docker.io/jekyll/jekyll

.PHONY: all container-build container-serve build serve clean

all: container-serve

container-build:
	$(PODMAN_RUN) make build

container-serve:
	$(PODMAN_RUN) make serve

build: clean
	bundle install
	JEKYLL_ENV=production bundle exec jekyll build

serve:
	bundle install
	bundle exec jekyll serve --host 0.0.0.0 --livereload

clean:
	rm -rf _posts/*.html _site/ .jekyll-cache/
