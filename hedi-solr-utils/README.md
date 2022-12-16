# General

we use [SOLR](https://solr.apache.org/) as main search engine, and used modules in Drupal side in HEDI-CMS project to index documents in SOLR and in current project (HEDI-APP) we request SOLR (url is stored as SOLR_URL variable in `.env.local` file to find matching documents (entities).
## intersectRatio
This is a number between 0.0 and 1.0 to show how a daterange is with other daterange values intersected. 1.0 means total intersect. 0.0 means no intersect. 0.33 means 33% of intersection.

## dev machine setup
to setup local machine to be able to develop/compile/... the project, this tools should be installed
a.
using https://code.visualstudio.com/docs/java/java-tutorial

b.
1. openjdk-11-jdk:
   - Linux: `sudo apt install default-jdk`. Then the directory **/usr/lib/jvm/java-11-openjdk-amd64/** contains the jdk.
   - MacOS: TODO
2. install `Language Support for Java(TM) by Red Hat` extension for VSCode.
3. config JDK path in VSCode settings:
   1. press Ctrl+Shift+P and type `Java: Configure Java Runtime`
   2. download/configure jdk. for my linux system it's: /usr/lib/jvm/java-11-openjdk-amd64
      - I had a problem with this settings and had downloaded the jdk using this settings-box but jdk-path was unknown; the problem was solved after installing default-jdk.
4. restart VSCode
5. install mvn to be able to compile maven project
   - Linux: `sudo apt install maven`
   - MacOS: TODO

## Plugin installation in SOLR
### For the first time on machine
1. $ docker cp HEDI_CMS_solr:/var/solr/data/search/conf/solrconfig.xml ./patches/solrconfig-server.xml
   - backup current solrconfig.xml of server (only for the first time)
2. $ mv ./patches/solrconfig-server.xml ./patches/solrconfig-search.xml
   - create a copy of server file to run a patch on it
3. $ patch -N ./patches/solrconfig-search.xml ./patches/solrconfig-search.patch
   - patch the changes in the copy config file
4. $ docker cp ./patches/solrconfig-search.xml HEDI_CMS_solr:/var/solr/data/search/conf/solrconfig.xml
   NOTE: this copies the file under **root** user of container. `TODO`: use current user instead

### For every build/change
1. $ mvn package
   - this compiles the project and creates a jar file in target folder: `./target/hedi-solr-utils-2.0.jar`. the name of the file may vary if you have changed the version value in _pom.xml_ file.
2. $ `docker cp ./target/hedi-solr-utils-2.0.jar HEDI_CMS_solr:/opt/solr-8.11.1/hedi/`
   -- give correct permissions:
   $ `docker exec -it --user root HEDI_CMS_solr bash`
   $ `chown root:root ./hedi/hedi-solr-utils-2.0.jar`
3. from [solr core admin](http://search.hedi.localhost/solr/#/~cores/search) **Reload** the solr

#### OR
1. $ mvn package && docker cp ./target/hedi-solr-utils-2.0.jar HEDI_CMS_solr:/opt/solr-8.11.1/hedi/ && docker exec -it --user root HEDI_CMS_solr chown root:root ./hedi/hedi-solr-utils-2.0.jar
2. from [solr core admin](http://search.hedi.localhost/solr/#/~cores/search) **Reload** the solr

## Plugin uninstallation steps

1. $ `docker cp ./patches/solrconfig-server.xml HEDI_CMS_solr:/var/solr/data/search/conf/solrconfig.xml`
   - restore old solrconfig.xml version
2. $ `docker exec -it --user root HEDI_CMS_solr bash`
3. \# `rm ./dist/hedi-solr-utils-\*.jar`
4. \# `solr restart`
5. \# `exit`
6. from [solr core admin](http://search.hedi.localhost/solr/#/~cores/search) **Reload** the solr

## usage

For more detailed documentation on solr funcionalities, also see [SOLR-README](./SOLR-README.md).

### intersectRatio

**signiture**
`intersectRatio(START_DATE_AS_STRING, END_DATE_AS_STRING, DATERANGE_FIELD_TO_BE_SEARCHED_IN)`

**sample 1.**
`fl=*,score, intersectRatio:intersectRatio("2022-01-10T22:00:00Z", "2022-03-05T11:00:00Z", "drm_field_event_daterange")`
in this sample we have used intersectRatio function in fl (result fields list) to show the value in result. we have used _intersectRatio_ as alias for this new result field. _drm_field_event_daterange_ is the name of the field with daterange values

**sample 2**
`q={!frange l=0.33 u=1.0}intersectRatio("2021-10-10T22:00:00Z", "2022-03-03T22:00:00Z", "drm_field_event_daterange")`
to _find_ items (profiles) with equal or more than 33% of intersectRatio.

**sample 3**
`fq={!frange l=0.33 u=1.0}intersectRatio("2021-10-10T22:00:00Z", "2022-03-03T22:00:00Z", "drm_field_event_daterange")`
to _filter_ items (profiles) with equal or more than 33% of intersectRatio.

### hasMonthlyCapacity

**signiture**
`hasMonthlyCapacity(ET_AS_STRING, PREGNANCY_DATES_FIELD_NAME, CAPACITY_FIELD_NAME)`

**sample 1.**
`fl=*,score, hasMonthlyCapacity:hasMonthlyCapacity("2023-01-10T22:00:00Z","expected_delivery_dates","care_capacity")`


## to restart solr

1. $ docker exec -it --user root HEDI_CMS_solr bash
2. \# solr restart
