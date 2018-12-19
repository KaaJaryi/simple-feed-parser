const tagNames = {
    id: [
        'id',
        'guid',
        'title' //in case of
    ],
    author: [
        'author',
        'creator',
        'contributor',
        'managingEditor',
        'dc:creator'
    ],
    description: [
        'description',
        'summary',
        'contentSnippet'
    ],
    content: [
        'content:encoded',
        'content'
    ],
    copyright: [
        'copyright:',
        'rights'
    ],
    published: [
        'pubDate',
        'published',
        'dc:date'
    ],
    updated: [
        'lastBuildDate',
        'updated',
        'dc:date'
    ],
}
export default tagNames
