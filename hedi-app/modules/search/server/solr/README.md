# naming convention for fields in Solr Index in Drupal

in the [index settings](https://cms.projekt-hedi.de/en/admin/config/search/search-api) of drupal, to have a unified way to manage the name of the fields, we use this conventions:

1. remove the `field_`
2. use `__` as separator of paths(\*) and instead of `:entity:` too
3. use **entity-type** in the beginning of the names, to avoid duplicated names

(\*) path: path of access to a property. like `.` in typescript or `->` in php: `field_profession->entity->parent->entity->field_id`

| sample property path                             | ->  | should be named as                   |
| ------------------------------------------------ | --- | ------------------------------------ |
| `label` (of profile)                             | ->  | `profile__label`                     |
| `field_language_levels:entity:field_langcode`    | ->  | `profile__language_levels__langcode` |
| `field_services:entity:name`                     | ->  | `profile__services__name`            |
| `type` (of content)                              | ->  | `content__type`                      |
| `field_profession:entity:parent:entity:field_id` | ->  | `profile__profession__parent__id`    |

## solr meta fields

there is a few fields that has specific meaning and we use these fields too:

- `ss_search_api_language` : the language of entity. sample: **de**
- `ss_search_api_id` : the id of the entity in solr. sample: **entity:profile/10:de**

## solr naming

solr uses a prefix for fieldnames, representing some settings. for example the prefix `its` in `its_profile__id` means:

- `it` : this field contains `i`n`t`eger value(s)
- `s` : this field is `s`ingle valued (and not `m`ulti-valued)

## searchConfigs

every property/fields of [searchConfigs object](./searchConfigs.ts), of type ISolrSearchConfig, has two properties/fields:

- filters: an array of SolrFilter, to filter just the matched documents. the documents the do not meet this criterias, are not listed in search results.
- groupedFields: and array of IGroupedFields. every groupedFields has a `name` to be accessed/found using this, and a list of `fields` that should be returned for every search result.

### groupedFields

why do we have grouped fields?

1. to be able to apply specific business logic for a set of fields.
2. to be able to score the result documents correctly. 
3. to simplify score analyses and multiplication of scores.

for example if we have a group with `name:"services"` and with this two fields: profile__services__name, profile__services__tags__name. if we search for `yoga` it's not important, if `yoga` is found in profile__services__name or profile__services__tags__name. we can say: **`yoga` is found in `services`**


## HOWTO

### HOW TO get more fields from solr document

there is a setting for every search type (quicksearch, searchMidwife, searchProfile, ...) in [searchConfig](#searchConfigs). first find your search type setting. all the fields mentioned in [groupedFields](#groupedFields) are retrieved (and scored later). you can add your field to one of the existing groupedFields or create a new one.

### HOW TO make settings of translatable fields

for translatable fields, solr uses `_LANG-CODE_` in field names. this is handled in [solrFieldNameBuilder](./solrFieldNameBuilder.ts) utility function as `translatable` argument. the next argument of this util function is `lang` in which is the current language of user/system/... .

- NOTE: if you specify `translatable: true` for input parameter, but not provide the `lang` argument, the field name would contain `_{lang}_` it it's name that should be handled by you later.

### HOW TO add `AND OR` to filters in searchConfigs

by default the items in `filters` are combined using `AND` operator. if you specify two filters, just the documents could be in result list of solr, that meet the both criterias. if you want to have `A OR B` you can add a filter as string wrapped by parantheses. 

this filter:
```
quickSearch: {
  filters: [
    `(${solrFieldNameBuilder(
      SolrFieldType.String,
      false,
      "profile__bundle"
    )}:[* TO *] OR ${solrFieldNameBuilder(
      SolrFieldType.String,
      false,
      "taxonomy__vid"
    )}:glossary_term)`,
  ],
  ...
```

causes:

  - the documents that have `...profile__bundle` field (using `x:[* TO *]` means: all documents that have `x` property)
  - `OR`
  - the documents with `...taxonomy__vid:glossary_term`

be listed in result.

NOTE: the real filter string was: `ss_profile__bundle:[* TO *] OR ss_taxonomy__vid:glossary_term`. but to avoid prefix complexities, we have used [solrFieldNameBuilder](./solrFieldNameBuilder.ts) utility function.

### HOW TO get the result of a solr function value

there is two ways:
  - add your function call string direct in `fl` parameter of solr request.
  - add your function call string as in `fields` array of a [groupedFields](#groupedFields). NOTE that the functions get input parameters, so in this way you should handle in manually. for example add `myFnResult:myFn("{p1}","{p2}")` in `fields` and replace the `{p1}` and `{p2}` in your request function.

we have used the first way for geoDistance and intersectRatio functions in the codes, but the second way is available too.