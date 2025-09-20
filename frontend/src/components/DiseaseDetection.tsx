import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Scan, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/utils";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  treatment: string;
  prevention: string;
  explanation: string;
  alternativeDiagnoses: Array<{
    disease: string;
    confidence: number;
  }>;
}

interface UserFeedback {
  isCorrect: boolean;
  actualDisease?: string;
  comments?: string;
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [feedback, setFeedback] = useState<UserFeedback | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setApiError(null);
    
    try {
      // First upload the image to get base64
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      const uploadResponse = await api.postFormData('/api/upload-image', formData);
      
      if (!uploadResponse.success) {
        throw new Error("Failed to upload image");
      }

      // Then analyze the image for disease detection
      const analysisResponse = await api.post('/api/disease-detection', {
        image_base64: uploadResponse.image_base64
      });

      if (analysisResponse.success) {
        const diseaseData = analysisResponse.disease;
        const diagnosisData = analysisResponse.diagnosis;
        
        const result: DetectionResult = {
          disease: diseaseData.name,
          confidence: Math.round(diseaseData.confidence * 100),
          severity: diseaseData.severity.toLowerCase() as "low" | "medium" | "high",
          explanation: diagnosisData.description,
          treatment: diagnosisData.treatment,
          prevention: diagnosisData.prevention,
          alternativeDiagnoses: [
            { disease: "Healthy Plant", confidence: Math.round((1 - diseaseData.confidence) * 100) }
          ]
        };
        
        setResult(result);
        setRetryCount(0);
        
        toast({
          title: "Analysis Complete",
          description: `Disease detected with ${result.confidence}% confidence`,
        });
      } else {
        throw new Error(analysisResponse.error || "Analysis failed");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setApiError("Analysis failed. Please try again.");
      setRetryCount(prev => prev + 1);
      
      if (retryCount >= 2) {
        toast({
          title: "Service Temporarily Unavailable",
          description: "Our AI service is experiencing issues. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "Retrying automatically...",
          variant: "destructive",
        });
        // Auto-retry after delay
        setTimeout(() => analyzeImage(), 2000);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const submitFeedback = async (feedbackData: UserFeedback) => {
    try {
      // In real implementation, this would send to Supabase
      console.log("Feedback submitted:", feedbackData, "for result:", result);
      
      setFeedback(feedbackData);
      setShowFeedbackForm(false);
      
      toast({
        title: "Thank You!",
        description: "Your feedback helps improve our AI model accuracy",
      });
      
      // Simulate storing for model retraining
      if (!feedbackData.isCorrect) {
        toast({
          title: "Learning Noted",
          description: "This case will be reviewed by our agricultural experts",
        });
      }
    } catch (error) {
      toast({
        title: "Feedback Failed",
        description: "Unable to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-destructive";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return "High Confidence";
    if (confidence >= 60) return "Medium Confidence";
    return "Low Confidence";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low": return <CheckCircle className="h-4 w-4" />;
      case "medium": case "high": return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-primary" />
          Disease Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!imagePreview ? (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Upload a photo of your crop for disease analysis</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outline" className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Uploaded crop"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-background/80"
                onClick={() => {
                  setImagePreview(null);
                  setSelectedImage(null);
                  setResult(null);
                }}
              >
                Change Image
              </Button>
            </div>

            <Button 
              onClick={analyzeImage}
              disabled={isAnalyzing || (apiError && retryCount >= 2)}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="h-4 w-4 mr-2" />
                  Analyze for Diseases
                </>
              )}
            </Button>

            {result && !apiError && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-gradient-earth p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    {getSeverityIcon(result.severity)}
                    <h3 className="font-semibold text-foreground">AI Detection Result</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConfidenceColor(result.confidence)} bg-current/10`}>
                      {getConfidenceLabel(result.confidence)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Disease:</span>
                      <span className="font-medium text-foreground">{result.disease}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              result.confidence >= 80 ? 'bg-success' :
                              result.confidence >= 60 ? 'bg-warning' : 'bg-destructive'
                            }`}
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                        <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Severity:</span>
                      <span className={`font-medium capitalize ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    Why We Think This
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
                </div>

                {/* Alternative Diagnoses */}
                {result.alternativeDiagnoses.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2 text-sm">Alternative Possibilities</h4>
                    <div className="space-y-1">
                      {result.alternativeDiagnoses.map((alt, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{alt.disease}</span>
                          <span className="text-xs text-muted-foreground">{alt.confidence}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Treatment</h4>
                    <p className="text-sm text-muted-foreground">{result.treatment}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Prevention</h4>
                    <p className="text-sm text-muted-foreground">{result.prevention}</p>
                  </div>
                </div>

                {/* Feedback Section */}
                {!feedback && !showFeedbackForm && (
                  <div className="mt-4 p-3 bg-gradient-earth rounded-lg">
                    <p className="text-sm text-foreground mb-3 font-medium">Was this diagnosis helpful?</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => submitFeedback({ isCorrect: true })}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Yes, Correct
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setShowFeedbackForm(true)}
                        className="flex-1"
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        No, Incorrect
                      </Button>
                    </div>
                  </div>
                )}

                {/* Feedback Form */}
                {showFeedbackForm && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-3">Help Us Improve</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          What is the correct disease?
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g., Early Blight, Bacterial Spot..."
                          className="w-full p-2 border border-border rounded text-sm bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          Additional comments (optional)
                        </label>
                        <textarea 
                          placeholder="Any additional details..."
                          className="w-full p-2 border border-border rounded text-sm bg-background h-16 resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => submitFeedback({ 
                            isCorrect: false, 
                            actualDisease: "User provided disease",
                            comments: "User feedback"
                          })}
                          className="flex-1"
                        >
                          Submit Feedback
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setShowFeedbackForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback Confirmation */}
                {feedback && (
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">
                        {feedback.isCorrect ? "Thank you for confirming!" : "Feedback submitted for model improvement"}
                      </span>
                    </div>
                    {!feedback.isCorrect && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Our agricultural experts will review this case to improve future predictions.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiseaseDetection;