// Initial Selection of Level and Time

// variables
let level_box = document.getElementsByClassName("level_box");
let time_box = document.getElementsByClassName("time_box");
let level = 1;
let time = 2;
let original = [];
let words = [];

// For typing Test
let input = document.getElementById("input");
let scrollMove = document.getElementById("scrollMove");
let scrollMove1 = document.getElementById("scrollMove1");
let content = document.getElementById("content");
let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");
let screen3 = document.getElementById("screen3");
let data = "";
let current = 0;
let typed = [];
let whatTyped = []; // Used for scroll control
let typedWords = 0;
let shift = 1;
let countChars = 0;

// Loop for adding click event
for (let i = 0; i < 3; i++) {
  level_box[i].addEventListener("click", () => {
    selectLevel(i);
  });
  time_box[i].addEventListener("click", () => {
    selectTime(i);
  });
}

// Selecting Level
const selectLevel = (value) => {
  level = parseInt(value + 1);
  for (let i = 0; i < 3; i++) {
    level_box[i].className = "level_box";
  }
  level_box[value].classList.add("active_box");
};

// Selecting Time
const selectTime = (value) => {
  time = Math.pow(2, parseInt(value + 1)) + value;
  for (let i = 0; i < 3; i++) {
    time_box[i].className = "time_box";
  }
  time_box[value].classList.add("active_box");
};

// Function to start the typing
const start = () => {
  let selected_time = document.getElementById("selected_time");
  selected_time.innerHTML = time + " Min";
  screen1.className = "hide";
  screen2.className = "";

  let total_words = document.getElementById("total_words");
  if (level === 1) {
    total_words.innerHTML = "EASY";
  } else if (level === 2) {
    total_words.innerHTML = "MEDIUM";
  } else {
    total_words.innerHTML = "HARD";
  }
  let x = Math.floor(Math.random() * 3) + 1;
  if (level === 1) {
    if (x === 1) {
      original = easy1.split(" ");
      words = easy1.split(" ");
    } else if (x === 2) {
      original = easy2.split(" ");
      words = easy2.split(" ");
    } else {
      original = easy3.split(" ");
      words = easy3.split(" ");
    }
  } else if (level === 2) {
    if (x === 1) {
      original = medium1.split(" ");
      words = medium1.split(" ");
    } else if (x === 2) {
      original = medium2.split(" ");
      words = medium2.split(" ");
    } else {
      original = medium3.split(" ");
      words = medium3.split(" ");
    }
  } else if (level === 3) {
    original = hard1.split(" ");
    words = hard1.split(" ");
  }

  input.placeholder = original[0] + " . . . ";
  countLetters();
  hightlightWord(current);
};

let t;
// adding key up event to input field
input.addEventListener("keyup", (e) => {
  if (countChars === 0) {
    t = setInterval(timeIncrease, 1000);
  }
  if (countChars > 0) {
    input.placeholder = "";
  }
  if (countChars < 1) {
    countChars++;
  }
  if (e.which === 32) {
    scrollMove1.scrollBy(0, 1000);
    current++;
    typed.push(input.value);
    input.value = null;
    whatTyped.push(original[current - 1]);
    checkWPM(typed[current - 1], original[current - 1]);
    hightlightWord(current);
    showContent();
  }
  if (typedWords > 140 * shift && typedWords > 0) {
    if (shift === 1) {
      scrollMove.scrollBy(0, 112);
    } else {
      scrollMove.scrollBy(0, 96);
    }
    shift++;
  }
  input.style.width = (input.value.length + 1) * 18 + "px";
  checkComplete();
});

const countLetters = () => {
  data = words.join(" ");
  content.innerHTML = data;
};
const hightlightWord = (a) => {
  if (a === 0) {
    words[a] = "<span class='highlight'>" + words[a] + "</span>";
    countLetters();
  }
  if (a > 0 && a < original.length) {
    if (original[a - 1] + " " === typed[a - 1]) {
      words[a - 1] = "<span class='light'>" + original[a - 1] + "</span>";
    } else {
      words[a - 1] =
        "<span class='danger                                '>" +
        original[a - 1] +
        "</span>";
    }

    words[a] = "<span class='highlight'>" + words[a] + "</span>";
    countLetters();
  }
};
const showContent = () => {
  let output = document.getElementById("output");
  let x = whatTyped.join("");
  typedWords = x.length;
  output.innerHTML = typed.join(" ");
};
const checkComplete = () => {
  if (typed.length >= original.length) {
    input.style.display = "none";
    clearInterval(t);
    screen3.className = "";
  }
  if (timeComplete >= time * 60) {
    input.style.display = "none";
    clearInterval(t);
    screen3.className = "";
  }
};
let timeComplete = 0;
let time_show = document.getElementById("time_show");
const timeIncrease = () => {
  let total_time = document.getElementById("total_time");
  timeComplete++;

  let min = parseInt(timeComplete / 60);
  let sec = timeComplete % 60;

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  time_show.innerHTML = min + " : " + sec;
  total_time.innerHTML = min + " : " + sec;
  checkComplete();
  checkSpeed();
};
let count_words = 0;
let wrong = 0;
const checkWPM = (a, b) => {
  if (a != " ") {
    if (a == b + " ") {
      count_words++;
    } else {
      wrong++;
    }
  }
  let wrong_show = document.getElementById("wrong_show");
  let words_count = document.getElementById("words_count");
  let wrong_show1 = document.getElementById("wrong_show1");
  let words_count1 = document.getElementById("words_count1");
  let accuracy = document.getElementById("accuracy");

  wrong_show.innerHTML = wrong;
  words_count.innerHTML = count_words;
  wrong_show1.innerHTML = wrong;
  words_count1.innerHTML = count_words;
  accuracy.innerHTML =
    ((count_words * 100) / parseInt(count_words + wrong)).toFixed(2) + "%";
  checkSpeed();
};

const checkSpeed = () => {
  let wpm_show = document.getElementById("wpm_show");
  let wpm_show1 = document.getElementById("wpm_show1");
  if (timeComplete > 0) {
    wpm_show.innerHTML = parseInt((count_words * 60) / timeComplete);
    wpm_show1.innerHTML = parseInt((count_words * 60) / timeComplete);
  }
};
const stop = () => {
  input.style.display = "none";
  screen3.className = "";

  clearInterval(t);
};
const back = () => {
  screen3.className = "hide";
  let stop = document.getElementById("stop");
  stop.style.display = "none";
  let reset = document.getElementById("reset");
  reset.className = "stop";
};
