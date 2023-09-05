  // const FetchAllDeck = ({ setDeckData, deckData, setDeckOptions }) => {
  //   useEffect(() => {

  //   return null;
  // };

  // const fetchUserDeck = useCallback(
  //   async (userId) => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_SERVER}/api/decks/userDeck/${userId}`
  //       );

  //       if (!response.ok) {
  //         if (response.status === 404) {
  //           return createUserDeck(userId);
  //         } else if (response.status === 500) {
  //           setError('An unexpected error occurred. Please try again later.');
  //         } else {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //       } else {
  //         const data = await response.json();
  //         console.log('DECKLIST EXISTS:', data);
  //         setCookie('deck', Array.isArray(data.deck) ? data.deck : [], {
  //           path: '/',
  //         });
  //         setDeckDataAndCookie(
  //           'deck',
  //           Array.isArray(data.deck) ? data.deck : [],
  //           {
  //             path: '/',
  //           }
  //         );
  //         setLoading(false);
  //         return data;
  //       }

  //       // if (data && data.deck) {
  //       //   // ...existing code to update deckData
  //       //   // New code to update allDecks
  //       //   const updatedAllDecks = allDecks.map((deck) => {
  //       //     if (deck.creatorId === userId) {
  //       //       return { ...deck, decks: data };
  //       //     }
  //       //     return deck;
  //       //   });
  //       //   setAllDecks(updatedAllDecks);
  //       // }
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   },
  //   [setCookie]
  // );

  // useEffect(() => {
  //   if (userId && typeof userId === 'string') {
  //     fetchUserDeck(userId).then((data) => {
  //       if (data && data.deck) {
  //         setDeckDataAndCookie(data);
  //       } else {
  //         console.error('Deck data was not retrieved for user', userId);
  //       }
  //     });
  //   }
  // }, [userId, fetchUserDeck]);