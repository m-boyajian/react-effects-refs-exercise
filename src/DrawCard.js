import React, { useState, useEffect } from 'react';
import Card from './Card';
import './DrawCard.css';
import axios from 'axios';

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const DrawCard = () => {
  const [deckId, setDeckId] = useState('');
  const [cards, setCards] = useState([]);
  const [shuffleInProgress, setShuffleInProgress] = useState(false);

  // Function to fetch the deck ID when the component mounts
  useEffect(() => {
    async function fetchDeckId() {
      try {
        const response = await axios.get(`${API_BASE_URL}/new/`);
        const { deck_id } = response.data;
        setDeckId(deck_id);
        console.log("Deck ID:", deck_id);
      } catch (error) {
        console.error("Error fetching deck ID:", error);
      }
    }
    fetchDeckId();
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

  // Function to shuffle the deck
  const shuffleDeck = async () => {
    try {
      setShuffleInProgress(true); // Set shuffle in progress
      await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
      setCards([]); // Clear drawn cards
    } catch (error) {
      console.error("Error shuffling deck:", error);
    } finally {
      setShuffleInProgress(false); // Set shuffle completed
    }
  }

  return (
    <div className="container"> {/* Apply container class here */}
      <div className="draw-card">
        <button className="buttons" onClick={drawCard}>Draw Card</button>
        <button className="buttons" onClick={shuffleDeck} disabled={shuffleInProgress}>
          {shuffleInProgress ? 'Shuffling...' : 'Shuffle Deck'}
        </button>
      </div>
      <div className="cards">
        {cards.map((card, index) => (
          <Card key={index} image={card.image} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
};

export default DrawCard;
