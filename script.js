const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const secondsEl = document.getElementById('seconds');
const totalDaysEl = document.getElementById('total-days');
const totalHoursEl = document.getElementById('total-hours');
const totalSecondsEl = document.getElementById('total-seconds');
const countdownTitleEl = document.getElementById('countdown-title');
const targetDateInputEl = document.getElementById('target-date-input');
const setTargetDateBtn = document.getElementById('set-target-date-btn');
const resetTargetDateBtn = document.getElementById('reset-target-date-btn');

let targetDate;

function updateTargetDate(dateString) {
    if (!dateString) return;
    
    targetDate = new Date(dateString);
    localStorage.setItem('targetCountdownDate', dateString);

    // Update UI
    targetDateInputEl.value = dateString;
    countdownTitleEl.textContent = `Until ${targetDate.toLocaleDateString('en-us', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}`;
    countdown(); // update countdown immediately
}

function loadTargetDate() {
    const storedDate = localStorage.getItem('targetCountdownDate');
    const defaultDate = '2026-01-01T00:00';
    updateTargetDate(storedDate || defaultDate);
}

function countdown() {
    if (!targetDate) return;

    const now = new Date();
    const remainingTime = targetDate - now;

    if (remainingTime < 0) {
        monthsEl.innerHTML = '00';
        daysEl.innerHTML = '00';
        hoursEl.innerHTML = '00';
        secondsEl.innerHTML = '00';
        totalDaysEl.innerHTML = '0';
        totalHoursEl.innerHTML = '0';
        totalSecondsEl.innerHTML = '0';
        return;
    }

    let years = targetDate.getFullYear() - now.getFullYear();
    let months = targetDate.getMonth() - now.getMonth();
    let days = targetDate.getDate() - now.getDate();
    let hours = targetDate.getHours() - now.getHours();
    let minutes = targetDate.getMinutes() - now.getMinutes();
    let seconds = targetDate.getSeconds() - now.getSeconds();

    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }

    if (minutes < 0) {
        hours--;
        minutes += 60;
    }

    if (hours < 0) {
        days--;
        hours += 24;
    }

    if (days < 0) {
        months--;
        const daysInLastMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        days += daysInLastMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalMonths = years * 12 + months;

    const totalDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const totalSeconds = Math.floor(remainingTime / 1000);

    totalDaysEl.innerHTML = totalDays.toLocaleString();
    totalHoursEl.innerHTML = totalHours.toLocaleString();
    totalSecondsEl.innerHTML = totalSeconds.toLocaleString();

    monthsEl.innerHTML = formatTime(totalMonths);
    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

setTargetDateBtn.addEventListener('click', () => {
    const newDateString = targetDateInputEl.value;
    if(newDateString){
        updateTargetDate(newDateString);
    }
});

resetTargetDateBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the date to the default?')) {
        const defaultDate = '2026-01-01T00:00';
        updateTargetDate(defaultDate);
    }
});

// Initial call
loadTargetDate();
countdown();
setInterval(countdown, 1000);

// To-Do List
const todosListEl = document.getElementById('todos-list');
const addTodoBtn = document.getElementById('add-todo-btn');
let todos = [];

function renderTodos() {
    todosListEl.innerHTML = '';
    todos.forEach(todo => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('todo-item-wrapper');
        wrapper.setAttribute('data-id', todo.id);

        wrapper.innerHTML = `
            <div class="delete-background">Delete</div>
            <div class="todo-item tile ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <input type="text" class="todo-text" value="${todo.text}" placeholder="New to-do...">
            </div>
        `;
        todosListEl.appendChild(wrapper);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    } else {
        todos = [{ id: Date.now(), text: '', completed: false }];
    }
    renderTodos();
}

let draggedItem = null;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let swipeType = null; // Can be 'todo' or 'counter'
let hasDragged = false; // Flag to distinguish tap from swipe

