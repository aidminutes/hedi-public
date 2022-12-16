
## concepts
- **transformers**: Document Transformers can be used to modify the information returned about each documents in the results of a query. transformations are often used in `fl` in bracets: `fl=id,greeting:[value v='hello']`
  - `[subquery]`: [subquery transformer](https://solr.apache.org/guide/6_6/transforming-result-documents.html#TransformingResultDocuments-_subquery_). 
  To appear in subquery document list, a field should be specified both fl parameters, in main one fl (despite the main result documents have no this field) and in subquery’s one


- **FACETING**: Faceting is the arrangement of search results into categories based on indexed terms.
Searchers are presented with the indexed terms, along with numerical counts of how many matching documents were found were each term. Faceting makes it easy for users to explore search results, narrowing in on exactly the results they are looking for.


## abreviations
- `q`: query. `q=drm_field_event_daterange:[NOW TO 2022-10-10T22:00:00Z]`
- `fq`: filter query. `fq=ss_search_api_language:de`
- `sort`: sort. `sort=score desc`
- `start, rows`. to paginate the data
- `fl`: fields list in result. `fl=*,score`. aliases can be used to: `fl=*,score,theMin:min(6, 7)`
- `df`: default search field. ???
- `wt`: writer type / result format: json, xml, php, ... . `wt=json`
- `debugQuery`: to return detailed information about scoring the documents. `debugQuery=true`
- `hl`: highlighting. `hl=true` enables highlighting
  - `hl.fl`: fields to highlight on. `hl.fl=title body`
  - `hl.simple.pre`: prefix of highlight. `hl.simple.pre=<span class="my-class">`
  - `hl.simple.post`: suffix of highlight. `hl.simple.post=</span>`
- `facet`: enables facetting. `facet=true`
- `spital`: search in spital (geo location) fields. `spital=true`
  - `pt`: lon lat of search location. `pt=53.436098 11.012234`
  - `sfield`: field to be searched in. `sfield=locs_lat_long_approx`
  - `d`: the radial distance, usually in kilometers. `d=5`

## list of solr functions that we may use
- `div`, `sub`, `sum`: mathematical calculations.
  - div(1,y) returns 1/y
  - sub(7, y) returns 7-y
  - sum(9, div(x/100)) 

- `field`: Returns the numeric docValues or indexed value of the field with the specified name. if the name is complex (has spaces) use " . When using docValues, an optional 2nd argument can be specified to select the min or max value of multivalued fields.
  0 is returned for documents without a value in the field.
    - `myFloatFieldName`
    - `field(myFloatFieldName)`
    - `field("myFloatFieldName")`
    - `field("my complex float fieldName")`
  For multivalued docValues fields:
    - `field(myMultiValuedFloatField,min)`
  **NOTE**: multivalued does not work for daterange fields

- `if`: Enables conditional function queries. In `if(test,value1,value2)`:
  - `test` is logical expression: 
    - *boolean*: TRUE / FALSE
    - *numeric*: 0 as false and NonZero as true
    - *string*: empty string as false and non-empty string as true
  - `value1` is retured if test yields TRUE
  - `value2` is retured if test yields FALSE

- `max` and `min`: returns max/min value of given arguments
  - `min(myfield,myotherfield,0)`

- `ms`: Returns milliseconds of difference between its arguments. **baseTime** is: the Unix or POSIX time epoch, midnight, January 1, 1970 UTC.
  - if called without parameter: `NOW - baseTime`
  - if called with one parameter: `Parameter - baseTime`
  - if called with two parameters: `Parameter1 - Parameter2`

- `query`: Returns the score for the given subquery, or the default value for documents not matching the query. Any type of subquery is supported through either parameter de-referencing $otherparam or direct specification of the query string in the Local Parameters through the v key.
  - `query(subquery, default)`
  - `q=product (popularity,query({!dismax v='solr rocks'})`: returns the product of the popularity and the score of the DisMax query.
  - `q=product (popularity,query($qq))&qq={!dismax}solr rocks`: equivalent to the previous query, using parameter de-referencing.
  - `q=product (popularity,query($qq,0.1))&qq={!dismax}solr rocks`: specifies a default score of 0.1 for documents that don’t match the DisMax query.
  **NOTE**: `product` function is `mul` to return multiplied values (a * b)

- `scale`: scale(x,1,2): scales the values of x such that all values will be between 1 and 2 inclusive.

- `sqrt`: Returns the square root of the specified value or function.

- `exists`: Returns true if any member of the field exists.
  - `exists(author)`: returns true for any document has a value in the "author" field.
  - `exists(query(price:5.00))`: returns true if "price" matches "5.00".

- `and`, `or`, `not`: returns logical &&, ||, !
  - `and(not(exists(popularity)),exists(price))`: returns true for any document which has a value in the price field, but does not have a value in the popularity field.

- `gt`, `gte`, `lt`, `lte`, `eq`: comparison functions for any datatype. numbers and strings are common cases to compare. 
  - gt: greater than
  - gte: greather than or equal to
  - lt: lower than
  - lte: lower than or equal to
  - eq: equal to

## extra notes
**DATE**: if there is a problem with date values like 2022-03-03T22:00:00Z maybe its needed 
to escape it to 2022\-03\-03T22\:00\:00Z

**DATERANGE**: there is `Date Range` type in Solr too. the values are like `[2022-06-01T00:00:00Z TO 2022-06-12T00:00:00Z]` and are stored as string.

**DATERANGE LIMITATIONS**: The range syntax doesn’t support embedded date math. If you specify a date instance supported by TrieDateField with date math truncating it, like NOW/DAY, you still get the first millisecond of that day, not the entire day’s range. Exclusive ranges (using { & }) work in queries but not for indexing ranges.

**DRUPAL** does not store nested documents!!!