import {Order, OrderError, OrderRequest} from "../../types/types";

export const orderRequestData: OrderRequest = {
    "firstName": "John",
    "lastName": "Doe",
    "city": "New York",
    "address": "Wall Street1",
    "postIndex": "1234567890",
    "phoneNumber": "1234567890",
    "email": "test123@test.com",
    "productId": [33, 34],
    "totalPrice": 840
};

export const orderData: Order = {
    "id": 1,
    "totalPrice": 840,
    "date": "2021-04-07",
    "firstName": "John",
    "lastName": "Doe",
    "city": "New York",
    "address": "Wall Street1",
    "email": "test123@test.com",
    "phoneNumber": "1234567890",
    "postIndex": 1234567890,
    "orderItems": [
        {
            "id": 1,
            "amount": 384,
            "quantity": 2,
            "product": {
                "id": 33,
                "productTitle": "Chanel N5",
                "producer": "Chanel",
                "year": 1921,
                "country": "France",
                "productGender": "female",
                "fragranceTopNotes": "Aldehydes, Bergamot, Neroli",
                "fragranceMiddleNotes": "Iris, Grasse jasmine",
                "fragranceBaseNotes": "Amber, Sandalwood, Vanilla",
                "description": "",
                "filename": "4b51181b-5551-4321-b5e7-f7612584c9b2.Chanel N5.jpg",
                "price": 192,
                "volume": "200",
                "type": "Eau de parfum",
                "productRating": 0,
                "reviewsCount": 0,
                "reviews": [],
                "file": null
            }
        },
        {
            "id": 2,
            "amount": 456,
            "quantity": 3,
            "product": {
                "id": 34,
                "productTitle": "Aventus",
                "producer": "Creed",
                "year": 2010,
                "country": "France",
                "productGender": "male",
                "fragranceTopNotes": "Pineapple, Apple, Bergamot, Blackcurrant",
                "fragranceMiddleNotes": "Birch, Jasmine, Patchouli",
                "fragranceBaseNotes": "Ambergris, Oakmoss, Musk",
                "description": "",
                "filename": "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
                "price": 152,
                "volume": "100",
                "type": "Eau de parfum",
                "productRating": 0,
                "reviewsCount": 0,
                "reviews": [],
                "file": null
            }
        }
    ]
};

