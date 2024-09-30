'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Leeroy Chakanyuka',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
function displayMovements(movements) {
  //movements would be an array!

  movements.forEach(function (movement, index) {
    let transactiontype;
    movement < 0
      ? (transactiontype = 'deposit')
      : (transactiontype = 'withdrawal');

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${transactiontype}">${
      index + 1
    } ${transactiontype}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">R${movement}</div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

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

function printBal(account) {
  const balance = account.reduce(function (acc, curr, i, arr) {
    return (acc += curr);
  }, 0);
  labelBalance.innerHTML = `R${balance}`; //logs nothing to the console, instead we print bal
}

function totalIncome(account) {
  const income = account.movements
    .filter(function (v, i, a) {
      return v > 0;
    })
    .reduce(function (a, v, i, ar) {
      return (a += v);
    }, 0);
  const out = account.movements
    .filter(function (v, i, a) {
      return v < 0;
    })
    .reduce(function (a, v, i, ar) {
      return (a += Math.abs(v));
    }, 0);
  labelSumOut.innerHTML = `R${out}`;
  labelSumIn.innerHTML = `R${income}`;
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
  labelSumInterest.innerHTML = `R${Interest}`;
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
    displayMovements(currentAcc.movements);
    //Balances
    printBal(currentAcc.movements);
    totalIncome(currentAcc);
  }
});

/////////////////////////////////////////////////
