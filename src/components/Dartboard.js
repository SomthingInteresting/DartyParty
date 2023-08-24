import React, { useEffect } from 'react';
import './Dartboard.css';

function Dartboard() {

  useEffect(() => {
    var wide = 300;  // Adjust this value
    var reductionInterval = 60;  // Add this value for proportional reduction
    for (var i = 0; i <= 4; i++) {
      var item = document.createElement('li');
      const boardElement = document.getElementById('board');
      if (boardElement) {
        boardElement.appendChild(item);
      }
      document.querySelectorAll('ul#board li')[i].style.width = `${wide}px`;
      document.querySelectorAll('ul#board li')[i].style.height = `${wide}px`;
      wide -= reductionInterval;  // Use the new interval here
    }

    document.querySelectorAll('ul#board li:nth-child(odd)').forEach(li => li.classList.add('red'));
    document.querySelectorAll('ul#board li:nth-child(even)').forEach(li => li.classList.add('blank'));

    var imgurl = "http://pngimg.com/uploads/darts/darts_PNG55.png";
    document.querySelectorAll('ul#board li:nth-child(odd)').forEach(li => {
      if (li.classList.contains('red')) {
        li.innerHTML = `<img src='${imgurl}'>`;
      }
    });

    var time = 0;
    var timer1, timer2;  // Declare variables to store the timeout IDs

    function afterShot() {
      timer1 = setTimeout(function () {
        document.querySelector("#board li:nth-child(3) img").style.display = "block";
      }, 1000);
      timer2 = setTimeout(function () {
        document.querySelector("#board li:nth-child(5) img").style.display = "block";
      }, 2000);
    }

    function shoot() {
      time += 1;
      if (time >= 2) {
        document.querySelector("#board li:nth-child(1) img").style.display = "block";
        afterShot();
      }
      if (time >= 2) {
        clearInterval(timer);
      }
    }

    var timer = setInterval(shoot, 1000);
    shoot();

    // Cleanup function
    return () => {
      clearInterval(timer);  // Clear the interval
      clearTimeout(timer1);  // Clear the first timeout
      clearTimeout(timer2);  // Clear the second timeout
    };

  }, []);

  return <ul id="board"></ul>;
}

export default Dartboard;
