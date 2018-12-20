import { parser } from './parser'

export const parse = async string => {
    let xml
    let feedType
    let parsed

    xml = new DOMParser().parseFromString( string, 'text/xml' )
    feedType = identifyFeedType( xml )
    if( feedType.length ){
        parsed = parser( xml, feedType )
        return Promise.resolve( parsed )
    }
    console.log( 'feed is no good' )
    return Promise.reject( new Error( 'No good feed' ) )
}

const identifyFeedType = xml => {
    const channel = xml.getElementsByTagName( 'channel' )
    const feed = xml.getElementsByTagName( 'feed' )
    if( feed.length )
        return 'atom'
    else if( channel.length )
        return 'rss'
    return
}
