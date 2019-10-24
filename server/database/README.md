## Requirements
1. Docker with linux subsystem (Running docker on windows requires virtualization enabled, which is a win 10 pro feauture, a free licence can be obtained from NTNU)
2. Node 12.10.0 is confirmed working (node 10 will not work without adding dependencies)
### To initialize database(Elasticsearch):

1. install Docker on your system
2. In your CLI run `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.0`
3. then `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.0`
4. run `npm install` in the server folder
5. Then run `ElasticSearchFeeder.js` with node For example with `node ElasticSearchFeeder.js` 