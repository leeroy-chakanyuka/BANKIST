const account1 = {
  owner: 'Leeroy Chakanyuka',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-10-11T17:01:17.194Z',
    '2024-10-11T23:36:17.929Z',
    '2024-10-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

function startLogoutTimer() {
  let time = 600;
  const timer = setInterval(function () {
    const min = time / 60;
    const secs = time % 60;
    time--;
    console.log(Math.floor(min), secs);
    labelTimer.textContent = `${String(Math.floor(min)).padStart(
      2,
      0
    )}:${String(Math.floor(secs)).padStart(2, 0)}`;
    if (time < 0) {
      clearInterval(timer);
      location.reload();
    }
  }, 1000);
}

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
containerMovements.innerHTML = '';

function displayMovements(acc, sort = false) {
  let html;
  containerMovements.innerHTML = '';
  // movements would be an array
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (movement, index) {
    let transactiontype;
    movement > 0
      ? (transactiontype = 'deposit')
      : (transactiontype = 'withdrawal');
    let displayDate = new Date(acc.movementsDates[index]);
    displayDate = editDate(displayDate, false);
    displayDate = daysPassed(Date.now(), new Date(acc.movementsDates[index]));
    displayDate = Math.floor(displayDate);
    if (displayDate == 0) {
      console.log(displayDate);
      console.log(movement);
      html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${transactiontype}">${
        index + 1
      } ${transactiontype}</div>
        <div class="movements__date"> ${'TODAY'} </div>
        <div class="movements__value">R${Math.abs(movement).toFixed(2)}</div>
      </div>
    `;
    }
    if (Math.floor(displayDate) === 1) {
      html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${transactiontype}">${
        index + 1
      } ${transactiontype}</div>
        <div class="movements__date">${'Yesterday'}</div>
        <div class="movements__value">R${Math.abs(movement).toFixed(2)}</div>
      </div>
    `;
    }

    //
    //
    // ADD FUNCTIONALITY FOR A YESTERDAY/TODAY CASE
    //
    if (displayDate >= 31) {
      displayDate = displayDate / 31;

      html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${transactiontype}">${
        index + 1
      } ${transactiontype}</div>
        <div class="movements__date">${
          Math.floor(displayDate) + ` Months Ago`
        }</div>
        <div class="movements__value">R${Math.abs(movement).toFixed(2)}</div>
      </div>
    `;
    } else {
      html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${transactiontype}">${
        index + 1
      } ${transactiontype}</div>
        <div class="movements__date">${
          Math.floor(displayDate) + ` Days Ago`
        }</div>
        <div class="movements__value">R${Math.abs(movement).toFixed(2)}</div>
      </div>
    `;
    }

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const d1 = new Date('2019-11-01T13:15:33.035Z');
const d2 = new Date('2019-11-04T13:15:33.035Z');
console.log(d1);
function daysPassed(newDate, oldDate) {
  const passed = newDate - oldDate;
  return passed / 1000 / 60 / 60 / 24;
}

console.log(daysPassed(d2, d1));

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join(''); // No spaces between initials
  });
};
createUsernames(accounts);

const deposits = account1.movements.filter(function (movement) {
  return movement > 0;
});

const withdrawals = account1.movements.filter(function (movement) {
  return movement < 0;
});
let balance = 0;
function printBal(account) {
  balance = account.movements.reduce(function (acc, curr, i, arr) {
    return (acc += curr);
  }, 0);
  labelBalance.innerHTML = `${formatCurrency(balance)}`; //logs nothing to the console, instead we print bal
}

function formatCurrency(
  number,
  options = {
    currencySymbol: 'R',
    decimalPlaces: 2,
  }
) {
  const {
    currencySymbol = '',
    decimalPlaces = 2,
    thousandsSeparator = ' ',
    decimalSeparator = ',',
    symbolPosition = 'prefix',
  } = options;

  let formatted = Number(number)
    .toFixed(decimalPlaces)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
    .replace('.', decimalSeparator);

  if (symbolPosition === 'prefix') {
    return currencySymbol + formatted;
  } else if (symbolPosition === 'suffix') {
    return formatted + currencySymbol;
  } else {
    return formatted;
  }
}

