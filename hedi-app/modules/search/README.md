# HEDI Search Module

we use [SOLR](https://solr.apache.org/) as main search engine, and used modules in Drupal side in HEDI-CMS project to index documents in SOLR and in current project (HEDI-APP) we request SOLR (url is stored as SOLR_URL variable in [.env.local](./../../.env.local) file) to find matching documents (entities)

## field names in SOLR

field names in SOLR have a prefix to define:

- type of the values of the field (samples: `it` for _integer_, `s` for _string_)
- multi value of single value field (`s` for _single-valued_ and `m` for _multi-valued_)

this prefixes are defined in schema.xml in HEDI-CMS project. 

for example if a field name in solr is `is_content__nid`, this field contains a single integer value. 

to avoid this naming complexities, we have defined a utility function [solrFieldNameBuilder](./server/solr/solrFieldNameBuilder.ts) to be used to build the field names.

## searchConfigs

we use an object named [searchConfigs](./server/solr/searchConfigs.ts) to have all fields of all search types (searchEditorial, quickSearch, searchMidwife, searchProfile) in one place. [more detailed information](./server/solr/README.md#searchConfigs).