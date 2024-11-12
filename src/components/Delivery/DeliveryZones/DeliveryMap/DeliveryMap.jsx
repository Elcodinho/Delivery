import { useEffect } from "react";
import "./DeliveryMap.css";

let isMapLoaded = false; // Глобальный флаг для отслеживания загрузки карты

export function DeliveryMap() {
  useEffect(() => {
    // Проверяем, загружен ли скрипт карты
    if (!isMapLoaded) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = true;
      script.src =
        "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A450e50998b7664d113e8ee5e5b743c3377f13219e0d67fa2fbf29332b953aa63&width=100%&height=400&lang=ru_RU&scroll=true";

      // Добавляем скрипт в элемент с картой
      const mapContainer = document.querySelector(".delivery-zones__map");
      if (mapContainer) {
        mapContainer.appendChild(script);
        isMapLoaded = true; // Устанавливаем флаг в true после загрузки
      }

      return () => {
        // Сбрасываем флаг и очищаем контейнер карты при размонтировании
        if (mapContainer) {
          mapContainer.innerHTML = "";
        }
        isMapLoaded = false; // Сбрасываем флаг
      };
    }
  }, []);

  return <div className="delivery-zones__map"></div>;
}
