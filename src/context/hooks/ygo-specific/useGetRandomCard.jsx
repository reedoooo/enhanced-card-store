import { useEffect, useState } from 'react';

export const useGetRandomCard = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomCard = () => {
    fetch('https://db.ygoprodeck.com/api/v7/randomcard.php')
      .then((res) => res.json())
      .then((data) => {
        const dataCard = {
          id: data.id,
          name: data.name,
          type: data.type,
          desc: data.desc,
          atk: data.atk,
          def: data.def,
          level: data.level,
          race: data.race,
          attribute: data.attribute,
          card_images: data.card_images,
          card_prices: data.card_prices,
          cantidad: 0,
        };
        setCard(dataCard);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomCard();
    console.log('card', card);
  }, []);

  const getRandomCard = async () => {
    setLoading(true);
    setCard(null);
    fetchRandomCard();
  };

  return { card, loading, getRandomCard };
};