function handleSwipeStart(e) {
    hasDragged = false; // Reset on new touch

    // Ignore swipe if the user is interacting with an input or button
    if (e.target.matches('input, button, .reset-btn, .remove-btn, .todo-checkbox')) {
        isDragging = false;
        draggedItem = null;
        return;
    }

    draggedItem = e.target.closest('.todo-item, .counter-widget');
    if (!draggedItem) return;

    if (draggedItem.classList.contains('todo-item')) {
        swipeType = 'todo';
    } else if (draggedItem.classList.contains('counter-widget')) {
        swipeType = 'counter';
    }

    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    draggedItem.style.transition = 'none'; // Disable transition for smooth dragging
}

function handleSwipeMove(e) {
    if (!isDragging || !draggedItem) return;
    hasDragged = true; // It's a swipe, not a tap

    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - startX;
    
    if (swipeType === 'todo') {
        // Only allow left swipe for delete
        currentTranslate = Math.min(0, diffX);
    } else if (swipeType === 'counter') {
        // Only allow left swipe for decrement
        currentTranslate = Math.min(0, diffX);
    }
    
    draggedItem.style.transform = `translateX(${currentTranslate}px)`;
}

function handleSwipeEnd(e) {
    // If we didn't drag, it's a tap. Handle focusing inputs on touchend.
    if (!hasDragged) {
        if (e.target.matches('.todo-text, .counter-label')) {
            e.target.focus();
        }
        resetSwipeState();
        return;
    }

    if (!isDragging || !draggedItem) {
        resetSwipeState();
        return;
    }

    isDragging = false;
    draggedItem.style.transition = 'transform 0.3s ease';

    const deleteThreshold = -100;

    if (swipeType === 'todo' && currentTranslate < deleteThreshold) {
        const todoWrapper = draggedItem.closest('.todo-item-wrapper');
        const todoId = Number(todoWrapper.getAttribute('data-id'));
        const todo = todos.find(t => t.id === todoId);

        if (todo && (todo.text !== '' || todo.completed)) {
            if (confirm('Are you sure you want to delete this to-do item?')) {
                todos = todos.filter(t => t.id !== todoId);
            } else {
                draggedItem.style.transform = `translateX(0px)`;
                resetSwipeState();
                return;
            }
        } else {
            todos = todos.filter(t => t.id !== todoId);
        }
        
        if (todos.length === 0) {
            todos.push({ id: Date.now(), text: '', completed: false });
        }
        saveTodos();
        renderTodos();

    } else if (swipeType === 'counter' && currentTranslate < deleteThreshold) {
        const counterWrapper = draggedItem.closest('.counter-widget-wrapper');
        const counterId = Number(counterWrapper.getAttribute('data-id'));
        const counter = counters.find(c => c.id === counterId);

        if (counter) {
            counter.count--;
            draggedItem.querySelector('.custom-counter').textContent = counter.count;
            saveCounters();
        }
        draggedItem.style.transform = `translateX(0px)`;

    } else {
        // Snap back
        draggedItem.style.transform = `translateX(0px)`;
    }

    resetSwipeState();
}

function resetSwipeState() {
    draggedItem = null;
    isDragging = false;
    startX = 0;
    currentTranslate = 0;
    swipeType = null;
    hasDragged = false;
}

function handleTodoClick(e) {
    if (hasDragged) return; // Prevent click after swipe

    const target = e.target;
    
    // This handler should ONLY be concerned with the checkbox
    if (target.classList.contains('todo-checkbox')) {
        const todoEl = target.closest('.todo-item');
        if (!todoEl) return;
        
        const todoId = Number(todoEl.closest('.todo-item-wrapper').getAttribute('data-id'));
        const todo = todos.find(t => t.id === todoId);
        if (!todo) return;

        todo.completed = target.checked;
        todoEl.classList.toggle('completed', todo.completed);
        
        if (todo.completed) {
            todoEl.classList.add('flash-animation');
            setTimeout(() => {
                todoEl.classList.remove('flash-animation');
            }, 300);
        }
        saveTodos();
    }
}