let inc = 0;
let out = 0;

function totalIncome(account) {
  inc = account.movements
    .filter(function (v, i, a) {
      return v > 0;
    })
    .reduce(function (a, v, i, ar) {
      return (a += v);
    }, 0);
  out = account.movements
    .filter(function (v, i, a) {
      return v < 0;
    })
    .reduce(function (a, v, i, ar) {
      return (a += Math.abs(v));
    }, 0);
  labelSumOut.innerHTML = `${formatCurrency(out)}`;
  labelSumIn.innerHTML = `${formatCurrency(inc)}`;
  const Interest = account.movements
    .filter(function (v, i, a) {
      return v > 0;
    })
    .map(function (a, v, i) {
      let interest = 0;
      return (interest += a * (account.interestRate / 100));
    }, 0)
    .reduce(function (ac, v, i, ar) {
      let val = 0;
      if (v >= 1) {
        val = v;
      } else {
        val = 0;
      }
      return (ac += val);
    }, 0);
  labelSumInterest.innerHTML = `${formatCurrency(Interest)}`;
}

// EVENT LISTENERS!

let currentAcc;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //this is actually connected to the global window
  currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAcc); // stores the username here and its assumed you're this acc now

  //go through the accounts array, find the element with the property value that matches what was entered

  if (currentAcc?.pin === Number(inputLoginPin.value)) {
    // HAS TO BE A NUMBER!

    //check if current account exists! (it can only exist if the find method finds your account and stores it in currentAcc)
    //displaying the account (UI)

    labelWelcome.textContent = `Welcome back, ${currentAcc.owner}`;
    //goes from "Log in to get started" to
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    //Movements
    displayMovements(currentAcc);
    //Balances
    printBal(currentAcc);
    totalIncome(currentAcc);
    startLogoutTimer();
  }
});
function updateUI(acc) {
  startLogoutTimer();
  displayMovements(acc);
  printBal(acc);
  totalIncome(acc);
}
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  let sendTo = accounts.find(acc => acc.username === inputTransferTo.value);
  if (sendTo != null) {
    if (sendTo !== currentAcc) {
      if (balance >= amount && amount > 0) {
        const newD = new Date();
        sendTo.movements.push(amount);
        currentAcc.movementsDates.push(new Date());
        currentAcc.movements.push(amount - amount * 2);
        updateUI(currentAcc);
        inputTransferAmount.value = '';
        inputTransferTo.value = '';
        currentAcc.movementsDates.push(new Date());
      } else {
        alert('you broke nigga');
      }
    } else {
      alert('you cannot send money to yourself!');
    }
  } else {
    alert('account does not exist!');
  }
});

const currDate = new Date();

console.log(currDate);

function editDate(date) {
  const format = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
    weekday: 'long',
  };

  return new Intl.DateTimeFormat('locale', format).format(date);
}
labelDate.textContent = editDate(currDate);
console.log();
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Math.floor(inputLoanAmount.value);
  const canGetLoan = currentAcc.movements.some(function (v) {
    return v >= loan * 0.1;
  });
  if (canGetLoan) {
    const myTime = setTimeout(function () {
      currentAcc.movements.push(loan);
      currentAcc.movementsDates.push(new Date());
      updateUI(currentAcc);
      inputLoanAmount.value = '';
    }, 30000);
  } else {
    alert(`not enough cash!`);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(currentAcc);
  if (!currentAcc) {
    alert('you are not logged in to any account!');
  }
  if (
    currentAcc.username === inputCloseUsername.value &&
    currentAcc.pin === Number(inputClosePin.value)
  ) {
    let ind = accounts.findIndex(function () {
      return currentAcc.username;
    });
    labelWelcome.textContent = `GoodBye, ${currentAcc.owner}`;
    accounts.splice(ind, 1);
    console.log(accounts);
    currentAcc = '';
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Login to get started`;
    inputClosePin.value = '';
    inputCloseUsername.value = '';
  } else {
    alert('Wrong password or username, please try again!');
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
