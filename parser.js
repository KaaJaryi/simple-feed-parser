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
    console.log( parsed )

    return parsed
}

const getMetadatas = ( xml, feedType ) => {
    let metadatas = {}
    let channelTag
    if( feedType === 'rss' ) channelTag = 'channel'
    else if( feedType === 'atom' ) channelTag = 'feed'

    const channelNode = xml.getElementsByTagName( channelTag )[0]

    metadatas.title = getElementTextContent( channelNode, 'title' )
    metadatas.links = getLinks( channelNode )
    metadatas.description = getElementTextContent( channelNode, 'description' )
    metadatas.language = getElementTextContent( channelNode, 'language' )
    metadatas.copyright = getElementTextContent( channelNode, 'copyright' )
    metadatas.authors = getAuthors( channelNode )
    metadatas.lastUpdated = getElementTextContent( channelNode, 'updated' )
    metadatas.lastPublished = getElementTextContent( channelNode, 'published' )
    //metadatas.categories = getChannelCategories( channelNode )
    //metadatas.image = getChannelImage( channelNode )

    return metadatas
}

const getElements = ( node, tagName ) => node.getElementsByTagName( tagName ) || []

const getChildElements = ( node, tagName ) => {
    if( !node ) return []

    let elements = []

    if( tagName in tagNames ){
        for( let tag of tagNames[tagName] ) {
            elements.push( Array.from( node.getElementsByTagName( tag ) ) )
        }
        //concat marche pas ??
        elements = elements.reduce( ( a, b ) => a.concat( b ) )
    } else {
        elements = Array.from( node.getElementsByTagName( tagName ) )
    }

    return elements.filter( element => element.parentNode.nodeName === node.nodeName )
}

const getElementTextContentArray = ( node, tagName ) => {
    const nodes = getChildElements( node, tagName )
    return nodes.length === 0
        ? []
        : nodes.map( node => node.textContent )
}


const getElementTextContent = ( node, tagName ) => {
    const array = getElementTextContentArray( node, tagName )

    return array[0] || undefined
}

const getLinks = node => {
    const links = Array.from( getChildElements( node, 'link' ) )

    return links.map( link => link.textContent )
}

const getAuthors = node => {
    const authors = getChildElements( node, 'author' )

    return authors.map( author => author.textContent )
}

const getItems = ( xml, feedType ) => {
    let itemTag
    if( feedType === 'rss' ) itemTag = 'item'
    else if( feedType === 'atom' ) itemTag = 'entry'
    else return []

    const itemNodes = Array.from( getElements( xml, itemTag ) )

    return itemNodes.map( item => {
        return {
            title: getElementTextContent( item, 'title' ),
            links: getLinks( item ),
            description: getElementTextContent( item, 'description' ),
            id: getElementTextContent( item, 'id' ),
            //imageUrl: getItemImage( item ),
            content: getElementTextContent( item, 'content' ),
            authors: getAuthors( item ),
            //categories: getItemCategories( item ),
            dates: {
                published: getElementTextContent( item, 'published' ),
                updated: getElementTextContent( item, 'updated' )
            },
            //enclosures: getItemEnclosures( item ),
            //itunes: itunesParser.parseItem( item )
        }
    })
}
