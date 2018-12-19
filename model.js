const model = {
    type: undefined,
    title: undefined,
    links: [],
    description: undefined,
    language: undefined,
    copyright: undefined,
    authors: [],
    lastUpdated: undefined,
    lastPublished: undefined,
    categories: [],
    image: {
        url: undefined,
        title: undefined,
        description: undefined,
        width: undefined,
        height: undefined
    },
    items: [{
        title: undefined,
        links: [],
        id: undefined,
        imageUrl: undefined,
        description: undefined,
        content: undefined,
        categories: [],
        authors: [],
        dates: {
            published: undefined,
            updated: undefined
        },
        enclosures: [{
            url: undefined,
            length: undefined,
            mimeType: undefined
        }],
    }]
}

export default model
