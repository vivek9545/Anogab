import React from 'react';
import AccordionItem from '../components/AccordianItem';
import './About.css';


const AboutPage = () => {
  return (
    <div className="about">
      <AccordionItem title="About Us">
         Anogabs stands for Anonymous Gabbing — a safe space where you can speak freely, connect with others, and find relief or insight through real conversations. Whether you're looking to share your experiences, ask questions, or simply engage in meaningful small talk, Anogabs gives you the freedom to do so without judgment. 
      </AccordionItem>

      <AccordionItem title="Our Vision">
        To create a world where everyone feels heard — whether you're seeking wisdom, letting off steam, or just passing the time. Anogabs is here to remind you: even in anonymity, connection is powerful.
      </AccordionItem>

      <AccordionItem title="What We Offer">
        <ul>
          <li>One-on-One Anonymous Chats: Talk freely in private with zero identity sharing.</li>
          <li>Open Chatrooms: Group spaces to share thoughts, stories, or advice.</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="What’s Coming Next">
        <ul>
          <li>Interest-Based Matching</li>
          <li>Chatroom Host Controls</li>
          <li>Smart Chat Bubbles (AI replies)</li>
        </ul>
      </AccordionItem>
    </div>
  );
};

export default AboutPage;

