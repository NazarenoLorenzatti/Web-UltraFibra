interface ZonePrice {
    zone: string;
    price: number;
}

interface Plan {
    name: string;
    prices: ZonePrice[];
}

export const plans: Plan[] = [
    {
        name: "Plan Mega 100Mb",
        prices: [
            { zone: "Zona Sur", price: 16700 },
            { zone: "Zona Norte", price: 16700 },
            { zone: "Gaboto", price: 16700 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Plan Super 200Mb",
        prices: [
            { zone: "Zona Sur", price: 17000 },
            { zone: "Zona Norte", price: 17000 },
            { zone: "Gaboto", price: 17000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Plan Ultra 300Mb",
        prices: [
            { zone: "Zona Sur", price: 21100 },
            { zone: "Zona Norte", price: 21100 },
            { zone: "Gaboto", price: 21100 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Mega Plus 100Mb + Tv HD",
        prices: [
            { zone: "Zona Sur", price: 16700 },
            { zone: "Zona Norte", price: 16700 },
            { zone: "Gaboto", price: 16700 },
            { zone: "Andino Casco", price: 16700 },
            { zone: "Tarifa Congelada", price: 16000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Super Plus 200Mb + Tv HD",
        prices: [
            { zone: "Zona Sur", price: 16700 },
            { zone: "Zona Norte", price: 16700 },
            { zone: "Gaboto", price: 16700 },
            { zone: "Andino Casco", price: 16700 },
            { zone: "Tarifa Congelada", price: 16000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Ultra Plus 300Mb + Tv HD",
        prices: [
            { zone: "Zona Sur", price: 16700 },
            { zone: "Zona Norte", price: 16700 },
            { zone: "Gaboto", price: 16700 },
            { zone: "Andino Casco", price: 16700 },
            { zone: "Tarifa Congelada", price: 16000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Cable",
        prices: [
            { zone: "Zona Sur", price: 16700 },
            { zone: "Zona Norte", price: 16700 },
            { zone: "Gaboto", price: 16700 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Comercio 25Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Comercio 50Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Comercio 100Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Inalámbrico 4Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Inalámbrico 5Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Inalámbrico 10Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Corpo 30Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Corpo 50Mb",
        prices: [
            { zone: "DefaultZone", price: 0 },
        ],
    }
];


interface Zone {
    city: string,
    zone: string
}

export const zones: Zone[] = [
    {
        city: "Gaboto",
        zone: "Gaboto"
    },
    {
        city: "Andino Casco",
        zone: "Andino Casco"
    },
    {
        city: "Tarifa Congelada",
        zone: "Tarifa Congelada"
    },
    {
        city: "Monje",
        zone: "Zona Norte"
    },
    {
        city: "Maciel",
        zone: "Zona Norte"
    },
    {
        city: "Oliveros",
        zone: "Zona Norte"
    },
    {
        city: "Timbues",
        zone: "Zona Norte"
    },
    {
        city: "Puerto San Martin",
        zone: "Zona Norte"
    },
    {
        city: "Fray Luis Beltran",
        zone: "Zona Sur"
    },
    {
        city: "Granadero Baigorria",
        zone: "Zona Sur"
    },
    {
        city: "Capitan Bermudez",
        zone: "Zona Sur"
    },
    {
        city: "DefaultZone",
        zone: "DefaultZone"
    }
]


