import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Clock, Award, RotateCcw } from 'lucide-react';
import { getUserStats, updateUserStats, type UserStats } from '@/utils/localStorage';
import { useQuantumEffects, useQuantumInteractions } from '@/hooks/useQuantumEffects';

export const InteractiveStats: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(getUserStats());
  const [isAnimating, setIsAnimating] = useState(false);
  const { playQuantumSound } = useQuantumEffects();
  const { handleQuantumClick, handleQuantumHover } = useQuantumInteractions();

  useEffect(() => {
    // Load stats from localStorage on mount
    const savedStats = getUserStats();
    setStats(savedStats);
  }, []);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const refreshStats = () => {
    setIsAnimating(true);
    playQuantumSound('success');
    
    // Simulate data refresh
    setTimeout(() => {
      setStats(getUserStats());
      setIsAnimating(false);
    }, 1000);
  };

  const achievements = [
    { name: 'First Login', earned: stats.totalLogins > 0 },
    { name: 'Explorer', earned: stats.servicesUsed >= 3 },
    { name: 'Time Traveler', earned: stats.timeSpent > 3600000 }, // 1 hour
    { name: 'Quantum Master', earned: stats.totalLogins >= 10 }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Logins */}
      <Card 
        className="bg-glass backdrop-blur-xl border-glass hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer"
        onClick={handleQuantumClick}
        onMouseEnter={handleQuantumHover}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Sessions
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-accent-cyan" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-cyan animate-fade-in">
            {isAnimating ? '...' : stats.totalLogins}
          </div>
          <p className="text-xs text-muted-foreground">
            +2 from last week
          </p>
        </CardContent>
      </Card>

      {/* Services Used */}
      <Card 
        className="bg-glass backdrop-blur-xl border-glass hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer"
        onClick={handleQuantumClick}
        onMouseEnter={handleQuantumHover}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Services Used
          </CardTitle>
          <Zap className="h-4 w-4 text-accent-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-purple animate-fade-in">
            {isAnimating ? '...' : stats.servicesUsed}
          </div>
          <div className="mt-2">
            <Progress value={(stats.servicesUsed / 10) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Time Spent */}
      <Card 
        className="bg-glass backdrop-blur-xl border-glass hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer"
        onClick={handleQuantumClick}
        onMouseEnter={handleQuantumHover}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Time Spent
          </CardTitle>
          <Clock className="h-4 w-4 text-accent-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent-green animate-fade-in">
            {isAnimating ? '...' : formatTime(stats.timeSpent)}
          </div>
          <p className="text-xs text-muted-foreground">
            This session: {formatTime(Date.now() - new Date(stats.lastActiveDate).getTime())}
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card 
        className="bg-glass backdrop-blur-xl border-glass hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer"
        onClick={handleQuantumClick}
        onMouseEnter={handleQuantumHover}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Achievements
          </CardTitle>
          <Award className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400 animate-fade-in">
            {earnedAchievements.length}/{achievements.length}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {earnedAchievements.slice(0, 2).map((achievement, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
              >
                {achievement.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Refresh Button */}
      <div className="col-span-full flex justify-center">
        <Button
          onClick={refreshStats}
          disabled={isAnimating}
          variant="outline"
          className="border-accent-cyan/20 hover:border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10"
        >
          <RotateCcw className={`w-4 h-4 mr-2 ${isAnimating ? 'animate-spin' : ''}`} />
          Refresh Stats
        </Button>
      </div>
    </div>
  );
};