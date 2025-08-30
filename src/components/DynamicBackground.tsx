const DynamicBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Large morphing shapes */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-morph" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl animate-wave" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-shimmer" />
      
      {/* Orbiting elements */}
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-accent-cyan/30 rounded-full blur-xl animate-orbit" />
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-accent-neon/20 rounded-full blur-xl animate-spiral" />
      
      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-accent-cyan/15 rounded-full blur-2xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-neon/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-primary/25 rounded-full blur-xl animate-drift" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-primary-glow/15 rounded-full blur-2xl animate-wave" style={{ animationDelay: '3s' }} />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 animate-pulse-glow" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export { DynamicBackground };