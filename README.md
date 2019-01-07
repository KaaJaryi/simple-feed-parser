# simple-feed-parser

Easy-to-use parser with a formatted response

## Usage

```js
import { parse } from 'simple-feed-parser'

fetch( someFeed )
    .then( res => response.text() )
    .then( text => parse( text ) )
/*
 * return an object :
 * {
 *   type: undefined, => ( rss | atom )
 *   title: undefined,
 *   links: [],
 *   description: undefined,
 *   language: undefined,
 *   copyright: undefined, => ( copyright | rights )
 *   authors: [],
 *   lastUpdated: undefined,
 *   lastPublished: undefined,
 *   categories: [],
 *   image: { => not supported right now :/
 *       url: undefined,
 *       title: undefined,
 *       description: undefined,
 *       width: undefined,
 *       height: undefined
 *   },
 *   items: [{
 *       title: undefined,
 *       links: [],
 *       id: undefined, => ( id | guid | title )
 *       imageUrl: undefined,
 *       description: undefined, => ( description | summary | contentSnippet )
 *       content: undefined, => ( content:encoded | content )
 *       categories: [],
 *       authors: [], => ( author | contributor | creator | managingEditor | dc:creator )
 *       dates: {
 *           published: undefined, => ( pubDate | published | dc:date )
 *           updated: undefined => ( lastBuildDate | updated | dc:date )
 *       },
 *   }]
 * }
 */
```