function handleTodoInput(e) {
    const target = e.target;
    if (!target.classList.contains('todo-text')) return;
    
    const todoEl = target.closest('.todo-item');
    if (!todoEl) return;

    const todoId = Number(todoEl.closest('.todo-item-wrapper').getAttribute('data-id'));
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;
    
    todo.text = target.value;
    saveTodos();
}

addTodoBtn.addEventListener('click', () => {
    todos.push({ id: Date.now(), text: '', completed: false });
    saveTodos();
    renderTodos();
    // Focus the new input field for a better user experience
    todosListEl.querySelector('.todo-item-wrapper:last-child .todo-text').focus();
});

todosListEl.addEventListener('click', handleTodoClick);
todosListEl.addEventListener('input', handleTodoInput);

// Add swipe event listeners
todosListEl.addEventListener('mousedown', handleSwipeStart);
document.addEventListener('mousemove', handleSwipeMove);
document.addEventListener('mouseup', handleSwipeEnd);
todosListEl.addEventListener('touchstart', handleSwipeStart);
document.addEventListener('touchmove', handleSwipeMove);
document.addEventListener('touchend', handleSwipeEnd);


// Custom Counters
const countersListEl = document.getElementById('counters-list');
const addCounterBtn = document.getElementById('add-counter-btn');

let counters = [];

function renderCounters() {
    countersListEl.innerHTML = ''; // Clear existing counters
    counters.forEach(counter => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('counter-widget-wrapper');
        wrapper.setAttribute('data-id', counter.id);

        wrapper.innerHTML = `
            <div class="decrement-background">-1</div>
            <div class="counter-widget tile">
                <span class="remove-btn">&times;</span>
                <span class="reset-btn">⟳</span>
                <p class="custom-counter">${counter.count}</p>
                <input type="text" class="counter-label" value="${counter.label}" placeholder="New Counter">
            </div>
        `;
        countersListEl.appendChild(wrapper);
    });
}

function saveCounters() {
    localStorage.setItem('customCounters', JSON.stringify(counters));
}

function loadCounters() {
    const storedCounters = localStorage.getItem('customCounters');
    if (storedCounters) {
        counters = JSON.parse(storedCounters);
    } else {
        // Default counter if none are stored
        counters = [{ id: Date.now(), count: 0, label: '' }];
    }
    renderCounters();
}

function handleCounterClick(e) {
    if (hasDragged) return; // Prevent click after swipe

    const target = e.target;
    const counterEl = target.closest('.counter-widget');
    if (!counterEl) return;

    const counterId = Number(counterEl.closest('.counter-widget-wrapper').getAttribute('data-id'));
    const counter = counters.find(c => c.id === counterId);
    if (!counter) return;

    // Remove
    if (target.classList.contains('remove-btn')) {
        // Skip confirmation for empty, zero-count counters
        if (counter.count === 0 && counter.label === '') {
            counters = counters.filter(c => c.id !== counterId);
        } else {
            if (confirm('Are you sure you want to remove this counter?')) {
                counters = counters.filter(c => c.id !== counterId);
            } else {
                return; // Stop if user cancels
            }
        }

        if (counters.length === 0) {
            counters.push({ id: Date.now(), count: 0, label: '' });
        }
        saveCounters();
        renderCounters();
        return;
    }
    
    // Reset
    if (target.classList.contains('reset-btn')) {
        if (confirm('Are you sure you want to reset this counter?')) {
            counter.count = 0;
            counterEl.querySelector('.custom-counter').textContent = counter.count;
            saveCounters();
        }
        return;
    }

    // Don't increment if clicking the label
    if (target.classList.contains('counter-label')) {
        return;
    }

    // Increment
    counter.count++;
    counterEl.querySelector('.custom-counter').textContent = counter.count;

    counterEl.classList.add('flash-animation');
    setTimeout(() => {
        counterEl.classList.remove('flash-animation');
    }, 300);
    
    saveCounters();
}

