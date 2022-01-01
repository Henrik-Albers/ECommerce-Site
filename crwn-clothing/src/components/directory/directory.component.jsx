import React, { Component } from 'react'

import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'

class Directory extends React.Component {
    constructor() {
        super()
        this.state = {
            sections: [
                {
                    title: 'hats',
                    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                    id: 1,
                    linkUrl: 'shop/hats',
                    tempUrl: 'hats',
                },
                {
                    title: 'jackets',
                    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2,
                    linkUrl: 'shop/jackets',
                    tempUrl: '',
                },
                {
                    title: 'sneakers',
                    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3,
                    linkUrl: 'shop/sneakers',
                    tempUrl: '',
                },
                {
                    title: 'womens',
                    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                    size: 'large',
                    id: 4,
                    linkUrl: 'shop/womens',
                    tempUrl: '',
                },
                {
                    title: 'mens',
                    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                    size: 'large',
                    id: 5,
                    linkUrl: 'shop/mens',
                    tempUrl: '',
                },
            ],
        }
    }

    render() {
        return (
            <div className="directory-menu">
                {this.state.sections.map(
                    ({ id, tempUrl, ...otherSectionProps }) => (
                        <MenuItem
                            key={id}
                            {...otherSectionProps}
                            linkUrl={tempUrl}
                        />
                    )
                )}
            </div>
        )
    }
}

export default Directory
