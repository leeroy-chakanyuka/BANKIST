01. DOM ELEMENTS
    * the entire UI, essentially switching from blank page to the app - home screen
      is controlled by the opacity, which is set to 0, 100 sets it back to normal
    * To add transactions : we have the block "movements". 
      1. loop over the transactions array and build a tring akin to movements, replacing things such as transaction amount and ID
      2. insert your new string using the "inserAdjacentHTML" tag. which has two string arguments (postiton_where, theStringYouWantToInsert);
      
