import { parser } from './parser'

export const parse = async string => {
    let xml
    let feedType
    try {
        xml = new DOMParser().parseFromString( string, 'text/xml' )
        feedType = await identifyFeedType( xml )
    } catch ( e ) {
        return Promise.reject( 'No good feed' )
    }
    return parser( xml, feedType )
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
