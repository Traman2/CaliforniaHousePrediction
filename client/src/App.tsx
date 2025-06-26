import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

const schema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  housing_median_age: z.number().int(),
  total_rooms: z.number().int(),
  total_bedrooms: z.number().int(),
  population: z.number().int(),
  households: z.number().int(),
  median_income: z.number(),
  "<1H OCEAN": z.number().int(),
  INLAND: z.number().int(),
  ISLAND: z.number().int(),
  "NEAR BAY": z.number().int(),
  "NEAR OCEAN": z.number().int(),
});

type FormData = z.infer<typeof schema>;

const locationOptions = [
  "<1H OCEAN",
  "INLAND",
  "ISLAND",
  "NEAR BAY",
  "NEAR OCEAN"
];

function App() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>(locationOptions[0]);
  const [formError, setFormError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // Update location fields when dropdown changes
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLocation(value);
    locationOptions.forEach(option => {
      setValue(option as keyof FormData, option === value ? 1 : 0, { shouldValidate: true });
    });
  };

  const onSubmit = async (data: FormData) => {
    locationOptions.forEach(option => {
      data[option as keyof FormData] = option === selectedLocation ? 1 : 0;
    });
    console.log(data);
    await axios
      .post("http://127.0.0.1:5000/predict", data)
      .then((response) => {
        setPrediction(response.data.predicted_price?.[0]);
        setFormError(false);
        reset();
        setSelectedLocation(locationOptions[0]);
      })
      .catch((error) => {
        console.error("error submitting form: ", error);
        setFormError(true);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-start justify-center">
        {formError && (
            <p className="text-red-500 text-sm mb-3">
              Values are incorrect
            </p>
          )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl py-4 px-8 w-full max-w-md flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold text-black text-center mb-2">California House Prediction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-black mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                {...register("longitude", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.longitude && <span className="text-red-500 text-xs">{errors.longitude.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                {...register("latitude", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.latitude && <span className="text-red-500 text-xs">{errors.latitude.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Housing Median Age</label>
              <input
                type="number"
                {...register("housing_median_age", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.housing_median_age && <span className="text-red-500 text-xs">{errors.housing_median_age.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Total Rooms</label>
              <input
                type="number"
                {...register("total_rooms", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.total_rooms && <span className="text-red-500 text-xs">{errors.total_rooms.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Total Bedrooms</label>
              <input
                type="number"
                {...register("total_bedrooms", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.total_bedrooms && <span className="text-red-500 text-xs">{errors.total_bedrooms.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Population</label>
              <input
                type="number"
                {...register("population", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.population && <span className="text-red-500 text-xs">{errors.population.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Households</label>
              <input
                type="number"
                {...register("households", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.households && <span className="text-red-500 text-xs">{errors.households.message}</span>}
            </div>
            <div>
              <label className="block text-black mb-1">Median Income</label>
              <input
                type="number"
                step="any"
                {...register("median_income", { valueAsNumber: true })}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              />
              {errors.median_income && <span className="text-red-500 text-xs">{errors.median_income.message}</span>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-black mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-full px-2 py-1 rounded bg-gray-100 bg-opacity-80 focus:outline-none text-black text-sm"
              >
                {locationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="cursor-pointer mt-3 w-full py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition"
          >
            Submit
          </button>
        </form>
        <div className="w-full md:w-72 mt-8 md:mt-0 flex-shrink-0">
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-black mb-2">Predicted Value</h3>
            <div className="text-3xl font-bold text-blue-900">
              {prediction ? prediction : "--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;