export const ordersData: Array<Order> = [
    {
        "id": 1,
        "totalPrice": 840,
        "date": "2021-04-07",
        "firstName": "John",
        "lastName": "Doe",
        "city": "New York",
        "address": "Wall Street1",
        "email": "test123@test.com",
        "phoneNumber": "1234567890",
        "postIndex": 1234567890,
        "orderItems": [
            {
                "id": 1,
                "amount": 384,
                "quantity": 2,
                "product": {
                    "id": 33,
                    "productTitle": "Chanel N5",
                    "producer": "Chanel",
                    "year": 1921,
                    "country": "France",
                    "productGender": "female",
                    "fragranceTopNotes": "Aldehydes, Bergamot, Neroli",
                    "fragranceMiddleNotes": "Iris, Grasse jasmine",
                    "fragranceBaseNotes": "Amber, Sandalwood, Vanilla",
                    "description": "",
                    "filename": "4b51181b-5551-4321-b5e7-f7612584c9b2.Chanel N5.jpg",
                    "price": 192,
                    "volume": "200",
                    "type": "Eau de parfum",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            },
            {
                "id": 2,
                "amount": 456,
                "quantity": 3,
                "product": {
                    "id": 34,
                    "productTitle": "Aventus",
                    "producer": "Creed",
                    "year": 2010,
                    "country": "France",
                    "productGender": "male",
                    "fragranceTopNotes": "Pineapple, Apple, Bergamot, Blackcurrant",
                    "fragranceMiddleNotes": "Birch, Jasmine, Patchouli",
                    "fragranceBaseNotes": "Ambergris, Oakmoss, Musk",
                    "description": "",
                    "filename": "bdb203a9-0725-4ed4-a71a-db7eeb915fae.Creed Aventus.jpg",
                    "price": 152,
                    "volume": "100",
                    "type": "Eau de parfum",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            }
        ]
    },
    {
        "id": 2,
        "totalPrice": 240,
        "date": "2021-04-07",
        "firstName": "John",
        "lastName": "Doe",
        "city": "New York",
        "address": "Wall Street1",
        "email": "test123@test.com",
        "phoneNumber": "1234567890",
        "postIndex": 1234567890,
        "orderItems": [
            {
                "id": 3,
                "amount": 178,
                "quantity": 2,
                "product": {
                    "id": 39,
                    "productTitle": "Love in Black",
                    "producer": "Creed",
                    "year": 2008,
                    "country": "France",
                    "productGender": "female",
                    "fragranceTopNotes": "White violet",
                    "fragranceMiddleNotes": "Florentine iris, Clove",
                    "fragranceBaseNotes": "Rose, Burgundy blackcurrant, Violet",
                    "description": "",
                    "filename": "cbb8efd1-f55a-4db3-8511-f0b5b446533d.Creed Love in Black.jpg",
                    "price": 89,
                    "volume": "75",
                    "type": "Eau de parfum",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            },
            {
                "id": 4,
                "amount": 62,
                "quantity": 1,
                "product": {
                    "id": 43,
                    "productTitle": "Sauvage",
                    "producer": "Dior",
                    "year": 2015,
                    "country": "France",
                    "productGender": "male",
                    "fragranceTopNotes": "Sichuan Pepper",
                    "fragranceMiddleNotes": "Bergamot",
                    "fragranceBaseNotes": "Ambroxan",
                    "description": "",
                    "filename": "03e65b3b-7b1f-400c-9bb8-a8956bdaa4be.Dior Sauvage.jpg",
                    "price": 62,
                    "volume": "100",
                    "type": "Eau de Toilette",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            }
        ]
    },
    {
        "id": 3,
        "totalPrice": 163,
        "date": "2021-04-07",
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "city": "Moscow",
        "address": "Tverskaya street 1",
        "email": "ivan123@test.com",
        "phoneNumber": "1234567890",
        "postIndex": 1234567890,
        "orderItems": [
            {
                "id": 5,
                "amount": 63,
                "quantity": 1,
                "product": {
                    "id": 77,
                    "productTitle": "Ultra Male",
                    "producer": "Jean Paul Gaultier",
                    "year": 2015,
                    "country": "France",
                    "productGender": "male",
                    "fragranceTopNotes": "Bergamot, Pear, Lavender, Mint",
                    "fragranceMiddleNotes": "Cumin, Cinnamon, Clary sage",
                    "fragranceBaseNotes": "Vanilla, Amber, Woods",
                    "description": "",
                    "filename": "776dadf8-16b0-4e74-b27c-7d590b6a2951.Jean Paul Gaultier Ultra Male.jpg",
                    "price": 63,
                    "volume": "125",
                    "type": "Eau de Toilette",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            },
            {
                "id": 6,
                "amount": 41,
                "quantity": 1,
                "product": {
                    "id": 85,
                    "productTitle": "1 Million",
                    "producer": "Paco Rabanne",
                    "year": 2008,
                    "country": "France",
                    "productGender": "male",
                    "fragranceTopNotes": "Red mandarin orange, Peppermint",
                    "fragranceMiddleNotes": "Rose absolute, Cinnamon",
                    "fragranceBaseNotes": "Leather, Amberketal",
                    "description": "",
                    "filename": "313b26ec-a812-4f27-93fb-de82858f6eee.Paco Rabanne 1 Million.jpg",
                    "price": 41,
                    "volume": "100",
                    "type": "Eau de Toilette",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            },
            {
                "id": 7,
                "amount": 59,
                "quantity": 1,
                "product": {
                    "id": 108,
                    "productTitle": "Dylan Blue Pour Femme",
                    "producer": "Versace",
                    "year": 2017,
                    "country": "Italy",
                    "productGender": "female",
                    "fragranceTopNotes": "Granny Smith apple, Clover, Blackcurrant sorbet",
                    "fragranceMiddleNotes": "Jasmine sambac, Petalia, Peach, Rosyfolia",
                    "fragranceBaseNotes": "Patchouli, Blond woods, Musk, Styrax",
                    "description": "",
                    "filename": "125b5660-c43d-48c4-90d8-f2b8344892ef.Versace Dylan Blue Pour Femme.png",
                    "price": 59,
                    "volume": "100",
                    "type": "Eau de parfum",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            }
        ]
    },
    {
        "id": 4,
        "totalPrice": 780,
        "date": "2021-04-07",
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "city": "Moscow",
        "address": "Tverskaya street 1",
        "email": "ivan123@test.com",
        "phoneNumber": "1234567890",
        "postIndex": 1234567890,
        "orderItems": [
            {
                "id": 8,
                "amount": 96,
                "quantity": 2,
                "product": {
                    "id": 16,
                    "productTitle": "Goldea the Roman Night Absolute",
                    "producer": "Bvlgari",
                    "year": 2018,
                    "country": "Italy",
                    "productGender": "female",
                    "fragranceTopNotes": "Orange blossom, Black plum",
                    "fragranceMiddleNotes": "Jasmine sambac absolute, Bourbon vanilla",
                    "fragranceBaseNotes": "Black musk, Patchouli, Crystallised moss",
                    "description": "",
                    "filename": "7e376792-723e-45b1-a22c-b7e549a0b1f8.Bvlgari Goldea the Roman Night Absolute.jpg",
                    "price": 48,
                    "volume": "75",
                    "type": "Eau de parfum",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            },
            {
                "id": 9,
                "amount": 684,
                "quantity": 4,
                "product": {
                    "id": 17,
                    "productTitle": "Le Gemme Ashlemah",
                    "producer": "Bvlgari",
                    "year": 2014,
                    "country": "Italy",
                    "productGender": "female",
                    "fragranceTopNotes": "Lavender",
                    "fragranceMiddleNotes": "Orris absolute",
                    "fragranceBaseNotes": "Musk",
                    "description": "",
                    "filename": "956bbe26-c07d-4e32-a567-5e4306388c0e.Bvlgari Le Gemme Ashlemah.jpg",
                    "price": 171,
                    "volume": "100",
                    "type": "Eau de parfum",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            }
        ]
    },
    {
        "id": 5,
        "totalPrice": 196,
        "date": "2021-04-07",
        "firstName": "Ivan",
        "lastName": "Ivanov",
        "city": "Moscow",
        "address": "Tverskaya street 1",
        "email": "ivan123@test.com",
        "phoneNumber": "1234567890",
        "postIndex": 1234567890,
        "orderItems": [
            {
                "id": 10,
                "amount": 92,
                "quantity": 2,
                "product": {
                    "id": 86,
                    "productTitle": "Invictus",
                    "producer": "Paco Rabanne",
                    "year": 2013,
                    "country": "France",
                    "productGender": "male",
                    "fragranceTopNotes": "Grapefruit, Marine notes",
                    "fragranceMiddleNotes": "Bay leaf, Jasmine",
                    "fragranceBaseNotes": "Gaiac wood, Oakmoss, Patchouli",
                    "description": "",
                    "filename": "7f130776-3164-4f93-82fd-bd75f63a916f.Paco Rabanne Invictus.jpg",
                    "price": 46,
                    "volume": "100",
                    "type": "Eau de Toilette",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            },
            {
                "id": 11,
                "amount": 104,
                "quantity": 2,
                "product": {
                    "id": 91,
                    "productTitle": "L'Homme Prada L'Eau",
                    "producer": "Prada",
                    "year": 2017,
                    "country": "Spain",
                    "productGender": "male",
                    "fragranceTopNotes": "Ginger, Neroli",
                    "fragranceMiddleNotes": "Ambergris, Iris",
                    "fragranceBaseNotes": "Cedarwood, Powdery notes, Sandalwood",
                    "description": "",
                    "filename": "10725eaa-2265-48ad-9cf3-d11d089c4700.Prada L'Homme Prada L'Eau.jpg",
                    "price": 52,
                    "volume": "100",
                    "type": "Eau de Toilette",
                    "productRating": 0,
                    "reviews": [],
                    "reviewsCount": 0,
                    "file": null
                }
            }
        ]
    }
];

export const orderErrorData: OrderError =  {
    emailError: "Email cannot be empty",
    firstNameError: "Fill in the input field",
    lastNameError: "Fill in the input field",
    cityError: "Fill in the input field",
    addressError: "Fill in the input field",
    postIndexError: "Post index cannot be empty",
    phoneNumberError: "Phone number cannot be empty",
};
