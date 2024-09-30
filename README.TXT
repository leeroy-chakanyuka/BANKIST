01. DOM ELEMENTS
    * the entire UI, essentially switching from blank page to the app - home screen
      is controlled by the opacity, which is set to 0, 100 sets it back to normal
    * To add transactions : we have the block "movements". 
      1. loop over the transactions array and build a tring akin to movements, replacing things such as transaction amount and ID
      2. insert your new string using the "inserAdjacentHTML" tag. which has two string arguments (postiton_where, theStringYouWantToInsert);
      
02. LOGIN

    * Create a variable to store the current user in 
      = let currentAcc
    * go through the array of objects and find the first object that has this property!
      = currentAcc = accounts.find(acc => acc.username === inputLoginUsername.value);
      *if found store it in a variable
    *If we found the object with that username and stored it, the object / account exists and is not null
    *Because thats the case, check the pin [there] with the given one!
      =  if (currentAcc?.pin === Number(inputLoginPin.value)) { 
    *if the pin is [correct]
      *change the heading text to welcome 
      = labelWelcome.textContent = `Welcome back, ${currentAcc.owner}`;
      *reveal the UI
      = containerApp.style.opacity = 100;

02. DISPLAYING [CURRENT] ACCOUNT'S transactions

    *Since we found the object we needed, we also know that each object has its own transactions
    *So everytime you loging [YOUR] transactions are the ones that you are supposed to screen 
      = currentAcc.mytransactions
      *this is the parameter you should use moving forward!
    *run all the methods you created

    *clear the name and password input fields
      = inputLoginUsername.value = inputLoginPin.value = '';
    *blur it as well
      = inputLoginUsername.blur()
      = inputLoginPin.blur()

