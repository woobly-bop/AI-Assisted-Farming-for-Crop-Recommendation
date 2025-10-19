import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { api, YieldPredictionInput } from "@/lib/api";
import ResultCard from "@/components/ResultCard";

const formSchema = z.object({
  Crop: z.string().min(1, "Please select a crop"),
  Area: z.coerce.number().min(0.1, "Must be at least 0.1 hectares").max(10000, "Must be at most 10000 hectares"),
  Annual_Rainfall: z.coerce.number().min(0, "Must be at least 0 mm").max(5000, "Must be at most 5000 mm"),
  Fertilizer: z.coerce.number().min(0, "Must be at least 0 kg").max(1000, "Must be at most 1000 kg"),
  Pesticide: z.coerce.number().min(0, "Must be at least 0 kg").max(500, "Must be at most 500 kg"),
  Season: z.string().min(1, "Please select a season"),
  State: z.string().min(1, "Please select a state"),
  Crop_Year: z.coerce.number().int().min(1900, "Must be at least 1900").max(new Date().getFullYear() + 10, "Must be at most " + (new Date().getFullYear() + 10)),
});

type FormValues = z.infer<typeof formSchema>;

const CROPS = [
  "Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Potato", "Tomato",
  "Onion", "Soybean", "Groundnut", "Pulses", "Tea", "Coffee", "Banana"
];

const YieldPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Crop: "",
      Area: 10,
      Annual_Rainfall: 1000,
      Fertilizer: 100,
      Pesticide: 50,
      Season: "",
      State: "",
      Crop_Year: new Date().getFullYear(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    
    try {
      const payload: YieldPredictionInput = {
        Crop: data.Crop,
        Area: data.Area,
        Annual_Rainfall: data.Annual_Rainfall,
        Fertilizer: data.Fertilizer,
        Pesticide: data.Pesticide,
        Season: data.Season,
        State: data.State,
        Crop_Year: data.Crop_Year,
      };
      const response = await api.predictYield(payload);
      setResult(response.predicted_yield);
      toast.success("Yield prediction received!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to predict yield. Please ensure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Yield Prediction</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Predict your expected crop yield based on area, rainfall, and resource usage
          </p>
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Farm & Crop Parameters</CardTitle>
            <CardDescription>
              Provide details about your crop, farm area, and resource inputs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="Crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a crop" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover z-50">
                          {CROPS.map((crop) => (
                            <SelectItem key={crop} value={crop}>
                              {crop}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the crop you want to predict yield for</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="Area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="10" {...field} />
                        </FormControl>
                        <FormDescription>Cultivated area (hectares)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Annual_Rainfall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Rainfall</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="1000" {...field} />
                        </FormControl>
                        <FormDescription>Expected annual rainfall (mm)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Fertilizer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fertilizer Usage</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="100" {...field} />
                        </FormControl>
                        <FormDescription>Fertilizer amount (kg/hectare)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Pesticide"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pesticide Usage</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="50" {...field} />
                        </FormControl>
                        <FormDescription>Pesticide amount (kg/hectare)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Season"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Season</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a season" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover z-50">
                            <SelectItem value="Kharif">Kharif</SelectItem>
                            <SelectItem value="Rabi">Rabi</SelectItem>
                            <SelectItem value="Whole Year">Whole Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the farming season</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="State"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-popover z-50">
                            <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                            <SelectItem value="Karnataka">Karnataka</SelectItem>
                            <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="Punjab">Punjab</SelectItem>
                            <SelectItem value="Haryana">Haryana</SelectItem>
                            <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="Gujarat">Gujarat</SelectItem>
                            <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the state</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Crop_Year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Year</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder={new Date().getFullYear().toString()} {...field} />
                        </FormControl>
                        <FormDescription>The year of the crop (e.g., 2023)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Predict Yield"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result !== null && (
          <div className="mt-8">
            <ResultCard
              title="Predicted Yield"
              result={`${result.toFixed(2)} tons`}
              subtitle={`Expected yield for ${form.getValues("Area")} hectares`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldPrediction;
