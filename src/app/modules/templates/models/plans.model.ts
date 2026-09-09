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
        name: "Plan Mega 200Mb",
        prices: [
            { zone: "Zona Norte", price: 27100 },
            { zone: "Zona Sur", price: 27100 },
            { zone: "Barrancas", price: 27100 },
            { zone: "Gaboto", price: 26700 },
            { zone: "Baigorria", price: 25600 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Plan Super 400Mb",
        prices: [
            { zone: "Zona Norte", price: 36400 },
            { zone: "Zona Sur", price: 33600 },
            { zone: "Barrancas", price: 36400 },
            { zone: "Gaboto", price: 34500 },
            { zone: "Baigorria", price: 31700 },            
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Plan Ultra 600Mb",
        prices: [
            { zone: "Zona Norte", price: 44100 },
            { zone: "Zona Sur", price: 41100 },
            { zone: "Barrancas", price: 44100 },
            { zone: "Gaboto", price: 41100 },
            { zone: "Baigorria", price: 38700 },            
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Mega Plus 200Mb + Tv HD",
        prices: [
            { zone: "Zona Norte", price: 49700 },
            { zone: "Zona Sur", price: 47700 },
            { zone: "Barrancas", price: 49700 },
            { zone: "Gaboto", price: 48200 },
            { zone: "Andino Casco", price: 37800 },
            { zone: "Baigorria", price: 44900 },          
            { zone: "Tarifa Congelada", price: 22000 },
            { zone: "Tarifa Preferencial", price: 22000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Super Plus 400Mb + Tv HD",
        prices: [
            { zone: "Zona Norte", price: 57100 },
            { zone: "Zona Sur", price: 55700 },
            { zone: "Barrancas", price: 57100 },
            { zone: "Gaboto", price: 55800 },
            { zone: "Andino Casco", price: 43400 },
            { zone: "Baigorria", price: 52500 },          
            { zone: "Tarifa Congelada", price: 25000 },
            { zone: "Tarifa Preferencial", price: 25000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Ultra Plus 600Mb + Tv HD",
        prices: [
            { zone: "Zona Norte", price: 65100 },
            { zone: "Zona Sur", price: 60700 },
            { zone: "Barrancas", price: 65100 },
            { zone: "Gaboto", price: 64200 },
            { zone: "Andino Casco", price: 48700 },
            { zone: "Baigorria", price: 57200 },          
            { zone: "Tarifa Congelada", price: 30000 },
            { zone: "Tarifa Preferencial", price: 30000 },
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Cable",
        prices: [
            { zone: "Zona Norte", price: 27100 },
            { zone: "Zona Sur", price: 27100 },
            { zone: "Barrancas", price: 27100 },
            { zone: "Gaboto", price: 26700 },          
            { zone: "Baigorria", price: 25600 },          
            { zone: "DefaultZone", price: 0 },
        ],
    },
    {
        name: "Comercio 200Mb",
        prices: [
            { zone: "DefaultZone", price: 50900 },
        ],
    },
    {
        name: "Comercio 400Mb",
        prices: [
            { zone: "DefaultZone", price: 63500 },
        ],
    },
    {
        name: "Comercio 600Mb",
        prices: [
            { zone: "DefaultZone", price: 82300 },
        ],
    },
    {
        name: "Inalámbrico 4Mb",
        prices: [
            { zone: "DefaultZone", price: 14800 },
        ],
    },
    {
        name: "Inalámbrico 5Mb",
        prices: [
            { zone: "DefaultZone", price: 15400 },
        ],
    },
    {
        name: "Inalámbrico 10Mb",
        prices: [
            { zone: "DefaultZone", price: 18400 },
        ],
    },
    {
        name: "Corpo 30Mb",
        prices: [
            { zone: "DefaultZone", price: 74400 },
        ],
    },
    {
        name: "Corpo 50Mb",
        prices: [
            { zone: "DefaultZone", price: 126200 },
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
        city: "Baigorria",
        zone: "Zona Sur"
    },
    {
        city: "Capitan Bermudez",
        zone: "Zona Sur"
    },
        {
        city: "Barrancas",
        zone: "Barrancas"
    },
    {
        city: "DefaultZone",
        zone: "DefaultZone"
    }
]


