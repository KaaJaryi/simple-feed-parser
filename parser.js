import tagNames from './tagNames'
import model from './model'

export const parser = ( xml, feedType ) => {
    let parsed = Object.assign({}, model )
    const metadatas = getMetadatas( xml, feedType )

    Object.entries( metadatas ).forEach(
        ( [key, value] ) => {
            parsed[key] = value
        }
    )

    parsed.items = getItems( xml, feedType )

    return parsed
}

const getMetadatas = ( xml, feedType ) => {
    let metadatas = {}
    let channelTag
    if( feedType === 'rss' ) channelTag = 'channel'
    else if( feedType === 'atom' ) channelTag = 'feed'

    const channelNode = xml.getElementsByTagName( channelTag )[0]

    metadatas.type = feedType
    metadatas.title = getOneTextContent( channelNode, 'title' )
    metadatas.links = getTextContents( channelNode, 'link' )
    metadatas.description = getOneTextContent( channelNode, 'description' )
    metadatas.language = getOneTextContent( channelNode, 'language' )
    metadatas.copyright = getOneTextContent( channelNode, 'copyright' )
    metadatas.authors = getTextContents( channelNode, 'author' )
    metadatas.lastUpdated = getOneTextContent( channelNode, 'updated' )
    metadatas.lastPublished = getOneTextContent( channelNode, 'published' )
    metadatas.categories = getTextContents( channelNode, 'category' )
    //metadatas.image = getChannelImage( channelNode )

    return metadatas
}

const getItems = ( xml, feedType ) => {
    let itemTag = ''
    if( feedType === 'rss' ) itemTag = 'item'
    else if( feedType === 'atom' ) itemTag = 'entry'

    const itemNodes = Array.from( xml.getElementsByTagName( itemTag ) )

    return itemNodes.map( item => {
        return {
            title: getOneTextContent( item, 'title' ),
            links: getTextContents( item, 'link' ),
            description: getOneTextContent( item, 'description' ),
            id: getOneTextContent( item, 'id' ),
            //imageUrl: getItemImage( item ),
            content: getOneTextContent( item, 'content' ),
            authors: getTextContents( item, 'author' ),
            categories: getTextContents( item, 'category' ),
            dates: {
                published: getOneTextContent( item, 'published' ),
                updated: getOneTextContent( item, 'updated' )
            },
        }
    })
}

const getChildElements = ( node, tagName ) => {
    if( !node ) return []

    let elements = []

    if( tagName in tagNames ){
        for( let tag of tagNames[tagName] ) {
            elements.push( Array.from( node.getElementsByTagName( tag ) ) )
        }
        elements = elements.reduce( ( a, b ) => a.concat( b ) )
    } else {
        elements = Array.from( node.getElementsByTagName( tagName ) )
    }

    return elements.filter( element => element.parentNode.nodeName === node.nodeName )
}

const getTextContents = ( node, tagName ) => {
    const array = getChildElements( node, tagName )

    return array.map( element => element.textContent )
}

const getOneTextContent = ( node, tagName ) => {
    const array = getTextContents( node, tagName )
    return array[0] || undefined
}
