curl -XDELETE "http://elastic:changeme@127.0.0.1:9200/myindex"

curl -XPUT "http://elastic:changeme@127.0.0.1:9200/myindex" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "mytype": {
      "properties": {
        "category": {
          "type":  "keyword"
        },
        "country": {
          "type":  "keyword"
        },
        "type": {
          "type":  "keyword"
        },
		"rank": {
		  "type":  "integer"
		}
      }
    }
  }
}'

rm amazon.json

node scrape_test.js

curl -s -H "Content-Type: application/x-ndjson" -XPOST --data-binary @amazon.json "http://elastic:changeme@127.0.0.1:9200/_bulk"
