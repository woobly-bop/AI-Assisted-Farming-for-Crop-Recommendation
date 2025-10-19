import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api, CropRecommendationInput } from "@/lib/api";
import ResultCard from "@/components/ResultCard";

const formSchema = z.object({
  N: z.coerce.number().min(0, "Must be at least 0").max(200, "Must be at most 200"),
  P: z.coerce.number().min(0, "Must be at least 0").max(200, "Must be at most 200"),
  K: z.coerce.number().min(0, "Must be at least 0").max(200, "Must be at most 200"),
  temperature: z.coerce.number().min(-10, "Must be at least -10°C").max(60, "Must be at most 60°C"),
  humidity: z.coerce.number().min(0, "Must be at least 0%").max(100, "Must be at most 100%"),
  ph: z.coerce.number().min(0, "Must be at least 0").max(14, "Must be at most 14"),
  rainfall: z.coerce.number().min(0, "Must be at least 0 mm").max(500, "Must be at most 500 mm"),
});

type FormValues = z.infer<typeof formSchema>;

const CropRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      N: 50,
      P: 50,
      K: 50,
      temperature: 25,
      humidity: 70,
      ph: 6.5,
      rainfall: 100,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    
    try {
      const payload: CropRecommendationInput = {
        N: data.N,
        P: data.P,
        K: data.K,
        temperature: data.temperature,
        humidity: data.humidity,
        ph: data.ph,
        rainfall: data.rainfall,
      };
      const response = await api.recommendCrop(payload);
      setResult(response.recommended_crop);
      toast.success("Crop recommendation received!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get crop recommendation. Please ensure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sprout className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Crop Recommendation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your soil and climate parameters to get AI-powered crop recommendations
          </p>
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Soil & Climate Parameters</CardTitle>
            <CardDescription>
              Fill in the details about your farm's soil composition and climate conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="N"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nitrogen (N)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormDescription>Nitrogen content in soil (0-200 kg/ha)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="P"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phosphorus (P)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormDescription>Phosphorus content in soil (0-200 kg/ha)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="K"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potassium (K)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormDescription>Potassium content in soil (0-200 kg/ha)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="25" {...field} />
                        </FormControl>
                        <FormDescription>Average temperature (°C)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="humidity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Humidity</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="70" {...field} />
                        </FormControl>
                        <FormDescription>Relative humidity (%)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ph"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>pH Level</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="6.5" {...field} />
                        </FormControl>
                        <FormDescription>Soil pH level (0-14)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rainfall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rainfall</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="100" {...field} />
                        </FormControl>
                        <FormDescription>Annual rainfall (mm)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Get Recommendation"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <div className="mt-8">
            <ResultCard
              title="Recommended Crop"
              result={result}
              subtitle="Based on your soil and climate conditions"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
