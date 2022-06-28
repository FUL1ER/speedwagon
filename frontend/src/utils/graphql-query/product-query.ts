export const getAllProductsByQuery = `
    {
        products {
            id
            productTitle
            producer
            price
            filename
            productRating
        }
    }
`;

export const getProductByQuery = (id: string) => `
    {
        product(id: ${id}) {
            id
            productTitle
            producer
            year
            country
            productGender
            fragranceTopNotes
            fragranceMiddleNotes
            fragranceBaseNotes
            filename
            price
            volume
            type
            productRating
            reviews {
                id
                author
                message
                date
                rating
            }
        }
    }
`;

export const getProductsByIdsQuery = (ids: Array<number>) => `
    {
        productsIds(ids: [${ids}]) {
            id
            productTitle
            producer
            price
            filename
            productRating
        }
    }
`;