function handleCounterInput(e) {
    const target = e.target;
    if (!target.classList.contains('counter-label')) return;
    
    const counterEl = target.closest('.counter-widget');
    if (!counterEl) return;

    const counterId = Number(counterEl.closest('.counter-widget-wrapper').getAttribute('data-id'));
    const counter = counters.find(c => c.id === counterId);
    if (!counter) return;
    
    counter.label = target.value;
    saveCounters();
}

addCounterBtn.addEventListener('click', () => {
    counters.push({ id: Date.now(), count: 0, label: '' });
    saveCounters();
    renderCounters();
    // Focus the new input field for a better user experience
    countersListEl.querySelector('.counter-widget-wrapper:last-child .counter-label').focus();
});

// This new handler specifically deals with focusing inputs on touch devices
function handleInputFocus(e) {
    if (e.target.matches('.todo-text, .counter-label')) {
        e.target.focus();
    }
}

todosListEl.addEventListener('click', handleTodoClick);
todosListEl.addEventListener('input', handleTodoInput);
countersListEl.addEventListener('click', handleCounterClick);
countersListEl.addEventListener('input', handleCounterInput);

// Listen for touch start on the lists to handle focus directly
todosListEl.addEventListener('touchstart', handleInputFocus, { passive: true });
countersListEl.addEventListener('touchstart', handleInputFocus, { passive: true });

// Unified Swipe Event Listeners
document.addEventListener('mousedown', handleSwipeStart);
document.addEventListener('mousemove', handleSwipeMove);
document.addEventListener('mouseup', handleSwipeEnd);
document.addEventListener('touchstart', handleSwipeStart, { passive: true });
document.addEventListener('touchmove', handleSwipeMove, { passive: true });
document.addEventListener('touchend', handleSwipeEnd);
document.addEventListener('touchend', handleTouchEndForFocus); // Add new listener for touch focus


// Help Modal
const helpButton = document.getElementById('help-button');
const helpModal = document.getElementById('help-modal');
const helpModalOverlay = document.getElementById('help-modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');

const APP_VERSION = '1.2'; // Increment to force-clear storage on update

function initializeStorage() {
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion !== APP_VERSION) {
        // Clear old storage keys to apply updates
        localStorage.removeItem('todos');
        localStorage.removeItem('customCounters');
        localStorage.removeItem('targetCountdownDate');

        // Set the new version
        localStorage.setItem('appVersion', APP_VERSION);
    }
}

function showHelpModal() {
    helpModal.classList.remove('hidden');
    helpModalOverlay.classList.remove('hidden');
}

function hideHelpModal() {
    helpModal.classList.add('hidden');
    helpModalOverlay.classList.add('hidden');
}

helpButton.addEventListener('click', showHelpModal);
closeModalBtn.addEventListener('click', hideHelpModal);
helpModalOverlay.addEventListener('click', hideHelpModal);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Orientation Warning for iPad
const orientationModal = document.getElementById('orientation-modal');
const orientationModalOverlay = document.getElementById('orientation-modal-overlay');

function isIPad() {
    return /iPad/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function checkOrientation() {
    if (isIPad() && window.matchMedia("(orientation: portrait)").matches) {
        orientationModal.classList.remove('hidden');
        orientationModalOverlay.classList.remove('hidden');
    } else {
        orientationModal.classList.add('hidden');
        orientationModalOverlay.classList.add('hidden');
    }
}

window.addEventListener('orientationchange', checkOrientation);
window.addEventListener('resize', checkOrientation); // For better reliability

initializeStorage();
loadTargetDate();
loadCounters();
loadTodos();
checkOrientation(); // Initial check
