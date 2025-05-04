import { useEffect, useRef } from 'react';

const MarketOverview = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // Mock chart with a gradient - in a real implementation, this would use a chart library
    const canvas = document.createElement('canvas');
    canvas.width = chartRef.current.clientWidth;
    canvas.height = 280;
    chartRef.current.innerHTML = '';
    chartRef.current.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
    
    // Draw chart line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    
    // Generate random points for the chart
    const points = 20;
    const step = canvas.width / points;
    
    for (let i = 1; i <= points; i++) {
      const x = i * step;
      const rand = Math.random() * 0.4;
      let y;
      
      if (i < points / 2) {
        y = canvas.height * (0.7 - i * 0.02 - rand);
      } else {
        y = canvas.height * (0.6 - rand + (i - points / 2) * 0.03);
      }
      
      ctx.lineTo(x, y);
    }
    
    // Complete the chart path
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw the line itself
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    
    for (let i = 1; i <= points; i++) {
      const x = i * step;
      const rand = Math.random() * 0.4;
      let y;
      
      if (i < points / 2) {
        y = canvas.height * (0.7 - i * 0.02 - rand);
      } else {
        y = canvas.height * (0.6 - rand + (i - points / 2) * 0.03);
      }
      
      ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw time labels
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    const times = ['9:30', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const timeStep = canvas.width / (times.length - 1);
    
    times.forEach((time, i) => {
      ctx.fillText(time, i * timeStep, canvas.height - 10);
    });
    
    // Draw horizontal grid lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    
    for (let i = 1; i < 5; i++) {
      const y = (canvas.height * i) / 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  return (
    <div className="relative">
      <div ref={chartRef} className="w-full h-[280px]"></div>
      <div className="absolute top-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-md text-sm font-medium">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-slate-800 dark:text-slate-200">S&P 500</span>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;