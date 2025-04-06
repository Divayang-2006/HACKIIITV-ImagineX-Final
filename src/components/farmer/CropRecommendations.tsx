
import React from 'react';
import { SoilData } from '@/data/products';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Sun, CloudRain, Thermometer, Droplet, Sprout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CropRecommendation {
  name: string;
  description: string;
  suitability: 'high' | 'medium' | 'low';
  weatherConditions: {
    temperature: string;
    rainfall: string;
    sunlight: string;
    humidity: string;
  };
  fertilizers: {
    type: string;
    npkRatio: string;
    application: string;
  }[];
  pesticides: {
    type: string;
    targetPests: string;
    application: string;
  }[];
}

interface CropRecommendationsProps {
  soilData: SoilData;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ soilData }) => {
  // This would ideally come from an API or ML model that analyzes soil data
  // For demo purposes, we'll use hardcoded recommendations based on soil type
  const recommendations = React.useMemo(() => {
    // Simple algorithm to determine crops based on soil properties
    const recommendations: CropRecommendation[] = [];
    
    // Basic recommendation based on soil type and pH
    if (soilData.soilType === 'loam' && soilData.ph >= 6 && soilData.ph <= 7.5) {
      recommendations.push({
        name: 'Corn',
        description: 'Corn thrives in loamy soil with good drainage and moderate fertility.',
        suitability: 'high',
        weatherConditions: {
          temperature: '20-30°C',
          rainfall: '500-750mm during growing season',
          sunlight: 'Full sun (6-8 hours daily)',
          humidity: 'Moderate to high',
        },
        fertilizers: [
          {
            type: 'NPK Balanced Fertilizer',
            npkRatio: '10-10-10',
            application: 'Apply 200-300 kg/ha at planting',
          },
          {
            type: 'Nitrogen Top Dressing',
            npkRatio: '46-0-0 (Urea)',
            application: 'Apply 100-150 kg/ha when plants are knee-high',
          }
        ],
        pesticides: [
          {
            type: 'Insecticide',
            targetPests: 'Corn borers, armyworms',
            application: 'Spray when pests are observed, follow label instructions',
          }
        ]
      });
    }

    if ((soilData.soilType === 'loam' || soilData.soilType === 'silt') && soilData.ph >= 5.5 && soilData.ph <= 7.0) {
      recommendations.push({
        name: 'Soybeans',
        description: 'Soybeans are legumes that do well in well-drained, fertile soils.',
        suitability: soilData.soilType === 'loam' ? 'high' : 'medium',
        weatherConditions: {
          temperature: '20-30°C',
          rainfall: '450-700mm during growing season',
          sunlight: 'Full sun (6+ hours daily)',
          humidity: 'Moderate',
        },
        fertilizers: [
          {
            type: 'Starter Fertilizer',
            npkRatio: '0-20-20',
            application: 'Apply 150-200 kg/ha before planting',
          }
        ],
        pesticides: [
          {
            type: 'Herbicide',
            targetPests: 'Broadleaf weeds',
            application: 'Apply pre-emergence as directed',
          }
        ]
      });
    }

    if (soilData.soilType === 'sandy' && soilData.ph >= 5.0 && soilData.ph <= 6.5) {
      recommendations.push({
        name: 'Sweet Potatoes',
        description: 'Sweet potatoes thrive in light, sandy soils with good drainage.',
        suitability: 'high',
        weatherConditions: {
          temperature: '20-30°C',
          rainfall: '500-600mm during growing season',
          sunlight: 'Full sun (6+ hours daily)',
          humidity: 'Moderate',
        },
        fertilizers: [
          {
            type: 'Complete Fertilizer',
            npkRatio: '5-10-10',
            application: 'Apply 300-400 kg/ha before planting',
          }
        ],
        pesticides: [
          {
            type: 'Insecticide',
            targetPests: 'Sweet potato weevils',
            application: 'Treat soil before planting and apply as needed during growing season',
          }
        ]
      });
    }

    if ((soilData.soilType === 'clay' || soilData.soilType === 'loam') && soilData.ph >= 6.0 && soilData.ph <= 7.5) {
      recommendations.push({
        name: 'Wheat',
        description: 'Wheat grows well in heavier soils with good water retention.',
        suitability: soilData.soilType === 'clay' ? 'high' : 'medium',
        weatherConditions: {
          temperature: '15-25°C',
          rainfall: '450-650mm during growing season',
          sunlight: 'Full sun',
          humidity: 'Low to moderate',
        },
        fertilizers: [
          {
            type: 'NPK Fertilizer',
            npkRatio: '20-20-20',
            application: 'Apply 200-250 kg/ha at planting',
          },
          {
            type: 'Nitrogen Fertilizer',
            npkRatio: '34-0-0',
            application: 'Top dress with 100-150 kg/ha at tillering stage',
          }
        ],
        pesticides: [
          {
            type: 'Fungicide',
            targetPests: 'Rust, powdery mildew',
            application: 'Apply preventatively or at first signs of disease',
          }
        ]
      });
    }

    // Add general recommendations if specific ones don't apply
    if (recommendations.length === 0) {
      recommendations.push({
        name: 'General Crops',
        description: 'Based on your soil analysis, consider testing with these crops',
        suitability: 'medium',
        weatherConditions: {
          temperature: '15-25°C',
          rainfall: '500-700mm annually',
          sunlight: 'Full sun to partial shade',
          humidity: 'Moderate',
        },
        fertilizers: [
          {
            type: 'Balanced NPK',
            npkRatio: '10-10-10',
            application: 'Apply 200-300 kg/ha before planting',
          }
        ],
        pesticides: [
          {
            type: 'General Purpose',
            targetPests: 'Common pests',
            application: 'Apply as needed following product instructions',
          }
        ]
      });
    }

    return recommendations;
  }, [soilData]);

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'high': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-2">Soil Analysis Results</h2>
        <p className="text-gray-600 mb-4">Analyzed on {new Date(soilData.date).toLocaleDateString()}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-gray-500 text-sm">Soil Type</span>
            <p className="font-medium capitalize">{soilData.soilType}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-gray-500 text-sm">pH Level</span>
            <p className="font-medium">{soilData.ph.toFixed(1)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-gray-500 text-sm">Nitrogen (N)</span>
            <p className="font-medium">{soilData.nitrogen} mg/kg</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-gray-500 text-sm">Phosphorus (P)</span>
            <p className="font-medium">{soilData.phosphorus} mg/kg</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-gray-500 text-sm">Potassium (K)</span>
            <p className="font-medium">{soilData.potassium} mg/kg</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <span className="text-gray-500 text-sm">Organic Matter</span>
            <p className="font-medium">{soilData.organicMatter}%</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Recommended Crops</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {recommendations.map((crop, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-green-600" />
                    {crop.name}
                  </CardTitle>
                  <CardDescription className="mt-1">{crop.description}</CardDescription>
                </div>
                <Badge className={getSuitabilityColor(crop.suitability)}>
                  {crop.suitability === 'high' ? 'Highly Suitable' : 
                   crop.suitability === 'medium' ? 'Moderately Suitable' : 'Low Suitability'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-1">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                Optimal Weather Conditions
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-2">
                  <Thermometer className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Temperature</span>
                    <span className="text-sm">{crop.weatherConditions.temperature}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CloudRain className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Rainfall</span>
                    <span className="text-sm">{crop.weatherConditions.rainfall}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sun className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Sunlight</span>
                    <span className="text-sm">{crop.weatherConditions.sunlight}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Droplet className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 block">Humidity</span>
                    <span className="text-sm">{crop.weatherConditions.humidity}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-sm font-medium mb-3">Recommended Fertilizers</h3>
              <div className="space-y-3 mb-4">
                {crop.fertilizers.map((fertilizer, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{fertilizer.type}</span>
                      <Badge variant="outline" className="bg-white">NPK {fertilizer.npkRatio}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{fertilizer.application}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mb-3">Recommended Pest Control</h3>
              <div className="space-y-3">
                {crop.pesticides.map((pesticide, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md">
                    <div className="font-medium">{pesticide.type}</div>
                    <p className="text-sm text-gray-600">For: {pesticide.targetPests}</p>
                    <p className="text-sm text-gray-600 mt-1">{pesticide.application}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-1">
              <p className="text-xs text-gray-500 italic">
                Note: These recommendations are general guidelines. Always consult with a local agricultural extension service for specific advice.
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-yellow-800">No specific crop recommendations available for the soil parameters provided.</p>
        </div>
      )}
    </div>
  );
};

export default CropRecommendations;
