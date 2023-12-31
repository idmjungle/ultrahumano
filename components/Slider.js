import SliderItem from "./SliderItem";
import { useState,useEffect } from "react";

export default function Slider( {slides}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {

      setCount(count => (count + 1) %4)
      

    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-sm-6 slider_main g-0 overflow-hidden">
      <div className="row g-0">
      {slides.map((sld, i) => (
        
          
          <SliderItem key={sld.id} sld={sld} col={i} show={count} />
          
        ))}
      </div>
    </div>
  );
}
