import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, TrendingUp, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-hero opacity-80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            AI-Powered Farming Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Make smarter farming decisions with AI-driven crop recommendations and yield predictions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button asChild variant="hero" size="lg">
              <Link to="/crop-recommendation">Get Crop Recommendation</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/yield-prediction">Predict Yield</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Features
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Crop Recommendation</CardTitle>
                <CardDescription>
                  Get AI-powered suggestions for the best crops to grow based on your soil conditions, climate, and resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/crop-recommendation">Try Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Yield Prediction</CardTitle>
                <CardDescription>
                  Predict your crop yield accurately using machine learning models trained on extensive agricultural data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/yield-prediction">Try Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose AI Farm Assistant?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Sprout, title: "Data-Driven", description: "Make informed decisions backed by comprehensive agricultural data and AI analysis" },
              { icon: TrendingUp, title: "Increase Yield", description: "Optimize your farming practices to maximize crop production and profitability" },
              { icon: Leaf, title: "Sustainable", description: "Promote sustainable farming through intelligent resource management" },
            ].map((benefit, index) => (
              <div key={index} className="p-6">
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
