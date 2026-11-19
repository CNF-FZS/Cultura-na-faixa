
/*import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import FeaturedCard from './FeaturedCard';

export default function FeaturedCarousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!events || events.length <= 1) {
      setCurrentIndex(0);
      fadeAnim.setValue(1);
      return;
    }

    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) return;

        setCurrentIndex((previous) => (previous + 1) % events.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [events, fadeAnim]);

  if (!events || events.length === 0) return null;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <FeaturedCard event={events[currentIndex]} />
    </Animated.View>
  );
}*/


import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import FeaturedCard from './FeaturedCard';

export default function FeaturedCarousel({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Reinicia o índice sempre que a lista de eventos mudar.
    setCurrentIndex(0);
    fadeAnim.setValue(1);

    if (events.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) return;

        setCurrentIndex((previous) => (previous + 1) % events.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [events, fadeAnim]);

  // Não tenta renderizar o carrossel sem eventos.
  if (!events.length) return null;

  // Garante que o índice utilizado sempre exista na lista.
  const safeIndex = currentIndex % events.length;
  const currentEvent = events[safeIndex];

  if (!currentEvent) return null;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <FeaturedCard event={currentEvent} />
    </Animated.View>
  );
}
