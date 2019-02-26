import { parse } from '../index'
import { edj } from './examples/edj'

test( 'test xml of EDJ', async() => {
    expect.assertions( 15 )
    const parsed = await parse( edj )
    expect( parsed.title ).toBe( 'Épris de justice | Chroniques judiciaires' )
    expect( parsed.description ).toBe( 'Chroniques de procès illustrées. Histoires criminelles. Justice ordinaire. En direct des prétoires de France.' )
    expect( parsed.links.length ).toBe( 1 )
    expect( parsed.links ).toContain( 'https://www.epris-de-justice.info/' )
    expect( parsed.lastUpdated ).toBe( 'Tue, 18 Dec 2018 10:48:57 GMT' )
    expect( parsed.items.length ).toBe( 15 )
    expect( parsed.items[2].title ).toBe( '« J’aboie, mais je ne mords pas ! »' )
    expect( parsed.items[1].id ).toBe( '5c079963e0426200c0482cd9' )
    expect( parsed.items[1].links.length ).toBe( 1 )
    expect( parsed.items[1].links ).toContain( 'https://www.epris-de-justice.info/a-larc-de-triomphe-a-ce-moment-la-cest-un-climat-de-guerre/' )
    expect( parsed.items[1].authors.length ).toBe( 1 )
    expect( parsed.items[1].authors ).toContain( 'Cosme Buxin' )
    expect( parsed.items[1].categories.length ).toBe( 4 )
    expect( parsed.items[1].categories ).toContain( 'groupement en vue de violences' )
    expect( parsed.image.url ).toContain( 'https://www.epris-de-justice.info/favicon.png' )
})
