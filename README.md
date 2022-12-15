# hedi-public

This is the public repository for [Hedi](https://hedi.app), a platform that links pregnant women and young parents together with midwives, gynecologists, pediatricians and points of contact at social organizations. The main goal of Hedi is to help pregnant women find quick answers to their questions about pregnancy in their language and also to find a midwife who will help and accompany them during pregnancy and afterwards.

In addition to searching for midwives, users can connect and communicate with them via live chat or voice/video call.

## Modules

Hedi consists of three main modules:

**Module I: Information**

Hedi provides multimedia and multilingual information content in the form of articles, which are linked to comprehensive data sets including contact information of midwives and organisations related to prenatal care.

**Module II: Midwife search and matching**

The search module helps pregnant women and young families find midwives in their region who are available at or around the expected date of birth. The search results consider parameters like provided services or spoken languages. Midwives and users can connect to in order to fullfill a care.

**Module III: Communication**

In order to decide which care requests to accept and to communicate during an active care, Hedi provides users with a secure messenger, based on the [matrix](https://matrix.org/) protocol. It can be used to chat via text, audio and video through peer-to-peer connections.

## System Architecture

Technically Hedi has multple loosely coupled components.

The main component [hedi-app](./hedi-app/) is based on the React meta-framework [Next.js](https://nextjs.org/). It contains all frontend components for the client as well as the api layer which is the interface to the (CMS-)backend / data layer.

The second repository is the [hedi-solr-module](./hedi-solr-utils/) which utilizes the [solr](https://solr.apache.org/) search server in order to query e.g. profiles based on parameters such as location or monthly capacity.

![Hedi Context](./docs/images/Hedi_APP_Architecture_Hedi_Context.png)
## App Modules

![Hedi App Modules](./docs/images/Hedi_APP_Architecture_Hedi_App_Modules.png)

## Scope

![Hedi Scope](./docs/images/Hedi_APP_Architecture_Hedi_App_Scope.png)

## Documentation

Where necessary, more detailed documentation on the included modules has been added to the corresponeding subdirectories.


* [hedi-app](./hedi-app/README.md)
  * [auth](./hedi-app/modules/auth/README.md)
  * [search](./hedi-app/modules/search/README.md)
    * [server](./hedi-app/modules/search/server/solr/README.md)
  * [messaging](./hedi-app/modules/messaging/README.md)
    * [client](./hedi-app/modules/messaging/client/README.md)
* [hedi-solr-utils](./hedi-solr-utils/README.md)