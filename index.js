import { parser } from './parser'

export const parse = string => {
    let xml
    let feedType
    let parsed

    xml = new DOMParser().parseFromString( string, 'text/xml' )
    feedType = identifyFeedType( xml )
    if( feedType.length ){
        parsed = parser( xml, feedType )
        return parsed
    } else {
        throw new Error( 'XML is no good' )
    }
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
