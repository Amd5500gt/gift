import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './App.css';

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
  50% { transform: translateY(-20px) rotate(10deg); opacity: 0.8; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  overflow: hidden;
`;

const Heart = styled.div`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  color: ${props => props.color || '#ff6b6b'};
  top: ${props => props.top || '10%'};
  left: ${props => props.left || '10%'};
  animation: ${float} ${props => props.duration || '6s'} infinite ease-in-out;
  opacity: ${props => props.opacity || '0.7'};
  user-select: none;
  z-index: 1;
`;

const MessageContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 80%;
  z-index: 2;
  animation: ${fadeIn} 1.5s ease-out, ${pulse} 3s infinite;
  backdrop-filter: blur(5px);
`;

const Title = styled.h1`
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-family: 'Pacifico', cursive;
`;

const Message = styled.p`
  color: #555;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  
  &:hover {
    background: #ff4757;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const HiddenMessage = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  animation: ${fadeIn} 1s ease-out;
`;

function App() {
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate random hearts
    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        size: `${Math.random() * 20 + 10}px`,
        color: `hsl(${Math.random() * 60 + 340}, 100%, ${Math.random() * 30 + 60}%)`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 10 + 5}s`,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    setHearts(newHearts);
  }, []);

  const handleButtonClick = () => {
    setShowHiddenMessage(!showHiddenMessage);
  };

  const addHeart = (e) => {
    const newHeart = {
      id: Date.now(),
      size: '30px',
      color: '#ff6b6b',
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
      duration: '4s',
      opacity: 1
    };
    setHearts([...hearts, newHeart]);
  };

  return (
    <Container onClick={addHeart}>
      {hearts.map(heart => (
        <Heart key={heart.id} {...heart}>❤️</Heart>
      ))}
      
      <MessageContainer>
        <Title>For My Cutie ❤️</Title>
        <Message>
          Every moment with you feels like a beautiful dream.<br />
          Your smile brightens my darkest days.<br />
          I'm so lucky to have you in my life.
        </Message>
        
        <Button onClick={handleButtonClick}>
          {showHiddenMessage ? 'Hide Secret' : 'Show Secret'}
        </Button>
        
        {showHiddenMessage && (
          <HiddenMessage>
            <p>You're the most amazing person I know, and I cherish every second with you.</p>
            <p>Click anywhere to add more hearts!</p>
          </HiddenMessage>
        )}
      </MessageContainer>
    </Container>
  );
}

export default App;