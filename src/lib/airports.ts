// Major airports with IATA codes
export interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  // Major US airports
  { iata: "ATL", name: "Hartsfield-Jackson Atlanta International", city: "Atlanta", country: "USA" },
  { iata: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "USA" },
  { iata: "ORD", name: "O'Hare International", city: "Chicago", country: "USA" },
  { iata: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", country: "USA" },
  { iata: "DEN", name: "Denver International", city: "Denver", country: "USA" },
  { iata: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
  { iata: "SFO", name: "San Francisco International", city: "San Francisco", country: "USA" },
  { iata: "SEA", name: "Seattle-Tacoma International", city: "Seattle", country: "USA" },
  { iata: "LAS", name: "McCarran International", city: "Las Vegas", country: "USA" },
  { iata: "MIA", name: "Miami International", city: "Miami", country: "USA" },
  { iata: "CLT", name: "Charlotte Douglas International", city: "Charlotte", country: "USA" },
  { iata: "PHX", name: "Phoenix Sky Harbor International", city: "Phoenix", country: "USA" },
  { iata: "EWR", name: "Newark Liberty International", city: "Newark", country: "USA" },
  { iata: "IAH", name: "George Bush Intercontinental", city: "Houston", country: "USA" },
  { iata: "MCO", name: "Orlando International", city: "Orlando", country: "USA" },
  { iata: "MSP", name: "Minneapolis-Saint Paul International", city: "Minneapolis", country: "USA" },
  { iata: "DTW", name: "Detroit Metropolitan", city: "Detroit", country: "USA" },
  { iata: "PHL", name: "Philadelphia International", city: "Philadelphia", country: "USA" },
  { iata: "LGA", name: "LaGuardia", city: "New York", country: "USA" },
  { iata: "BWI", name: "Baltimore/Washington International", city: "Baltimore", country: "USA" },
  { iata: "SLC", name: "Salt Lake City International", city: "Salt Lake City", country: "USA" },
  { iata: "DCA", name: "Ronald Reagan Washington National", city: "Washington", country: "USA" },
  { iata: "MDW", name: "Chicago Midway International", city: "Chicago", country: "USA" },
  { iata: "HNL", name: "Daniel K. Inouye International", city: "Honolulu", country: "USA" },
  { iata: "BOS", name: "Logan International", city: "Boston", country: "USA" },
  { iata: "FLL", name: "Fort Lauderdale-Hollywood International", city: "Fort Lauderdale", country: "USA" },
  { iata: "IAD", name: "Washington Dulles International", city: "Washington", country: "USA" },
  { iata: "SAN", name: "San Diego International", city: "San Diego", country: "USA" },
  { iata: "TPA", name: "Tampa International", city: "Tampa", country: "USA" },
  { iata: "PDX", name: "Portland International", city: "Portland", country: "USA" },
  
  // Major international airports
  { iata: "LHR", name: "London Heathrow", city: "London", country: "UK" },
  { iata: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { iata: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "Netherlands" },
  { iata: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "Germany" },
  { iata: "MAD", name: "Adolfo Suárez Madrid-Barajas", city: "Madrid", country: "Spain" },
  { iata: "FCO", name: "Leonardo da Vinci-Fiumicino", city: "Rome", country: "Italy" },
  { iata: "MUC", name: "Munich", city: "Munich", country: "Germany" },
  { iata: "LGW", name: "London Gatwick", city: "London", country: "UK" },
  { iata: "BCN", name: "Barcelona-El Prat", city: "Barcelona", country: "Spain" },
  { iata: "ZUR", name: "Zurich", city: "Zurich", country: "Switzerland" },
  { iata: "VIE", name: "Vienna International", city: "Vienna", country: "Austria" },
  { iata: "DUB", name: "Dublin", city: "Dublin", country: "Ireland" },
  { iata: "CPH", name: "Copenhagen", city: "Copenhagen", country: "Denmark" },
  { iata: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway" },
  { iata: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden" },
  { iata: "HEL", name: "Helsinki-Vantaa", city: "Helsinki", country: "Finland" },
  
  { iata: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  { iata: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  { iata: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "UAE" },
  { iata: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
  { iata: "TLV", name: "Ben Gurion", city: "Tel Aviv", country: "Israel" },
  
  { iata: "PEK", name: "Beijing Capital", city: "Beijing", country: "China" },
  { iata: "PVG", name: "Shanghai Pudong International", city: "Shanghai", country: "China" },
  { iata: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "China" },
  { iata: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" },
  { iata: "HND", name: "Haneda", city: "Tokyo", country: "Japan" },
  { iata: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { iata: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore" },
  { iata: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "Thailand" },
  { iata: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
  { iata: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia" },
  { iata: "MEL", name: "Melbourne", city: "Melbourne", country: "Australia" },
  
  { iata: "YYZ", name: "Toronto Pearson", city: "Toronto", country: "Canada" },
  { iata: "YVR", name: "Vancouver International", city: "Vancouver", country: "Canada" },
  { iata: "GRU", name: "São Paulo/Guarulhos", city: "São Paulo", country: "Brazil" },
  { iata: "GIG", name: "Rio de Janeiro-Galeão", city: "Rio de Janeiro", country: "Brazil" },
  { iata: "EZE", name: "Ministro Pistarini", city: "Buenos Aires", country: "Argentina" },
  { iata: "MEX", name: "Mexico City International", city: "Mexico City", country: "Mexico" },
  
  // Greek airports
  { iata: "ATH", name: "Athens International", city: "Athens", country: "Greece" },
  { iata: "SKG", name: "Thessaloniki Macedonia", city: "Thessaloniki", country: "Greece" },
  { iata: "HER", name: "Heraklion International", city: "Heraklion", country: "Greece" },
  { iata: "RHO", name: "Rhodes International", city: "Rhodes", country: "Greece" },
  { iata: "CHQ", name: "Chania International", city: "Chania", country: "Greece" },
  { iata: "JMK", name: "Mykonos", city: "Mykonos", country: "Greece" },
  { iata: "JTR", name: "Santorini (Thira) National", city: "Santorini", country: "Greece" },
  { iata: "CFU", name: "Corfu International", city: "Corfu", country: "Greece" },
  { iata: "ZTH", name: "Zakynthos International", city: "Zakynthos", country: "Greece" },
  { iata: "KGS", name: "Kos International", city: "Kos", country: "Greece" },
  { iata: "KVA", name: "Kavala International", city: "Kavala", country: "Greece" },
  { iata: "EFL", name: "Kefalonia International", city: "Kefalonia", country: "Greece" },
  { iata: "SMI", name: "Samos International", city: "Samos", country: "Greece" },
  { iata: "JSI", name: "Skiathos", city: "Skiathos", country: "Greece" },
  { iata: "LRS", name: "Leros", city: "Leros", country: "Greece" },
  { iata: "PVK", name: "Aktion National", city: "Preveza", country: "Greece" },
  { iata: "AXD", name: "Alexandroupolis", city: "Alexandroupolis", country: "Greece" },
  { iata: "IOA", name: "Ioannina National", city: "Ioannina", country: "Greece" },
  { iata: "KIT", name: "Kithira", city: "Kithira", country: "Greece" },
  { iata: "KLX", name: "Kalamata International", city: "Kalamata", country: "Greece" },
  { iata: "AOK", name: "Karpathos", city: "Karpathos", country: "Greece" },
  { iata: "KSJ", name: "Kasos", city: "Kasos", country: "Greece" },
  { iata: "KZI", name: "Kozani National", city: "Kozani", country: "Greece" },
  { iata: "LXS", name: "Limnos", city: "Limnos", country: "Greece" },
  { iata: "MLO", name: "Milos", city: "Milos", country: "Greece" },
  { iata: "MJT", name: "Mytilene International", city: "Mytilene", country: "Greece" },
  { iata: "PAS", name: "Paros", city: "Paros", country: "Greece" },
  { iata: "PAT", name: "Araxos", city: "Patras", country: "Greece" },
  { iata: "PKH", name: "Porto Cheli", city: "Porto Cheli", country: "Greece" },
  { iata: "SPJ", name: "Sparti", city: "Sparti", country: "Greece" },
  { iata: "SXO", name: "Stavros", city: "Stavros", country: "Greece" },
  { iata: "SKU", name: "Skyros", city: "Skyros", country: "Greece" },
  { iata: "VOL", name: "Nea Anchialos National", city: "Volos", country: "Greece" },
];

// Search airports by IATA code or name
export function searchAirports(query: string): Airport[] {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return airports.filter(
    (airport) =>
      airport.iata.toLowerCase().includes(lowerQuery) ||
      airport.name.toLowerCase().includes(lowerQuery) ||
      airport.city.toLowerCase().includes(lowerQuery)
  ).slice(0, 20); // Limit to 20 results
}

// Get airport by IATA code
export function getAirportByIata(iata: string): Airport | undefined {
  return airports.find((airport) => airport.iata.toUpperCase() === iata.toUpperCase());
}

