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

  import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
  } from 'react';
  import { useCookies } from 'react-cookie';
  import { useCardStore } from '../CardContext/CardStore';
  
  export const DeckContext = createContext(null);
  
  const apiBase = `${process.env.REACT_APP_SERVER}/api/decks`;
  
  const fetchWrapper = async (url, method, body = null) => {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) }),
    };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  };
  
  const removeDuplicateDecks = (decks) => {
    const uniqueDecks = {};
    decks.forEach((deck) => (uniqueDecks[deck._id] = deck));
    return Object.values(uniqueDecks);
  };
  
  export const DeckProvider = ({ children }) => {
    const { getCardData } = useCardStore();
    const [cookies, setCookie] = useCookies(['userCookie']);
    const [deckData, setDeckData] = useState({});
    const [allDecks, setAllDecks] = useState([]);
    const [selectedDeck, setSelectedDeck] = useState({});
    const userId = cookies.userCookie?.id;
  
    // Helper Functions
    const setDeckDataAndCookie = useCallback(
      (newDeckData) => {
        setDeckData(newDeckData);
        setCookie('deckData', newDeckData, { path: '/' });
      },
      [setCookie]
    );
  
    const filterUserDecks = useCallback(
      (decks) => decks.filter((deck) => deck.userId === userId),
      [userId]
    );
  
    const fetchAndSetDecks = useCallback(async () => {
      const url = `${apiBase}/users/${userId}/decks`;
      const fetchedDecks = await fetchWrapper(url, 'GET');
      const userDecks = filterUserDecks(fetchedDecks);
      const uniqueDecks = removeDuplicateDecks(userDecks);
  
      setAllDecks((prevDecks) =>
        removeDuplicateDecks([...prevDecks, ...uniqueDecks])
      );
      setDeckDataAndCookie(uniqueDecks[0]);
    }, [userId, setAllDecks, setDeckDataAndCookie, filterUserDecks]);
  
    useEffect(() => {
      if (userId) fetchAndSetDecks();
    }, [userId, fetchAndSetDecks]);
  
    const fetchAllDecksForUser = useCallback(
      async (userId) => {
        // Fetch the initial set of decks
        const initialDecks = await fetchAndSetDecks(
          apiBase2,
          userId,
          setAllDecks,
          setDeckDataAndCookie
        );
        if (initialDecks === null) {
          const shouldCreateDeck = window.confirm(
            'No decks found. Would you like to create a new one?'
          );
          if (shouldCreateDeck) {
            const deckName = prompt('Enter the deck name:');
            const deckDescription = prompt('Enter the deck description:');
            await createUserDeck(userId, {
              name: deckName,
              description: deckDescription,
            });
          }
          return;
        }
  
        const fetchCount = initialDecks?.length || 0;
        for (let i = 0; i < fetchCount; i++) {
          await new Promise((res) => setTimeout(res, 1000));
          await fetchAndSetDecks(
            apiBase1,
            userId,
            setAllDecks,
            setDeckDataAndCookie
          );
        }
      },
      [setAllDecks, setDeckDataAndCookie]
    );
  
    const updateDeck = (newDeckData) => {
      setDeckDataAndCookie(newDeckData);
      setDeckData(newDeckData);
    };
  
    const updateAndSyncDeck = async (newDeckData) => {
      updateDeck(newDeckData);
  
      setAllDecks((prevDecks) => {
        const newAllDecks = prevDecks.map((deck) =>
          deck._id === newDeckData._id ? newDeckData : deck
        );
        return prevDecks.some((deck) => deck._id === newDeckData._id)
          ? newAllDecks
          : [...newAllDecks, newDeckData];
      });
  
      try {
        const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks`;
        await fetchWrapper(
          url,
          'PUT',
          formatDeckData(newDeckData._id, newDeckData.cards)
        );
      } catch (error) {
        console.error(`Failed to update deck in backend: ${error.message}`);
      }
    };
  
    const formatDeckData = (deckId, updatedDeck) => {
      return {
        _id: deckId, // Changed "deckId" to "_id" to match the structure
        userId: userId,
        name: deckData.name, // assuming you have the name in your state
        description: deckData.description, // assuming you have the description in your state
        cards: updatedDeck.map((card) => formatCardData(card)),
      };
    };
  
    const formatCardData = (card) => ({
      id: card.id,
      ...Object.fromEntries(
        [
          'name',
          'type',
          'frameType',
          'description',
          'card_images',
          'archetype',
          'atk',
          'def',
          'level',
          'race',
          'attribute',
          'quantity',
        ].map((key) => [key, card[key] || null])
      ),
    });
  
    const addOrRemoveCard = async (card, isAdding) => {
      try {
        setDeckData((prevState) => {
          const cardIndex = prevState.cards.findIndex(
            (item) => item.id === card.id
          );
          let newCards = [...prevState.cards];
  
          if (cardIndex !== -1) {
            newCards[cardIndex].quantity += isAdding ? 1 : -1;
            if (newCards[cardIndex].quantity <= 0) {
              newCards.splice(cardIndex, 1);
            }
          } else if (isAdding) {
            newCards.push({ ...formatCardData(card), quantity: 1 });
          }
  
          const newDeckData = { ...prevState, cards: newCards };
          updateAndSyncDeck(newDeckData);
          return newDeckData;
        });
      } catch (error) {
        console.error(`Failed to modify the deck: ${error.message}`);
      }
    };
  
    const addOneToDeck = (card) => addOrRemoveCard(card, true);
    const removeOneFromDeck = (cardId) => addOrRemoveCard({ id: cardId }, false);
  
    const createUserDeck = async (userId, newDeckInfo) => {
      try {
        const url = `${apiBase1}/newDeck/${userId}`;
        const initialDeck = newDeckInfo.initialCard
          ? [formatCardData(newDeckInfo.initialCard)]
          : [];
        const data = await fetchWrapper(url, 'POST', {
          ...newDeckInfo,
          cards: initialDeck,
          userId,
        });
        updateDeck(data);
      } catch (error) {
        console.error(`Failed to create a new deck: ${error.message}`);
      }
    };
  
    // To get the quantity of a specific card in the deck
    const getCardQuantity = (cardId) => {
      // if (Array.isArray(deckData)) {
      const card = deckData.cards?.find((item) => item.id === cardId);
      // }
  
      return card?.quantity || 0;
    };
  
    const getTotalCost = () =>
      deckData.cards.reduce((acc, card) => acc + (card.cost || 0), 0);
  
    const value = {
      deckData,
      allDecks,
      getCardQuantity,
      addOneToDeck,
      removeOneFromDeck,
      getTotalCost, // Added
      deleteFromDeck,
      updateAndSyncDeck, // Added
      selectedDeck, // Added
      setSelectedDeck, // Added
      fetchAllDecksForUser,
      createUserDeck,
    };
  
    useEffect(() => {
      console.log('DECKCONTEXT:', value);
      const userId = cookies.userCookie?.id;
      if (userId) {
        fetchAllDecksForUser(userId);
      }
    }, [fetchAllDecksForUser, cookies.userCookie]);
  
    return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
  };
  
  export const useDeckStore = () => {
    const context = useContext(DeckContext);
    if (!context)
      throw new Error('useDeckStore must be used within a DeckProvider');
    return context;
  };
  
  // import React, {
  //   createContext,
  //   useState,
  //   useEffect,
  //   useCallback,
  //   useContext,
  // } from 'react';
  // import { useCookies } from 'react-cookie';
  // import { useCardStore } from '../CardContext/CardStore';
  
  // export const DeckContext = createContext(null);
  
  // const apiBase = `${process.env.REACT_APP_SERVER}/api/decks`;
  
  // const fetchWrapper = async (url, method, body = null) => {
  //   const options = {
  //     method,
  //     headers: { 'Content-Type': 'application/json' },
  //     ...(body && { body: JSON.stringify(body) }),
  //   };
  //   const response = await fetch(url, options);
  //   if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //   return response.json();
  // };
  
  // const removeDuplicateDecks = (decks) => {
  //   const uniqueDecks = {};
  //   decks.forEach((deck) => (uniqueDecks[deck._id] = deck));
  //   return Object.values(uniqueDecks);
  // };
  
  // export const DeckProvider = ({ children }) => {
  //   const { getCardData } = useCardStore();
  //   const [cookies, setCookie] = useCookies(['userCookie']);
  //   const [deckData, setDeckData] = useState({});
  //   const [allDecks, setAllDecks] = useState([]);
  //   const [selectedDeck, setSelectedDeck] = useState({});
  //   const userId = cookies.userCookie?.id;
  
  //   // Helper Functions
  //   const setDeckDataAndCookie = useCallback(
  //     (newDeckData) => {
  //       setDeckData(newDeckData);
  //       setCookie('deckData', newDeckData, { path: '/' });
  //     },
  //     [setCookie]
  //   );
  
  //   const filterUserDecks = useCallback(
  //     (decks) => decks.filter((deck) => deck.userId === userId),
  //     [userId]
  //   );
  
  //   const fetchAndSetDecks = useCallback(async () => {
  //     const url = `${apiBase}/users/${userId}/decks`;
  //     const fetchedDecks = await fetchWrapper(url, 'GET');
  //     const userDecks = filterUserDecks(fetchedDecks);
  //     const uniqueDecks = removeDuplicateDecks(userDecks);
  
  //     setAllDecks((prevDecks) =>
  //       removeDuplicateDecks([...prevDecks, ...uniqueDecks])
  //     );
  //     setDeckDataAndCookie(uniqueDecks[0]);
  //   }, [userId, setAllDecks, setDeckDataAndCookie, filterUserDecks]);
  
  //   useEffect(() => {
  //     if (userId) fetchAndSetDecks();
  //   }, [userId, fetchAndSetDecks]);
  
  //   const fetchAllDecksForUser = useCallback(
  //     async (userId) => {
  //       // Fetch the initial set of decks
  //       const initialDecks = await fetchAndSetDecks(
  //         apiBase2,
  //         userId,
  //         setAllDecks,
  //         setDeckDataAndCookie
  //       );
  //       if (initialDecks === null) {
  //         const shouldCreateDeck = window.confirm(
  //           'No decks found. Would you like to create a new one?'
  //         );
  //         if (shouldCreateDeck) {
  //           const deckName = prompt('Enter the deck name:');
  //           const deckDescription = prompt('Enter the deck description:');
  //           await createUserDeck(userId, {
  //             name: deckName,
  //             description: deckDescription,
  //           });
  //         }
  //         return;
  //       }
  
  //       const fetchCount = initialDecks?.length || 0;
  //       for (let i = 0; i < fetchCount; i++) {
  //         await new Promise((res) => setTimeout(res, 1000));
  //         await fetchAndSetDecks(
  //           apiBase1,
  //           userId,
  //           setAllDecks,
  //           setDeckDataAndCookie
  //         );
  //       }
  //     },
  //     [setAllDecks, setDeckDataAndCookie]
  //   );
  
  //   const updateAndSyncDeck = async (newDeckData) => {
  //     // Update the deck locally
  //     setDeckDataAndCookie(newDeckData); // Using the function to also set the cookie
  
  //     // Update in the global allDecks state
  //     const existingDeck = allDecks.find((deck) => deck._id === newDeckData._id);
  //     if (existingDeck) {
  //       const newAllDecks = allDecks.map((deck) =>
  //         deck._id === newDeckData._id ? newDeckData : deck
  //       );
  //       setAllDecks(newAllDecks);
  //     } else {
  //       setAllDecks((prevDecks) => [...prevDecks, newDeckData]);
  //     }
  
  //     // Sync with the backend
  //     try {
  //       // Corrected the way to include `deckId` in the URL
  //       const url = `${process.env.REACT_APP_SERVER}/api/users/${userId}/decks`;
  //       await fetchWrapper(
  //         url,
  //         'PUT',
  //         formatDeckData(newDeckData._id, newDeckData.cards)
  //       );
  //     } catch (error) {
  //       console.error(`Failed to update deck in backend: ${error.message}`);
  //     }
  //   };
  
  //   // To formatdeckId
  //   const formatDeckData = (deckId, updatedDeck) => {
  //     return {
  //       _id: deckId, // Changed "deckId" to "_id" to match the structure
  //       userId: userId,
  //       name: deckData.name, // assuming you have the name in your state
  //       description: deckData.description, // assuming you have the description in your state
  //       cards: updatedDeck.map((card) => formatCardData(card)),
  //     };
  //   };
  
  //   // To format card data before sending to backend
  //   const formatCardData = (card) => {
  //     return {
  //       id: card.id,
  //       name: card.name || null,
  //       type: card.type || null,
  //       frameType: card.frameType || null,
  //       description: card.description || null,
  //       card_images: card.card_images || null,
  //       archetype: card.archetype || null,
  //       atk: card.atk || null,
  //       def: card.def || null,
  //       level: card.level || null,
  //       race: card.race || null,
  //       attribute: card.attribute || null,
  //       quantity: card.quantity || null,
  //     };
  //   };
  
  //   // To get the quantity of a specific card in the deck
  //   const getCardQuantity = (cardId) => {
  //     // if (Array.isArray(deckData)) {
  //     const card = deckData.cards?.find((item) => item.id === cardId);
  //     // }
  
  //     return card?.quantity || 0;
  //   };
  
  //   // To add one card to the deck
  //   // To add one card to the deck
  //   const addOneToDeck = async (card) => {
  //     try {
  //       setDeckData((prevState) => {
  //         if (!Array.isArray(prevState.cards)) {
  //           console.error('deckData.cards is not an array.');
  //           return prevState;
  //         }
  
  //         const existingCard = prevState.cards.find(
  //           (item) => item.id === card.id
  //         );
  //         let newCards;
  
  //         if (existingCard) {
  //           existingCard.quantity += 1;
  //           newCards = [...prevState.cards];
  //         } else {
  //           newCards = [
  //             ...prevState.cards,
  //             {
  //               ...formatCardData(card),
  //               quantity: 1,
  //             },
  //           ];
  //         }
  
  //         const newDeckData = { ...prevState, cards: newCards };
  //         // const newDeckData = { ...deckData }; // Take a copy of existing deckData
  //         updateAndSyncDeck(newDeckData);
  
  //         // Update the cookie
  //         setCookie('deckData', newDeckData, { path: '/' });
  
  //         return newDeckData;
  //       });
  
  //       setAllDecks((prevState) => {
  //         const updatedAllDecks = prevState.map((deck) => {
  //           if (deck._id === deckData._id) {
  //             return { ...deck, cards: deckData.cards }; // Assuming deckData.cards is updated
  //           }
  //           return deck;
  //         });
  //         return updatedAllDecks;
  //       });
  //     } catch (error) {
  //       console.error(`Failed to add a card to the deck: ${error.message}`);
  //     }
  //   };
  
  //   const createUserDeck = async (userId, newDeckInfo) => {
  //     try {
  //       const { initialCard, ...rest } = newDeckInfo;
  //       const url = `${apiBase1}/newDeck/${userId}`; // Modified this line to use apiBase
  
  //       const initialDeck = initialCard ? [formatCardData(initialCard)] : [];
  
  //       const data = await fetchWrapper(url, 'POST', {
  //         ...rest,
  //         cards: initialDeck,
  //         userId,
  //       });
  
  //       setDeckData(data);
  //       updateAndSyncDeck(data);
  //     } catch (error) {
  //       console.error(`Failed to create a new deck: ${error.message}`);
  //     }
  //   };
  
  //   const removeOneFromDeck = async (cardId) => {
  //     try {
  //       const newDeckData = { ...deckData }; // Take a copy of existing deckData
  //       const cardToRemove = newDeckData.cards?.find(
  //         (item) => item.id === cardId
  //       );
  //       if (!cardToRemove) return;
  //       cardToRemove.quantity -= 1;
  
  //       if (cardToRemove.quantity === 0) {
  //         newDeckData.cards = newDeckData.cards.filter(
  //           (item) => item.id !== cardId
  //         );
  //       }
  
  //       // Update and sync the deck
  //       await updateAndSyncDeck(newDeckData);
  //     } catch (error) {
  //       console.error(`Failed to remove a card from the deck: ${error.message}`);
  //     }
  //   };
  
  //   // To delete a card entirely from the deck
  //   const deleteFromDeck = async (cardId) => {
  //     try {
  //       const newDeck = deckData.cards.filter((item) => item.id !== cardId);
  //       const updatedDeckData = await updateAndSyncDeck(deckData._id, newDeck);
  //       setDeckData(updatedDeckData);
  //     } catch (error) {
  //       console.error(`Failed to delete a card from the deck: ${error.message}`);
  //     }
  //   };
  
  //   const getTotalCost = () => {
  //     return deckData.cards.reduce((acc, card) => acc + (card.cost || 0), 0);
  //   };
  
  //   const value = {
  //     deckData,
  //     allDecks,
  //     getCardQuantity,
  //     addOneToDeck,
  //     removeOneFromDeck,
  //     getTotalCost, // Added
  //     deleteFromDeck,
  //     updateAndSyncDeck, // Added
  //     selectedDeck, // Added
  //     setSelectedDeck, // Added
  //     fetchAllDecksForUser,
  //     createUserDeck,
  //   };
  
  //   useEffect(() => {
  //     console.log('DECKCONTEXT:', value);
  //     const userId = cookies.userCookie?.id;
  //     if (userId) {
  //       fetchAllDecksForUser(userId);
  //     }
  //   }, [fetchAllDecksForUser, cookies.userCookie]);
  
  //   return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
  // };
  
  // export const useDeckStore = () => {
  //   const context = useContext(DeckContext);
  //   if (!context)
  //     throw new Error('useDeckStore must be used within a DeckProvider');
  //   return context;
  // };
  