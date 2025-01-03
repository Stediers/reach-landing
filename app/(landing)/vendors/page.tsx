import { fetchAvilableCities } from "@api_functions/explore/fetch-available-cities";
import Card from "@components/Card";

export default async function Page() {
  const response = await fetchAvilableCities();
  if (!response) return null;
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {response.cities.map((city) => (
          <CityCard key={city.name} city={city.name} />
        ))}
      </div>
    </div>
  );
}

function CityCard({ city }: { city: string }) {
  return (
    <Card className="flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium">{city}</h3>
    </Card>
  );
}
