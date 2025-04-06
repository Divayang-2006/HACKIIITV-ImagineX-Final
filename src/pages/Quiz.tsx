import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "Which of these is a sustainable farming practice?",
    options: [
      { id: 'a', text: "Using chemical pesticides" },
      { id: 'b', text: "Crop rotation" },
      { id: 'c', text: "Monoculture farming" },
      { id: 'd', text: "Burning crop residues" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 2,
    question: "What percentage of India's population is engaged in agriculture?",
    options: [
      { id: 'a', text: "About 30%" },
      { id: 'b', text: "About 50%" },
      { id: 'c', text: "About 70%" },
      { id: 'd', text: "About 90%" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 3,
    question: "Which of these is NOT a benefit of direct farm-to-consumer sales?",
    options: [
      { id: 'a', text: "Higher prices for farmers" },
      { id: 'b', text: "Fresher produce for consumers" },
      { id: 'c', text: "Lower prices for consumers" },
      { id: 'd', text: "Increased carbon footprint" }
    ],
    correctAnswer: 'd'
  },
  {
    id: 4,
    question: "What is the main advantage of organic farming?",
    options: [
      { id: 'a', text: "Higher yields" },
      { id: 'b', text: "Lower labor costs" },
      { id: 'c', text: "Better soil health" },
      { id: 'd', text: "Faster growth" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 5,
    question: "Which season is best for growing most vegetables in India?",
    options: [
      { id: 'a', text: "Summer" },
      { id: 'b', text: "Monsoon" },
      { id: 'c', text: "Winter" },
      { id: 'd', text: "Spring" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 6,
    question: "What is the primary purpose of crop rotation?",
    options: [
      { id: 'a', text: "To increase yield" },
      { id: 'b', text: "To reduce soil erosion" },
      { id: 'c', text: "To maintain soil fertility" },
      { id: 'd', text: "To save water" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 7,
    question: "Which of these is a traditional Indian farming technique?",
    options: [
      { id: 'a', text: "Hydroponics" },
      { id: 'b', text: "Vertical farming" },
      { id: 'c', text: "Zai pits" },
      { id: 'd', text: "None of the above" }
    ],
    correctAnswer: 'c'
  },
  {
    id: 8,
    question: "What is the main challenge faced by small farmers in India?",
    options: [
      { id: 'a', text: "Lack of land" },
      { id: 'b', text: "Access to markets" },
      { id: 'c', text: "Too much rain" },
      { id: 'd', text: "Excess government support" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 9,
    question: "Which of these is a water-saving irrigation technique?",
    options: [
      { id: 'a', text: "Flood irrigation" },
      { id: 'b', text: "Drip irrigation" },
      { id: 'c', text: "Sprinkler irrigation" },
      { id: 'd', text: "All of the above" }
    ],
    correctAnswer: 'b'
  },
  {
    id: 10,
    question: "What percentage discount would you get if you answer all 5 questions correctly?",
    options: [
      { id: 'a', text: "5%" },
      { id: 'b', text: "10%" },
      { id: 'c', text: "15%" },
      { id: 'd', text: "20%" }
    ],
    correctAnswer: 'd'
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Select 5 random questions on component mount
  useEffect(() => {
    const randomQuestions = [...quizQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    
    setQuestions(randomQuestions);
    setLoading(false);
  }, []);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    
    // Calculate discount based on score
    // 5 correct = 20%, 4 correct = 15%, 3 correct = 10%, 2 correct = 5%, 1 or 0 correct = 0%
    const discountPercentage = correctCount === 5 ? 20 : 
                              correctCount === 4 ? 15 : 
                              correctCount === 3 ? 10 : 
                              correctCount === 2 ? 5 : 0;
    
    setDiscount(discountPercentage);
    setQuizCompleted(true);
    
    // Store discount in localStorage for use in checkout
    localStorage.setItem('quizDiscount', discountPercentage.toString());
    
    // Show toast with discount information
    if (discountPercentage > 0) {
      toast.success(`Congratulations! You've earned a ${discountPercentage}% discount on your next purchase!`);
    } else {
      toast.info("Try again to earn a discount on your next purchase!");
    }
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    
    calculateScore();
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setScore(0);
    setDiscount(0);
    
    // Select new random questions
    const randomQuestions = [...quizQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    
    setQuestions(randomQuestions);
  };

  const goToTrips = () => {
    navigate('/trips');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-green"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Farm Knowledge Quiz</h1>
      
      {!quizCompleted ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{questions[currentQuestionIndex]?.question}</p>
            
            <RadioGroup 
              value={selectedAnswers[questions[currentQuestionIndex]?.id] || ''} 
              onValueChange={(value) => handleAnswerSelect(questions[currentQuestionIndex]?.id, value)}
              className="space-y-4"
            >
              {questions[currentQuestionIndex]?.options.map((option: any) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="text-base cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex < questions.length - 1 ? (
              <Button 
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={!selectedAnswers[questions[currentQuestionIndex]?.id]}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < questions.length}
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <p className="text-xl mb-2">You scored {score} out of {questions.length}!</p>
              {discount > 0 ? (
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-green-800 text-lg font-semibold">
                    Congratulations! You've earned a {discount}% discount!
                  </p>
                  <p className="text-green-700 mt-2">
                    This discount will be automatically applied to your next purchase.
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-yellow-800 text-lg">
                    Try again to earn a discount on your next purchase!
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                Try Again
              </Button>
              <Button onClick={goToTrips}>
                Browse Trips
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Quiz; 