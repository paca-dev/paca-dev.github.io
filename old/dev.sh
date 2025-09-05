rm Gemfile.lock
docker build --network host -t my-jekyll-site .

docker run -p 4000:4000 -v $(pwd):/app my-jekyll-site 