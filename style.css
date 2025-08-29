@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: #080808;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    user-select: none;
}

.top-center-controls {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
}

#countdown-title {
    font-size: 45px;
    font-weight: 500;
    margin-bottom: 40px;
}

.date-input-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

#target-date-input {
    background: #181818;
    color: #fff;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 8px 12px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color-scheme: dark;
}

#set-target-date-btn {
    background: #252525;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 8px;
    transition: background-color 0.2s;
}

#set-target-date-btn:hover {
    background: #3a3a3a;
}

#reset-target-date-btn {
    background: #4a2a2a;
    border: none;
    color: #ffc4c4;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 8px;
    transition: background-color 0.2s;
}

#reset-target-date-btn:hover {
    background: #6b3e3e;
}

.counter-widget-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.decrement-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    background-color: #5c85ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 30px;
}

.todo-list-container {
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

#todos-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 15px;
}

.todo-item-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}

.delete-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    background-color: #ff5c5c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 525px; /* Increased width by 50% */
    min-width: 300px; /* Ensure width is not overridden */
    padding: 10px 15px;
    position: relative;
    transition: transform 0.3s ease;
    z-index: 2; /* Keep on top of delete background */
    background-color: #181818; /* Needed to hide delete background */
}

.todo-item.completed {
    background-color: #00f2ea;
    box-shadow: 0 0 20px rgba(0, 242, 234, 0.5);
}

.todo-checkbox {
    appearance: none;
    -webkit-appearance: none; /* Vendor prefix for cross-browser compatibility */
    width: 22px;
    height: 22px;
    border: 2px solid #555;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s;
    flex-shrink: 0; /* Prevents shrinking inside the flex container */
    margin: 0;
    padding: 0;
}

.todo-checkbox:checked {
    background-color: #00f2ea;
    border-color: #00f2ea;
}

.todo-checkbox:checked::after {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #181818;
    font-size: 16px;
}

.todo-text {
    background: transparent;
    border: none;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    outline: none;
    flex-grow: 1;
}

#add-todo-btn {
    background: #252525;
    border: none;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    width: 100%;
    padding: 5px;
    transition: background-color 0.2s;
}

#add-todo-btn:hover {
    background: #3a3a3a;
}

/* Help Button & Modal */
#help-button {
    position: fixed; /* Changed for better viewport centering */
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background-color: #252525;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    z-index: 100;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    transition: transform 0.2s;
}

#help-button:hover {
    transform: translateX(-50%) scale(1.1);
}

.hidden {
    display: none !important;
}

#help-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}

#help-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    width: 90%;
    max-width: 600px;
    padding: 30px;
    text-align: left;
}

#close-modal-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: color 0.2s;
}

#close-modal-btn:hover {
    color: #fff;
}

#help-modal h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
}

#help-modal ul {
    list-style: none;
    padding-left: 0;
}

#help-modal li {
    margin-bottom: 15px;
}

#help-modal ul ul {
    padding-left: 20px;
    margin-top: 10px;
}

#help-modal strong {
    color: #00f2ea;
}

/* Orientation Modal */
#orientation-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
}

#orientation-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2001;
    width: 90%;
    max-width: 400px;
    padding: 30px;
    text-align: center;
}

#orientation-modal h2 {
    margin-top: 0;
    margin-bottom: 15px;
}

.container {
    text-align: center;
}

h1 {
    font-size: 45px;
    font-weight: 500;
    margin-bottom: 40px;
}

.countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
}

.countdown div {
    background: #181818;
    padding: 20px;
    border-radius: 10px;
    width: 120px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.countdown p {
    font-size: 50px;
    font-weight: 600;
}

.countdown span {
    font-size: 16px;
    font-weight: 400;
    display: block;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.7);
}

.total-breakdown {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
}

.tile {
    background: #252525;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    text-align: center;
    width: 180px;
    transition: transform 0.2s ease-in-out;
}

.tile:hover {
    transform: scale(1.05);
}

.tile p {
    font-size: 28px;
    font-weight: 600;
    color: #fff;
}

.tile span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 5px;
    display: block;
}

.custom-counter-container {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#counters-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 15px;
}

.counter-label {
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: none;
    border-top: 1px solid #444;
    border-radius: 0;
    padding: 8px 10px;
    margin-top: 5px;
    width: 100%;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    outline: none;
}

.counter-widget {
    cursor: pointer;
    width: 160px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none; /* Prevents text selection */
    position: relative; /* For positioning the reset button */
    transition: transform 0.3s ease;
    z-index: 2;
    background-color: #252525;
}

.counter-widget.flash-animation {
    animation: flash 0.3s ease-in-out;
}

.counter-widget p {
    font-size: 32px;
    margin: 0;
}

#reset-counter, .reset-btn {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 25px;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: transform 0.3s ease, color 0.3s ease;
    line-height: 1; /* Adjust line height for large font */
    margin: 0; /* Reset margin */
}

#reset-counter:hover, .reset-btn:hover {
    transform: rotate(180deg);
    color: #fff;
}

.remove-btn {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    line-height: 1;
    transition: color 0.3s ease;
}

.remove-btn:hover {
    color: #ff5c5c;
}

#add-counter-btn {
    background: #252525;
    border: none;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    width: 100%;
    padding: 5px;
    transition: background-color 0.2s;
}

#add-counter-btn:hover {
    background: #3a3a3a;
}

@keyframes flash {
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        background-color: #252525;
    }
    50% {
        transform: scale(1.08);
        box-shadow: 0 0 40px rgba(0, 242, 234, 0.7);
        background-color: #00f2ea;
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        background-color: #252525;
    }
}
