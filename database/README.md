To initialize database(Elasticsearch):
1. install Docker
2. run `npm install` in the database folder
3. In your CLI run `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.0`
4. then `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.0`
5. Then run `ElasticSearchFeeder.js` with node For example with `node ElasticSearchFeeder.js` 