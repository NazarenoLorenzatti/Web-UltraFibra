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
            { zone: "Zona Sur", price: 17300 },
            { zone: "Zona Norte", price: 17300 },
            { zone: "Gaboto", price: 17000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Plan Super 200Mb",
        prices: [
            { zone: "Zona Sur", price: 21500 },
            { zone: "Zona Norte", price: 23200 },
            { zone: "Gaboto", price: 22100 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Plan Ultra 300Mb",
        prices: [
            { zone: "Zona Sur", price: 26200 },
            { zone: "Zona Norte", price: 28200 },
            { zone: "Gaboto", price: 26200 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Mega Plus 100Mb + Tv HD",
        prices: [
            { zone: "Zona Sur", price: 30500 },
            { zone: "Zona Norte", price: 31700 },
            { zone: "Gaboto", price: 30800 },
            { zone: "Andino Casco", price: 23900 },
            { zone: "Tarifa Congelada", price: 16000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Super Plus 200Mb + Tv HD",
        prices: [
            { zone: "Zona Sur", price: 35500 },
            { zone: "Zona Norte", price: 36700 },
            { zone: "Gaboto", price: 35600 },
            { zone: "Andino Casco", price: 27600 },
            { zone: "Tarifa Congelada", price: 18000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Ultra Plus 300Mb + Tv HD",
        prices: [
            { zone: "Zona Sur", price: 38800 },
            { zone: "Zona Norte", price: 41600 },
            { zone: "Gaboto", price: 41000 },
            { zone: "Andino Casco", price: 31200 },
            { zone: "Tarifa Congelada", price: 20000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Cable",
        prices: [
            { zone: "Zona Sur", price: 17300 },
            { zone: "Zona Norte", price: 17300 },
            { zone: "Gaboto", price: 17000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Comercio 50Mb",
        prices: [
            { zone: "DefaultZone", price: 32600 },
        ],
    },
    {
        name: "Comercio 100Mb",
        prices: [
            { zone: "DefaultZone", price: 40600 },
        ],
    },
    {
        name: "Comercio 200Mb",
        prices: [
            { zone: "DefaultZone", price: 52700 },
        ],
    },
    {
        name: "Inalámbrico 4Mb",
        prices: [
            { zone: "DefaultZone", price: 9400 },
        ],
    },
    {
        name: "Inalámbrico 5Mb",
        prices: [
            { zone: "DefaultZone", price: 9900 },
        ],
    },
    {
        name: "Inalámbrico 10Mb",
        prices: [
            { zone: "DefaultZone", price: 11800 },
        ],
    },
    {
        name: "Corpo 30Mb",
        prices: [
            { zone: "DefaultZone", price: 47600 },
        ],
    },
    {
        name: "Corpo 50Mb",
        prices: [
            { zone: "DefaultZone", price: 80900 },
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


