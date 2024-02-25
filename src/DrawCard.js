import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const DrawCard = () => {
  const [deckId, setDeckId] = useState('');
  const [cards, setCards] = useState([]);

  // Function to fetch the deck ID when the component mounts
  useEffect(() => {
    async function fetchDeck() {
      try {
        const response = await axios.get(`${API_BASE_URL}/new/`);
        const { deck_id } = response.data;
        setDeckId(deck_id);
        console.log("Deck ID:", deck_id);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchDeck();
  }, []);

  // Function to draw a card from the deck
  const drawCard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${deckId}/draw/`);
      const { cards } = response.data;
      setCards([...cards]);
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  }

  return (
    <div className="draw-card">
      <button onClick={drawCard}>Draw Card</button>
      <div className="cards">
        {cards.map((card, index) => (
          <Card key={index} image={card.image} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
};

export default DrawCard;



