import React from 'react';

function Map() {
  const apiKey = "648d126a-8b29-4ac7-9f47-b0261ee386cc";
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://use.typekit.net/foobar.js";
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="map-container">
      <div id="ymap" style={{ width: "600px", height: "400px" }} />
      <script src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`} type="text/javascript" />
      <script type="text/javascript">
        ymaps.ready(init);
        function init(){
          const myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7
          });
        }
      </script>
    </div>
  );
}

export default Map;
